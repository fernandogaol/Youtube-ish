"use strict";

// put your own value below!
const apiKey = "AIzaSyCAGAGTVKXKxuOIfZKKcX4hsUf1xO-e71w";
const searchURL = "https://www.googleapis.com/youtube/v3/search";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayYoutubeResults(responseJson) {
  $("#results-list").empty();
  for (let i = 0; i < responseJson.items.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
        <iframe width="360px" height="315" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" 
      frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </li>`
    );
    // <a href="https://youtube.com/watch?v="><img src='${responseJson.items[i].snippet.thumbnails.default.url}'></a>
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function getYouTubeVideos(query, maxResults = 15) {
  const params = {
    key: apiKey,
    q: query,
    part: "snippet",
    maxResults,
    type: "video"
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayYoutubeResults(responseJson))
    .catch(err => {
      console.log(err);
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const searchTerm = $("#js-search-term").val();
    getYouTubeVideos(searchTerm);
  });
}

$(watchForm);
