import React, {useCallback, useState} from "react";
import { MessageInputContainer, MessageInput } from '@/utils/styles';
import {useParams} from "react-router-dom";
import {postNewMessage} from "@/utils/api";

type Props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function MessageInputField() {
  const [content,setContent] = useState('');
  const { id } = useParams();

  const handleSendMessage = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content) return;
    try {
      await postNewMessage({ conversationId: Number(id), content });
      setContent('');
    } catch (err) {
      console.log(err);
    }
  },[id, content]);
  return (
    <MessageInputContainer>
      <form onSubmit={handleSendMessage}>
        <MessageInput value={content} onChange={(e) => setContent(e.target.value)} />
      </form>
    </MessageInputContainer>
  );
}
