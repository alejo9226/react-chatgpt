import { FormEvent, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<{ role: string, content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = (e: FormEvent<HTMLFormElement>, message: string) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    const msgs: { role: string, content: string }[] = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch(import.meta.env.VITE_APP_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data: {output: { role: string, content: string }}) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <h1>FullStack Chat AI Tutorial</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e: FormEvent<HTMLFormElement>) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}
export default App;