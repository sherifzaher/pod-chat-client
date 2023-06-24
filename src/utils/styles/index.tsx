import styled from 'styled-components';

export const InputField = styled.input`
  border-sizing: border-box;
  font-family: 'Inter';
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  background-color: inherit;
  margin: 4px 0;
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
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 10px;
  padding: 25px;
`;

export const Page = styled.div`
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
