type DisplayTypes = 'flex' | 'block' | 'grid' | 'hidden';
type JustifyContent =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'normal'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset';
type AlignItems =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'revert-layer'
  | 'unset';

type PageProps = Partial<{
  display: DisplayTypes;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
}>;

type InputContainerProps = Partial<{
  backgroundColor: string;
}>;

type MessageItemContentProps = Partial<{
  padding: string;
}>;

export type ContextMenuProps = Partial<{
  top: number;
  left: number;
}>;

export type MessageTypingStatusProps = {
  isRecipientTyping: boolean;
}

export type ConversationSelectedProps = {
  selected: boolean;
}
