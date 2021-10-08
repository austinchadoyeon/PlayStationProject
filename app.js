const apiKey = "49yr7fhslyosgay4x5qp5vrowbnw5w";
let url = "https://api.twitch.tv/helix/streams";

const form = document.querySelector(".searchForm");
const resultList = document.querySelector(".streams");
const nextBtn = document.querySelector(".nextButton");
const prevBtn = document.querySelector(".prevButton");
let gameID = '';
let cursorPagination = '';

form.addEventListener("submit", handleSubmit);
nextBtn.addEventListener("click", getNext);
prevBtn.addEventListener("click", getPrevious);

function handleSubmit(e) {
    e.preventDefault();
    document.querySelectorAll(".streamContainer").forEach(e => e.remove());
    const gameName = document.querySelector(".searchInput").value;
    getGameID(gameName).then(result => {
        fetchGameStreams(result.data[0].id);
    })
}

function getNext(e) {
    e.preventDefault();
    document.querySelectorAll(".streamContainer").forEach(e => e.remove());
    fetchGameStreams('', cursorPagination);
}

function getPrevious(e) {
    e.preventDefault();
    document.querySelectorAll(".streamContainer").forEach(e => e.remove());
    fetchGameStreams('', '', cursorPagination);
}

function cropImage(imageUrl) {
    let specificationStart = imageUrl.indexOf("{width}");
    let result = imageUrl.slice(0, specificationStart);
    return (result += "130x130.jpg");
}

function createUI(element, attributes) {
    const resultElement = document.createElement(element);
    for (let property in attributes) {
        if (attributes.hasOwnProperty(property))
            resultElement.setAttribute(property, attributes[property]);
    }
    return resultElement;
}


async function getGameID(gameName) {
    const apiResponse = await fetch(
        `https://api.twitch.tv/helix/games?name=${gameName}`,
        {
            headers: {
                Authorization: "Bearer 49yr7fhslyosgay4x5qp5vrowbnw5w",
                "Client-Id": "iaar4kyqs5b5rlr6hlhks5u7acv78o",
            },
        }
    );
    const gameData = apiResponse.json();
    return gameData;
}

async function fetchGameStreams(id = "", next="", prev="") {
    if (id !== "") url = `https://api.twitch.tv/helix/streams?game_id=${id}`;
    if (next !== "") url = `https://api.twitch.tv/helix/streams?first=20&after=${next}`
    if (prev !== "") url = `https://api.twitch.tv/helix/streams?first=20&before=${prev}`
    const apiResponse = await fetch(url, {
        headers: {
            Authorization: "Bearer 49yr7fhslyosgay4x5qp5vrowbnw5w",
            "Client-Id": "iaar4kyqs5b5rlr6hlhks5u7acv78o",
        },
    });
    const streamData = apiResponse.json();
    streamData.then((data) => {
        
        cursorPagination = data.pagination.cursor;
        data.data.forEach((stream) => {
            const streamTitle = stream.title;
            const streamViewers = stream.viewer_count;
            const streamGame = stream.game_name;
            const streamDescription = stream.type;
            const streamUser = stream.user_name;
            const streamGameAndViewers = `${streamGame} - ${streamViewers} viewers`;
            const streamImg = cropImage(stream.thumbnail_url);

            const imageContainer = createUI("ul", { class: "imageContainer" });
            const thumbnail = createUI("img");
            
            thumbnail.src = streamImg;

            const containerDiv = createUI("div", { class: "streamContainer" });
            const streamDetails = createUI("ul", { class: "streamDetails" });
            const titleHeader = createUI("li", { class: "streamTitle" });
            const info = createUI("li", { class: "streamGameAndViewers" });
            const description = createUI("li", { class: "streamDescription" });
            const user = createUI("li", { class: "streamUser" });
            const streamUrl = `https://www.twitch.tv/${streamUser}`
            const linkStream = createUI("a", {class: "link", href: streamUrl, rel: streamUrl+ '/embed', target: "_blank"})
            
            titleHeader.innerText = streamTitle;
            info.innerText = streamGameAndViewers;
            user.innerText = streamUser;
            description.innerText = streamDescription;

            streamDetails.appendChild(titleHeader);
            streamDetails.appendChild(info);
            streamDetails.appendChild(user);
            streamDetails.appendChild(description);

            linkStream.appendChild(containerDiv);
            imageContainer.appendChild(thumbnail);
            containerDiv.appendChild(imageContainer);
            containerDiv.appendChild(streamDetails);
            
            resultList.appendChild(linkStream)
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    fetchGameStreams(gameID);
});
