import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditMessageActionsContainer, EditMessageInputField } from '../../utils/styles';

import {AppDispatch, RootState} from '../../store';
import { editMessageThunk } from '../../store/slices/messages-slice';
import {setIsEditingMessage} from "../../store/slices/message-container-slice";

type Props = {
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditMessageContainer({
  onEditMessageChange,
}: Props) {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { messageBeingEdited  } = useSelector((state: RootState) => state.messageContainer);
  const { id } = useParams();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting edit');
    if(!messageBeingEdited) {
      console.log('MessageIsBeingEdited is undefined... Returning');
      return;
    }

    const params: EditMessagePayload = {
      conversationId: Number(id!),
      messageId: messageBeingEdited?.id!,
      content: messageBeingEdited?.content!,
    };

    dispatch(editMessageThunk(params))
      .unwrap()
      .then(() => dispatch(setIsEditingMessage(false)))
      .catch((err) => {
        console.log(err);
        dispatch(setIsEditingMessage(false));
      })
  };

  return (
    <div>
      <form style={{ width: '100%' }} onSubmit={onSubmit}>
        <EditMessageInputField disabled={disabled} value={messageBeingEdited?.content} onChange={onEditMessageChange} />
      </form>
      <EditMessageActionsContainer>
        <div>
          escape to
          {' '}
          <span>cancel</span>
          {' '}
          - enter to
          {' '}
          <span>save</span>
        </div>
      </EditMessageActionsContainer>
    </div>
  );
}
