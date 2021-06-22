import React, { useState } from "react";

import { ChatMessageList } from "../components/Chat";
import { AppBarSubHeader } from "../components/M-ui";
/* ===================================================================== */

export const ChatMessage = () => {
  const [roomName, setRoomName] = useState("");

  return (
    <section className="main">
      <AppBarSubHeader subtitle={roomName} view={true} />

      <ChatMessageList setRoomName={setRoomName} />
    </section>
  );
};
