// Get the necessary elements
const seekerBar = document.getElementById("seeker");
const currentTimeSpan = document.getElementById("currentTime");

// Max duration will be set dynamically based on your music
const maxDurationSpan = document.getElementById("maxDuration");
maxDurationSpan.textContent = "0:00";

// Helper function to convert seconds to MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Listen for changes in the seeker bar
seekerBar.addEventListener("input", () => {
  const value = parseInt(seekerBar.value);
  currentTimeSpan.textContent = formatTime(value);

  // Update the background of the music-seeker-bar element
  seekerBar.style.background = `linear-gradient(to right, black ${value}%, white ${value}%) no-repeat`;
});

// You can use this function to update the seeker bar's value programmatically
function setSeekerValue(value) {
  seekerBar.value = value;
  currentTimeSpan.textContent = formatTime(value);

  // Update the background of the music-seeker-bar element
  seekerBar.style.background = `linear-gradient(to right, black ${value}%, white ${value}%) no-repeat`;
}

// Example usage:
// setSeekerValue(30); // Update the seeker bar to 30 seconds (for example)
