/* =================================================================
   IEA OMEGA V2 - CENTRAL PROCESSING UNIT
   Code Name: "Neural Link"
   Author: IEA Command
   ================================================================= */

// [SYSTEM CONFIGURATION]
const CONFIG = {
    nasaApiKey: 'DEMO_KEY', // Gunakan DEMO_KEY atau API Key pribadimu
    animationSpeed: 30,     // Kecepatan ketikan intro
    fallbackImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3'
};

/* =================================================================
   MODULE 1: THE MEGA DATABASE (THE OMEGA ARCHIVE)
   Status: CLASSIFIED
   ================================================================= */
const DATABASE = [
    // --- 1. TATA SURYA (PLANETS & MOONS) ---
    {
        name: "Matahari (The Sun)", type: "star", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
        wikiQuery: "Sun",
        desc: "Bintang deret utama tipe-G di pusat Tata Surya. Mengandung 99,86% massa total tata surya. Sumber energi utama bagi kehidupan di Bumi."
    },
    {
        name: "Merkurius", type: "planet", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
        wikiQuery: "Mercury (planet)",
        desc: "Planet terkecil dan terdekat dengan Matahari. Tidak memiliki atmosfer yang signifikan untuk menahan panas, menyebabkan fluktuasi suhu ekstrem."
    },
    {
        name: "Venus", type: "planet", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
        wikiQuery: "Venus",
        desc: "Planet terpanas di Tata Surya karena efek rumah kaca yang tak terkendali. Atmosfernya tebal, beracun, dan dipenuhi awan asam sulfat."
    },
    {
        name: "Bumi (Earth)", type: "planet", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
        wikiQuery: "Earth",
        desc: "Satu-satunya planet yang diketahui menopang kehidupan. Memiliki medan magnet pelindung dan air dalam bentuk cair di permukaannya."
    },
    {
        name: "Mars", type: "planet", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
        wikiQuery: "Mars",
        desc: "Planet Merah. Rumah bagi Olympus Mons (gunung tertinggi di Tata Surya) dan Valles Marineris (ngarai terdalam). Target utama kolonisasi masa depan."
    },
    {
        name: "Jupiter", type: "planet", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
        wikiQuery: "Jupiter",
        desc: "Raksasa gas terbesar. Memiliki Bintik Merah Besar, badai antilsiklon yang lebih besar dari Bumi dan telah berkecamuk selama ratusan tahun."
    },
    {
        name: "Saturnus", type: "planet", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
        wikiQuery: "Saturn",
        desc: "Permata Tata Surya, terkenal dengan sistem cincinnya yang kompleks yang terdiri dari es dan debu. Memiliki kerapatan massa lebih rendah dari air."
    },
    {
        name: "Uranus", type: "planet", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
        wikiQuery: "Uranus",
        desc: "Raksasa es yang berotasi miring (menggelinding pada sisinya). Memiliki atmosfer terdingin di antara planet-planet Tata Surya (-224°C)."
    },
    {
        name: "Neptunus", type: "planet", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
        wikiQuery: "Neptune",
        desc: "Planet terjauh dari Matahari. Raksasa es yang dikenal dengan angin supersonik tercepat di Tata Surya, mencapai 2.100 km/jam."
    },
    {
        name: "Pluto", type: "planet", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg",
        wikiQuery: "Pluto",
        desc: "Planet kerdil di Sabuk Kuiper. Memiliki fitur permukaan berbentuk hati yang disebut Tombaugh Regio yang terbuat dari es nitrogen."
    },
    {
        name: "Europa", type: "planet", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/54/Europa-moon.jpg",
        wikiQuery: "Europa (moon)",
        desc: "Bulan Jupiter yang permukaannya tertutup es. Diperkirakan memiliki samudra air cair di bawah kerak esnya, kandidat kuat kehidupan ekstraterestrial."
    },
    {
        name: "Titan", type: "planet", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/90/Titan_in_natural_color_Cassini.jpg",
        wikiQuery: "Titan (moon)",
        desc: "Bulan terbesar Saturnus. Satu-satunya bulan dengan atmosfer tebal dan danau metana cair di permukaannya."
    },

    // --- 2. BINTANG (STARS) ---
    {
        name: "UY Scuti", type: "star", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/f/fe/UY_Scuti_size_comparison_to_the_Sun.png",
        wikiQuery: "UY Scuti",
        desc: "Salah satu bintang terbesar yang diketahui. Hypergiant merah ini begitu besar sehingga jika diletakkan di pusat tata surya, tepinya akan menelan Jupiter."
    },
    {
        name: "Stephenson 2-18", type: "star", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/92/Stephenson_2-18_size_comparison.jpg",
        wikiQuery: "Stephenson 2-18",
        desc: "Pemegang rekor bintang terbesar saat ini. Radiusnya diperkirakan 2.150 kali lipat Matahari. Volume-nya bisa memuat 10 miliar Matahari."
    },
    {
        name: "Betelgeuse", type: "star", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/57/Betelgeuse_ALMA.jpg",
        wikiQuery: "Betelgeuse",
        desc: "Supergiant merah di rasi Orion yang sekarat. Diprediksi akan meledak sebagai Supernova dalam waktu dekat (skala astronomi), yang akan terlihat di siang hari."
    },
    {
        name: "Sirius A", type: "star", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Sirius_A_and_B_Hubble_photo.jpg",
        wikiQuery: "Sirius",
        desc: "Bintang paling terang di langit malam Bumi. Merupakan sistem bintang biner dengan pendamping kerdil putih (Sirius B)."
    },
    {
        name: "Rigel", type: "star", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Rigel_by_Harel_Boren.jpg/600px-Rigel_by_Harel_Boren.jpg",
        wikiQuery: "Rigel",
        desc: "Supergiant biru yang sangat panas dan terang di rasi Orion. Memancarkan energi 120.000 kali lebih banyak daripada Matahari."
    },
    {
        name: "Proxima Centauri", type: "star", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/9/95/New_Shot_of_Proxima_Centauri.jpg",
        wikiQuery: "Proxima Centauri",
        desc: "Bintang terdekat dengan Matahari (4,2 tahun cahaya). Sebuah katai merah kecil yang sering memancarkan suar bintang (solar flare) yang dahsyat."
    },

    // --- 3. BLACK HOLE & VOID ---
    {
        name: "TON 618", type: "blackhole", glow: "purple",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Black_Hole_in_the_universe.jpg",
        wikiQuery: "TON 618",
        desc: "Raja segala monster. Lubang hitam ultramasif terbesar yang diketahui, dengan massa 66 miliar kali Matahari. Terangnya mengalahkan seluruh galaksi."
    },
    {
        name: "Sagittarius A*", type: "blackhole", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/EHT_Saggitarius_A_black_hole.tif",
        wikiQuery: "Sagittarius A*",
        desc: "Lubang hitam supermasif di jantung galaksi Bima Sakti. Objek inilah yang menjadi poros gravitasi bagi miliaran bintang di galaksi kita."
    },
    {
        name: "M87*", type: "blackhole", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg",
        wikiQuery: "Messier 87",
        desc: "Lubang hitam pertama yang berhasil difoto oleh umat manusia (Event Horizon Telescope). Memiliki semburan jet plasma sepanjang 5.000 tahun cahaya."
    },
    {
        name: "Phoenix A", type: "blackhole", glow: "red",
        img: "https://i.imgur.com/3Z8X9Xy.jpg", // Placeholder art for Phoenix A
        wikiQuery: "Phoenix Cluster",
        desc: "Entitas teoritis terbesar. Diperkirakan memiliki massa 100 miliar kali Matahari. Awalnya sebuah lubang hitam yang terus tumbuh tanpa henti."
    },
    {
        name: "Great Attractor", type: "blackhole", glow: "purple",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Earth%27s_Location_in_the_Universe_SMALL.jpg",
        wikiQuery: "Great Attractor",
        desc: "Anomali gravitasi misterius di ruang antargalaksi yang menarik Bima Sakti dan ribuan galaksi lain menuju titik kematiannya."
    },

    // --- 4. GALAKSI (GALAXIES) ---
    {
        name: "Bima Sakti (Milky Way)", type: "galaxy", glow: "purple",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/09/Milky_Way_2005.jpg",
        wikiQuery: "Milky Way",
        desc: "Galaksi rumah kita. Sebuah galaksi spiral berbatang yang berisi 100-400 miliar bintang. Diameter sekitar 100.000 tahun cahaya."
    },
    {
        name: "Andromeda", type: "galaxy", glow: "purple",
        img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/M31_Galaxy.jpg",
        wikiQuery: "Andromeda Galaxy",
        desc: "Tetangga galaksi besar terdekat. Berada di jalur tabrakan dengan Bima Sakti dan akan menyatu dalam 4,5 miliar tahun menjadi 'Milkomeda'."
    },
    {
        name: "Whirlpool Galaxy (M51)", type: "galaxy", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/d/db/Messier51_sRGB.jpg",
        wikiQuery: "Whirlpool Galaxy",
        desc: "Galaksi spiral klasik yang sedang berinteraksi dengan galaksi kerdil di dekatnya. Strukturnya sangat jelas terlihat."
    },
    {
        name: "Sombrero Galaxy", type: "galaxy", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg",
        wikiQuery: "Sombrero Galaxy",
        desc: "Galaksi spiral yang terlihat dari samping, menyerupai topi Sombrero. Memiliki tonjolan pusat yang sangat terang dan cincin debu tebal."
    },
    {
        name: "Cosmos Redshift 7", type: "galaxy", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/1/13/Cosmos_Redshift_7.jpg",
        wikiQuery: "Cosmos Redshift 7",
        desc: "Salah satu galaksi tertua yang pernah diamati, terbentuk tak lama setelah Big Bang. Namanya terinspirasi dari pemain bola Cristiano Ronaldo (CR7)."
    },

    // --- 5. NEBULA & LAINNYA ---
    {
        name: "Pillars of Creation", type: "nebula", glow: "gold",
        img: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
        wikiQuery: "Pillars of Creation",
        desc: "Bagian ikonik dari Nebula Elang. Tiang-tiang gas dan debu raksasa tempat bintang-bintang baru sedang dilahirkan."
    },
    {
        name: "Orion Nebula", type: "nebula", glow: "purple",
        img: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
        wikiQuery: "Orion Nebula",
        desc: "Salah satu nebula paling terang, terlihat dengan mata telanjang di pedang rasi Orion. Pabrik bintang masif terdekat dengan Bumi."
    },
    {
        name: "Crab Nebula", type: "nebula", glow: "blue",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Crab_Nebula.jpg",
        wikiQuery: "Crab Nebula",
        desc: "Sisa-sisa ledakan supernova yang diamati oleh astronom Tiongkok pada tahun 1054 M. Di pusatnya terdapat Pulsar yang berputar cepat."
    },
    {
        name: "Helix Nebula", type: "nebula", glow: "red",
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b1/NGC7293_%282004%29.jpg",
        wikiQuery: "Helix Nebula",
        desc: "Sering disebut 'Mata Tuhan' atau 'Mata Sauron'. Nebula planeter yang terbentuk dari kematian bintang mirip Matahari."
    },
    {
        name: "Oumuamua", type: "blackhole", glow: "red", // Kategori unik
        img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Oumuamua_artist_impression.jpg",
        wikiQuery: "Oumuamua",
        desc: "Objek antarbintang pertama yang terdeteksi melewati Tata Surya kita. Bentuknya lonjong seperti cerutu dan asalnya masih misterius."
    }
];

/* =================================================================
   MODULE 2: SYSTEM INITIALIZATION (BOOT SEQUENCE)
   ================================================================= */
const INTRO_LINES = [
    "INITIALIZING IEA OMEGA PROTOCOL...",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESSING DEEP SPACE ARCHIVES...",
    "SYNCING WITH NASA SATELLITE FEED...",
    "CALIBRATING NEURAL LINK...",
    "SYSTEM READY. WELCOME, COMMANDER."
];

let lineIndex = 0;
let charIndex = 0;
const typeContainer = document.getElementById('introText');

function typeWriter() {
    if (lineIndex < INTRO_LINES.length) {
        if (charIndex < INTRO_LINES[lineIndex].length) {
            typeContainer.innerHTML += INTRO_LINES[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, CONFIG.animationSpeed);
        } else {
            typeContainer.innerHTML += "<br>";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 300); // Pause antar baris
        }
    } else {
        // Efek Selesai, Tampilkan Tombol
        document.getElementById('agreementArea').classList.add('visible');
    }
}

// Event Listener: Protocol Checkbox
document.getElementById('protocolCheck').addEventListener('change', (e) => {
    const btn = document.getElementById('enterBtn');
    if (e.target.checked) {
        btn.classList.add('active');
        btn.removeAttribute('disabled');
    } else {
        btn.classList.remove('active');
        btn.setAttribute('disabled', 'true');
    }
});

// Event Listener: Enter System Button
document.getElementById('enterBtn').addEventListener('click', () => {
    const checkbox = document.getElementById('protocolCheck');
    if (!checkbox.checked) return;

    // Animasi Keluar Intro
    const introLayer = document.getElementById('intro-layer');
    introLayer.style.opacity = '0';
    introLayer.style.visibility = 'hidden';

    // Animasi Masuk App
    const app = document.querySelector('.app-container');
    setTimeout(() => {
        app.classList.add('visible');
        APP.init(); // Jalankan Aplikasi Utama
    }, 800);
});

// Auto-Start Intro saat load
window.onload = typeWriter;


/* =================================================================
   MODULE 3: MAIN APPLICATION LOGIC
   ================================================================= */
const APP = {
    // --- Inisialisasi Utama ---
    init: () => {
        APP.archive.renderGrid(DATABASE);
        APP.utils.startClock();
    },

    // --- Sub-Modul: Navigasi ---
    nav: {
        switchTab: (tabId) => {
            // Sembunyikan semua section
            document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
            // Matikan semua nav button
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

            // Aktifkan target
            document.getElementById(`page-${tabId}`).classList.add('active');
            
            // Highlight icon dock yang sesuai
            const dockIndex = ['archive', 'observatory', 'tools', 'academy'].indexOf(tabId);
            if(dockIndex !== -1) {
                document.querySelectorAll('.nav-item')[dockIndex].classList.add('active');
            }

            // Special Action: Fetch NASA jika tab observatory dibuka
            if(tabId === 'observatory') APP.observatory.fetchAPOD();
        }
    },

    // --- Sub-Modul: Archive (Database) ---
    archive: {
        renderGrid: (data) => {
            const grid = document.getElementById('cosmosGrid');
            grid.innerHTML = ""; // Bersihkan grid

            data.forEach(obj => {
                const card = document.createElement('div');
                card.className = "card";
                card.dataset.type = obj.type;
                
                // Fallback image handling
                const imgSrc = obj.img || CONFIG.fallbackImage;

                card.innerHTML = `
                    <div class="card-img-holder">
                        <img src="${imgSrc}" loading="lazy" alt="${obj.name}" onerror="this.src='${CONFIG.fallbackImage}'">
                    </div>
                    <div class="card-info">
                        <div class="card-title">${obj.name}</div>
                        <div class="card-type">${obj.type.toUpperCase()}</div>
                    </div>
                `;
                
                // Click Event untuk Modal
                card.onclick = () => APP.archive.openModal(obj);
                grid.appendChild(card);
            });
        },

        filter: (type, btn) => {
            // Update UI Button
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            if(btn) btn.classList.add('active'); // btn parameter opsional

            // Filter Data
            if (type === 'all') {
                // Tampilkan semua (Reset display style)
                document.querySelectorAll('.card').forEach(c => c.style.display = 'block');
            } else {
                document.querySelectorAll('.card').forEach(c => {
                    c.style.display = (c.dataset.type === type) ? 'block' : 'none';
                });
            }
        },

        search: (query) => {
            const term = query.toLowerCase();
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(c => {
                const title = c.querySelector('.card-title').innerText.toLowerCase();
                c.style.display = title.includes(term) ? 'block' : 'none';
            });
        },

        openModal: (obj) => {
            const modal = document.getElementById('infoModal');
            document.getElementById('modalTitle').innerText = obj.name;
            document.getElementById('modalType').innerText = obj.type.toUpperCase();
            document.getElementById('modalDesc').innerText = obj.desc || "Data classified. No description available.";
            document.getElementById('modalImg').src = obj.img;
            
            // Tombol Wiki Link
            const btn = document.getElementById('modalLinkBtn');
            btn.onclick = () => window.open(`https://en.wikipedia.org/wiki/${obj.wikiQuery}`, '_blank');

            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('open'), 10); // Trigger animasi CSS
        },

        closeModal: () => {
            const modal = document.getElementById('infoModal');
            modal.classList.remove('open');
            setTimeout(() => modal.style.display = 'none', 400); // Tunggu animasi selesai
        }
    },

    // --- Sub-Modul: Observatory (NASA API) ---
    observatory: {
        isFetched: false,
        fetchAPOD: async () => {
            if (APP.observatory.isFetched) return; // Jangan fetch ulang jika sudah ada
            
            const titleEl = document.getElementById('apodTitle');
            const descEl = document.getElementById('apodDesc');
            
            titleEl.innerText = "RECEIVING TRANSMISSION...";
            
            try {
                // Fetch data dari NASA
                const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${CONFIG.nasaApiKey}`);
                
                if (!res.ok) throw new Error("Signal Lost");

                const data = await res.json();
                
                // Update UI
                APP.observatory.isFetched = true;
                titleEl.innerText = data.title.toUpperCase();
                document.getElementById('apodDate').innerText = data.date;
                descEl.innerText = data.explanation;

                // Handle Video vs Image
                if (data.media_type === "video") {
                    document.getElementById('apodImg').style.display = 'none';
                    const vid = document.getElementById('apodVideo');
                    vid.style.display = 'block';
                    vid.src = data.url;
                } else {
                    document.getElementById('apodImg').src = data.url;
                }

            } catch (error) {
                // Fallback jika API Error/Limit Habis
                console.error(error);
                titleEl.innerText = "SIGNAL INTERRUPTED";
                descEl.innerText = "Connection to NASA Mainframe unstable (API Rate Limit Exceeded). Displaying offline backup data.";
                document.getElementById('apodImg').src = CONFIG.fallbackImage;
            }
        }
    },

    // --- Sub-Modul: Tools (Gravity) ---
    tools: {
        calculate: () => {
            const earthWeight = parseFloat(document.getElementById('weightInput').value);
            if (!earthWeight || isNaN(earthWeight)) return;

            // Faktor Gravitasi (Relative terhadap Bumi = 1)
            const G_FACTORS = {
                mars: 0.38,
                jupiter: 2.528,
                moon: 0.165,
                neutron: 140000000000 // Aproksimasi kasar
            };

            // Animasi Angka
            APP.utils.animateValue('val-mars', earthWeight * G_FACTORS.mars);
            APP.utils.animateValue('val-jupiter', earthWeight * G_FACTORS.jupiter);
            APP.utils.animateValue('val-moon', earthWeight * G_FACTORS.moon);
            
            // Neutron Star (Format Scientific karena angkanya gila)
            const neutronVal = earthWeight * G_FACTORS.neutron;
            document.getElementById('val-neutron').innerText = neutronVal.toExponential(2) + " KG";
        }
    },

    // --- Sub-Modul: Academy (Quiz) ---
    academy: {
        data: [
            { q: "Apa nama galaksi terdekat dengan Bima Sakti?", a: ["Andromeda", "Triangulum", "Whirlpool", "Sombrero"], c: 0 },
            { q: "Planet mana yang memiliki Bintik Merah Besar?", a: ["Mars", "Jupiter", "Saturnus", "Venus"], c: 1 },
            { q: "Apa itu Event Horizon?", a: ["Tepi Galaksi", "Batas Lubang Hitam", "Pusat Matahari", "Garis Khatulistiwa"], c: 1 },
            { q: "Berapa kecepatan cahaya?", a: ["300.000 km/s", "150.000 km/s", "1.000 km/jam", "Tak Terhingga"], c: 0 },
            { q: "Bintang terdekat dengan Bumi adalah?", a: ["Proxima Centauri", "Sirius", "Matahari", "Betelgeuse"], c: 2 }
        ],
        score: 0,
        currentIdx: 0,

        start: () => {
            APP.academy.score = 0;
            APP.academy.currentIdx = 0;
            document.getElementById('startQuizBtn').style.display = 'none';
            APP.academy.loadQuestion();
        },

        loadQuestion: () => {
            const quiz = APP.academy;
            
            // Cek jika kuis selesai
            if (quiz.currentIdx >= quiz.data.length) {
                document.getElementById('quizQuestion').innerText = `SIMULATION COMPLETE. FINAL SCORE: ${quiz.score} / ${quiz.data.length * 100}`;
                document.getElementById('quizOptions').innerHTML = "";
                document.getElementById('startQuizBtn').style.display = 'block';
                document.getElementById('startQuizBtn').innerHTML = 'RESTART SIMULATION <i class="fas fa-redo"></i>';
                document.getElementById('nextQuestion').style.display = 'none';
                return;
            }

            const qData = quiz.data[quiz.currentIdx];
            
            // Render Soal
            document.getElementById('qNum').innerText = quiz.currentIdx + 1;
            document.getElementById('scoreVal').innerText = quiz.score;
            document.getElementById('quizQuestion').innerText = qData.q;
            document.getElementById('nextQuestion').style.display = 'none';
            document.getElementById('quizResult').innerHTML = "";

            // Render Opsi
            const optsContainer = document.getElementById('quizOptions');
            optsContainer.innerHTML = "";
            
            qData.a.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.innerText = opt;
                btn.onclick = () => APP.academy.checkAnswer(idx, btn, qData.c);
                optsContainer.appendChild(btn);
            });
        },

        checkAnswer: (selectedIdx, btn, correctIdx) => {
            const opts = document.getElementById('quizOptions').children;
            
            // Disable semua tombol
            for (let b of opts) b.disabled = true;

            if (selectedIdx === correctIdx) {
                btn.classList.add('correct');
                APP.academy.score += 100;
                document.getElementById('scoreVal').innerText = APP.academy.score;
                document.getElementById('quizResult').innerHTML = "<span style='color:#0aff0a'>CORRECT ANSWER // DATA VERIFIED</span>";
            } else {
                btn.classList.add('wrong');
                opts[correctIdx].classList.add('correct'); // Tunjukkan jawaban benar
                document.getElementById('quizResult').innerHTML = "<span style='color:#ff3333'>INCORRECT // DATA CORRUPTED</span>";
            }

            // Tampilkan tombol Next
            document.getElementById('nextQuestion').style.display = 'block';
        },

        next: () => {
            APP.academy.currentIdx++;
            APP.academy.loadQuestion();
        }
    },

    // --- Sub-Modul: Utilities ---
    utils: {
        startClock: () => {
            setInterval(() => {
                const now = new Date();
                document.getElementById('stardate').innerText = "SYS TIME: " + now.toLocaleTimeString();
            }, 1000);
        },
        
        animateValue: (id, end) => {
            const obj = document.getElementById(id);
            const start = 0;
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
    }
};


/* =================================================================
   GLOBAL EVENT LISTENERS (BRIDGE)
   Menghubungkan HTML onclick dengan Object APP
   ================================================================= */

// Navigasi Tab
window.switchTab = (id) => APP.nav.switchTab(id);

// Archive
window.filterGrid = (type) => APP.archive.filter(type, event.target);
window.closeModal = () => APP.archive.closeModal();

// Search Listener
document.getElementById('searchInput').addEventListener('input', (e) => APP.archive.search(e.target.value));

// Modal Outside Click
window.onclick = (e) => {
    const modal = document.getElementById('infoModal');
    if (e.target == modal) APP.archive.closeModal();
};

// Tools
window.calculateWeight = () => APP.tools.calculate();

// Quiz
window.startQuiz = () => APP.academy.start();
window.nextQuiz = () => APP.academy.next();

// Init (Backup trigger jika intro di-skip manual, meski jarang terjadi)
// window.onload sudah di-handle di bagian INTRO
