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
      {{ sessions.length }}
      <el-button @click="handleNewSession">添加新的会话</el-button>
      <SessionList
        :sessions="sessions"
        :currentSessionId="currentSessionId"
        @select="handleSelectSession"
        @delete="handleDeleteSession"
      />
    </div>

    <div class="chat-value">
      <div class="messages" ref="scroll">
        <template
          v-for="(message, index) in currentSession.messages"
          :key="message.id"
        >
          <Message :message="message" :userInfo="userInfo" />

          <div class="divider" v-if="currentSession.clearIndex == index">
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
import { generateUniqueId } from "@/utils/commonUtils";
import useAppStore from "@/stores/modules/app";
import useSessionsStore from "@/stores/modules/chat";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ExpandableButtom from "../cpnt/ExpandableBtn.vue";
import Message from "../cpnt/Message.vue";
import SessionList from "../cpnt/SessionList.vue";

const route = useRoute();
const appStore = useAppStore();
const sessionsStore = useSessionsStore();

//接收消息
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
const text = ref("");
const model = ref("gpt-3.5-turbo");
const userInfo = appStore.userInfo;
const chattingMap = {};

const scroll = ref(null);

const { sessions, currentSessionId, currentSession } =
  storeToRefs(sessionsStore);
// 加载
onMounted(() => {
  const savedSessions = JSON.parse(localStorage.getItem("sessions"));
  if (savedSessions) {
    console.log("load sessions");
    console.log(savedSessions);
    sessionsStore.initSessions(savedSessions);
  } else {
    // handleNewSession();
  }
});

// 切换会话
const handleSelectSession = async (id) => {
  sessionsStore.setCurrentSession(id);

  // text.value = "";
  await nextTick();
  smoothScrollToBottom();
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
  sessionsStore.addSession(newSession);

  // save();
};

// 删除会话
const handleDeleteSession = (session) => {
  sessionsStore.deleteSession(session);
  save();
};
// 发送消息
const handleSendMessage = async () => {
  if (!text.value) return;
  currentSession.value.messages.push({
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
    messages: currentSession.value.clearIndex
      ? currentSession.value.messages.slice(currentSession.value.clearIndex + 1)
      : currentSession.value.messages,
  });
  currentSession.value.messages.push({
    role: "assistant",
    content: "",
  });
  chattingMap[msgId] = currentSession.value.messages.at(-1);
  ws.send(data);
};

// // 清楚上下文
// const handelClearCtx = () => {
//   if (
//     sessions[curSession.value].clearIndex ==
//     sessions[curSession.value].messages.length - 1
//   ) {
//     sessions[curSession.value].clearIndex = null;
//   } else {
//     sessions[curSession.value].clearIndex =
//       sessions[curSession.value].messages.length - 1;
//   }
// };

// // 编辑消息
// const handleEditMessage = (index) => {
//   showEditModal.value = true;
//   editIndex.value = index;
//   editText.value = sessions[curSession.value].messages[index].content;
// };
// //确定编辑
// const handelOk = () => {
//   sessions[curSession.value].messages[editIndex.value].content = editText.value;
//   showEditModal.value = false;
// };

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