async function fetchVideoInfo() {
    const videoUrl = document.getElementById("videoUrl").value;
    const message = document.getElementById("message");
    const formatsContainer = document.getElementById("formatsContainer");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const videoDetails = document.getElementById("videoDetails");
    const thumbnail = document.getElementById("thumbnail");
    const titleDisplay = document.getElementById("videoTitle");
    const durationDisplay = document.getElementById("videoDuration");

    if (!videoUrl) {
        message.textContent = "Please enter a valid YouTube URL.";
        return;
    }

    message.textContent = "";
    loadingSpinner.style.display = "block";
    formatsContainer.innerHTML = "";

    try {
        const response = await fetch(`http://127.0.0.1:5000/getVideoInfo?url=${encodeURIComponent(videoUrl)}`);
        const data = await response.json();
        
        if (!data.success) {
            throw new Error("Failed to fetch video details");
        }

        // Show video details
        titleDisplay.textContent = data.title;
        durationDisplay.textContent = `Duration: ${data.duration}s`;
        thumbnail.src = data.thumbnail;
        videoDetails.style.display = "block";

        // Generate format buttons
        data.formats.forEach(format => {
            let formatItem = document.createElement("div");
            formatItem.className = "format-item";
            formatItem.innerHTML = `
                <span>${format.quality} - ${format.resolution}p (${format.format})</span>
                <a href="${format.url}" target="_blank" class="download-btn">Download</a>
            `;
            formatsContainer.appendChild(formatItem);
        });

        message.textContent = "";
    } catch (error) {
        message.textContent = "Error fetching video details. Try again.";
    } finally {
        loadingSpinner.style.display = "none";
    }
}
