const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const textElement = document.getElementById('text');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
    if(!button.disabled) {
        textElement.innerText = '';
        textElement.style.padding = '';
        textElement.style.background = '';
    } else {
        textElement.style.background = 'black';
        textElement.style.padding = '10px 10px';
    }
};

// Putting text
function textJoke(joke) {
    textElement.innerText = joke;
};

// Passsing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '9b06d9a7e80f4778b0fdd09b855a0288',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
let joke = '';
async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
        textJoke(joke);
    } catch (error) {
        console.log('Whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);