<template>
  <div class="message-container">
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
            <div class="count">{{ session.messages.length }}</div>
          </div>
          <i class="iconfont" @click.stop="handleDelSession(index)">&#xe630;</i>
        </div>
      </div>
    </div>

    <div class="chat-value">
      <div class="messages" ref="scroll">
        <div
          class="message"
          v-for="(message, index) in sessions[curSession].messages"
          :key="message.id"
          :class="{ self: message.role == 'user' }"
    
        >
          <div class="user-info">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span class="name">chatgpt</span>
          </div>
          <div class="content" v-loading="message.role == 'loading'" :element-loading-svg="textLoading">
            <md-editor
              v-model="sessions[curSession].messages[index].content"
              previewOnly
            />
          </div>
        </div>
        <div class="my-message"></div>
      </div>
      <div class="chat-input">
        <textarea
          class="input"
          name="message"
          v-model="text"
          placeholder="请输入消息"
        ></textarea
        ><el-button @click="handleSendMessage()">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import useWebSocket from "@/hooks/websocket";
import textLoading from "@/assets/svg/textLoading.svg"
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

// 接收消息
const ws = useWebSocket((e) => {
  const data = JSON.parse(e.data);
  for (let index in sessions) {
    if (sessions[index].id == data.session_id) {
      sessions[index].messages.pop();
      sessions[index].messages.push(data.message);
      smoothScrollToBottom();
    }
  }
  save();
});
const curSession = ref(0);
const text = ref("");
const scroll = ref(null);
const sessions = reactive([]);
// 加载
onMounted(() => {
  const savedSessions = JSON.parse(localStorage.getItem("sessions"));
  if (savedSessions) {
    Object.assign(sessions, savedSessions);
  } else {
    handleNewSession();
  }
});

// 切换会话
const handleChangeSession = (index) => {
  curSession.value = index;
  text.value = "";
  smoothScrollToBottom();
};
// 发送消息
const handleSendMessage = () => {
  sessions[curSession.value].messages.push({
    role: "user",
    content: text.value,
  });
  text.value = "";
  // 滚动到底部
  smoothScrollToBottom();
  ws.send(
    JSON.stringify({
      session_id: sessions[curSession.value].id,
      messages: sessions[curSession.value].messages,
    })
  );
  save();
  sessions[curSession.value].messages.push({
    role: "loading",
    content: "",
  });
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

// 随机id码
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
// 删除会话
const handleDelSession = (index) => {
  if (index === curSession.value) {
    if (sessions.length === 1) {
      sessions[index].messages = [];
      return;
    }
  } else if (index < curSession.value) {
    curSession.value--;
  }

  sessions.splice(index, 1);

  save();
};
// 保存至本地
const save = () => {
  localStorage.setItem("sessions", JSON.stringify(sessions));
};

const smoothScrollToBottom = () => {
  const distanceToBottom =
    scroll.value.scrollHeight -
    (scroll.value.scrollTop + scroll.value.clientHeight);
  const speed = Math.max(50, Math.floor(distanceToBottom / 20));

  if (distanceToBottom > 0) {
    scroll.value.scrollTop += speed;
    window.requestAnimationFrame(smoothScrollToBottom);
  }
};
</script>

<style lang="less" scoped>
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
      height: 80%;
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
    }
    .chat-input {
      display: flex;
      align-items: center;
      padding: 20px;
      .input {
        flex: 1;
        border: 3px solid #a881ef;
        border-radius: 10px;
        outline: none;
        margin: 0 10px;
      }
    }
  }
}
</style>