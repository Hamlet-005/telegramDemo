import { useEffect, useRef, useState } from "react";
import "./App.css";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100svh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: white;
  overflow-x: auto;
`;

const LeftHeader = styled.div`
  margin: 0;
  border-bottom: 1px solid #eee;
  text-align: left;
  padding: 20px 40px 60px 30px;
`;

const ChatList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const Icon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const ChatInterface = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  min-width: 0;
`;

const ChatTitle = styled.div`
  margin-left: 7px;
`;

const LastMessageStyle = styled.div`
  font-size: 14px;
  color: #575757;
  margin-left: 7px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const ChatItem = styled.p`
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

const LeftHelp = styled.h4`
  margin: 0;
`;

const SearchChats = styled.input`
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


const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: #BFFFBD;
`;

const TitleDirection = styled.div`
  background-color: white;
  border-bottom: 1px solid #EBEBEB;
  border-left: 1px solid #EBEBEB;
  padding: 20px 40px;
`;

const Title = styled.h3`
  margin: 0;
  color: black;
`;

const ForText = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scroll-behavior: smooth;
  color: black;
  text-align: left;
  padding: 20px;
`;

const MessageStyle = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
`;

const SelectChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const InputDirection = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  border-top: 1px solid #EBEBEB;
  padding: 18px 24px;
`;

const InputDirectionRule = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
`;

const TypeMessage = styled.input`
  flex: 1;
  height: 58px;
  background-color: white;
  border-radius: 18px;
  padding: 0px 22px;
  outline: none;
  border: 1px solid #DADADA;
  font-size: 18px;
`;

const Message = styled.p<{ sender: string }>`
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

const SendButton = styled.button`
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



function App() {

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Miqo",
      messages: [
        { text: "Barev", sender: "other" },
        { text: "Vonc es?", sender: "me" },
      ],
    },

    { id: 2, name: "Hakob", messages: [] },
    { id: 3, name: "Meruzhan", messages: [] },
    { id: 4, name: "Manvel", messages: [] },
    { id: 5, name: "Vardan", messages: [] },
    { id: 6, name: "Hamlet", messages: [] },
    { id: 7, name: "Hayk", messages: [] },
    { id: 8, name: "Boyov", messages: [] },
    { id: 9, name: "Vahram", messages: [] },
    { id: 10, name: "Suro", messages: [] },
    { id: 11, name: "Yarman", messages: [] },
    { id: 12, name: "Susanna", messages: [] },
    { id: 13, name: "Silva", messages: [] },
    { id: 14, name: "Nrane", messages: [] },
    { id: 15, name: "Tigran", messages: [] },
    { id: 16, name: "Ani", messages: [] },
    { id: 17, name: "Mama", messages: [] },
    { id: 18, name: "Papa", messages: [] },
  ]);

  const [activeChatId, setActiveChatId] = useState(null);
  const [text, setText] = useState("");
  const [searchChat, setSearchChat] = useState("");

  const activeChat = chats.find((val) => val.id === activeChatId);

  const filteredChats = chats.filter((val) => {
    return val.name.toLowerCase().includes(searchChat.toLowerCase());
  });

  const endScroll = useRef(null);

  useEffect(() => {
    endScroll.current?.scrollIntoView();
  }, [activeChat?.messages]);

  function send() {
    if (text.trim() === "") {
      return;
    }

    const currentChat = chats.find((val) => val.id === activeChatId);

    if (!currentChat) {
      return;
    }

    const updatedChat = {
      ...currentChat,
      messages: [
        ...currentChat.messages,
        {
          text: text,
          sender: "me",
        },
      ],
    };

    const otherChats = chats.filter(
      (val) => val.id !== activeChatId
    );

    setChats([updatedChat, ...otherChats]);

    setText("");
  }

  return (
    <Main>
      <LeftPanel>
        <LeftHeader>
          <h2>Chats</h2>

          <SearchChats
            placeholder="Search chats"
            value={searchChat}
            onChange={(evt) => {
              setSearchChat(evt.target.value);
            }}
          />

        </LeftHeader>
          <ChatList>
            {filteredChats.map((val) => {
              return (
                <ChatItem
                  className={activeChatId === val.id ? "chatItem active" : "chatItem"}
                  key={val.id}
                  onClick={() => {
                    setActiveChatId(val.id);
                  }}
                >
                  <Icon>
                    {val.name[0]}
                  </Icon>

                  <ChatInterface>
                    <ChatTitle>
                      <LeftHelp>
                        {val.name}
                      </LeftHelp>
                    </ChatTitle>

                    <LastMessageStyle>
                      {
                        val.messages[
                          val.messages.length - 1
                        ]?.text
                      }
                    </LastMessageStyle>
                  </ChatInterface>
                </ChatItem>
              );
            })}
          </ChatList>
      </LeftPanel>

      <RightPanel>
        {activeChat && (
          <TitleDirection>

            <Title>
              {activeChat ? activeChat.name : ""}
            </Title>

          </TitleDirection>
        )}

        <ForText>
          {activeChat ? (
            <MessageStyle>
              {activeChat.messages.map((val, index) => {
                return (

                  <Message
                    sender={val.sender}
                    key={index}
                  >
                    {val.text}
                  </Message>

                );
              })}

              <div ref={endScroll}></div>
            </MessageStyle>
          ) : (

            <SelectChat>
              Select a chat to start messaging
            </SelectChat>

          )}
        </ForText>

        <div className="writeMessages">
          <InputDirection>
            <InputDirectionRule>

              <TypeMessage
                placeholder="Type a message..."
                disabled={!activeChat}
                value={text}
                onChange={(evt) => {
                  setText(evt.target.value);
                }}
                onKeyDown={(evt) => {
                  if (evt.key === "Enter") {
                    send();
                  }
                }}
              />

              <SendButton 
                disabled={!activeChat}
                onClick={() => {
                  send();
                }}
              >
                ➤
              </SendButton>
            </InputDirectionRule>
          </InputDirection>
        </div>
      </RightPanel>
    </Main>
  );
}

export default App;