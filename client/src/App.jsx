import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [socket, setSocket] = useState(null);
  const [latestMessages, setLatestMessages] = useState("");
  const [text, setText] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');
    socket.onopen = () => {
      console.log('connection created');
      setSocket(socket)
    };

    socket.onmessage = message => {
      console.log("message", message.data);
      setLatestMessages(message.data)
    }
  }, []);


  return (
    <>
      {
        !socket ? (
          <div>connecting to socket server...!</div>
        ) : (
          <div>
            <h1>Hello</h1>
            <input type="text"  onChange={(e) => setText(e.target.value)}/>
            <button onClick={() => socket.send(text)}>send</button>
            <h5>{latestMessages}</h5>
          </div>
        )
      }


    </>
  )
}

export default App
