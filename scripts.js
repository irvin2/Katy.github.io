
const imagenes = [ 
  "imagenes/a1.png",
  "imagenes/a2.png",
  "imagenes/a3.png",
  "imagenes/a4.png",
  "imagenes/a5.png",
  "imagenes/a6.png"
];

const frases = [
  "Te quiero mucho mi niña 😍🌸",
  "Mi hermosa Katty 🥰💜",
  "Soy muy feliz a tu lado ❤😊",
  "Te amo mi cachetoncita hermosa 😘💖",
  "Ya un mes a tu lado y ya eres mi persona favorita 💞🌷",
  "Gracias por hacerme tan feliz 🥳💕",
  "Recuerda siempre que eres mi primer pensamiento al despertar y el último al dormir 🌅🌙",
  "Contigo, cada día es mejor que el anterior 🌞💫",
  "Se que un mes no es mucho, pero contigo es todo un mundo 🌍💓",
  "Eres mi mejor aventura, hoy y siempre 🌟💑",
  "Siempre seras mi linda compañera de juegos 🎮💻",
  "💓TE AMO💓"
];

const fraseDiv = document.getElementById('frase');

let fraseIndex = 0;            
let escribiendo = false;       
let typingInterval = null;     
let autoTimer = null;          
let currentText = "";          

const AUTO_DELAY = 6000;       
const FADE_DURATION = 700;     

function startTyping(text) {
  
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  currentText = text;
  escribiendo = true;
  fraseDiv.classList.remove("fade-out");
  fraseDiv.classList.add("fade-in");
  fraseDiv.textContent = "";

  const chars = Array.from(text); 
  let i = 0;
  const speed = 50; 

  typingInterval = setInterval(() => {
    fraseDiv.textContent += chars[i];
    i++;
    if (i >= chars.length) {
      clearInterval(typingInterval);
      typingInterval = null;
      escribiendo = false;
      
    }
  }, speed);
}

function finishTypingNow() {
  if (!escribiendo) return;
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }
  fraseDiv.textContent = currentText;
  escribiendo = false;
}

function showNextPhrase(manual = false) {
  
  if (manual) resetAutoTimer();

  if (escribiendo) {
   
    finishTypingNow();
    
    setTimeout(() => {
      fraseIndex = (fraseIndex + 1) % frases.length;
      
      fraseDiv.classList.remove("fade-in");
      fraseDiv.classList.add("fade-out");
      setTimeout(() => {
        startTyping(frases[fraseIndex]);
      }, FADE_DURATION * 0.6);
    }, 150);

    return;
  }

  fraseDiv.classList.remove("fade-in");
  fraseDiv.classList.add("fade-out");

  setTimeout(() => {
    startTyping(frases[fraseIndex]);
    fraseIndex = (fraseIndex + 1) % frases.length;
  }, FADE_DURATION * 0.8);
}


function resetAutoTimer() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    showNextPhrase(false);
  }, AUTO_DELAY);
}


startTyping(frases[fraseIndex]);
fraseIndex = (fraseIndex + 1) % frases.length;
resetAutoTimer();


document.addEventListener('click', (e) => {
  
  showNextPhrase(true);
});
document.addEventListener('touchstart', (e) => showNextPhrase(true), {passive: true});



function crearFlor() {
  const img = document.createElement("img");
  img.src = imagenes[Math.floor(Math.random() * imagenes.length)];
  img.classList.add("flor");

  img.style.left = Math.random() * 100 + "vw";
  img.style.width = (30 + Math.random() * 40) + "px";
  img.style.animationDuration = (6 + Math.random() * 4) + "s";

  img.style.pointerEvents = "none";
  document.body.appendChild(img);

  setTimeout(() => img.remove(), 10000);
}
setInterval(crearFlor, 400);

function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.classList.add("corazon");
  corazon.innerHTML = "❤";

  corazon.style.left = Math.random() * 100 + "vw";
  corazon.style.fontSize = (15 + Math.random() * 25) + "px";
  corazon.style.animationDuration = (4 + Math.random() * 3) + "s";

  corazon.style.pointerEvents = "none";
  document.body.appendChild(corazon);

  setTimeout(() => corazon.remove(), 8000);
}

function crearCorazonClick(x, y) {
  const corazon = document.createElement("div");
  corazon.classList.add("corazon");
  corazon.innerHTML = "❤";

  corazon.style.left = x - 10 + "px"; 
  corazon.style.top = y - 10 + "px";
  corazon.style.position = "absolute";
  corazon.style.fontSize = (20 + Math.random() * 20) + "px";
  corazon.style.animationDuration = (2 + Math.random() * 2) + "s";

  document.body.appendChild(corazon);

  
  setTimeout(() => corazon.remove(), 3000);
}


document.addEventListener("click", (e) => {
  showNextPhrase(true);             
  crearCorazonClick(e.clientX, e.clientY); 
});

document.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  showNextPhrase(true);
  crearCorazonClick(touch.clientX, touch.clientY);
}, {passive: true});
setInterval(crearCorazon, 600);

