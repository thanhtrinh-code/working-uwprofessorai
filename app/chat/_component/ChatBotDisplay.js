import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import ChatBotHeader from './ChatBotHeader';
import ChatMessage from './ChatMessage';
import FormMessageInput from './FormMessageInput';

const dummyMessages = [
  {
    role: 'assistant',
    content: 'Hello! How can I assist you today?'
  },
  {
    role: 'user',
    content: 'I need help with my project.'
  },
  {
    role: 'assistant',
    content: 'Sure, I can help with that. What specifically do you need assistance with?'
  },
  {
    role: 'user',
    content: 'I’m struggling with understanding the API integration.'
  },
  {
    role: 'assistant',
    content: 'Let’s break it down. Which part of the API integration is causing trouble?'
  },
  {
    role: 'user',
    content: 'I am having trouble with the authentication process.'
  },
  {
    role: 'assistant',
    content: 'For authentication, are you using OAuth, JWT, or something else?'
  },
  {
    role: 'user',
    content: 'I’m using OAuth but getting an error on the redirect URI.'
  }
];


export default function ChatBotDisplay({setOpenChat}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! Before I can assist you, if you have any question about any particular question about specific professor, please make sure that professor is in our database'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [prevConv, setPrevConv] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior:'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  function handleClose(){
    setOpenChat(false);
  }
  async function sendMessage(e){
    e.preventDefault();
    if(message.trim() === '')return;
    setMessages((messages) => [
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: ''}
    ]);
    setMessage('');
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([...messages, {role: "user", content: message}])
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = '';
      return reader.read().then(function processText({done, value}){
        if(done) return result;
        const text = decoder.decode(value || new Uint8Array(), {stream: true});
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {...lastMessage, content: lastMessage.content + text},
          ]
        })
        return reader.read().then(processText)
      })
    })
  } 

  return (
    <Box width='450px' height='550px' bgcolor='tomato' sx={{
        position: 'fixed',
        top: '85px',
        right: '20px',
        backgroundColor: 'white',
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Stack direction='column' width='100%' height='100%'
        border='1px solid black' spacing={0}>
          <ChatBotHeader handleClose={handleClose} isLoading={isLoading}/>
          <Stack direction='column' spacing={2} flexGrow={1} overflow='auto'
          maxHeight='100%'
          >
            {messages.length > 0 &&
              <ChatMessage messages={messages}/>
            }
            <div ref={messagesEndRef} />
          </Stack>
          <FormMessageInput message={message} setMessage={setMessage} sendMessage={sendMessage} isLoading={isLoading}/>
        </Stack>

      </Box>
  )
}
