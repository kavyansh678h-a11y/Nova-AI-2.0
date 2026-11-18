
// =================================
// NOVA AI 2.0 - COMPLETE JAVASCRIPT
// =================================

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

// CHAT ASSISTANT - NOVA AI 3.0

let conversationHistory = [];

async function sendMessage() {
  const input = document.getElementById("chatInput");
  const question = input.value.trim();

  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  // Keep the conversation within backend limits
  while (conversationHistory.length >= 10) {
    conversationHistory.shift();
  }

  conversationHistory.push({
    role: "user",
    content: question
  });

  const chat = document.getElementById("chatMessages");
  const loading = document.createElement("div");

  loading.className = "message bot";
  loading.textContent = "Nova is thinking...";
  chat.appendChild(loading);
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: conversationHistory
      })
    });

    const raw = await response.text();

let data = {};

try {
  data = raw ? JSON.parse(raw) : {};
} catch {
  throw new Error(
    `Invalid server response (HTTP ${response.status}): ${raw.slice(0, 200) || "Empty response"}`
  );
}

if (!response.ok) {
  throw new Error(data.error || `HTTP ${response.status}`);
}

    if (typeof data.reply !== "string" || !data.reply.trim()) {
      throw new Error("Empty AI response");
    }

    loading.textContent = data.reply;

    conversationHistory.push({
      role: "assistant",
      content: data.reply
    });

    while (conversationHistory.length > 10) {
      conversationHistory.shift();
    }

  } catch (error) {
  loading.textContent = "Debug Error: " + error.message;

  console.error("Nova AI error:", error);
}

  chat.scrollTop = chat.scrollHeight;
}

function addMessage(text, type) {
  const chat = document.getElementById("chatMessages");
  const message = document.createElement("div");

  message.className = "message " + type;
  message.textContent = text;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
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

  const differences = [];

  for (let i = 1; i < nums.length; i++) {
    differences.push(nums[i] - nums[i - 1]);
  }

  let pattern = "No simple arithmetic pattern detected.";
  let next = "Cannot predict confidently.";

  if (differences.every(d => d === differences[0])) {
    pattern = "Arithmetic pattern detected.";
    next = nums[nums.length - 1] + differences[0];
  } else if (nums.every((n, i) => i === 0 || n > nums[i - 1])) {
    pattern = "Increasing sequence detected.";
  } else if (nums.every((n, i) => i === 0 || n < nums[i - 1])) {
    pattern = "Decreasing sequence detected.";
  }

  result.innerHTML =
    "<h3>Analysis Result</h3>" +
    "<p><b>Pattern:</b> " + pattern + "</p>" +
    "<p><b>Next number:</b> " + next + "</p>" +
    "<p><b>Sum:</b> " + sum + "</p>" +
    "<p><b>Average:</b> " + average.toFixed(2) + "</p>" +
    "<p><b>Minimum:</b> " + min + "</p>" +
    "<p><b>Maximum:</b> " + max + "</p>";
}

// SMART ADVISOR
function giveAdvice() {
  const situation = document.getElementById("situation").value.trim();
  const choicesInput = document.getElementById("choices").value.trim();
  const result = document.getElementById("adviceResult");

  if (!situation || !choicesInput) {
    result.textContent = "Please enter your situation and choices.";
    return;
  }

  const choices = choicesInput
    .split(",")
    .map(choice => choice.trim())
    .filter(choice => choice.length > 0);

  if (choices.length < 2) {
    result.textContent = "Please enter at least two choices.";
    return;
  }

  let advice = "<h3>Nova's Advice 💡</h3>";

  advice += "<p><b>Your situation:</b> " +
    escapeHTML(situation) + "</p>";

  advice += "<p><b>Your available choices:</b></p><ul>";

  choices.forEach(choice => {
    advice += "<li>" + escapeHTML(choice) + "</li>";
  });

  advice += "</ul>";

  advice += "<p>Compare these choices based on:</p>";
  advice += "<ul>";
  advice += "<li>Your main goal</li>";
  advice += "<li>Advantages and disadvantages</li>";
  advice += "<li>Time and effort required</li>";
  advice += "<li>Long-term benefits</li>";
  advice += "</ul>";

  advice += "<p><b>Nova recommends:</b> Choose the option that best matches your goals and priorities after comparing these factors.</p>";

  result.innerHTML = advice;
}

// SAFE TEXT DISPLAY
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, function(char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char];
  });
}

