"use client";

import React, { useState } from "react";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";

const page = () => {
  const { sendMessage } = useSocket();
  const [messages, setMessage] = useState("");
  return (
    <div>
      <div>
        <h2 className={classes.chat__header}>All messages</h2>
      </div>
      <div>
        <input
          className={classes.chat__input}
          type="text"
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => sendMessage(messages)}
          className={classes.chat__submit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default page;
