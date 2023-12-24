function useWebSocket(handleMessage) {
    const ws = new WebSocket("ws://127.0.0.1:9956")

    const init = () => {
        bindEvent()
    }
    function bindEvent() {
        ws.addEventListener("open", handleOpen, false)
        ws.addEventListener("close", handleClose, false)
        ws.addEventListener("error", handleError, false)
        ws.addEventListener("message", handleMessage, false)
    }

    function handleOpen(e) {
        console.log("连接成功:", e)
    }
    function handleClose(e) {
        console.log("连接关闭:", e)
    }
    function handleError(e) {
        console.log("连接错误:", e)
    }

    init()
    return ws
}

export default useWebSocket
