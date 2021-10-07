const apiKey = "49yr7fhslyosgay4x5qp5vrowbnw5w";
const url = "https://api.twitch.tv/helix/streams";

const form = document.querySelector(".searchForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit (e) {
    e.preventDefault();
    const gameName = document.querySelector(".searchInput").value;
    fetchGameStreams(gameName);
}

async function fetchGameStreams(gameName = '') {
    const apiResponse = await fetch(url, {
        headers: {
          Authorization: "Bearer 49yr7fhslyosgay4x5qp5vrowbnw5w",
          "Client-Id": "iaar4kyqs5b5rlr6hlhks5u7acv78o"
        }
    });
    const streamData = apiResponse.json();
    console.log(streamData);
    streamData.then(data => {
        console.log(data.data[0].title);
        document.querySelector(".displayName").textContent = data.data[0].title
    })
}


document.addEventListener("DOMContentLoaded", function() {
    fetchGameStreams();
})