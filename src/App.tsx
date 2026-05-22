import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  Main,
  LeftPanel,
  LeftHeader,
  ChatList,
  Icon,
  ChatInterface,
  ChatTitle,
  LastMessageStyle,
  ChatItem,
  LeftHelp,
  SearchChats,
  RightPanel,
  TitleDirection,
  Title,
  ForText,
  MessageStyle,
  SelectChat,
  InputDirection,
  InputDirectionRule,
  TypeMessage,
  Message,
  SendButton,
  ChatTime,
  MessageTime
} from "./styled";


function App() {

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Miqo",
      messages: [
        { text: "Barev", sender: "other", time: "08:06 PM" },
        { text: "Vonc es?", sender: "me", time: "08:07 PM" },
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
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        },
      ],
    };

    const otherChats = chats.filter(
      (val) => val.id !== activeChatId
    );

    setChats([updatedChat, ...otherChats]);

    setText("");
  }

  function highlightName(name:string){
    if(searchChat.trim() === "") return name;

    return name.split("").map((letter,index) => {
      const isMatch = letter
      .toLowerCase()
      .includes(searchChat.toLowerCase())

      return (<span 
        key={index}
        style={{
          color: isMatch ? "#13DAEB" :"black"
        }}
        >{letter}</span>
      )
    })
  }

  function deleteMessage(messageIndex:number){

    const currentChat = chats.find((val) => val.id === activeChatId);
    if (!currentChat) {
      return;
    }

    const updatedMessage = currentChat.messages.filter((message, index) => {
      return index !== messageIndex
    })

    const updatedChat = {
      ...currentChat,
      messages: [
        ...updatedMessage
      ],
    };

    setChats(
      chats.map((val) => {
        if(val.id === activeChatId){
          return updatedChat
        }
        return val
      })
    )
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
                        {highlightName(val.name)}
                      </LeftHelp>

                      <ChatTime>
                        {
                          val.messages[
                          val.messages.length - 1
                          ]?.time
                        }
                      </ChatTime>
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
                    onContextMenu={(evt) => {
                      evt.preventDefault()
                      const answer = window.confirm("Do you want to delete message")
                      if(answer){
                        deleteMessage(index)
                      }
                    }}
                  >
                    {val.text}
                    <MessageTime>{val.time}</MessageTime>
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