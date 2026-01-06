// =========================
// script.js - IEA Astronomi
// =========================

// Pastikan Three.js sudah di-import di HTML, misal:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js"></script>

document.addEventListener("DOMContentLoaded", () => {

  // ---------- GLOBAL VARIABLES ----------
  const modal = document.querySelector(".modal");
  const modalInner = document.querySelector(".modal-inner");
  const modalContent = document.querySelector(".modal-content");
  const cards = document.querySelectorAll(".card");
  let currentObject = null;

  // ---------- PLANET / OBJECT DATA ----------
  const objectsData = [
    {
      name: "Bumi",
      type: "planet",
      description: "Bumi adalah planet ketiga dari Matahari, satu-satunya planet yang diketahui memiliki kehidupan.",
      radius: 1,
      color: 0x2fa0ff,
      facts: {
        "Diameter": "12.742 km",
        "Orbit": "365,25 hari",
        "Gravitasi": "9.807 m/s²",
        "Atmosfer": "Nitrogen, Oksigen"
      }
    },
    {
      name: "Mars",
      type: "planet",
      description: "Mars dikenal sebagai planet merah, dengan permukaan berbatu dan gunung berapi terbesar di Tata Surya.",
      radius: 0.53,
      color: 0xff4500,
      facts: {
        "Diameter": "6.779 km",
        "Orbit": "687 hari",
        "Gravitasi": "3.721 m/s²",
        "Atmosfer": "Karbon dioksida, Nitrogen"
      }
    },
    {
      name: "Matahari",
      type: "star",
      description: "Bintang pusat Tata Surya, sumber energi dan cahaya bagi planet-planet.",
      radius: 5,
      color: 0xffdd00,
      facts: {
        "Diameter": "1.391.000 km",
        "Temperatur": "5.500 °C",
        "Umur": "4,6 miliar tahun",
        "Tipe": "G2V"
      }
    },
    {
      name: "Andromeda",
      type: "galaxy",
      description: "Galaksi spiral terbesar yang dekat dengan Bima Sakti, sekitar 2,5 juta tahun cahaya dari Bumi.",
      radius: 7,
      color: 0x9d00ff,
      facts: {
        "Jenis": "Spiral",
        "Jarak": "2,5 juta tahun cahaya",
        "Bintang": "1 triliun"
      }
    },
    // Tambahkan objek lainnya sesuai kebutuhan...
  ];

  // ---------- MODAL FUNCTION ----------
  function showModal(object) {
    modal.classList.add("show");
    currentObject = object;

    // Set Title & Description
    modalContent.innerHTML = `
      <h2>${object.name}</h2>
      <p class="long-desc">${object.description}</p>
      <div class="facts">
        <table>
          ${Object.entries(object.facts).map(([key,val]) => `<tr><td>${key}</td><td>${val}</td></tr>`).join("")}
        </table>
      </div>
      <div id="three-canvas-container" style="width:100%;height:400px;margin-top:16px;"></div>
    `;

    // Render Three.js visual
    renderThree(object);
  }

  function closeModal() {
    modal.classList.remove("show");
    currentObject = null;
    // Hapus canvas Three.js untuk mencegah memory leak
    const container = document.getElementById("three-canvas-container");
    container.innerHTML = "";
  }

  // Close modal ketika klik di luar
  modal.addEventListener("click", (e) => {
    if(e.target === modal) closeModal();
  });

  // ---------- CARD CLICK EVENTS ----------
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const objName = card.getAttribute("data-name");
      const object = objectsData.find(o => o.name === objName);
      if(object) showModal(object);
    });
  });

  // ---------- THREE.JS SCENE ----------
  function renderThree(object) {
    const container = document.getElementById("three-canvas-container");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020117);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / 400, 0.1, 1000);
    camera.position.z = 10;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(container.clientWidth, 400);
    container.appendChild(renderer.domElement);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10,10,10);
    scene.add(pointLight);

    // OBJECT MESH
    let geometry;
    if(object.type === "planet") geometry = new THREE.SphereGeometry(object.radius, 48, 48);
    if(object.type === "star") geometry = new THREE.SphereGeometry(object.radius, 64, 64);
    if(object.type === "galaxy") geometry = new THREE.TorusKnotGeometry(object.radius, 0.5, 128, 32);

    const material = new THREE.MeshStandardMaterial({
      color: object.color,
      metalness:0.3,
      roughness:0.7,
      emissive: object.type === "star" ? 0xffff66 : 0x000000,
      emissiveIntensity: object.type === "star" ? 0.8 : 0
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ORBITAL STARS BACKGROUND
    const starGeo = new THREE.BufferGeometry();
    const starCount = 500;
    const starVertices = [];
    for(let i=0;i<starCount;i++){
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = THREE.MathUtils.randFloatSpread(100);
      const z = THREE.MathUtils.randFloatSpread(100);
      starVertices.push(x,y,z);
    }
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starVertices,3));
    const starMat = new THREE.PointsMaterial({color:0xffffff, size:0.2});
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // ---------- ANIMATION ----------
    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.003;
      if(object.type==="galaxy") mesh.rotation.x += 0.002;
      renderer.render(scene, camera);
    }
    animate();

    // ---------- RESPONSIVE ----------
    window.addEventListener("resize", ()=>{
      camera.aspect = container.clientWidth / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth,400);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {

  // =========================
// COSMIC STAR BACKGROUND
// =========================
const canvas = document.getElementById("cosmicStars");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 140;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars(){
  stars = [];
  for(let i = 0; i < STAR_COUNT; i++){
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      alpha: Math.random() * 0.6 + 0.2
    });
  }
}
createStars();

function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.fill();

    // gerak pelan ke bawah
    star.y += star.speed;

    if(star.y > canvas.height){
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawStars);
}
drawStars();



  // =========================
// SETTINGS PANEL LOGIC
// =========================
const settingsPanel = document.getElementById("settings-panel");
const settingsBtn = document.querySelector(".nav-btn:nth-child(2)"); // tombol settings
const settingsClose = document.getElementById("settings-close");

// buka settings
if (settingsBtn && settingsPanel) {
  settingsBtn.addEventListener("click", () => {
    settingsPanel.classList.toggle("collapsed");
  });
}

// tutup settings
if (settingsClose) {
  settingsClose.addEventListener("click", () => {
    settingsPanel.classList.add("collapsed");
  });
}

// toggle Today Sky
const toggleSky = document.getElementById("toggle-today-sky");
const todaySky = document.getElementById("today-sky");

if (toggleSky && todaySky) {
  toggleSky.addEventListener("change", () => {
    todaySky.style.display = toggleSky.checked ? "block" : "none";
    localStorage.setItem("showTodaySky", toggleSky.checked);
  });

  // load setting
  const saved = localStorage.getItem("showTodaySky");
  if (saved === "false") {
    toggleSky.checked = false;
    todaySky.style.display = "none";
  }
}

// =========================
// COSMIC MODE TOGGLE
// =========================
const toggleCosmic = document.getElementById("toggle-cosmic");

if (toggleCosmic) {
  toggleCosmic.addEventListener("change", () => {
    document.body.classList.toggle("cosmic-mode", toggleCosmic.checked);
    localStorage.setItem("cosmicMode", toggleCosmic.checked);
  });

  // load status
  if (localStorage.getItem("cosmicMode") === "true") {
    toggleCosmic.checked = true;
    document.body.classList.add("cosmic-mode");
  }
}



  // =========================
// TODAY SKY COLLAPSIBLE
// =========================
const skyBox = document.getElementById("today-sky");
const skyHeader = document.getElementById("today-sky-header");

if (skyBox && skyHeader) {
  skyHeader.addEventListener("click", () => {
    skyBox.classList.toggle("collapsed");
  });
}


  document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
  });
});

  // =========================
  // QUICK INFO BAR - IEA
  // =========================

  const ieaFacts = [
    "Matahari menyumbang 99,86% massa tata surya",
    "Cahaya Matahari butuh 8 menit ke Bumi",
    "Neutron star lebih padat dari atom",
    "Satu hari di Venus lebih lama dari satu tahunnya",
    "Black hole tidak 'menyedot', tapi membengkokkan ruang-waktu",
    "Galaksi Bima Sakti punya lebih dari 100 miliar bintang"
  ];

  const cards = document.querySelectorAll(".card");
  let planet = 0, star = 0, moon = 0;

  cards.forEach(card => {
    const type = card.dataset.type;
    if (type === "planet") planet++;
    else if (type === "star") star++;
    else if (type === "moon") moon++;
  });

  const total = cards.length;

  const statsEl = document.getElementById("iea-stats");
  if (statsEl) {
    statsEl.textContent =
      ` ${planet} Planet |  ${star} Bintang |  ${moon} Bulan |  ${total} Objek`;
  }

  const factEl = document.getElementById("iea-fact");
  if (factEl) {
   function updateFact() {
  factEl.style.opacity = 0;
  factEl.style.transform = "translateY(4px)";

  setTimeout(() => {
    const random = ieaFacts[Math.floor(Math.random() * ieaFacts.length)];
    factEl.textContent = "💡 " + random;
    factEl.style.opacity = 1;
    factEl.style.transform = "translateY(0)";
  }, 300);
}

    updateFact();
    setInterval(updateFact, 8000);
  }

});

// =========================
// AI EXPLAIN MODE LOGIC
// =========================
let currentExplainLevel = "smp";

// contoh data awal (nanti bisa diperluas)
const explainText = {
  earth: {
    smp: "Bumi adalah planet tempat kita tinggal. Di Bumi ada air, udara, dan makhluk hidup.",
    sma: "Bumi adalah planet berbatu dengan atmosfer yang mendukung kehidupan.",
    mahasiswa: "Bumi merupakan planet terestrial dengan sistem geodinamo aktif yang menghasilkan medan magnet."
  },
  sun: {
    smp: "Matahari adalah bintang yang memberi cahaya dan panas ke Bumi.",
    sma: "Matahari adalah bintang tipe G yang menjadi pusat tata surya.",
    mahasiswa: "Matahari adalah bintang deret utama tipe G2V yang menghasilkan energi melalui fusi nuklir."
  }
};

// tombol mode
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("explain-btn")) return;

  document.querySelectorAll(".explain-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  e.target.classList.add("active");
  currentExplainLevel = e.target.dataset.level;

  if (currentObject && explainText[currentObject]) {
    modalDesc.innerText = explainText[currentObject][currentExplainLevel];
  }
});

