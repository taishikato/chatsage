console.log("Dynamic chat widget script loaded");

const triggerButtonElement = document.createElement("button");
triggerButtonElement.innerHTML =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
triggerButtonElement.style.position = "fixed";
triggerButtonElement.style.bottom = "20px";
triggerButtonElement.style.right = "20px";
triggerButtonElement.style.backgroundColor = "#000000";
triggerButtonElement.style.width = "50px";
triggerButtonElement.style.height = "50px";
triggerButtonElement.style.borderRadius = "9999px";
triggerButtonElement.style.color = "#ffffff";
triggerButtonElement.style.border = "none";
triggerButtonElement.style.cursor = "pointer";
triggerButtonElement.style.display = "flex";
triggerButtonElement.style.alignItems = "center";
triggerButtonElement.style.justifyContent = "center";
document.body.appendChild(triggerButtonElement);

let chatWidget = null;

function createChatWidget() {
  const widget = document.createElement("div");
  widget.className = "chat-widget";
  widget.style.position = "fixed";
  widget.style.bottom = "80px";
  widget.style.right = "20px";
  widget.style.width = "350px";
  widget.style.height = "500px";
  widget.style.backgroundColor = "#ffffff";
  widget.style.borderRadius = "8px";
  widget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  widget.style.overflow = "hidden";
  widget.style.display = "flex";
  widget.style.flexDirection = "column";
  widget.style.zIndex = "1000";
  widget.style.opacity = "0";
  widget.style.transition = "opacity 0.3s";

  widget.innerHTML = `
    <div style="flex: 0 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid #e0e0e0;">
      <div style="display: flex; align-items: center;">
        <span style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 8px;">
          <img src="https://placehold.jp/40/3d4070/ffffff/100x100.png?text=%3A)" alt="SupaChat AI" style="width: 100%; height: 100%;" />
        </span>
        <h2 style="font-size: 18px; font-weight: 600;">SupaChat AI</h2>
      </div>
      <div>
        <button class="widget-button" style="margin-right: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
            <path d="M8 16H3v5"></path>
          </svg>
        </button>
        <button class="widget-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
            <path d="M2 20h20"></path>
            <path d="M14 12v.01"></path>
          </svg>
        </button>
      </div>
    </div>
    <div style="flex: 1 1 auto; padding: 16px; overflow-y: auto;">
      <div style="display: flex; margin-bottom: 16px;">
        <span style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 8px;">
          <img src="https://placehold.jp/40/3d4070/ffffff/100x100.png?text=%3A)" alt="SupaChat AI" style="width: 100%; height: 100%;" />
        </span>
        <div style="background-color: #f0f0f0; padding: 12px; border-radius: 8px;">
          <p>👋Hi! I am SupaChat AI, ask me anything about SupaChat!</p>
        </div>
      </div>
      <div style="display: flex; margin-bottom: 16px;">
        <span style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 8px;">
          <img src="https://placehold.jp/40/3d4070/ffffff/100x100.png?text=%3A)" alt="SupaChat AI" style="width: 100%; height: 100%;" />
        </span>
        <div style="background-color: #f0f0f0; padding: 12px; border-radius: 8px;">
          <p>By the way, you can create a chatbot like me for your website! 😲</p>
        </div>
      </div>
    </div>
    <div style="flex: 0 0 auto; padding: 16px; border-top: 1px solid #e0e0e0;">
      <div style="display: flex; margin-bottom: 16px;">
        <button class="chat-button" style="flex: 1; margin-right: 8px;">What is SupaChat?</button>
        <button class="chat-button" style="flex: 1;">How do I add data to my chatbot?</button>
      </div>
      <div style="position: relative;">
        <input type="text" id="chat-input" placeholder="Message..." style="width: 100%; padding: 10px; padding-right: 40px; border: 1px solid #e0e0e0; border-radius: 4px;" />
        <button id="send-button" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Add styles for buttons
  const style = document.createElement("style");
  style.textContent = `
    .widget-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      border-radius: 4px;
    }
    .widget-button:hover {
      background-color: #f0f0f0;
    }
    .chat-button {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    .chat-button:hover {
      background-color: #f0f0f0;
    }
  `;
  document.head.appendChild(style);

  widget.querySelector("#send-button").addEventListener("click", sendMessage);

  return widget;
}

async function sendMessage() {
  const input = document.querySelector("#chat-input");
  const message = input.value.trim();

  if (message) {
    // Add user message to the chat
    addMessageToChat("user", message);

    // Clear input
    input.value = "";

    try {
      // Make API call
      const response = await fetch("https://api.example.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // Add bot response to the chat
      addMessageToChat("bot", data.reply);
    } catch (error) {
      console.error("Error:", error);
      addMessageToChat(
        "bot",
        "Sorry, I encountered an error. Please try again later."
      );
    }
  }
}

function addMessageToChat(sender, message) {
  const chatContainer = document.querySelector(
    ".chat-widget > div:nth-child(2)"
  );
  const messageElement = document.createElement("div");
  messageElement.style.display = "flex";
  messageElement.style.marginBottom = "16px";

  const avatarSpan = document.createElement("span");
  avatarSpan.style.width = "40px";
  avatarSpan.style.height = "40px";
  avatarSpan.style.borderRadius = "50%";
  avatarSpan.style.overflow = "hidden";
  avatarSpan.style.marginRight = "8px";

  const avatarImg = document.createElement("img");
  avatarImg.src = "/placeholder.svg?height=40&width=40";
  avatarImg.alt = sender === "user" ? "User" : "SupaChat AI";
  avatarImg.style.width = "100%";
  avatarImg.style.height = "100%";

  avatarSpan.appendChild(avatarImg);

  const messageDiv = document.createElement("div");
  messageDiv.style.backgroundColor = sender === "user" ? "#e6f3ff" : "#f0f0f0";
  messageDiv.style.padding = "12px";
  messageDiv.style.borderRadius = "8px";
  messageDiv.textContent = message;

  messageElement.appendChild(avatarSpan);
  messageElement.appendChild(messageDiv);

  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

triggerButtonElement.addEventListener("click", () => {
  if (chatWidget) {
    chatWidget.style.opacity = "0";
    setTimeout(() => {
      if (chatWidget) {
        // Ensure chatWidget is not null
        chatWidget.remove();
        chatWidget = null;
      }
    }, 300);
  } else {
    chatWidget = createChatWidget();
    document.body.appendChild(chatWidget);
    setTimeout(() => {
      chatWidget.style.opacity = "1";
    }, 0);
  }
});
