import React, { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import './Chat.css';

const Chat = () => {
  const { user, token } = useContext(AuthContext);
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [withUserId, setWithUserId] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    if (!socket) return;
    socket.on('message', (msg) => {
      setMessages((m) => [...m, msg]);
    });
    socket.on('typing', (data) => {
      // show typing indicator (not implemented UI)
      console.log('typing', data);
    });

    return () => {
      socket.off('message');
      socket.off('typing');
    };
  }, [socket]);

  const sendMessage = async () => {
    if (!text && !fileRef.current?.files?.length) return;

    let attachments = [];
    if (fileRef.current?.files?.length) {
      const form = new FormData();
      form.append('file', fileRef.current.files[0]);
      const res = await fetch('http://localhost:5000/api/chat/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const json = await res.json();
      if (json.file) attachments.push(json.file);
    }

    const payload = { toUserId: withUserId || undefined, content: text, attachments };
    socket.emit('send-message', payload);
    setText('');
    if (fileRef.current) fileRef.current.value = null;
  };

  return (
    <div className="chat-page">
      <div className="chat-panel">
        <div className="chat-header">Chat</div>
        <div className="chat-controls">
          <input placeholder="User ID to chat with" value={withUserId} onChange={(e) => setWithUserId(e.target.value)} />
        </div>

        <div className="messages">
          {messages.map((m) => (
            <div key={m._id || Math.random()} className={`message ${m.sender === user?.id ? 'me' : ''}`}>
              <div className="meta">{m.sender}</div>
              <div className="content">{m.content}</div>
              {m.attachments?.map((a, i) => (
                <div key={i}><a href={a.url} target="_blank" rel="noreferrer">{a.filename}</a></div>
              ))}
            </div>
          ))}
        </div>

        <div className="composer">
          <input type="text" placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)} />
          <input ref={fileRef} type="file" />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
