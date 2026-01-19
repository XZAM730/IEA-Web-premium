/**
 * ============================================================================
 * IEA OMEGA SYSTEM CORE (V.5.0 INFINITY)
 * ============================================================================
 * @fileoverview Main Controller for IEA Omega Dashboard
 * @author IEA Architect Command
 * @version 5.0.1 (Stable)
 * @license Proprietary / Classified
 * * MODULES:
 * 1. CONFIG ...... System Global Variables
 * 2. DATABASE .... Static Offline Data (Planets, Stars, etc.)
 * 3. VISUALS ..... Canvas Starfield & Particle Engine
 * 4. AUDIO ....... Web Audio API & Visualizer
 * 5. CORE ........ Boot Sequence & App State
 * 6. NETWORK ..... Firebase & NASA API Handlers
 * 7. TOOLS ....... Gravity Sim & Quiz Logic
 * 8. UI .......... DOM Manipulation & Event Bridges
 * ============================================================================
 */

// IMPORT FIREBASE (ES6 MODULES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

/* ==========================================================================
   1. SYSTEM CONFIGURATION & STATE
   ========================================================================== */
const CONFIG = {
    // Backend Endpoints
    FIREBASE_URL: "https://iea-pendaftaran-default-rtdb.asia-southeast1.firebasedatabase.app",
    NASA_API_URL: "https://api.nasa.gov/planetary/apod",
    NASA_API_KEY: "DEMO_KEY", // Ganti dengan API Key NASA asli jika ada

    // Animation Settings
    STAR_COUNT: 150,
    STAR_SPEED: 0.05,
    DUST_COUNT: 40,
    TYPEWRITER_SPEED: 25, // ms per character

    // Asset Fallbacks
    DEFAULT_IMG: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    DEFAULT_AUDIO: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
};

const STATE = {
    isBooted: false,
    currentTab: 'archive',
    audioContext: null,
    audioSource: null,
    analyser: null,
    isPlaying: false,
    quizScore: 0,
    quizIndex: 0
};

// Initialize Firebase
const fbApp = initializeApp({ databaseURL: CONFIG.FIREBASE_URL });
const fbDb = getDatabase(fbApp);

/* ==========================================================================
   2. STATIC DATABASE (OFFLINE BACKUP)
   ========================================================================== */
/**
 * Data ini digunakan untuk mengisi tab "Cosmic Database"
 * agar tampilan terlihat penuh dan profesional.
 */
const COSMIC_DB = [
    // --- STARS ---
    {
        id: "star_001",
        name: "Matahari (The Sun)",
        type: "star",
        specs: "Type: G2V | Age: 4.6B Yrs",
        desc: "Bintang pusat tata surya. Bola plasma raksasa yang menyediakan energi bagi kehidupan di Bumi. Massanya menyumbang 99.86% dari total massa tata surya.",
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg"
    },
    {
        id: "star_002",
        name: "UY Scuti",
        type: "star",
        specs: "Type: Red Hypergiant",
        desc: "Salah satu bintang terbesar yang pernah ditemukan. Jika diletakkan di pusat tata surya, photospherenya akan menelan orbit Jupiter.",
        img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/UY_Scuti_size_comparison_to_the_Sun.png"
    },
    {
        id: "star_003",
        name: "Betelgeuse",
        type: "star",
        specs: "Type: Red Supergiant",
        desc: "Bintang terang di rasi Orion yang berada di ambang supernova. Variabilitas cahayanya menunjukkan ketidakstabilan struktur intinya.",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/57/Betelgeuse_ALMA.jpg"
    },
    {
        id: "star_004",
        name: "Sirius A",
        type: "star",
        specs: "Dist: 8.6 LY | Mag: -1.46",
        desc: "Bintang paling terang di langit malam Bumi. Sebenarnya adalah sistem biner dengan pendamping kerdil putih bernama Sirius B.",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Sirius_A_and_B_Hubble_photo.jpg"
    },
    
    // --- PLANETS ---
    {
        id: "pl_001",
        name: "Bumi (Earth)",
        type: "planet",
        specs: "Habitable: Yes | Moons: 1",
        desc: "Satu-satunya planet yang diketahui menopang kehidupan. Memiliki atmosfer nitrogen-oksigen dan medan magnet pelindung yang kuat.",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
    },
    {
        id: "pl_002",
        name: "Mars",
        type: "planet",
        specs: "Atmosphere: CO2 | Gravity: 0.38g",
        desc: "Planet Merah. Target utama kolonisasi manusia. Memiliki gunung tertinggi di tata surya (Olympus Mons) dan ngarai terdalam.",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg"
    },
    {
        id: "pl_003",
        name: "Jupiter",
        type: "planet",
        specs: "Type: Gas Giant | Moons: 95+",
        desc: "Planet terbesar di tata surya. Pelindung Bumi dari asteroid berkat gravitasi masifnya. Memiliki badai abadi 'Great Red Spot'.",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg"
    },
    {
        id: "pl_004",
        name: "Saturnus",
        type: "planet",
        specs: "Ring System: Complex Ice",
        desc: "Dikenal dengan sistem cincinnya yang spektakuler. Kerapatan planet ini sangat rendah, secara teori bisa mengapung di atas air.",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg"
    },

    // --- BLACK HOLES / VOID ---
    {
        id: "bh_001",
        name: "TON 618",
        type: "void",
        specs: "Mass: 66 Billion Suns",
        desc: "Lubang hitam ultramasif terbesar yang pernah ditemukan. Terletak di pusat kuasar yang sangat terang, berjarak 10.4 miliar tahun cahaya.",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Black_Hole_in_the_universe.jpg"
    },
    {
        id: "bh_002",
        name: "Sagittarius A*",
        type: "void",
        specs: "Loc: Milky Way Center",
        desc: "Lubang hitam supermasif di jantung galaksi kita. Objek yang mengikat orbit miliaran bintang di Bima Sakti.",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/EHT_Saggitarius_A_black_hole.tif"
    },

    // --- GALAXIES ---
    {
        id: "gal_001",
        name: "Andromeda",
        type: "galaxy",
        specs: "Dist: 2.5M LY | Stars: 1 Trillion",
        desc: "Tetangga galaksi spiral terbesar kita. Berada di jalur tabrakan dengan Bima Sakti dan akan menyatu dalam 4.5 miliar tahun.",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/M31_Galaxy.jpg"
    },
    {
        id: "gal_002",
        name: "Whirlpool Galaxy (M51)",
        type: "galaxy",
        specs: "Type: Spiral Interaction",
        desc: "Contoh klasik galaksi spiral yang sedang berinteraksi dengan galaksi kerdil di ujung lengannya. Struktur spiralnya sangat jelas.",
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/Messier51_sRGB.jpg"
    },

    // --- NEBULAE ---
    {
        id: "neb_001",
        name: "Pillars of Creation",
        type: "nebula",
        specs: "Loc: Eagle Nebula",
        desc: "Tiang gas dan debu antarbintang tempat bintang-bintang baru dilahirkan. Salah satu objek paling ikonik yang dipotret Hubble.",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg"
    },
    {
        id: "neb_002",
        name: "Crab Nebula",
        type: "nebula",
        specs: "Type: Supernova Remnant",
        desc: "Sisa ledakan supernova yang diamati pada tahun 1054. Di pusatnya terdapat Pulsar yang berputar 30 kali per detik.",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Crab_Nebula.jpg"
    }
];

/* ==========================================================================
   3. VISUAL ENGINE (CANVAS & PARTICLES)
   ========================================================================== */
const VisualEngine = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    stars: [],

    init: function() {
        this.canvas = document.getElementById('star-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        window.addEventListener('resize', () => this.resize());
        this.resize();
        this.createStars();
        this.animate();
        this.createDust();
    },

    resize: function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    createStars: function() {
        this.stars = [];
        for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                z: Math.random() * 2, // Depth factor
                size: Math.random() * 1.5,
                alpha: Math.random(),
                vel: (Math.random() - 0.5) * 0.2
            });
        }
    },

    createDust: function() {
        const container = document.getElementById('dust-container');
        container.innerHTML = ''; // Reset
        for(let i=0; i < CONFIG.DUST_COUNT; i++) {
            const p = document.createElement('div');
            p.className = 'dust-particle';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = Math.random() * 100 + 'vh';
            // Randomize size and animation duration
            const size = Math.random() * 3;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.animationDuration = (10 + Math.random() * 20) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            container.appendChild(p);
        }
    },

    animate: function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw Stars
        this.ctx.fillStyle = "#ffffff";
        for (let star of this.stars) {
            // Update Position
            star.y -= CONFIG.STAR_SPEED * (star.z + 0.5); // Parallax speed
            
            // Reset if out of bounds
            if (star.y < 0) {
                star.y = this.height;
                star.x = Math.random() * this.width;
            }

            // Draw
            this.ctx.globalAlpha = star.alpha;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Twinkle effect
            if(Math.random() > 0.98) star.alpha = Math.random();
        }

        // Draw Constellation Lines (Optional connectivity)
        this.drawConstellations();

        requestAnimationFrame(() => this.animate());
    },

    drawConstellations: function() {
        this.ctx.strokeStyle = "rgba(0, 242, 255, 0.05)";
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        
        // Simple proximity connect
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const dx = this.stars[i].x - this.stars[j].x;
                const dy = this.stars[i].y - this.stars[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < 100) {
                    this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                    this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                }
            }
        }
        this.ctx.stroke();
    }
};

/* ==========================================================================
   4. AUDIO ENGINE (VISUALIZER & PLAYER)
   ========================================================================== */
const AudioEngine = {
    audioEl: null,
    bars: [],
    
    init: function() {
        this.audioEl = document.getElementById('audioCore');
        this.bars = document.querySelectorAll('.visualizer .bar');
        
        // Event Listeners
        this.audioEl.addEventListener('ended', () => this.stop());
        
        // Visualizer Loop (Simulated for Performance/Cross-Browser)
        // Note: Real WebAudio API analysis often blocked by Autoplay policies
        // so we use a CSS-driven visualizer synced to play state for reliability.
    },

    play: function(url, title, img) {
        const deck = document.getElementById('music-deck');
        const art = document.getElementById('playerImg');
        const titleEl = document.getElementById('playerTitle');
        const statusEl = document.getElementById('playerStatus');
        
        // Update UI
        deck.classList.remove('audio-deck-closed');
        titleEl.innerText = title.toUpperCase();
        art.src = img || CONFIG.DEFAULT_IMG;
        statusEl.innerHTML = `<span style="color:var(--cyan)">●</span> BUFFERING...`;
        
        // Load Audio
        this.audioEl.src = url;
        this.audioEl.play().then(() => {
            STATE.isPlaying = true;
            this.updateState();
        }).catch(e => {
            console.error("Audio Playback Error:", e);
            statusEl.innerHTML = `<span style="color:var(--red)">●</span> ERROR`;
        });
    },

    toggle: function() {
        if(this.audioEl.paused) {
            this.audioEl.play();
            STATE.isPlaying = true;
        } else {
            this.audioEl.pause();
            STATE.isPlaying = false;
        }
        this.updateState();
    },

    updateState: function() {
        const icon = document.getElementById('playIcon');
        const status = document.getElementById('playerStatus');
        const disc = document.getElementById('playerArt'); // Animation container
        const viz = document.getElementById('visualizer');

        if(STATE.isPlaying) {
            icon.className = "fas fa-pause";
            status.innerHTML = `<span style="color:var(--cyan)">●</span> PLAYING`;
            disc.classList.add('playing'); // CSS spin
            viz.classList.add('active');   // Enable CSS bars
        } else {
            icon.className = "fas fa-play";
            status.innerHTML = `<span style="color:#666">●</span> PAUSED`;
            disc.classList.remove('playing');
            viz.classList.remove('active');
        }
    },

    stop: function() {
        STATE.isPlaying = false;
        this.updateState();
    }
};

/* ==========================================================================
   5. CORE LOGIC (BOOT & TABS)
   ========================================================================== */
const Core = {
    
    // --- Boot Sequence ---
    bootSystem: async function() {
        // Init Subsystems
        VisualEngine.init();
        AudioEngine.init();
        
        // 1. Terminal Typing Effect
        const logLines = document.querySelectorAll('.boot-log-container .log-line');
        for(let line of logLines) {
            line.style.display = 'block';
            await this.sleep(400);
        }
        
        await this.sleep(500);
        
        // 2. Hide Terminal, Show Logo
        document.getElementById('bootLog').style.display = 'none';
        document.getElementById('logoReveal').style.display = 'flex';
        
        // 3. Enable Entry Button
        const btn = document.getElementById('enterSystemBtn');
        
        btn.addEventListener('click', () => {
            this.enterDashboard();
        });
    },

    // --- Enter Dashboard Animation ---
    enterDashboard: function() {
        // Fade Out Intro
        const intro = document.getElementById('intro-layer');
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none'; // Allow clicks through
        
        setTimeout(() => {
            intro.style.display = 'none';
            // Fade In Main App
            const app = document.getElementById('appMain');
            app.style.display = 'block'; // Make visible first
            
            // Trigger reflow
            void app.offsetWidth;
            
            app.style.opacity = '1';
            
            // Populate Data
            AppController.loadCosmicArchive();
            AppController.loadRoyalVault();
            AppController.startClock();
            
        }, 1000);
    },

    // --- Utility: Sleep ---
    sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

/* ==========================================================================
   6. APP CONTROLLER (MAIN LOGIC)
   ========================================================================== */
const AppController = {

    // --- Tab Switching ---
    switchPage: function(pageId, btnElement) {
        // 1. Hide all pages
        document.querySelectorAll('.page-section').forEach(el => {
            el.classList.remove('active');
        });
        
        // 2. Show target page
        const target = document.getElementById('tab-' + pageId);
        if(target) target.classList.add('active');
        
        // 3. Update Dock Buttons
        document.querySelectorAll('.dock-item').forEach(el => {
            el.classList.remove('active');
        });
        btnElement.classList.add('active');
        
        // 4. Special Actions
        if(pageId === 'feed') this.fetchNasaFeed();
    },

    // --- Clock Logic ---
    startClock: function() {
        setInterval(() => {
            const now = new Date();
            document.getElementById('clockDisplay').innerText = now.toLocaleTimeString('en-GB'); // 24h format
        }, 1000);
    },

    // --- Feature: Cosmic Archive Loader ---
    loadCosmicArchive: function() {
        const grid = document.getElementById('mainArchiveGrid');
        
        // Keep existing static skeletons or clear? Let's append to existing HTML.
        // But for this logic, let's clear and re-render from JS DB for full control.
        grid.innerHTML = ''; 

        COSMIC_DB.forEach(item => {
            const card = document.createElement('div');
            card.className = 'data-card';
            card.dataset.type = item.type;
            
            // Color coding based on type
            let colorClass = 'blue';
            let icon = 'fa-star';
            if(item.type === 'planet') { colorClass = 'blue'; icon = 'fa-globe'; }
            if(item.type === 'star') { colorClass = 'gold'; icon = 'fa-sun'; }
            if(item.type === 'void') { colorClass = 'red'; icon = 'fa-circle'; }
            if(item.type === 'galaxy') { colorClass = 'purple'; icon = 'fa-atom'; }
            if(item.type === 'nebula') { colorClass = 'purple'; icon = 'fa-cloud'; }

            card.innerHTML = `
                <div class="card-visual">
                    <div class="type-tag ${colorClass}"><i class="fas ${icon}"></i> ${item.type.toUpperCase()}</div>
                    <img src="${item.img}" alt="${item.name}" loading="lazy">
                    <div class="visual-overlay"></div>
                </div>
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <div class="specs">
                        <span>${item.specs.split('|')[0]}</span>
                    </div>
                    <p>${item.desc}</p>
                </div>
            `;
            
            // Add click event for modal
            card.onclick = () => UI.openModal(item);
            
            grid.appendChild(card);
        });
    },

    // --- Feature: Royal Vault Loader (Firebase + Fallback) ---
    loadRoyalVault: function() {
        const grid = document.getElementById('vaultGrid');
        const dbRef = ref(fbDb, 'library');

        // Listener for Realtime Data
        onValue(dbRef, (snapshot) => {
            grid.innerHTML = ''; // Clear loading state
            
            if(snapshot.exists()) {
                const data = Object.values(snapshot.val()).reverse(); // Newest first
                
                data.forEach(item => {
                    grid.appendChild(this.createVaultCard(item));
                });
            } else {
                grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px; color:#666;">VAULT OFFLINE / EMPTY</div>`;
            }
        }, (error) => {
            console.error("Firebase Error:", error);
            // If error, load fallback static items (from HTML structure or specific Array)
            // For now we assume HTML structure handled skeletons.
        });
    },

    // Helper: Create Vault Card HTML
    createVaultCard: function(item) {
        const div = document.createElement('div');
        div.className = 'artifact-card';
        
        let type = 'doc';
        let icon = 'fa-file-alt';
        let badge = 'DOC';
        let cat = (item.category || '').toLowerCase();
        let isAudio = false;

        if (cat.includes('music') || cat.includes('audio')) { 
            type = 'audio'; icon = 'fa-music'; badge = 'MP3'; isAudio = true;
        } else if (cat.includes('book') || cat.includes('pdf')) { 
            type = 'book'; icon = 'fa-book'; badge = 'PDF';
        } else if (cat.includes('research')) {
            type = 'research'; icon = 'fa-microscope'; badge = 'RES';
        }

        div.dataset.type = type;

        // Auto Convert Google Drive View Link to Download Link
        let dlLink = item.link;
        if(dlLink.includes('drive.google.com') && dlLink.includes('/view')) {
            // Extract ID
            const match = dlLink.match(/\/d\/(.+?)\//);
            if(match && match[1]) {
                dlLink = `https://drive.google.com/uc?export=download&id=${match[1]}`;
            }
        } else if (dlLink.includes('drive.google.com') && dlLink.includes('open?id=')) {
             const id = dlLink.split('id=')[1];
             dlLink = `https://drive.google.com/uc?export=download&id=${id}`;
        }

        const thumb = item.thumbnail || CONFIG.DEFAULT_IMG;

        // Construct Buttons
        let actionButtons = '';
        if(isAudio) {
            actionButtons = `
                <button class="act-btn play" onclick="window.playAudio('${item.link}', '${item.title.replace(/'/g, "\\'")}', '${thumb}')">
                    <i class="fas fa-play"></i> PLAY
                </button>
            `;
        } else {
            actionButtons = `
                <a href="${item.link}" target="_blank" class="act-btn read">
                    <i class="fas fa-eye"></i> READ
                </a>
            `;
        }

        // Add Download Button
        actionButtons += `
            <a href="${dlLink}" class="act-btn download" title="Download File" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-download"></i>
            </a>
        `;

        div.innerHTML = `
            <div class="art-visual">
                <div class="art-badge"><i class="fas ${icon}"></i> ${badge}</div>
                <img src="${thumb}" onerror="this.src='${CONFIG.DEFAULT_IMG}'">
            </div>
            <div class="art-info">
                <h4>${item.title}</h4>
                <div class="art-meta">
                    <span><i class="fas fa-fingerprint"></i> ${item.category}</span>
                    <span><i class="fas fa-clock"></i> ${item.date || 'Unknown'}</span>
                </div>
                <p>${item.description || 'No description available.'}</p>
                <div class="art-actions">
                    ${actionButtons}
                </div>
            </div>
        `;

        return div;
    },

    // --- Feature: NASA Feed ---
    fetchNasaFeed: async function() {
        const titleEl = document.getElementById('nasaTitle');
        const dateEl = document.getElementById('nasaDate');
        const descEl = document.getElementById('nasaDesc');
        const imgEl = document.getElementById('nasaImg');
        const vidEl = document.getElementById('nasaVid');
        const loader = document.getElementById('feedLoader');

        try {
            const response = await fetch(`${CONFIG.NASA_API_URL}?api_key=${CONFIG.NASA_API_KEY}`);
            if(!response.ok) throw new Error("NASA API Offline");
            
            const data = await response.json();
            
            // Hide Loader
            loader.style.display = 'none';
            
            // Update Data
            titleEl.innerText = data.title.toUpperCase();
            dateEl.innerText = data.date;
            descEl.innerText = data.explanation;
            
            if(data.media_type === 'video') {
                imgEl.style.display = 'none';
                vidEl.style.display = 'block';
                vidEl.src = data.url;
            } else {
                vidEl.style.display = 'none';
                imgEl.style.display = 'block';
                imgEl.src = data.url;
            }

        } catch (e) {
            console.warn("NASA Fetch Error:", e);
            loader.innerHTML = '<span style="color:red">CONNECTION FAILED</span>';
            descEl.innerText = "Error establishing secure uplink to NASA servers. Showing fallback visualisation.";
            imgEl.src = CONFIG.DEFAULT_IMG;
            imgEl.style.display = 'block';
            loader.style.display = 'none';
        }
    }
};

/* ==========================================================================
   7. UI & INTERACTION HANDLERS (BRIDGE)
   ========================================================================== */
const UI = {
    openModal: function(item) {
        const modal = document.getElementById('modalOverlay');
        
        // Populate Modal
        document.getElementById('mTitle').innerText = item.name;
        document.getElementById('mType').innerText = item.type.toUpperCase();
        document.getElementById('mDesc').innerText = item.desc;
        document.getElementById('mImg').src = item.img;
        
        // Search Wiki Button
        const btn = document.getElementById('mWikiBtn');
        btn.onclick = () => window.open(`https://en.wikipedia.org/wiki/${item.name}`, '_blank');

        // Show
        modal.classList.add('open');
    },

    closeModal: function() {
        document.getElementById('modalOverlay').classList.remove('open');
    }
};

// --- GLOBAL BRIDGE FUNCTIONS (FOR HTML ONCLICK) ---

// 1. Navigation
window.switchPage = (id, el) => AppController.switchPage(id, el);

// 2. Audio Player Bridge
window.playAudio = (url, title, img) => AudioEngine.play(url, title, img);
window.togglePlay = () => AudioEngine.toggle();
window.prevTrack = () => alert("Previous track data not found in current playlist.");
window.nextTrack = () => alert("End of playlist.");

// 3. Modal
window.closeModal = () => UI.closeModal();

// 4. Archive Filters
window.filterData = (type) => {
    // Update buttons
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => {
        if(b.innerText.toLowerCase().includes(type) || (type==='all' && b.innerText==='ALL')) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });

    // Filter Logic
    const cards = document.querySelectorAll('.data-card');
    cards.forEach(c => {
        if(type === 'all' || c.dataset.type === type) c.style.display = 'flex';
        else c.style.display = 'none';
    });
};

// 5. Vault Filters
window.filterVault = (type) => {
    // Update buttons
    const btns = document.querySelectorAll('.v-chip');
    btns.forEach(b => {
        // Simple logic for active class toggle based on click text is harder, 
        // better to pass element or just use simple logic:
        b.classList.remove('active');
    });
    // Add active to clicked (using event target logic inside inline onclick is messy, 
    // so we just rely on visual filtering for now or use complex DOM traversal)
    // For simplicity in this structure:
    event.target.closest('button').classList.add('active');

    // Filter Logic
    const cards = document.querySelectorAll('.artifact-card');
    cards.forEach(c => {
        if(type === 'all' || c.dataset.type === type) c.style.display = 'flex';
        else c.style.display = 'none';
    });
};

// 6. Search Logic (Archive)
document.getElementById('archiveSearch').addEventListener('keyup', (e) => {
    const val = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('#mainArchiveGrid .data-card');
    cards.forEach(c => {
        const title = c.querySelector('h3').innerText.toLowerCase();
        c.style.display = title.includes(val) ? 'flex' : 'none';
    });
});

// 7. Search Logic (Vault)
document.getElementById('vaultSearch').addEventListener('keyup', (e) => {
    const val = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('#vaultGrid .artifact-card');
    cards.forEach(c => {
        const title = c.querySelector('h4').innerText.toLowerCase();
        c.style.display = title.includes(val) ? 'flex' : 'none';
    });
});

// 8. Gravity Calculator
window.calculateGravity = () => {
    const input = parseFloat(document.getElementById('massInput').value);
    if(isNaN(input)) return;

    // Factors
    const G = { mercury: 0.38, venus: 0.91, moon: 0.166, mars: 0.38, jupiter: 2.52, saturn: 1.06, neutron: 140000000000 };

    document.getElementById('g-mercury').innerText = (input * G.mercury).toFixed(1) + " KG";
    document.getElementById('g-venus').innerText = (input * G.venus).toFixed(1) + " KG";
    document.getElementById('g-moon').innerText = (input * G.moon).toFixed(1) + " KG";
    document.getElementById('g-mars').innerText = (input * G.mars).toFixed(1) + " KG";
    document.getElementById('g-jupiter').innerText = (input * G.jupiter).toFixed(1) + " KG";
    document.getElementById('g-saturn').innerText = (input * G.saturn).toFixed(1) + " KG";
    document.getElementById('g-neutron').innerText = (input * G.neutron).toExponential(2) + " KG";
};

// 9. NASA Manual Refresh
window.fetchNasaData = () => AppController.fetchNasaFeed();

// 10. Exam Logic (Simple)
const EXAM_DB = [
    { q: "Apa nama galaksi terdekat dengan Bima Sakti?", opts: ["Andromeda", "Triangulum", "Sombrero"], a: 0 },
    { q: "Planet mana yang memiliki Bintik Merah Besar?", opts: ["Mars", "Jupiter", "Saturnus"], a: 1 },
    { q: "Apa itu Event Horizon?", opts: ["Tepi Galaksi", "Pusat Bintang", "Batas Lubang Hitam"], a: 2 },
    { q: "Bintang terdekat dengan Bumi adalah?", opts: ["Proxima Centauri", "Sirius", "Matahari"], a: 2 }, // Trick question
    { q: "Cahaya membutuhkan waktu berapa lama dari Matahari ke Bumi?", opts: ["8 Detik", "8 Menit", "8 Jam"], a: 1 }
];

let examState = { score: 0, current: 0 };

window.initiateExam = () => {
    examState = { score: 0, current: 0 };
    document.getElementById('score').innerText = "0000";
    document.getElementById('startExBtn').style.display = 'none';
    loadQuestion();
};

function loadQuestion() {
    if(examState.current >= EXAM_DB.length) {
        // Finish
        document.getElementById('examQuestion').innerText = `ASSESSMENT COMPLETE. SCORE: ${examState.score} / ${EXAM_DB.length * 100}`;
        document.getElementById('examOptions').innerHTML = '';
        document.getElementById('startExBtn').style.display = 'block';
        document.getElementById('startExBtn').innerHTML = 'RESTART EXAM <i class="fas fa-redo"></i>';
        document.getElementById('nextExBtn').style.display = 'none';
        return;
    }

    const q = EXAM_DB[examState.current];
    document.getElementById('examQuestion').innerText = q.q;
    document.getElementById('progress').innerText = `${examState.current + 1} / ${EXAM_DB.length}`;
    
    const optsDiv = document.getElementById('examOptions');
    optsDiv.innerHTML = '';
    
    q.opts.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'exam-opt-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx, q.a, btn);
        optsDiv.appendChild(btn);
    });
    
    document.getElementById('nextExBtn').style.display = 'none';
    document.getElementById('examFeedback').innerHTML = '';
}

function checkAnswer(selected, correct, btnElement) {
    // Disable all
    const all = document.querySelectorAll('.exam-opt-btn');
    all.forEach(b => b.disabled = true);

    if(selected === correct) {
        btnElement.classList.add('correct');
        examState.score += 100;
        document.getElementById('score').innerText = examState.score;
        document.getElementById('examFeedback').innerHTML = '<span style="color:#0f0">CORRECT // DATA VERIFIED</span>';
    } else {
        btnElement.classList.add('wrong');
        all[correct].classList.add('correct'); // Show right answer
        document.getElementById('examFeedback').innerHTML = '<span style="color:red">INCORRECT // DATA CORRUPTED</span>';
    }
    
    document.getElementById('nextExBtn').style.display = 'inline-flex';
}

window.nextQuestion = () => {
    examState.current++;
    loadQuestion();
};


/* ==========================================================================
   8. SYSTEM BOOT
   ========================================================================== */
// Jalankan Boot Sequence saat halaman dimuat
window.onload = () => Core.bootSystem();

/**
 * END OF SYSTEM CORE
 * IEA OMEGA INFINITY
 */
