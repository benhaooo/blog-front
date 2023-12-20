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
      <textarea
        class="input"
        v-model="editText"
        style="height: 300px"
      ></textarea>
    </a-modal>
    <!-- 会话配置 -->
    <a-modal
      v-model:visible="showConfigModal"
      title="会话配置"
      width="800px"
      cancelText="取消"
      okText="保存"
      @ok="handelOk"
    >
      <a-form
        :model="currentSession"
        labelAlign="left"
        :colon="false"
        :labelCol="{ span: 6 }"
      >
        <a-form-item label="名称">
          <a-input v-model:value="currentSession.name" />
        </a-form-item>
        <a-form-item label="模型">
          <a-select
            ref="select"
            v-model:value="currentSession.model"
            style="width: 120px"
          >
            <a-select-option value="gpt-3.5-turbo"
              >gpt-3.5-turbo</a-select-option
            >
            <a-select-option value="gpt-3.5-turbo-16k"
              >gpt-3.5-turbo-16k</a-select-option
            >
            <a-select-option value="gpt-4">gpt-4</a-select-option>
            <a-select-option value="gpt-4-vision-preview"
              >gpt-4-vision-preview</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="上下文数量">
          <a-slider v-model:value="currentSession.ctxLimit" :max="50" />{{
            currentSession.ctxLimit
          }}
        </a-form-item>
        <a-form-item label="回复数">
          <a-slider v-model:value="currentSession.maxTokens" :max="4096" />{{
            currentSession.maxTokens
          }}
        </a-form-item>
      </a-form>
    </a-modal>

    <div class="chat-key-wrapper">
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
        <div class="chat-config" @click="handelShowConfig">
          {{ currentSession.model }}
        </div>
        <div v-if="currentSession.clearedCtx">
          <template
            v-for="message in currentSession.clearedCtx"
            :key="message.id"
          >
            <Message
              :message="message"
              :userInfo="userInfo"
              :chattingMap="chattingMap"
              @delete="handleDeleteMessage"
              @edit="handleEditMessage"
            />
          </template>
          <div class="divider">上下文已清除</div>
        </div>

        <template v-for="message in currentSession.messages" :key="message.id">
          <Message
            :message="message"
            :userInfo="userInfo"
            :chattingMap="chattingMap"
            @delete="handleDeleteMessage"
            @edit="handleEditMessage"
          />
        </template>
      </div>
      <div class="chat-input-box">
        <div class="chat-handle">
          <ExpandableButtom @click="handelClearCtx" :text="'清除上下文'">
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
  if (typeof data.content != "undefined") {
    chattingMap[data.message_id].content += data.content;
  } else {
    //结束
    delete chattingMap[data.message_id];
  }
  save();
});
const text = ref("");
const userInfo = appStore.userInfo;

const showEditModal = ref(false);
const showConfigModal = ref(false);
const editMessage = ref({});
const editText = ref("");

const scroll = ref(null);

const { sessions, currentSessionId, chattingMap, currentSession } =
  storeToRefs(sessionsStore);
// 加载
onMounted(() => {
  const savedSessions = JSON.parse(localStorage.getItem("sessions"));
  if (savedSessions) {
    sessionsStore.initSessions(savedSessions);
  } else {
    handleNewSession();
  }
});

// 切换会话
const handleSelectSession = async (id) => {
  sessionsStore.setCurrentSession(id);

  await nextTick();
  smoothScrollToBottom();
};

// 新会话
const handleNewSession = () => {
  const newSession = {
    id: generateUniqueId(),
    name: "闲聊",
    model: "gpt-3.5-turbo",
    ctxLimit: 10,
    maxTokens: 2048,
    messages: [
      {
        role: "system",
        content: "您好，请问有什么可以帮助您的吗？",
      },
    ],
  };
  sessionsStore.addSession(newSession);

  save();
};

// 删除会话
const handleDeleteSession = (index) => {
  sessionsStore.deleteSession(index);
  save();
};
// 发送消息
const handleSendMessage = async () => {
  if (!text.value) return;
  currentSession.value.messages.push({
    id: generateUniqueId(),
    role: "user",
    content: text.value,
  });
  text.value = "";
  const msgId = generateUniqueId();
  const data = JSON.stringify({
    model: currentSession.value.model,
    message_id: msgId,
    messages: currentSession.value.messages,
  });
  currentSession.value.messages.push({
    id: msgId,
    role: "assistant",
    content: "",
  });
  chattingMap[msgId] = currentSession.value.messages.filter(
    (msg) => msg.id == msgId
  )[0];
  ws.send(data);
  await nextTick();
  smoothScrollToBottom();
};

// 删除消息
const handleDeleteMessage = (id) => {
  currentSession.value.messages = currentSession.value.messages.filter(
    (msg) => msg.id != id
  );
};

// // 清楚上下文
const handelClearCtx = () => {
  if (!currentSession.value.clearedCtx) {
    currentSession.value.clearedCtx = [];
  }
  currentSession.value.clearedCtx.push(...currentSession.value.messages);
  currentSession.value.messages = [];
  save();
};

// 编辑消息
const handleEditMessage = (message) => {
  showEditModal.value = true;
  editMessage.value = message;
  editText.value = message.content;
};
//确定编辑
const handelOk = () => {
  editMessage.value.content = editText.value;
  showEditModal.value = false;
};

const handelShowConfig = () => {
  showConfigModal.value = true;
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

  .chat-value {
    position: relative;
    .chat-config {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 16px;
      color: #fff;
      background-color: #111114;
      border-radius: 0 0 6px 6px;
      padding: 4px 16px;
      cursor: pointer;
      z-index: 999;
      &:hover {
        color: #1d90f5;
      }
    }
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
      .chat-handle {
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