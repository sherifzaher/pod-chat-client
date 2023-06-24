import { ConversationChannelPageStyle } from '@/utils/styles';
import { useParams, useSearchParams } from 'react-router-dom';

function ConversationChannelPage() {
  const { id } = useParams<{ id: string }>();
  console.log({ channelId: id });
  return <ConversationChannelPageStyle>Channel Page</ConversationChannelPageStyle>;
}

export default ConversationChannelPage;
