import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100svh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: white;
  overflow-x: auto;
`;

export const LeftHeader = styled.div`
  margin: 0;
  border-bottom: 1px solid #eee;
  text-align: left;
  padding: 20px 40px 60px 30px;
`;

export const ChatList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const Icon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export const ChatInterface = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin-left: 10px;
  min-width: 0;
`;

export const ChatTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LastMessageStyle = styled.div`
  font-size: 14px;
  color: #575757;
  max-width: 100%;
  margin-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ChatItem = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  height: 60px;
  align-items: center;
  padding: 0px 10px;
  gap: 10px;
`;

export const LeftHelp = styled.h4`
  margin: 0;
`;

export const SearchChats = styled.input`
  width: 100%;
  border-radius: 8px;
  padding: 17px 12px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid grey;
  font-size: 17px;
  line-height: 17px;
  margin-top: 20px;
`;


export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: #BFFFBD;
`;

export const TitleDirection = styled.div`
  background-color: white;
  border-bottom: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  padding: 20px 40px;
`;

export const Title = styled.h3`
  margin: 0;
  color: black;
`;

export const ForText = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scroll-behavior: smooth;
  color: black;
  text-align: left;
  padding: 20px;
`;

export const MessageStyle = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
`;

export const SelectChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const InputDirection = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  border-top: 1px solid #EBEBEB;
  padding: 18px 24px;
`;

export const InputDirectionRule = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
`;

export const TypeMessage = styled.input`
  flex: 1;
  height: 58px;
  background-color: white;
  border-radius: 18px;
  padding: 0px 22px;
  outline: none;
  border: 1px solid #DADADA;
  font-size: 18px;
`;

export const Message = styled.p<{ sender: string }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  margin: 10px;
  max-width: 40%;
  overflow-wrap: break-word;

  align-self: ${(props) =>
    props.sender === "me" ? "end" : "start"};

  background-color: ${(props) =>
    props.sender === "me"
      ? "#DFF0FF"
      : "white"};
`;

export const SendButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: #2F80FF;
  color: white;
  font-size: 24px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const MessageTime = styled.small`
  font-size: 12px;
  color: #FFA805;
  align-self: flex-end;
  margin-top: 5px;
`

export const ChatTime = styled.small`
  font-size: 13px;
  color: #FFA805;
  align-self: flex-end;
`
