import { useState } from "react"

function App() {
  // const [messages, setMessages] = useState([])
  const [chats, setChats] = useState([
    {id: 1, name: "Miqo", messages: []},
    {id: 2, name: "Hakob", messages: []},
    {id: 3, name: "Meruzhan", messages: []}
  ])
  const [activeChatId, setActiveChatId] = useState(1)
  const [text, setText] = useState("")

  const activeChat = chats.find((val) => val.id === activeChatId)

  function send(){
    if(text.trim() === ""){
      return
    }
    // setMessages([...messages, text])
    setChats(
      chats.map((val) => {
        if(val.id === activeChatId){
          return {...val, messages: [...val.messages, text]}
        }
        return val
      })
    )
    setText("")
  }
  
  if(activeChat === undefined){
    return null
  }

  return (
    <div className="main"
      style={{
          display: "flex",
          width: "100%",
          height: "100vh"
        }}>


          <div className="left" style={{
            width: "30%",
            backgroundColor: "white",
            overflowX: "auto"
          }}>
            {/* {messages[messages.length - 1]} */}
            {chats.map((val) => {
              return <p 
                style={{
                  cursor: "pointer",
                  backgroundColor: activeChatId === val.id ? "#E0E0E0" : "white",
                  color: "black"

                }}
                key = {val.id}
                onClick={() => {setActiveChatId(val.id)}}
              >
                {val.name} <br/>
                {val.messages[val.messages.length - 1]}
              </p>
            })}
          </div>


          <div className="right" style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            backgroundColor: "#BFFFBD"
          }}>
            <div className="forText" style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              overflowY: "auto",
              color: "black"
            }}>
              {activeChat.messages.map((val, index) => {
                return <p key = {index}>{val}</p>
              })}
            </div>

            <div className="writeMessages">
              <div style={{
                display: "flex"
              }}>

                <input style={{
                  width: "100%",
                  height: "25px"
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

                <button
                  onClick={() => {
                    send()
                  }}>sent</button>

              </div>

            </div>


          </div>


    </div>
    
  )
}

export default App