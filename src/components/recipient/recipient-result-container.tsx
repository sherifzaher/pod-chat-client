import { useCallback } from 'react';
import {
  RecipientBottomSection,
  RecipientResultContainerStyle,
  RecipientResultItem,
  RecipientScrollableItemContainer
} from '../../utils/styles';

type Props = {
  userResults: User[];
  handleSelectUser: (user: User) => void;
  type: ConversationSelectedType;
  handleMultipleUserSelect: (user: User) => void;
  removeAllSelectedUsers: () => void;
  saveResults: () => void;
};

export default function RecipientResultContainer({
  userResults,
  handleSelectUser,
  type,
  handleMultipleUserSelect,
  removeAllSelectedUsers,
  saveResults
}: Props) {
  const handleSelectSelection = useCallback(
    (user: User) => {
      if (type === 'private') {
        return handleSelectUser(user);
      }
      handleMultipleUserSelect(user);
    },
    [handleMultipleUserSelect, handleSelectUser, type]
  );

  return (
    <RecipientResultContainerStyle>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItem key={user.id} onClick={() => handleSelectSelection(user)}>
            <span>{user.email}</span>
          </RecipientResultItem>
        ))}
      </RecipientScrollableItemContainer>
      <RecipientBottomSection>
        <span onClick={removeAllSelectedUsers}>Cancel</span>
        {'  '}
        <span onClick={saveResults}>Save</span>
      </RecipientBottomSection>
    </RecipientResultContainerStyle>
  );
}
