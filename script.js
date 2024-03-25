const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let Mistakes = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = [
        "The stars twinkled in the night sky, casting a magical glow over the sleepy town.",
        "She danced in the rain, her laughter echoing through the empty streets.",
        "The old house creaked in the wind, as if whispering secrets of the past.",
        "He held her hand tightly, never wanting to let go.",
        "The waves crashed against the shore, a rhythmic symphony of nature.",
        "In the quiet of the forest, she found solace among the towering trees.",
        "The city lights shimmered below, a sea of possibilities.",
        "With each step, he felt closer to his dreams.",
        "The smell of freshly baked bread filled the air, a comforting embrace.",
        "She gazed at the stars, wondering what mysteries lay beyond.",
        "The sun dipped below the horizon, painting the sky in hues of orange and pink.",
        "He smiled at her, his eyes sparkling with love.",
        "The sound of laughter filled the room, a melody of joy.",
        "She closed her eyes and let the music carry her away.",
        "The mountains loomed in the distance, majestic and untamed.",
        "He paused to catch his breath, the mountain peak within reach.",
        "The fire crackled and popped, warming their souls on a chilly night.",
        "She took a deep breath and leaped into the unknown.",
        "The pages of the book turned effortlessly, each word drawing her deeper into its world.",
        "He stood at the crossroads, uncertain which path to take.",
        "The first snowflake fell gently from the sky, heralding the arrival of winter."
    ];

    const randomIndex = Math.floor(Math.random()*paragraph.length);

    typingText.innerHTML = "";
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;

    }
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",()=>input.focus());
    typingText.addEventListener("click", ()=>input.focus());

}

function initTyping(){
    const char = typingText.querySelectorAll("span");
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0)
    {
        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar)
        {
            char[charIndex].classList.add("correct");
             
        }
        else
        {
            Mistakes++;
            char[charIndex].classList.add("inCorrect");
            
        }
        charIndex++;
        char[charIndex].classList.add("active");
        mistakes.innerText = Mistakes;
        cpm.innerText = charIndex - Mistakes;
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
    
}
function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - Mistakes)/5) / (maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
        console.log(wpmVal);
    }
    else{
        clearInterval(timer);
    }
}

input.addEventListener("input",initTyping);
btn.addEventListener("click", reset);
loadParagraph();


function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    Mistakes = 0;
    isTyping = false;
    wpm.innerText = "0";
    cpm.innerText = "0";
    Mistakes.innerText = "0";
    time.innerText = timeLeft;
    input.value = "";


}