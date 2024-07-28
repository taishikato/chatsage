(function () {
  const APP_URL = "https://supachat-app.vercel.app";

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(document.currentScript.src);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // Get the chatbotId from the script src
  const chatbotId = getUrlParameter("chatbotId");

  // Function to create and display the toggle button and iframe
  function createChatbotUI() {
    // Create the iframe element
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.bottom = "80px";
    iframe.style.right = "20px";
    iframe.style.width = "460px";
    iframe.style.height = "80dvh";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    iframe.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    iframe.style.zIndex = "9999";
    iframe.style.backgroundColor = "#ffffff";

    // Create a button to toggle the iframe
    const toggleButton = document.createElement("button");
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "20px";
    toggleButton.style.right = "20px";
    toggleButton.style.width = "50px";
    toggleButton.style.height = "50px";
    toggleButton.style.padding = "0";
    toggleButton.style.backgroundColor = "#3B82F6";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "50%";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.zIndex = "10000";
    toggleButton.style.display = "flex";
    toggleButton.style.justifyContent = "center";
    toggleButton.style.alignItems = "center";

    // Add hover effect
    toggleButton.addEventListener("mouseenter", () => {
      toggleButton.style.transform = "scale(1.1)";
      toggleButton.style.transitionProperty = "transform";
      toggleButton.style.transitionDuration = "150ms";
      toggleButton.style.transitionTimingFunction =
        "cubic-bezier(0.4, 0, 0.2, 1)";
    });

    toggleButton.addEventListener("mouseleave", () => {
      toggleButton.style.transform = "scale(1)"; // Return to original size
    });

    // Set the SVG as the button content
    toggleButton.innerHTML = `
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="white"/>
      <path d="M8.39007 10.7998C8.3165 10.8 8.24438 10.7788 8.18207 10.7386C8.11977 10.6984 8.06984 10.6408 8.03808 10.5725C8.00633 10.5043 7.99405 10.4281 8.00269 10.353C8.01132 10.2778 8.0405 10.2067 8.08685 10.148L11.9354 6.06902C11.9643 6.03475 12.0036 6.01158 12.047 6.00333C12.0903 5.99509 12.1351 6.00225 12.174 6.02364C12.2128 6.04503 12.2435 6.07938 12.2609 6.12105C12.2783 6.16273 12.2814 6.20925 12.2697 6.25298L11.5233 8.66035C11.5013 8.72094 11.4939 8.78612 11.5018 8.8503C11.5096 8.91448 11.5325 8.97574 11.5685 9.02882C11.6044 9.08191 11.6523 9.12523 11.7081 9.15508C11.7639 9.18493 11.8259 9.20042 11.8887 9.20021H14.6099C14.6835 9.19995 14.7556 9.22117 14.8179 9.2614C14.8802 9.30163 14.9302 9.35922 14.9619 9.42749C14.9937 9.49575 15.0059 9.57188 14.9973 9.64703C14.9887 9.72218 14.9595 9.79327 14.9132 9.85204L11.0646 13.931C11.0357 13.9653 10.9964 13.9884 10.953 13.9967C10.9097 14.0049 10.8649 13.9978 10.826 13.9764C10.7872 13.955 10.7565 13.9206 10.7391 13.8789C10.7217 13.8373 10.7186 13.7908 10.7303 13.747L11.4767 11.3397C11.4987 11.2791 11.5061 11.2139 11.4982 11.1497C11.4904 11.0855 11.4675 11.0243 11.4315 10.9712C11.3956 10.9181 11.3477 10.8748 11.2919 10.8449C11.2361 10.8151 11.1741 10.7996 11.1113 10.7998H8.39007Z" fill="#3B82F6"/>
  </svg>
  `;

    let iframeLoaded = false;

    // Function to toggle the iframe visibility
    function toggleIframe() {
      if (iframe.style.display === "none") {
        if (!iframeLoaded) {
          iframe.src = `${APP_URL}/chatbot-embedding/${chatbotId}`;
          iframeLoaded = true;
        }
        iframe.style.display = "block";
        toggleButton.innerHTML = `<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 9L9 1L1 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
          `;
      } else {
        iframe.style.display = "none";
        toggleButton.style.backgroundColor = "#3B82F6"; // Change back to original color
        toggleButton.innerHTML = `
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="white"/>
              <path d="M8.39007 10.7998C8.3165 10.8 8.24438 10.7788 8.18207 10.7386C8.11977 10.6984 8.06984 10.6408 8.03808 10.5725C8.00633 10.5043 7.99405 10.4281 8.00269 10.353C8.01132 10.2778 8.0405 10.2067 8.08685 10.148L11.9354 6.06902C11.9643 6.03475 12.0036 6.01158 12.047 6.00333C12.0903 5.99509 12.1351 6.00225 12.174 6.02364C12.2128 6.04503 12.2435 6.07938 12.2609 6.12105C12.2783 6.16273 12.2814 6.20925 12.2697 6.25298L11.5233 8.66035C11.5013 8.72094 11.4939 8.78612 11.5018 8.8503C11.5096 8.91448 11.5325 8.97574 11.5685 9.02882C11.6044 9.08191 11.6523 9.12523 11.7081 9.15508C11.7639 9.18493 11.8259 9.20042 11.8887 9.20021H14.6099C14.6835 9.19995 14.7556 9.22117 14.8179 9.2614C14.8802 9.30163 14.9302 9.35922 14.9619 9.42749C14.9937 9.49575 15.0059 9.57188 14.9973 9.64703C14.9887 9.72218 14.9595 9.79327 14.9132 9.85204L11.0646 13.931C11.0357 13.9653 10.9964 13.9884 10.953 13.9967C10.9097 14.0049 10.8649 13.9978 10.826 13.9764C10.7872 13.955 10.7565 13.9206 10.7391 13.8789C10.7217 13.8373 10.7186 13.7908 10.7303 13.747L11.4767 11.3397C11.4987 11.2791 11.5061 11.2139 11.4982 11.1497C11.4904 11.0855 11.4675 11.0243 11.4315 10.9712C11.3956 10.9181 11.3477 10.8748 11.2919 10.8449C11.2361 10.8151 11.1741 10.7996 11.1113 10.7998H8.39007Z" fill="#3B82F6"/>
          </svg>
          `;
      }
    }

    // Add click event listener to the button
    toggleButton.addEventListener("click", toggleIframe);

    // Initially hide the iframe
    iframe.style.display = "none";

    // Append the iframe and button to the body
    document.body.appendChild(iframe);
    document.body.appendChild(toggleButton);
  }

  // Make the API call to get chatbot status
  fetch(`${APP_URL}/api/get-chatbot-status/${chatbotId}`, {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.visibility === "public") {
        createChatbotUI();
      }
    })
    .catch((error) => console.error("Error fetching chatbot status:", error));
})();
