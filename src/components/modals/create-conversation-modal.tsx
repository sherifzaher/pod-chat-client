import {createRef, Dispatch, SetStateAction, useCallback, useEffect} from "react";
import {ModalContentBodyStyle, OverlayStyle} from "@/utils/styles";
import CreateConversationForm from "@/components/forms/create-conversation-form";
import {ModalContainer, ModalContentBody, ModalHeader} from "@/components/modals/index";
import { MdClose } from 'react-icons/md'

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function CreateConversationModal({setShowModal}:Props){
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && setShowModal(false);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  } ,[]);

  const handleOverlayClick = useCallback((e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = ref;
    if ( current === e.target ) {
      setShowModal(false);
    }
  },[ref]);


  return (
      <OverlayStyle
        ref={ref}
        onClick={handleOverlayClick}
      >
        <ModalContainer>
          <ModalHeader>
            <h2>Create a New Conversation</h2>
            <MdClose size={32} onClick={() => setShowModal(false)} />
          </ModalHeader>
          <ModalContentBody>
            <CreateConversationForm />
          </ModalContentBody>
        </ModalContainer>
      </OverlayStyle>
  )
}
