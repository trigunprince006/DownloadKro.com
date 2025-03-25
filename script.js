async function downloadVideo() {
  const videoUrl = document.getElementById("videoUrl").value;
  const message = document.getElementById("message");
  const resolutionSelect = document.getElementById("resolution");
  
  if (!videoUrl) {
      message.textContent = "Please enter a valid YouTube URL.";
      return;
  }
  
  message.textContent = "Processing your request...";
  
  try {
      const response = await fetch(`https://api.example.com/download?url=${encodeURIComponent(videoUrl)}`);
      
      if (!response.ok) {
          throw new Error("Failed to fetch video data");
      }
      
      const data = await response.json();
      
      if (data.success) {
          resolutionSelect.innerHTML = "";
          data.resolutions.forEach(res => {
              let option = document.createElement("option");
              option.value = res.url;
              option.textContent = res.quality;
              resolutionSelect.appendChild(option);
          });
          message.textContent = "Select a resolution and click download.";
      } else {
          message.textContent = "Error: " + data.message;
      }
  } catch (error) {
      message.textContent = "An error occurred while processing your request. Please try again.";
  }
}

function startDownload() {
  const resolutionSelect = document.getElementById("resolution");
  const selectedUrl = resolutionSelect.value;
  if (selectedUrl) {
      window.location.href = selectedUrl;
  }
}
