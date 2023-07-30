// Music Player
const musicPlayer = {
  seekerBar: document.getElementById("seeker"),
  currentTimeSpan: document.getElementById("currentTime"),
  maxDurationSpan: document.getElementById("maxDuration"),

  formatTime: (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  },

  setSeekerValue: (value) => {
    this.seekerBar.value = value;
    this.currentTimeSpan.textContent = this.formatTime(value);
  },

  init: function () {
    this.maxDurationSpan.textContent = "0:00";

    this.seekerBar.addEventListener("input", () => {
      const value = parseInt(this.seekerBar.value);
      this.currentTimeSpan.textContent = this.formatTime(value);
      this.seekerBar.style.background = `linear-gradient(to right, black ${value}%, white ${value}%) no-repeat`;
    });
  },
};

musicPlayer.init();

// Tab Content
const tabContent = {
  lyrics: `<p>Lyrics</p>`,
  otherAlbums: `<p>Other Albums Content Goes Here</p>`,
  relatedArtists: `<p>Related Artists Content Goes Here</p>`,
};

// Show Respective Tab Content in explore-tab-content Element on DOM
function showTabContent(tab) {
  const exploreTabContent = document.getElementById("explore-tab-content");
  exploreTabContent.innerHTML = tabContent[tab];
}

const API_KEY = "4a864cdc0bmshd2d52f52a4a4b22p171c4ejsnb2bad9112e47";
const searchQuery = "Ariana Grande";

const geniusOptions = {
  method: "GET",
  url: "https://genius-song-lyrics1.p.rapidapi.com/search/",
  params: {
    q: searchQuery,
    per_page: "10",
    page: "1",
  },
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
  },
};

const spotifyOptions = {
  method: "GET",
  url: "https://spotify23.p.rapidapi.com/search/",
  params: {
    q: searchQuery,
    type: "multi",
    offset: "0",
    limit: "10",
    numberOfTopResults: "5",
  },
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const fetchData = async () => {
  try {
    // Fetch data from Genius API
    const geniusResponse = await axios.request(geniusOptions);
    console.log("Genius API response:", geniusResponse.data);

    // Get the ID of the first song in the search results
    const songId = geniusResponse.data.hits[0].result.id;

    // Fetch the lyrics of the song using its ID
    const lyricsResponse = await axios.get(
      `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}`,
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
        },
      }
    );
    console.log("Genius Lyrics API response:", lyricsResponse.data);

    // Fetch data from Spotify API
    const spotifyResponse = await axios.request(spotifyOptions);
    console.log("Spotify API response:", spotifyResponse.data);

    // Update the DOM with the fetched data
    const titleElement = document.getElementById("title");
    titleElement.textContent = geniusResponse.data.hits[0].result.title;

    const artistElement = document.getElementById("artist");
    artistElement.textContent =
      geniusResponse.data.hits[0].result.primary_artist.name;

    tabContent.lyrics = lyricsResponse.data.lyrics.lyrics.body.html;

    const imageElement = document.getElementById("image");
    imageElement.style.backgroundImage = `url(${spotifyResponse.data.albums.items[0].coverArt.sources[0].url})`;

    tabContent.otherAlbums = spotifyResponse.data.albums.items
      .map(
        (album) =>
          `<div><img src="${album.coverArt.sources[0].url}" alt="${album.name}"><p>${album.name}</p></div>`
      )
      .join("");

    tabContent.relatedArtists = spotifyResponse.data.artists.items
      .map(
        (artist) =>
          `<div><img src="${artist.images[0].url}" alt="${artist.name}"><p>${artist.name}</p></div>`
      )
      .join("");
  } catch (error) {
    console.error(error);
  }
};
fetchData();
