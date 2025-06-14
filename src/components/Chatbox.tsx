import React, { useState } from "react";
import axios from "axios";

type Message = {
  from: "user" | "bot";
  text: string;
};

const Chatbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false); //  trạng thái đang trả lời

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true); // bắt đầu loading

    try {
      const res = await axios.post("http://localhost:5005/chat", { message: input });
      const data = res.data;
      setMessages([...newMessages, { from: "bot", text: data.reply }]);
    } catch (err: any) {
      console.error("Lỗi khi gửi tin nhắn:", err);
      const errorMsg = err.response?.data
        ? `Lỗi API: ${JSON.stringify(err.response.data)}`
        : `Lỗi: ${err.message}`;
      setMessages([...newMessages, { from: "bot", text: errorMsg }]);
    }

    setLoading(false); // kết thúc loading
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Nút mở chat */}
      <div
        onClick={() => setVisible(!visible)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#F7941D", // màu chủ đạo
          color: "white",
          borderRadius: "50%",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 24,
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        Chat 
      </div>

      {/* Khung chat */}
      {visible && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 300,
            height: 400,
            backgroundColor: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              padding: 10,
              backgroundColor: "#F7941D", // màu chủ đạo
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
             Chat với bot
          </div>

          <div
            style={{
              flex: 1,
              padding: 10,
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: 16,
                    backgroundColor: msg.from === "user" ? "#ffe6c6" : "#eee",
                    color: "#000",
                    maxWidth: "80%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: "left", fontStyle: "italic", color: "#888" }}>...</div>
            )}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              style={{
                flex: 1,
                border: "none",
                padding: 10,
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 15px",
                backgroundColor: "#F7941D", // màu chủ đạo
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
