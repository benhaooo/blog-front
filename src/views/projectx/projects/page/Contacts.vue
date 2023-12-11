<template>
  <div class="message-container">
    <div class="chat-key-list">
      <div class="list-header">Chat Sessions</div>
      <div
        class="chat-key"
        v-for="(session, index) in sessions"
        :key="session.id"
        @click="handleChangeSession(index)"
        :class="{ active: currentSession === index }"
      >
        <div class="info">
          <span class="name">{{ session.name }}</span>
        </div>
      </div>
    </div>
    <div class="chat-value-list">
      <div v-if="currentSession !== null" class="chat-value">
        <div class="messages">
          <div
            v-for="message in sessions[currentSession].messages"
            :key="message.id"
            class="message"
            :class="{ self: message.senderId === 2 }"
          >
            <div class="content">{{ message.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sessions = ref([
  {
    id: 1,
    name: "Alice",
    messages: [
      { id: 1, senderId: 1, content: "Hello!" },
      { id: 2, senderId: 2, content: "Hi there!" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    messages: [
      { id: 1, senderId: 2, content: "Hey!" },
      { id: 2, senderId: 1, content: "What's up?" },
    ],
  },
]);

const currentSession = ref(0);

const handleChangeSession = (index) => {
  currentSession.value = index;
};
</script>

<style lang="less" scoped>
/* Chat interface styles */
.message-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 400px;
  border: 1px solid #ccc;
}

.chat-key-list {
  flex: 1;
  border-right: 1px solid #ccc;
  padding-right: 20px;
  overflow-y: auto;
}

.chat-key {
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.chat-key.active {
  background-color: #f0f0f0;
}

.chat-value-list {
  flex: 2;
  padding-left: 20px;
  overflow-y: auto;
}

.chat-value {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.messages {
  display: flex;
  flex-direction: column;
}

.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.message.self {
  align-self: flex-end;
  background-color: #d4e7fe;
}
</style>
