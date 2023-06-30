import {MessagePanelBody, MessagePanelStyle} from "@/utils/styles";
import MessageContainer from "@/components/messages/message-container";
import MessageInputField from "@/components/messages/message-input-field";
import MessagePanelHeader from "@/components/messages/message-panel-header";

type Props = {
  messages: Message[];
}

export default function MessagePanel({messages}:Props){
    return (
        <MessagePanelStyle>
          <MessagePanelHeader />
          <MessagePanelBody>
            <MessageContainer messages={messages} />
            <MessageInputField />
          </MessagePanelBody>
        </MessagePanelStyle>
    )
}
