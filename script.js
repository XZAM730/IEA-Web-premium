/* =================================================================
   1. MEGA DATABASE (THE OMEGA ARCHIVE)
   Isinya: Planet, Bulan, Bintang, Galaksi, Nebula, Black Hole, dll.
   ================================================================= */
const database = [
    // --- TATA SURYA UTAMA ---
    { name: "Sun", type: "star", glow: "gold", wikiQuery: "Sun" },
    { name: "Mercury", type: "planet", glow: "blue", wikiQuery: "Mercury (planet)" },
    { name: "Venus", type: "planet", glow: "gold", wikiQuery: "Venus" },
    { name: "Earth", type: "planet", glow: "blue", wikiQuery: "Earth" },
    { name: "Mars", type: "planet", glow: "red", wikiQuery: "Mars" },
    { name: "Jupiter", type: "planet", glow: "gold", wikiQuery: "Jupiter" },
    { name: "Saturn", type: "planet", glow: "gold", wikiQuery: "Saturn" },
    { name: "Uranus", type: "planet", glow: "blue", wikiQuery: "Uranus" },
    { name: "Neptune", type: "planet", glow: "blue", wikiQuery: "Neptune" },
    
    // --- PLANET KERDIL & SATELIT ---
    { name: "Pluto", type: "planet", glow: "blue", wikiQuery: "Pluto" },
    { name: "Ceres", type: "planet", glow: "gold", wikiQuery: "Ceres (dwarf planet)" },
    { name: "Eris", type: "planet", glow: "gold", wikiQuery: "Eris (dwarf planet)" },
    { name: "Makemake", type: "planet", glow: "red", wikiQuery: "Makemake" },
    { name: "Haumea", type: "planet", glow: "gold", wikiQuery: "Haumea" },
    { name: "Sedna", type: "planet", glow: "red", wikiQuery: "90377 Sedna" },
    { name: "Titan", type: "planet", glow: "gold", wikiQuery: "Titan (moon)" },
    { name: "Europa", type: "planet", glow: "blue", wikiQuery: "Europa (moon)" },
    { name: "Ganymede", type: "planet", glow: "blue", wikiQuery: "Ganymede (moon)" },
    { name: "Callisto", type: "planet", glow: "blue", wikiQuery: "Callisto (moon)" },
    { name: "Io", type: "planet", glow: "gold", wikiQuery: "Io (moon)" },
    { name: "Enceladus", type: "planet", glow: "blue", wikiQuery: "Enceladus" },
    { name: "Triton", type: "planet", glow: "blue", wikiQuery: "Triton (moon)" },
    { name: "Phobos", type: "planet", glow: "red", wikiQuery: "Phobos (moon)" },

    // --- BINTANG RAKSASA & UNIK ---
    { name: "UY Scuti", type: "star", glow: "red", wikiQuery: "UY Scuti" },
    { name: "Stephenson 2-18", type: "star", glow: "red", wikiQuery: "Stephenson 2-18" },
    { name: "Betelgeuse", type: "star", glow: "red", wikiQuery: "Betelgeuse" },
    { name: "Rigel", type: "star", glow: "blue", wikiQuery: "Rigel" },
    { name: "Sirius", type: "star", glow: "blue", wikiQuery: "Sirius" },
    { name: "Canopus", type: "star", glow: "gold", wikiQuery: "Canopus" },
    { name: "Arcturus", type: "star", glow: "red", wikiQuery: "Arcturus" },
    { name: "Vega", type: "star", glow: "blue", wikiQuery: "Vega" },
    { name: "Altair", type: "star", glow: "blue", wikiQuery: "Altair" },
    { name: "Antares", type: "star", glow: "red", wikiQuery: "Antares" },
    { name: "Proxima Centauri", type: "star", glow: "red", wikiQuery: "Proxima Centauri" },
    { name: "Alpha Centauri", type: "star", glow: "gold", wikiQuery: "Alpha Centauri" },
    { name: "Pistol Star", type: "star", glow: "blue", wikiQuery: "Pistol Star" },
    { name: "R136a1", type: "star", glow: "blue", wikiQuery: "R136a1" },
    { name: "La Superba", type: "star", glow: "red", wikiQuery: "La Superba" },
    { name: "Methuselah Star", type: "star", glow: "gold", wikiQuery: "HD 140283" },

    // --- GALAKSI ---
    { name: "Milky Way", type: "galaxy", glow: "purple", wikiQuery: "Milky Way" },
    { name: "Andromeda", type: "galaxy", glow: "purple", wikiQuery: "Andromeda Galaxy" },
    { name: "Triangulum", type: "galaxy", glow: "purple", wikiQuery: "Triangulum Galaxy" },
    { name: "Whirlpool Galaxy", type: "galaxy", glow: "purple", wikiQuery: "Whirlpool Galaxy" },
    { name: "Sombrero Galaxy", type: "galaxy", glow: "gold", wikiQuery: "Sombrero Galaxy" },
    { name: "Pinwheel Galaxy", type: "galaxy", glow: "blue", wikiQuery: "Pinwheel Galaxy" },
    { name: "Black Eye Galaxy", type: "galaxy", glow: "purple", wikiQuery: "Black Eye Galaxy" },
    { name: "Centaurus A", type: "galaxy", glow: "purple", wikiQuery: "Centaurus A" },
    { name: "Cigar Galaxy", type: "galaxy", glow: "red", wikiQuery: "Messier 82" },
    { name: "Cartwheel Galaxy", type: "galaxy", glow: "blue", wikiQuery: "Cartwheel Galaxy" },
    { name: "Hoag's Object", type: "galaxy", glow: "gold", wikiQuery: "Hoag's Object" },
    { name: "Tadpole Galaxy", type: "galaxy", glow: "blue", wikiQuery: "Tadpole Galaxy" },
    { name: "Cosmos Redshift 7", type: "galaxy", glow: "red", wikiQuery: "Cosmos Redshift 7" },

    // --- NEBULA ---
    { name: "Orion Nebula", type: "nebula", glow: "purple", wikiQuery: "Orion Nebula" },
    { name: "Pillars of Creation", type: "nebula", glow: "gold", wikiQuery: "Pillars of Creation" },
    { name: "Crab Nebula", type: "nebula", glow: "blue", wikiQuery: "Crab Nebula" },
    { name: "Helix Nebula", type: "nebula", glow: "purple", wikiQuery: "Helix Nebula" },
    { name: "Horsehead Nebula", type: "nebula", glow: "red", wikiQuery: "Horsehead Nebula" },
    { name: "Cat's Eye Nebula", type: "nebula", glow: "blue", wikiQuery: "Cat's Eye Nebula" },
    { name: "Ring Nebula", type: "nebula", glow: "purple", wikiQuery: "Ring Nebula" },
    { name: "Bubble Nebula", type: "nebula", glow: "blue", wikiQuery: "Bubble Nebula (NGC 7635)" },
    { name: "Lagoon Nebula", type: "nebula", glow: "red", wikiQuery: "Lagoon Nebula" },
    { name: "Butterfly Nebula", type: "nebula", glow: "blue", wikiQuery: "NGC 6302" },
    { name: "Tarantula Nebula", type: "nebula", glow: "gold", wikiQuery: "Tarantula Nebula" },
    { name: "Veil Nebula", type: "nebula", glow: "purple", wikiQuery: "Veil Nebula" },

    // --- BLACK HOLE & OBJEK MISTERIUS ---
    { name: "TON 618", type: "blackhole", glow: "purple", wikiQuery: "TON 618" },
    { name: "Sagittarius A*", type: "blackhole", glow: "purple", wikiQuery: "Sagittarius A*" },
    { name: "M87*", type: "blackhole", glow: "gold", wikiQuery: "Messier 87" },
    { name: "Cygnus X-1", type: "blackhole", glow: "blue", wikiQuery: "Cygnus X-1" },
    { name: "Great Attractor", type: "blackhole", glow: "purple", wikiQuery: "Great Attractor" },
    { name: "Holmberg 15A", type: "blackhole", glow: "gold", wikiQuery: "Holmberg 15A" },
    { name: "Phoenix A", type: "blackhole", glow: "red", wikiQuery: "Phoenix Cluster" },
    { name: "OJ 287", type: "blackhole", glow: "purple", wikiQuery: "OJ 287" },
    { name: "Oumuamua", type: "blackhole", glow: "red", wikiQuery: "Oumuamua" },
    { name: "Pulsar PSR B1919+21", type: "star", glow: "blue", wikiQuery: "PSR B1919+21" },

    // --- EXOPLANET ---
    { name: "Kepler-22b", type: "planet", glow: "blue", wikiQuery: "Kepler-22b" },
    { name: "Proxima Centauri b", type: "planet", glow: "red", wikiQuery: "Proxima Centauri b" },
    { name: "TRAPPIST-1e", type: "planet", glow: "blue", wikiQuery: "TRAPPIST-1e" },
    { name: "55 Cancri e", type: "planet", glow: "red", wikiQuery: "55 Cancri e" },
    { name: "HD 189733 b", type: "planet", glow: "blue", wikiQuery: "HD 189733 b" },
    { name: "Kepler-452b", type: "planet", glow: "blue", wikiQuery: "Kepler-452b" },
    { name: "WASP-12b", type: "planet", glow: "purple", wikiQuery: "WASP-12b" },
    { name: "Gliese 436 b", type: "planet", glow: "blue", wikiQuery: "Gliese 436 b" },
    { name: "J1407b", type: "planet", glow: "red", wikiQuery: "V1400 Centauri" }, // Super Saturn
    { name: "TrES-2b", type: "planet", glow: "purple", wikiQuery: "TrES-2b" }, // Planet Tergelap
    { name: "K2-18b", type: "planet", glow: "blue", wikiQuery: "K2-18b" }
];

/* =========================================
   2. INTRO & STARTUP LOGIC
   ========================================= */
const introText = "INITIALIZING IEA... \nLOADING STAR CHARTS... \nSYNCING WITH NASA DATABASE... \nWELCOME, COMMANDER.";
const typeContainer = document.getElementById('introText');
let charIndex = 0;

function typeWriter() {
    if (charIndex < introText.length) {
        typeContainer.innerHTML += introText.charAt(charIndex) === '\n' ? "<br>" : introText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 35);
    } else {
        typeContainer.innerHTML += "<span class='cursor'></span>";
        document.getElementById('agreementArea').classList.add('visible');
    }
}

// Checkbox Protocol
document.getElementById('protocolCheck').addEventListener('change', (e) => {
    const btn = document.getElementById('enterBtn');
    if(e.target.checked) btn.classList.add('active');
    else btn.classList.remove('active');
});

// Enter Button
document.getElementById('enterBtn').addEventListener('click', () => {
    if(!document.getElementById('protocolCheck').checked) return;
    
    const introLayer = document.getElementById('intro-layer');
    introLayer.style.opacity = '0';
    introLayer.style.visibility = 'hidden';
    
    // Unlock App
    document.querySelector('.app-container').classList.add('visible');
    startClock();
    initGrid(); // Build the Archive
});

/* =========================================
   3. NAVIGATION SYSTEM (TAB SWITCHER)
   ========================================= */
function switchTab(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.remove('active');
    });
    // Remove active from nav items
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });

    // Show selected page
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    // Highlight nav button
    // (We find the button that called this function by finding parent logic or simple query)
    const navButtons = document.querySelectorAll('.nav-item');
    if(pageId === 'archive') navButtons[0].classList.add('active');
    if(pageId === 'observatory') {
        navButtons[1].classList.add('active');
        fetchNASA_APOD(); // Fetch NASA data only when tab is opened
    }
    if(pageId === 'tools') navButtons[2].classList.add('active');
    if(pageId === 'academy') navButtons[3].classList.add('active');
}

/* =========================================
   4. ARCHIVE GRID SYSTEM (WIKIPEDIA API)
   ========================================= */
const grid = document.getElementById('cosmosGrid');

function initGrid() {
    grid.innerHTML = "";
    database.forEach((obj, index) => {
        const card = document.createElement('div');
        card.className = "card";
        card.dataset.type = obj.type;
        card.dataset.glow = obj.glow;
        card.onclick = () => openDetails(obj);

        card.innerHTML = `
            <div class="card-img-holder">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" id="img-${index}" alt="${obj.name}" loading="lazy">
            </div>
            <div class="card-info">
                <div class="card-title">${obj.name}</div>
                <div class="card-type">${obj.type}</div>
            </div>
        `;
        
        // 3D Tilt Effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateY(0) rotateX(0) scale(1)`;
        });

        grid.appendChild(card);
        fetchWikiImage(obj.wikiQuery, index);
    });
}

async function fetchWikiImage(query, index) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${query}&prop=pageimages&format=json&pithumbsize=400&origin=*`;
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const imgSrc = pages[pageId].thumbnail ? pages[pageId].thumbnail.source : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
        document.getElementById(`img-${index}`).src = imgSrc;
    } catch(e) {}
}

// Modal Detail Logic
async function openDetails(obj) {
    const loader = document.getElementById('systemLoader');
    loader.classList.add('active');
    document.querySelector('.loader-text').innerText = `DECRYPTING: ${obj.name.toUpperCase()}...`;

    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&explaintext&titles=${obj.wikiQuery}&pithumbsize=1000&format=json&origin=*`;
        const res = await fetch(url);
        const data = await res.json();
        const pageId = Object.keys(data.query.pages)[0];
        const pageData = data.query.pages[pageId];

        setTimeout(() => {
            loader.classList.remove('active');
            document.getElementById('modalTitle').innerText = obj.name.toUpperCase();
            document.getElementById('modalType').innerText = obj.type.toUpperCase();
            document.getElementById('modalDesc').innerText = pageData.extract || "Data not available.";
            document.getElementById('modalImg').src = pageData.thumbnail ? pageData.thumbnail.source : document.getElementById(`img-${database.indexOf(obj)}`).src;
            
            window.currWikiLink = `https://en.wikipedia.org/wiki/${obj.wikiQuery}`;
            
            const modal = document.getElementById('infoModal');
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('open'), 10);
        }, 800);
    } catch(e) { loader.classList.remove('active'); alert("Connection Error"); }
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('open');
    setTimeout(() => modal.style.display = 'none', 300);
}
window.onclick = (e) => { if(e.target == document.getElementById('infoModal')) closeModal(); }

// Search & Filter
function filterGrid(type) {
    document.querySelectorAll('.card').forEach(c => c.style.display = (type==='all' || c.dataset.type===type) ? 'block' : 'none');
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.card').forEach(c => {
        c.style.display = c.querySelector('.card-title').innerText.toLowerCase().includes(term) ? 'block' : 'none';
    });
});

/* =========================================
   5. NASA OBSERVATORY API
   ========================================= */
async function fetchNASA_APOD() {
    const title = document.getElementById('apodTitle');
    // Cek jika data sudah ada biar gak fetch ulang terus
    if(title.innerText !== "Connecting to NASA...") return;

    try {
        // DEMO_KEY is limited. In production use your own API Key.
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        const data = await res.json();

        document.getElementById('apodTitle').innerText = data.title;
        document.getElementById('apodDate').innerText = data.date;
        document.getElementById('apodDesc').innerText = data.explanation;

        if(data.media_type === "video") {
            document.getElementById('apodImg').style.display = 'none';
            const vid = document.getElementById('apodVideo');
            vid.style.display = 'block';
            vid.src = data.url;
        } else {
            document.getElementById('apodImg').src = data.url;
        }
    } catch(e) {
        document.getElementById('apodTitle').innerText = "CONNECTION FAILED";
        document.getElementById('apodDesc').innerText = "Unable to reach NASA servers. Please try again later.";
    }
}

/* =========================================
   6. TOOLS: GRAVITY CALCULATOR
   ========================================= */
function calculateWeight() {
    const earthW = parseFloat(document.getElementById('weightInput').value);
    if(!earthW) return;

    // Gravity factors relative to Earth
    const marsG = 0.38;
    const jupiterG = 2.528; // 24.79 / 9.8
    const moonG = 0.165;

    animateValue("val-mars", earthW * marsG);
    animateValue("val-jupiter", earthW * jupiterG);
    animateValue("val-moon", earthW * moonG);
}

function animateValue(id, end) {
    const obj = document.getElementById(id);
    let start = 0;
    const duration = 1000;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        obj.innerHTML = (progress * end).toFixed(1) + " KG";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

/* =========================================
   7. ACADEMY: QUIZ LOGIC
   ========================================= */
const quizData = [
    { q: "Planet terpanas di Tata Surya?", a: ["Merkurius", "Venus", "Mars", "Jupiter"], c: 1 },
    { q: "Apa nama galaksi kita?", a: ["Andromeda", "Bima Sakti", "Triangulum", "Sombrero"], c: 1 },
    { q: "Matahari adalah bintang tipe...", a: ["Red Giant", "White Dwarf", "Yellow Dwarf", "Supernova"], c: 2 },
    { q: "Lubang hitam di pusat galaksi kita?", a: ["TON 618", "Sagittarius A*", "M87*", "Cygnus X-1"], c: 1 },
    { q: "Berapa satelit alami Bumi?", a: ["1", "2", "0", "14"], c: 0 },
    { q: "Planet terbesar di Tata Surya?", a: ["Bumi", "Saturnus", "Jupiter", "Uranus"], c: 2 },
    { q: "Siapa manusia pertama di Bulan?", a: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Elon Musk"], c: 1 },
    { q: "Planet yang memiliki cincin paling jelas?", a: ["Jupiter", "Uranus", "Neptunus", "Saturnus"], c: 3 }
];

let qIdx = 0;
let score = 0;

function startQuiz() {
    document.getElementById('startQuizBtn').style.display = 'none';
    score = 0; qIdx = 0;
    document.getElementById('scoreVal').innerText = "0";
    loadQuestion();
}

function loadQuestion() {
    const q = quizData[qIdx];
    document.getElementById('qNum').innerText = qIdx + 1;
    document.getElementById('quizQuestion').innerText = q.q;
    document.getElementById('quizResult').innerText = "";
    document.getElementById('nextQuestion').style.display = 'none';
    
    const div = document.getElementById('quizOptions');
    div.innerHTML = "";
    q.a.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx, btn);
        div.appendChild(btn);
    });
}

function checkAnswer(ans, btn) {
    const correct = quizData[qIdx].c;
    const opts = document.getElementById('quizOptions').children;
    for(let b of opts) b.disabled = true;

    if(ans === correct) {
        btn.classList.add('correct');
        score += 100;
        document.getElementById('scoreVal').innerText = score;
        document.getElementById('quizResult').innerHTML = "<span style='color:#0f0'>CORRECT ANSWER</span>";
    } else {
        btn.classList.add('wrong');
        opts[correct].classList.add('correct');
        document.getElementById('quizResult').innerHTML = "<span style='color:#f00'>INCORRECT</span>";
    }
    document.getElementById('nextQuestion').style.display = 'inline-block';
}

function nextQuiz() {
    qIdx++;
    if(qIdx < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('quizQuestion').innerText = "SIMULATION COMPLETE";
        document.getElementById('quizOptions').innerHTML = "";
        document.getElementById('quizResult').innerText = `FINAL SCORE: ${score} / ${quizData.length * 100}`;
        document.getElementById('nextQuestion').style.display = 'none';
        document.getElementById('startQuizBtn').style.display = 'inline-block';
        document.getElementById('startQuizBtn').innerText = "RESTART QUIZ";
    }
}

/* =========================================
   8. BACKGROUND & UTILS
   ========================================= */
// Jam Digital
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('stardate').innerText = "TIME: " + now.toLocaleTimeString();
    }, 1000);
}

// Background Starfield
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function initStars() {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    stars = [];
    for(let i=0; i<250; i++) stars.push({
        x:Math.random()*canvas.width, 
        y:Math.random()*canvas.height, 
        z:Math.random()*2+0.5, 
        o:Math.random()
    });
}
function animateStars() {
    // Kita hapus canvas agar transparan (background CSS yang handle warnanya)
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    stars.forEach(s => {
        ctx.fillStyle = `rgba(255,255,255,${s.o})`; 
        ctx.beginPath(); ctx.arc(s.x, s.y, s.z, 0, Math.PI*2); ctx.fill();
        s.y += s.z*0.3; 
        if(s.y>canvas.height) s.y=0;
    });
    requestAnimationFrame(animateStars);
}

window.onload = () => {
    initStars(); animateStars();
    setTimeout(typeWriter, 500);
};
window.onresize = initStars;
