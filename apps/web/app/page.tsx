"use client";

import React, { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";

const page = () => {
  const { sendMessage, messages } = useSocket();
  console.log("messagesmessages", messages);
  const [message, setMessage] = useState("");
  return (
    <div className={classes.chat__container}>
      <div className={classes.chat__header}>
        <h2 className={classes.chat__heading}>Broadcast Channel</h2>
      </div>

      <section className={classes.chat__messages__container}>
        <div className={classes.chat__messages}>
          {messages.map((msg) => (
            <li className={classes.chat__message}>{msg}</li>
          ))}
        </div>
      </section>

      <div className={classes.chat__input__container}>
        <input
          className={classes.chat__input}
          type="text"
          placeholder="Message..."
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage(message) && setMessage("")
          }
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => {
            sendMessage(message);
            setMessage("");
          }}
          className={classes.chat__submit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default page;
