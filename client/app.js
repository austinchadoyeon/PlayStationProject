const apiKey = "49yr7fhslyosgay4x5qp5vrowbnw5w";
const url = "https://api.twitch.tv/helix/streams";

const form = document.querySelector(".searchForm");
const resultList = document.querySelector(".streams");

form.addEventListener("submit", handleSubmit);

function handleSubmit (e) {
    e.preventDefault();
    const gameName = document.querySelector(".searchInput").value;
    fetchGameStreams(gameName);
}

function cropImage (imageUrl) {
    let specificationStart = imageUrl.indexOf('{width}');
    let result = imageUrl.slice(0, specificationStart);
    return result += '130x130.jpg';
}

async function fetchGameStreams(gameName = '') {
    const apiResponse = await fetch(url, {
        headers: {
          Authorization: "Bearer 49yr7fhslyosgay4x5qp5vrowbnw5w",
          "Client-Id": "iaar4kyqs5b5rlr6hlhks5u7acv78o"
        }
    });
    const streamData = apiResponse.json();
    streamData.then(data => {
        console.log(data.data);
        data.data.forEach(stream => {
            const streamTitle = stream.title;
            const streamViewers = stream.viewer_count;
            const streamGame = stream.game_name;
            const streamDescription = stream.type;
            const streamUser = stream.user_name;
            const streamGameAndViewers = `${streamGame} - ${streamViewers} viewers`;
            const streamImg = cropImage(stream.thumbnail_url);

            const imageContainer = document.createElement("ul", {class:"imageContainer"});
            const imageLink = document.createElement('li', {class:"image"});
            const thumbnail = document.createElement('img');
            thumbnail.src=streamImg;

            const containerDiv = document.createElement("div", {class: "streamContainer"});
            const streamDetails = document.createElement("ul", {class: "streamDetails"});
            const titleHeader = document.createElement("li", {class: "streamTitle"});
            const info = document.createElement("li", {class: "streamGameAndViewers"});
            const description = document.createElement("li", {class: "streamDescription"});
            const user = document.createElement("li", {class: "streamUser"});
            titleHeader.innerText = streamTitle;
            info.innerText = streamGameAndViewers;
            user.innerText = streamUser;
            description.innerText = streamDescription;

            streamDetails.appendChild(titleHeader);
            streamDetails.appendChild(info);
            streamDetails.appendChild(user)
            streamDetails.appendChild(description);

           
            imageContainer.appendChild(thumbnail);
            
            // containerDiv.appendChild(thumbnail);
            containerDiv.appendChild(imageContainer);
            containerDiv.appendChild(streamDetails);
            
            resultList.append(imageContainer);
            resultList.append(containerDiv)
        })
    })
}



document.addEventListener("DOMContentLoaded", function() {
    fetchGameStreams();
})