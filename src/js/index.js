"use strict";

import "../css/style.css";
import "./element/console-disable"
import Alpine from "alpinejs";
import persist from '@alpinejs/persist'
Alpine.plugin(persist)
window.Alpine = Alpine;
Alpine.start();


const apiKey = 'YOUR_OPENAI_API_KEY';// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessage = document.getElementById('chat-message');

chatForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const userMessage = chatInput.value;
  appendMessage('user', userMessage);

  const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 150,
    }),
  });

  const responseData = await response.json();
  console.log(responseData)
  const botMessage = responseData.choices && responseData.choices.length > 0
    ? responseData.choices[0].text.trim()
    : 'Please connect with a valid API key...';

  appendMessage('bot', botMessage);
  chatInput.value = '';
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.className = sender === 'user' ? 'text-dark rounded-[6px] bg-gray-200 px-[15px] py-[10px] text-[11px] mb-[10px] w-[80%] ms-auto' : 'text-white rounded-[6px] bg-gray-900 px-[15px] py-[10px] text-[11px] mb-[10px] w-[80%] me-auto';
  messageElement.textContent = message;
  chatMessage.appendChild(messageElement);
}
