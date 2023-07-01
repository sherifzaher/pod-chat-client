import {MessagePanelBody, MessagePanelStyle} from "../../utils/styles";
import MessagePanelHeader from "./message-panel-header";
import MessageContainer from "./message-container";
import MessageInputField from "./message-input-field";

type Props = {
  messages: Message[];
};

export default function MessagePanel() {
  return (
    <MessagePanelStyle>
      <MessagePanelHeader />
      <MessagePanelBody>
        <MessageContainer />
        <MessageInputField />
      </MessagePanelBody>
    </MessagePanelStyle>
  );
}
