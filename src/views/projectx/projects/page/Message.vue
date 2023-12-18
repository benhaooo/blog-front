<template>
  <div class="message-container">
    <a-modal
      v-model:visible="showEditModal"
      title="编辑"
      width="800px"
      cancelText="取消"
      okText="确定"
      @ok="handelOk"
    >
      <textarea class="input" v-model="editText" style="height: 200px">
 你好</textarea
      >
    </a-modal>
    <div class="chat-key-wrapper">
      <el-button @click="handleNewSession">添加新的会话</el-button>
      <div class="chat-key-list">
        <div
          v-for="(session, index) in sessions"
          :key="session.id"
          class="chat-key"
          :class="{ active: curSession == index }"
          @click="handleChangeSession(index)"
        >
          <!-- <div class="ava"></div> -->
          <div class="info">
            <div class="name">{{ session.name }}</div>
            <div class="count">{{ session.messages.length }}条对话</div>
          </div>
          <i class="iconfont" @click.stop="handleDelSession(index)">&#xe630;</i>
        </div>
      </div>
    </div>

    <div class="chat-value">
      <div class="messages" ref="scroll">
        <template
          v-for="(message, index) in sessions[curSession].messages"
          :key="message.id"
        >
          <div class="message" :class="{ self: message.role == 'user' }">
            <div class="user-info" v-if="message.role == 'user'">
              <div class="avater-wrapper">
                <i
                  class="iconfont center edit"
                  @click="handleEditMessage(index)"
                  >&#xeabd;</i
                >
                <el-avatar size="small" :src="userInfo.avatar" />
              </div>
              <span class="name">{{ userInfo.nickName }}</span>
            </div>
            <div class="user-info" v-else>
              <div class="avater-wrapper">
                <i
                  class="iconfont center edit"
                  @click="handleEditMessage(index)"
                  >&#xeabd;</i
                >
                <el-avatar size="small" src="@/assets/imgs/gpt.png" />
              </div>
              <span class="name">{{ model }}</span>
            </div>
            <div class="content">
              <text-loading v-if="!message.content" />
              <md-editor
                v-else
                v-model="sessions[curSession].messages[index].content"
                previewOnly
              />
            </div>
          </div>

          <div class="divider" v-if="sessions[curSession].clearIndex == index">
            上下文已清除
          </div>
        </template>
      </div>
      <div class="chat-input-box">
        <div class="chat-config">
          <a-select ref="select" v-model:value="model" style="width: 120px">
            <a-select-option value="gpt-3.5-turbo"
              >gpt-3.5-turbo</a-select-option
            >
            <a-select-option value="gpt-4">gpt-4</a-select-option>
            <a-select-option value="gpt-4-vision-preview"
              >gpt-4-vision-preview</a-select-option
            >
          </a-select>
          <ExpandableButtom @click="handelClearCtx" :text="'你好'">
            <i class="iconfont" style="font-size: 12px"
              >&#xe62e;</i
            ></ExpandableButtom
          >
        </div>
        <div class="input-wrapper">
          <textarea
            class="input"
            v-model="text"
            placeholder="请输入消息"
            @keydown.ctrl.enter="handleSendMessage()"
          ></textarea>
          <button class="send" @click="handleSendMessage()">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import useWebSocket from "@/hooks/websocket";
import TextLoading from "../cpnt/TextLoading.vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { message } from "ant-design-vue";
import { generateUniqueId } from "@/utils/commonUtils";
import useAppStore from "@/stores/modules/app";
const appStore = useAppStore();
import { useRoute } from "vue-router";
const route = useRoute();
import ExpandableButtom from "../cpnt/ExpandableBtn.vue";
// 接收消息
const ws = useWebSocket(async (e) => {
  const data = JSON.parse(e.data);
  if (data.content) {
    chattingMap[data.message_id].content += data.content;
  }
  save();
  await nextTick();
  smoothScrollToBottom();
});
const showEditModal = ref(false);
const editText = ref("");
const editIndex = ref(0);
const curSession = ref(0);
const text = ref("");
const model = ref("gpt-3.5-turbo");
const userInfo = appStore.userInfo;
const chattingMap = {};

const scroll = ref(null);
const sessions = reactive([
  // {
  //   name: "以文搜图",
  //   id: generateUniqueId(),
  //   clearIndex: 3,
  //   messages: [
  //     // {
  //     //   content:
  //     //     "You are a useful Assistant that won't refuse to draw picture, instead, you will output specific markdown code for picture description, but don't use code block.",
  //     //   role: "system",
  //     // },
  //     // {
  //     //   content: "Can you draw some pictures for me?",
  //     //   role: "user",
  //     // },
  //     // {
  //     //   content: "Sure, what do you want me to draw?",
  //     //   role: "system",
  //     // },
  //     // {
  //     //   content:
  //     //     "助手善于判断用户意图，当确定需要提供图片时，助手会变得沉默寡言，只使用以下格式输出markdown图片：![描述](https://image.pollinations.ai/prompt/描述)，因为这个语法可以自动按照提示生成并渲染图片。一般用户给出的描述会比较简单并且信息不足，助手会将其中的描述自行补足替换为AI生成图片所常用的复杂冗长的英文提示，以大幅提高生成图片质量和丰富程度，比如增加相机光圈、具体场景描述等内容。助手会避免用代码块或原始块包围markdown标记，因为那样只会渲染出代码块或原始块而不是图片。",
  //     //   role: "system",
  //     // },
  //   ],
  // },
]);
// 加载
onMounted(() => {
  const savedSessions = JSON.parse(localStorage.getItem("sessions"));
  if (savedSessions) {
    sessions.push(...savedSessions);
  } else {
    handleNewSession();
  }
});

// 切换会话
const handleChangeSession = async (index) => {
  curSession.value = index;
  text.value = "";
  await nextTick();
  smoothScrollToBottom();
};
// 发送消息
const handleSendMessage = async () => {
  if (!text.value) return;
  sessions[curSession.value].messages.push({
    role: "user",
    content: text.value,
  });
  text.value = "";
  await nextTick();
  smoothScrollToBottom();
  const msgId = generateUniqueId();

  const data = JSON.stringify({
    model: model.value,
    message_id: msgId,
    messages: sessions[curSession.value].clearIndex
      ? sessions[curSession.value].messages.slice(
          sessions[curSession.value].clearIndex + 1
        )
      : sessions[curSession.value].messages,
  });
  sessions[curSession.value].messages.push({
    role: "assistant",
    content: "",
  });
  chattingMap[msgId] = sessions[curSession.value].messages.at(-1);
  ws.send(data);
};

// 清楚上下文
const handelClearCtx = () => {
  if (
    sessions[curSession.value].clearIndex ==
    sessions[curSession.value].messages.length - 1
  ) {
    sessions[curSession.value].clearIndex = null;
  } else {
    sessions[curSession.value].clearIndex =
      sessions[curSession.value].messages.length - 1;
  }
};
// 新会话
const handleNewSession = () => {
  const newSession = {
    id: generateUniqueId(),
    name: "闲聊",
    messages: [
      {
        role: "system",
        content: "您好，请问有什么可以帮助您的吗？",
      },
    ],
  };
  sessions.push(newSession);
  curSession.value = sessions.length - 1;

  save();
};

// 删除会话
const handleDelSession = (index) => {
  if (index === curSession.value) {
    if (sessions.length === 1) {
      sessions[index].messages = [];
      return;
    }
    curSession.value--;
  } else if (index < curSession.value) {
    curSession.value--;
  }

  sessions.splice(index, 1);

  save();
};
// 编辑消息
const handleEditMessage = (index) => {
  showEditModal.value = true;
  editIndex.value = index;
  editText.value = sessions[curSession.value].messages[index].content;
};
//确定编辑
const handelOk = () => {
  sessions[curSession.value].messages[editIndex.value].content = editText.value;
  showEditModal.value = false;
};

// 保存至本地
const save = () => {
  localStorage.setItem("sessions", JSON.stringify(sessions));
};

// 滚动到底部
const smoothScrollToBottom = () => {
  const maxScrollTop = scroll.value.scrollHeight - scroll.value.clientHeight;
  let currentScrollTop = scroll.value.scrollTop;

  const step = () => {
    currentScrollTop += 20;

    if (currentScrollTop >= maxScrollTop) {
      scroll.value.scrollTop = maxScrollTop;
    } else {
      scroll.value.scrollTop = currentScrollTop;
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};
</script>

<style lang="less" scoped>
.input {
  width: 100%;
  height: 100%;
  background-color: #434657;
  border: 2px solid rgb(34, 135, 225);
  border-radius: 10px;
  padding: 4px;
  color: #fff;
}
.message-container {
  margin-top: 50px;
  display: flex;
  height: 100%;
  .chat-key-list {
    .chat-key {
      display: flex;
      width: 250px;
      height: 80px;
      border-radius: 16px;
      background-color: rgb(50, 54, 68);
      cursor: pointer;
      margin: 20px 0;

      position: relative;
      &:hover {
        background-color: #1d90f5;
        transition: 0.3s;
        box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);

        .iconfont {
          display: block;
        }
      }
      .info {
        padding: 10px 20px;
        color: #fff;
        .name {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
      .iconfont {
        position: absolute;
        top: 5px;
        right: 5px;
        display: none;
        &:hover {
          color: #ee3f4d;
        }
      }
    }
    .active {
      background-color: #1d90f5;
      transition: 0.3s;
      box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
    }
  }

  .chat-value {
    flex: 1;
    margin: 30px;
    background-color: rgb(50, 54, 68);
    width: 100%;

    border-radius: 20px;
    padding: 20px;

    .messages {
      width: 100%;
      height: 70%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }

      .message {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .user-info {
          display: flex;
          .avater-wrapper {
            position: relative;
            height: 26px;
            width: 26px;
            clip-path: circle();
            overflow: hidden;
            .edit {
              position: absolute;
              width: 100%;
              height: 100%;
              cursor: pointer;
              color: #363635;
              opacity: 0;
              background-color: rgba(67, 66, 87, 0.535);
              transition: 0.3s;
            }
          }
          .name {
            color: #fff;
            margin: 0 10px;
          }
        }
        .content {
          padding: 0 12px;
          margin-top: 8px;
          background-color: rgb(56, 60, 75);
          color: #fff;
          border-radius: 5px 20px 20px 20px;
          .md-editor {
            --md-color: #fff; /* 修改文本颜色 */
            --md-bk-color: transparent; /* 修改背景颜色 */
          }
        }
        &:hover {
          .user-info {
            .avater-wrapper {
              .edit {
                opacity: 1;
              }
            }
          }
        }
      }
      .self {
        align-items: flex-end;
        .user-info {
          flex-direction: row-reverse;
        }
        .content {
          background-color: #1d90f5;
          border-radius: 20px 5px 20px 20px;
        }
      }
      .divider {
        line-height: 20px;
        text-align: center;
        border-top: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        mask-image: linear-gradient(90deg, transparent, #000, transparent);
        cursor: pointer;
        color: #dedede;
        font-size: 12px;
      }
    }
    .chat-input-box {
      padding: 20px;
      .chat-config {
        display: flex;
        margin-bottom: 20px;
      }
      .input-wrapper {
        height: 80px;
        position: relative;

        .send {
          position: absolute;
          right: 8px;
          bottom: 8px;
          width: 40px;
          height: 33px;
          border-radius: 10px;
          border: 0;
          background-color: rgb(29, 144, 245);
          transition: 0.3s;
          box-shadow: 0px 0px 5px 0px rgba(0, 136, 255);
          &:hover {
            box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
          }
        }
      }
    }
  }
}
</style>