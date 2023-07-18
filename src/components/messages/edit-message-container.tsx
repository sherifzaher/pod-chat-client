import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { EditMessageActionsContainer, EditMessageInputField } from '../../utils/styles';
import { AppDispatch } from '../../store';
import { editMessageThunk } from '../../store/slices/messages-slice';

type Props = {
  selectedMessageEdit: Message;
  onEditMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function EditMessageContainer({
  selectedMessageEdit,
  onEditMessageChange,
  setIsEditing,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting edit');
    const params: EditMessagePayload = {
      conversationId: Number(id!),
      messageId: selectedMessageEdit.id,
      content: selectedMessageEdit.content,
    };
    dispatch(editMessageThunk(params))
      .unwrap()
      .then(() => setIsEditing(false));
  };

  return (
    <div>
      <form style={{ width: '100%' }} onSubmit={onSubmit}>
        <EditMessageInputField value={selectedMessageEdit.content} onChange={onEditMessageChange} />
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
