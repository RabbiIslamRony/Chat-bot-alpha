"use strict";

import "../css/style.css";
import Alpine from "alpinejs";
import persist from '@alpinejs/persist'
Alpine.plugin(persist)
window.Alpine = Alpine;
Alpine.start();

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const apiKey = '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';
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessage = document.getElementById('chat-message');

chatForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const userMessage = chatInput.value;
  appendMessage('user', userMessage);

  // Make a request to the OpenAI API with the 'davinci' model
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
  // Check if responseData.choices is defined and not empty
  const botMessage = responseData.choices && responseData.choices.length > 0
    ? responseData.choices[0].text.trim()
    : 'No response from the bot';

  appendMessage('bot', botMessage);
  chatInput.value = '';
});

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.className = sender === 'user' ? 'text-blue-500' : 'text-green-500';
  messageElement.textContent = message;
  chatMessage.appendChild(messageElement);
}



function content_ready_scripts() {

}

// Document Loaded
document.addEventListener("DOMContentLoaded", () => {
  content_ready_scripts();
});
