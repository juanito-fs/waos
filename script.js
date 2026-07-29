/*==========================================================
    PORTAFOLIO PROFESIONAL
    Autor: Juan Diego Sánchez
    Archivo: script.js
==========================================================*/

"use strict";

/*==========================================================
    SELECTORES
==========================================================*/

const loader = document.getElementById("loader");

const header = document.querySelector("header");

const menuBtn = document.querySelector(".menu-btn");

const navLinks = document.querySelector(".nav-links");

const scrollTop = document.querySelector(".scroll-top");

const year = document.getElementById("year");

const counters = document.querySelectorAll(".counter");

const progressBars = document.querySelectorAll(".progress span");

/*==========================================================
    LOADER
==========================================================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1200);

});

/*==========================================================
    AÑO AUTOMÁTICO
==========================================================*/

if (year) {

    year.textContent = new Date().getFullYear();

}

/*==========================================================
    HEADER AL HACER SCROLL
==========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("active");

    } else {

        header.classList.remove("active");

    }

});

/*==========================================================
    BOTÓN MENÚ
==========================================================*/

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.classList.toggle("active");

    });

}

/*==========================================================
    CERRAR MENÚ AL HACER CLICK
==========================================================*/

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.classList.remove("active");

    });

});

/*==========================================================
    BOTÓN VOLVER ARRIBA
==========================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.classList.add("active");

    } else {

        scrollTop.classList.remove("active");

    }

});

scrollTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*==========================================================
    SCROLL SUAVE
==========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {

            destino.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*==========================================================
    CONTADORES
==========================================================*/

function iniciarContadores() {

    counters.forEach(counter => {

        const objetivo = +counter.dataset.target;

        const velocidad = objetivo / 80;

        function actualizar() {

            let actual = +counter.innerText;

            if (actual < objetivo) {

                counter.innerText = Math.ceil(actual + velocidad);

                requestAnimationFrame(actualizar);

            } else {

                counter.innerText = objetivo;

            }

        }

        actualizar();

    });

}

/*==========================================================
    BARRAS DE HABILIDAD
==========================================================*/

function animarSkills() {

    progressBars.forEach(bar => {

        const width = bar.dataset.width;

        bar.style.width = width;

    });

}

/*==========================================================
    OBSERVER
==========================================================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            if (entry.target.classList.contains("stats")) {

                iniciarContadores();

            }

            if (entry.target.classList.contains("skills")) {

                animarSkills();

            }

        }

    });

}, {

    threshold: .4

});

const stats = document.querySelector(".stats");

const skills = document.querySelector(".skills");

if (stats) observer.observe(stats);

if (skills) observer.observe(skills);

/*==========================================================
    REVELAR ELEMENTOS
==========================================================*/

const revealElements = document.querySelectorAll(

"section, .service-card, .project-card, .education-card, .skill-card"

);

const reveal = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("fade-up");

        }

    });

},{

    threshold:.15

});

revealElements.forEach(el=>{

    reveal.observe(el);

});

/*==========================================================
            TYPING EFFECT
==========================================================*/

const typingElement = document.querySelector(".typing");

const typingTexts = [

    "Tecnólogo en Producción Multimedia",
    "Diseñador Gráfico",
    "Frontend Developer",
    "Editor de Video",
    "Brand Designer"

];

let typingIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect(){

    if(!typingElement) return;

    const current = typingTexts[typingIndex];

    if(!deleting){

        typingElement.textContent =
        current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typingEffect,1800);

            return;

        }

    }else{

        typingElement.textContent =
        current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            typingIndex++;

            if(typingIndex >= typingTexts.length){

                typingIndex = 0;

            }

        }

    }

    setTimeout(

        typingEffect,

        deleting ? 45 : 110

    );

}

typingEffect();

/*==========================================================
            EFECTO PARALLAX HERO
==========================================================*/

const hero = document.querySelector(".hero");

window.addEventListener("mousemove",(e)=>{

    if(!hero) return;

    const x = (window.innerWidth / 2 - e.clientX)/35;

    const y = (window.innerHeight / 2 - e.clientY)/35;

    hero.style.backgroundPosition =
    `${x}px ${y}px`;

});

/*==========================================================
            EFECTO IMAGEN HERO
==========================================================*/

const heroImage = document.querySelector(".image-border");

window.addEventListener("mousemove",(e)=>{

    if(!heroImage) return;

    const rotateY = (window.innerWidth/2-e.clientX)/40;

    const rotateX = (window.innerHeight/2-e.clientY)/40;

    heroImage.style.transform =

    `perspective(1200px)

    rotateY(${-rotateY}deg)

    rotateX(${rotateX}deg)

    translateY(-5px)`;

});

/*==========================================================
            PORTAFOLIO FILTER
==========================================================*/

const filterButtons =
document.querySelectorAll(".portfolio-filter button");

const projects =
document.querySelectorAll(".project-card");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>{

btn.classList.remove("active");

});

button.classList.add("active");

/* Preparado para filtrar categorías */

});

});

/*==========================================================
            EFECTO HOVER TARJETAS
==========================================================*/

const cards = document.querySelectorAll(

".service-box,.skill-card,.education-card,.project-card"

);

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

card.style.setProperty("--x",x+"px");

card.style.setProperty("--y",y+"px");

});

});

/*==========================================================
            REVEAL DEL HERO
==========================================================*/

window.addEventListener("load",()=>{

const heroContent =
document.querySelector(".hero-content");

const heroImg =
document.querySelector(".hero-image");

if(heroContent){

heroContent.classList.add("fade-right");

}

if(heroImg){

heroImg.classList.add("fade-left");

}

});

/*==========================================================
            SCROLL PROGRESS
==========================================================*/

const progressBar =
document.createElement("div");

progressBar.id="scroll-progress";

document.body.appendChild(progressBar);

window.addEventListener("scroll",()=>{

const totalHeight =

document.documentElement.scrollHeight -

window.innerHeight;

const progress =

(window.scrollY/totalHeight)*100;

progressBar.style.width = progress+"%";

});

/*==========================================================
            NAV ACTIVE
==========================================================*/

const sections =
document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top = section.offsetTop-150;

const height = section.offsetHeight;

if(window.scrollY>=top){

current=section.getAttribute("id");

}

});

document.querySelectorAll(".nav-links a")

.forEach(link=>{

link.classList.remove("active");

if(

link.getAttribute("href")==="#"+current

){

link.classList.add("active");

}

});

});

/*==========================================================
            CURSOR GLOW
==========================================================*/

const cursor =
document.createElement("div");

cursor.className="cursor";

document.body.appendChild(cursor);

window.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

/*==========================================================
            EFECTO BOTONES
==========================================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-6px) scale(1.02)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0) scale(1)";

});

});

/*==========================================================
            PREPARADO PARA GSAP
==========================================================*/

// gsap.from(...)

/*==========================================================
            FIN PARTE 2
==========================================================*/

/*==========================================================
        PARTÍCULAS CON CANVAS
==========================================================*/

const particlesContainer = document.getElementById("particles");

if (particlesContainer) {

    const canvas = document.createElement("canvas");

    particlesContainer.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resizeCanvas(){

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    window.addEventListener("resize",resizeCanvas);

    resizeCanvas();

    class Particle{

        constructor(){

            this.reset();

        }

        reset(){

            this.x = Math.random()*canvas.width;
            this.y = Math.random()*canvas.height;

            this.size = Math.random()*3+1;

            this.speedX = (Math.random()-.5)*0.6;

            this.speedY = (Math.random()-.5)*0.6;

            this.opacity = Math.random();

        }

        update(){

            this.x += this.speedX;

            this.y += this.speedY;

            if(this.x<0 || this.x>canvas.width ||

               this.y<0 || this.y>canvas.height){

                this.reset();

            }

        }

        draw(){

            ctx.beginPath();

            ctx.arc(

                this.x,

                this.y,

                this.size,

                0,

                Math.PI*2

            );

            ctx.fillStyle=`rgba(139,92,246,${this.opacity})`;

            ctx.fill();

        }

    }

    for(let i=0;i<120;i++){

        particles.push(new Particle());

    }

    function animateParticles(){

        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

        particles.forEach(p=>{

            p.update();

            p.draw();

        });

        requestAnimationFrame(animateParticles);

    }

    animateParticles();

}

/*==========================================================
        EFECTO MAGNÉTICO BOTONES
==========================================================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("mousemove",(e)=>{

const rect = button.getBoundingClientRect();

const x = e.clientX-rect.left;

const y = e.clientY-rect.top;

const moveX =

(x-rect.width/2)/8;

const moveY =

(y-rect.height/2)/8;

button.style.transform=

`translate(${moveX}px,${moveY}px)`;

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translate(0,0)";

});

});

/*==========================================================
        LAZY LOADING IMÁGENES
==========================================================*/

const lazyImages =

document.querySelectorAll("img");

const imageObserver =

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img = entry.target;

img.classList.add("show");

imageObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

imageObserver.observe(img);

});

/*==========================================================
        EFECTO BRILLO TARJETAS
==========================================================*/

document.querySelectorAll(

".project-card,.service-box,.education-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX-rect.left;

const y = e.clientY-rect.top;

card.style.background=

`radial-gradient(circle at ${x}px ${y}px,

rgba(139,92,246,.18),

rgba(17,24,39,.95) 70%)`;

});

card.addEventListener("mouseleave",()=>{

card.style.background="";

});

});

/*==========================================================
        SCROLL REVEAL
==========================================================*/

const reveals =

document.querySelectorAll(

".about,.experience,.education,.tools,.skills,.services,.portfolio,.contact,.testimonials"

);

const revealObserver=

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.2

});

reveals.forEach(item=>{

revealObserver.observe(item);

});

/*==========================================================
        EFECTO PARALLAX
==========================================================*/

window.addEventListener("scroll",()=>{

const value = window.scrollY;

document.querySelectorAll(".hero-image").forEach(img=>{

img.style.transform=

`translateY(${value*0.08}px)`;

});

});

/*==========================================================
        TEXTO PARPADEANTE
==========================================================*/

setInterval(()=>{

const typing =

document.querySelector(".typing");

if(typing){

typing.classList.toggle("active");

}

},600);

/*==========================================================
        ROTACIÓN ICONOS
==========================================================*/

document.querySelectorAll(

".tool img"

).forEach(icon=>{

icon.addEventListener("mouseenter",()=>{

icon.style.transform=

"rotate(360deg) scale(1.2)";

});

icon.addEventListener("mouseleave",()=>{

icon.style.transform=

"rotate(0deg) scale(1)";

});

});

/*==========================================================
        PRELOAD IMÁGENES
==========================================================*/

window.addEventListener("load",()=>{

document.querySelectorAll("img")

.forEach(image=>{

const preload=new Image();

preload.src=image.src;

});

});

/*==========================================================
        MODO PERFORMANCE
==========================================================*/

window.requestIdleCallback?.(()=>{

console.log(

"Portfolio listo."

);

});

/*==========================================================
        FIN PARTE 3
==========================================================*/

/*==========================================================
                LIGHTBOX PORTAFOLIO
==========================================================*/

const projectCards = document.querySelectorAll(".project-card");

const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
<div class="lightbox-content">
    <span class="close-lightbox">&times;</span>
    <img src="" alt="Proyecto">
</div>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeLightbox = lightbox.querySelector(".close-lightbox");

projectCards.forEach(card=>{

    const img = card.querySelector("img");

    if(!img) return;

    card.addEventListener("click",()=>{

        lightbox.classList.add("show");

        lightboxImage.src = img.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("show");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("show");

    }

});

/*==========================================================
            CONTADOR DE VISITA
==========================================================*/

let visits = localStorage.getItem("portfolio-visits");

if(!visits){

    visits=1;

}else{

    visits++;

}

localStorage.setItem("portfolio-visits",visits);

console.log("Visitas:",visits);

/*==========================================================
            CAMBIO DE TEMA
==========================================================*/

const themeButton=document.querySelector(".theme-toggle");

if(themeButton){

themeButton.addEventListener("click",()=>{

document.body.classList.toggle("light-theme");

localStorage.setItem(

"theme",

document.body.classList.contains("light-theme")

?

"light"

:

"dark"

);

});

}

const savedTheme=

localStorage.getItem("theme");

if(savedTheme==="light"){

document.body.classList.add("light-theme");

}

/*==========================================================
            EFECTO RIPPLE
==========================================================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",(e)=>{

const circle=document.createElement("span");

const diameter=Math.max(

button.clientWidth,

button.clientHeight

);

circle.style.width=diameter+"px";

circle.style.height=diameter+"px";

circle.style.left=

e.offsetX-diameter/2+"px";

circle.style.top=

e.offsetY-diameter/2+"px";

circle.classList.add("ripple");

button.appendChild(circle);

setTimeout(()=>{

circle.remove();

},700);

});

});

/*==========================================================
            ANIMAR NÚMEROS HERO
==========================================================*/

document.querySelectorAll(".hero-number")

.forEach(number=>{

let target=+number.dataset.target;

let value=0;

const speed=target/100;

function update(){

if(value<target){

value+=speed;

number.textContent=Math.floor(value);

requestAnimationFrame(update);

}else{

number.textContent=target;

}

}

update();

});

/*==========================================================
            EFECTO 3D TARJETAS
==========================================================*/

document.querySelectorAll(

".project-card,.service-box"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=(y-rect.height/2)/20;

const rotateY=(x-rect.width/2)/20;

card.style.transform=

`perspective(1000px)

rotateX(${-rotateX}deg)

rotateY(${rotateY}deg)

scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*==========================================================
            SCROLL SUAVE
==========================================================*/

window.scroll({

behavior:"smooth"

});

/*==========================================================
            PRELOAD FUENTES
==========================================================*/

document.fonts.ready.then(()=>{

document.body.classList.add("fonts-loaded");

});

/*==========================================================
            ATAJOS DE TECLADO
==========================================================*/

document.addEventListener("keydown",(e)=>{

if(e.key==="Home"){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

/*==========================================================
            CONSOLE
==========================================================*/

console.log("%cPORTAFOLIO CARGADO",

"color:#8B5CF6;font-size:18px;font-weight:bold;");

console.log("%cDesarrollado por Juan Diego Sánchez",

"color:#00E5FF;font-size:14px;");

/*==========================================================
            UTILIDADES
==========================================================*/

function random(min,max){

return Math.random()*(max-min)+min;

}

function clamp(value,min,max){

return Math.min(

Math.max(value,min),

max

);

}

function debounce(callback,delay){

let timeout;

return(...args)=>{

clearTimeout(timeout);

timeout=setTimeout(()=>{

callback(...args);

},delay);

};

}

/*==========================================================
            OPTIMIZACIÓN SCROLL
==========================================================*/

window.addEventListener(

"scroll",

debounce(()=>{

document.body.classList.add("scrolling");

setTimeout(()=>{

document.body.classList.remove("scrolling");

},150);

},50)

);

/*==========================================================
            MENSAJE FINAL
==========================================================*/

window.addEventListener("load",()=>{

console.log("✔ Hero cargado");

console.log("✔ Animaciones activas");

console.log("✔ Partículas activas");

console.log("✔ Portafolio listo");

});

/*==========================================================
                FIN DEL SCRIPT
==========================================================*/