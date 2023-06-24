import styled from 'styled-components';

export const SIDEBAR_WIDTH = 400;

export const InputField = styled.input`
  border-sizing: border-box;
  font-family: 'Inter';
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  background-color: inherit;
  margin: 4px 0;
  width: 100%;
`;

export const InputContainer = styled.div`
  background-color: #131313;
  color: white;
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #2b09ff;
  color: white;
  outline: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 25px;
  font-weight: 500;
  transition: 250ms background-color ease-in;
  transition: 300ms border-color ease-in;
  border: 2px solid #2b09ff;
  &:focus {
    background-color: #4f34ff;
    border-color: #fff;
  }
  &:hover {
    cursor: pointer;
    background-color: #3415ff;
  }
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  background-color: #1a1a1a;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const ConversationSidebarStyle = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${SIDEBAR_WIDTH}px;
  background-color: #1a1a1a;
  border-right: 1px solid #5454543d;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    //width: 10px;
    //height: 5px;
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    //background-color: #2d2d2d;
  }
`;

export const ConversationSidebarHeader = styled.header`
  position: fixed;
  top: 0;
  width: ${SIDEBAR_WIDTH}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  background-color: #151515;
  height: 100px;
  border-bottom: 1px solid #5454543d;
  & h1 {
    font-weight: 500;
  }
`;

export const ConversationChannelPageStyle = styled.div`
  height: 100%;
  margin-left: ${SIDEBAR_WIDTH}px;
`;

export const ConversationSidebarContainer = styled.div``;
export const ConversationSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 18px;
  border-bottom: 1px solid #5454543d;
  background-color: #131313;
`;
