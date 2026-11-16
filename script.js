// NOVA AI 2.0

// SWITCH BETWEEN FEATURES
function showTab(id, button) {
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  button.classList.add("active");
}

// CHAT ASSISTANT
function sendMessage() {
  const input = document.getElementById("chatInput");
  const chat = document.getElementById("chatMessages");
  const question = input.value.trim();

  if (!question) return;

  addMessage(question, "user");

  const answer = getAnswer(question);
  addMessage(answer, "bot");

  input.value = "";
}

function addMessage(text, type) {
  const chat = document.getElementById("chatMessages");
  const message = document.createElement("div");

  message.className = "message " + type;
  message.textContent = text;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function getAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("hello") || q.includes("hi")) {
    return "Hello! I'm Nova AI. How can I help you today?";
  }

  if (q.includes("who are you")) {
    return "I'm Nova AI 2.0, your personal assistant with chat, pattern analysis and advice tools.";
  }

  if (q.includes("pattern")) {
    return "Open the Analyse tab, enter numbers separated by commas, and I'll look for patterns.";
  }

  if (q.includes("advice")) {
    return "Open the Advisor tab, describe your situation and enter your choices. I'll help compare them.";
  }

  if (q.includes("how are you")) {
    return "I'm ready to help! What would you like to explore?";
  }

  if (q.includes("thank")) {
    return "You're welcome! Let me know if you need anything else.";
  }

  return "That's an interesting question! My current chat version has limited built-in knowledge. Try asking about Nova AI, or use my Analyse and Advisor tools.";
}

// PATTERN ANALYSER
function analysePattern() {
  const input = document.getElementById("numbers").value;
  const result = document.getElementById("analysisResult");

  const values = input.split(",").map(item => item.trim());

  if (values.length < 2 || values.some(v => v === "")) {
    result.textContent = "Please enter at least two numbers separated by commas.";
    return;
  }

  const nums = values.map(Number);

  if (nums.some(n => !Number.isFinite(n))) {
    result.textContent = "Please enter valid numbers only.";
    return;
  }

  const sum = nums.reduce((a, b) => a + b, 0);
  const average = sum / nums.length;
  const min = Math.min(...nums);
  const max = Math.max(...nums);
