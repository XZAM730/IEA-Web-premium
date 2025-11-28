// -------------------------
// STAR BACKGROUND ANIMATION
// -------------------------
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let starsArray = [];

function createStars() {
const count = 200;
for (let i = 0; i < count; i++) {
starsArray.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
size: Math.random() * 2,
speed: Math.random() * 0.5 + 0.2
});
}
}

function animateStars() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

for (let s of starsArray) {
ctx.fillStyle = "white";
ctx.fillRect(s.x, s.y, s.size, s.size);

s.y += s.speed;
if (s.y > canvas.height) {
s.y = 0;
s.x = Math.random() * canvas.width;
}
}

requestAnimationFrame(animateStars);
}

createStars();
animateStars();

window.addEventListener("resize", () => {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

// Smooth Scroll
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
anchor.addEventListener("click", function (e) {
e.preventDefault();
document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior: "smooth"
});
});
});
