import { defineStore } from "pinia";

const useSessionsStore = defineStore('sessions', {
    state: () => ({
        sessions: [],
        currentSessionId: "pgtll1c0mblq5yianc",
    }),
    getters: {
        currentSession: (state) => {
            return state.sessions.find(
                (session) => session.id == state.currentSessionId
            );
        },
    },
    actions: {
        initSessions(obj) {
            this.sessions = obj._object.sessions
            this.currentSessionId = this.sessions.at(0).id
        },
        addSession(session) {
            this.sessions.push(session);
            this.currentSessionId = session.id;

        },
        deleteSession(id) {
            this.sessions = this.sessions.filter(
                (session) => session.id !== id
            );
        },
        setCurrentSession(id) {
            this.currentSessionId = id;
        },
        addMessageToSession(index, message) {
            this.sessions[index].messages.push(message);
        },
    },
});
export default useSessionsStore