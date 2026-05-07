import { useState } from "react"
import "./App.css"

function App() {
  // const [messages, setMessages] = useState([])
  const [chats, setChats] = useState([
    {id: 1, name: "Miqo", messages: [{ text: "Barev", sender: "other" },
                                      { text: "Vonc es?", sender: "me" }]},
    {id: 2, name: "Hakob", messages: []},
    {id: 3, name: "Meruzhan", messages: []},
    {id: 4, name: "Manvel", messages: []},
    {id: 5, name: "Vardan", messages: []},
    {id: 6, name: "Hamlet", messages: []},
    {id: 7, name: "Hayk", messages: []},
    {id: 8, name: "Boyov", messages: []},
    {id: 9, name: "Vahram", messages: []},
    {id: 10, name: "Suro", messages: []},
    {id: 11, name: "Yarman", messages: []},
    {id: 12, name: "Susanna", messages: []},
    {id: 13, name: "Silva", messages: []},
    {id: 14, name: "Nrane", messages: []},
    {id: 15, name: "Tigran", messages: []},
    {id: 16, name: "Ani", messages: []}
  ])
  const [activeChatId, setActiveChatId] = useState(null)
  const [text, setText] = useState("")
  const [searchChat, setSearchChat] = useState("")

  const activeChat = chats.find((val) => val.id === activeChatId)

  const filteredChats = chats.filter((val) => {
    return val.name.toLowerCase().includes(searchChat.toLowerCase())
  })

  function send(){
    if(text.trim() === ""){
      return
    }
    // setMessages([...messages, text])
    // setChats(
    //   chats.map((val) => {
    //     if(val.id === activeChatId){
    //       return {...val, messages: [...val.messages, text]}
    //     }
    //     return val
    //   })
    // )
    const currentChat = chats.find((val) => val.id === activeChatId)

    if(!currentChat){
      return
    }

    const updatedChat = {...currentChat, messages: [...currentChat.messages, { text: text, sender: "me" }]}
    const otherChats = chats.filter((val) => val.id !== activeChatId)

    setChats([updatedChat, ...otherChats])

    setText("")
  }
  
  return (
    <div className="main"
      style={{
          display: "flex",
          width: "100%",
          height: "100svh",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 18
        }}>


          <div className="left" style={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            backgroundColor: "white",
            overflowX: "auto"
          }}>

          <div className="leftHeader" style={{
              margin: 0,
              borderBottom: "1px solid #eee",
              textAlign: "left",
              padding: "20px 40px 60px 30px"
            }}>
            <h2>Chats</h2>

            <input placeholder="Search chats" 
              value={searchChat}
              onChange={(evt) => {
                setSearchChat(evt.target.value)
              }}
            style={{
              width: "100%",
              borderRadius: "8px",
              padding: "17px 12px",
              boxSizing: "border-box",
              outline: "none",
              border: "1px solid grey",
              fontSize: "17px",
              lineHeight: "17px",
              marginTop: "20px"
            }}/>
          </div>
          
          <div className="chatList" style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto"
              }}>
            {/* {messages[messages.length - 1]} */}
            {filteredChats.map((val) => {
              return <p className={activeChatId === val.id ? "chatItem active" : "chatItem"}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "black",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  textAlign: "left",
                  height: "60px",
                  alignItems: "center",
                  padding: "0 10px",
                  gap: "10px"
                }}
                key = {val.id}
                onClick={() => {setActiveChatId(val.id)}}
              >

                <div style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  backgroundColor: "orange",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: 0
                }}>
                  {val.name[0]}
                </div>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "10px",
                  minWidth: 0
                }}>

                <div style={{
                  marginLeft: "7px",
                }}>
                  <h4 style={{margin: 0}}>{val.name}</h4>
                </div>
                
                <div style={{
                  fontSize: "14px",
                  color: "#575757",
                  marginLeft: "7px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "100%"
                }}>
                  {val.messages[val.messages.length - 1]?.text}
                </div>

                </div>
              </p>
            })}
            </div>
          </div>

          <div className="right" style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            backgroundColor: "#BFFFBD",
          }}>

            {activeChat && <div style={{
              backgroundColor: "white",
              borderBottom: "1px solid #EBEBEB",
              borderLeft: "1px solid #EBEBEB",
              padding: "20px 40px"
            }}><h3 style={{margin: 0,
                           color: "black",
            }}>{activeChat ? activeChat.name : ""}</h3>
            </div>}

            <div className="forText" style={{
              flex: 1,
              minHeight: 0,
              // display: "flex",
              // justifyContent: "flex-end",
              // flexDirection: "column",
              overflowY: "auto",
              color: "black",
              textAlign: "left",
              padding: "20px",
            }}>

            {activeChat ? (
              <div style={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
              }}>
                {activeChat.messages.map((val, index) => {
                  return <p style={{
                    padding: "10px",
                    borderRadius: "5px",
                    margin: "10px",
                    maxWidth: "40%",
                    alignSelf: val.sender === "me" ? "end" : "start",
                    backgroundColor: val.sender === "me" ? "#DFF0FF" : "white",
                    overflowWrap: "break-word"
                  }}
                    key={index}>{val.text}</p>
                })}
              </div>
            ) : <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}>Select a chat to start messaging</div>}
            </div>

            <div className="writeMessages">
              <div style={{
                display: "flex",
                position: "relative"
              }}>
              

                <input placeholder="Type a message..." disabled = {!activeChat} style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "white",
                  paddingRight: "60px",
                  paddingLeft: "17px",
                  outline: "none",
                  border: "1px solid #F5F5F5",
                  fontSize: "18px",
                  lineHeight: "18px",
                }}
                  value={text}
                  onChange={(evt) => {
                    setText(evt.target.value)
                  }}
                  onKeyDown={(evt) => {
                    if(evt.key === "Enter"){
                      send()
                    }
                  }}
                />

                <button style={{
                  position: "absolute",
                  right: "5px",
                  bottom: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00DDFF",
                  color: "black",
                  fontSize: "100%"
                }}
                  disabled = {!activeChat}
                  onClick={() => {
                    send()
                  }}>➤</button>

              </div>

            </div>


          </div>


    </div>
    
  )
}

export default App