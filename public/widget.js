console.log("Dynamic script loaded");

const triggerButtonElement = document.createElement("button");
triggerButtonElement.innerText = "click";
triggerButtonElement.style.position = "fixed";
triggerButtonElement.style.bottom = "10px";
triggerButtonElement.style.right = "10px";
triggerButtonElement.style.backgroundColor = "#000000";
triggerButtonElement.style.width = "50px";
triggerButtonElement.style.height = "50px";
triggerButtonElement.style.borderRadius = "9999px";
triggerButtonElement.style.color = "#ffffff";

document.body.append(triggerButtonElement);

let chatWidget = null;

// Add event listener to show/hide chat widget with fade animation
triggerButtonElement.addEventListener("click", () => {
  if (chatWidget) {
    chatWidget.style.opacity = "0";
    setTimeout(() => {
      chatWidget.remove();
      chatWidget = null;
    }, 300); // Match the duration of the CSS transition
  } else {
    chatWidget = document.createElement("div");
    chatWidget.innerText = "Chat Widget";
    chatWidget.style.position = "fixed";
    chatWidget.style.bottom = "70px";
    chatWidget.style.right = "10px";
    chatWidget.style.width = "300px";
    chatWidget.style.height = "400px";
    chatWidget.style.backgroundColor = "#ffffff";
    chatWidget.style.border = "1px solid #000000";
    chatWidget.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    chatWidget.style.padding = "10px";
    chatWidget.style.zIndex = "1000";
    chatWidget.style.opacity = "0";
    chatWidget.style.transition = "opacity 0.3s";

    document.body.append(chatWidget);
    setTimeout(() => {
      chatWidget.style.opacity = "1";
    }, 0); // Trigger the transition
  }
});
