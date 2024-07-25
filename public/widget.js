console.log("Dynamic chat widget script loaded");

(function () {
  // Create the iframe element
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:3000/chatbot-iframe";
  iframe.style.position = "fixed";
  iframe.style.bottom = "80px";
  iframe.style.right = "20px";
  iframe.style.width = "460px";
  iframe.style.height = "80dvh";
  iframe.style.border = "none";
  iframe.style.borderRadius = "10px";
  iframe.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
  iframe.style.zIndex = "9999";

  // Create a button to toggle the iframe
  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Chat";
  toggleButton.style.position = "fixed";
  toggleButton.style.bottom = "20px";
  toggleButton.style.right = "20px";
  toggleButton.style.padding = "10px 20px";
  toggleButton.style.backgroundColor = "#007bff";
  toggleButton.style.color = "white";
  toggleButton.style.border = "none";
  toggleButton.style.borderRadius = "5px";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.zIndex = "10000";

  // Function to toggle the iframe visibility
  function toggleIframe() {
    if (iframe.style.display === "none") {
      iframe.style.display = "block";
      toggleButton.textContent = "Close";
    } else {
      iframe.style.display = "none";
      toggleButton.textContent = "Chat";
      toggleButton.style.bottom = "20px";
    }
  }

  // Add click event listener to the button
  toggleButton.addEventListener("click", toggleIframe);

  // Initially hide the iframe
  iframe.style.display = "none";

  // Append the iframe and button to the body
  document.body.appendChild(iframe);
  document.body.appendChild(toggleButton);
})();
