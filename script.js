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
// TODAY SKY - IEA
// =========================

// tanggal hari ini
const now = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateEl = document.getElementById("sky-date");
if (dateEl) {
  dateEl.textContent = "📅 " + now.toLocaleDateString("id-ID", options);
}

// hitung fase bulan sederhana
function getMoonPhase(date) {
  const lunarCycle = 29.53;
  const refDate = new Date("2000-01-06"); // new moon reference
  const days = (date - refDate) / (1000 * 60 * 60 * 24);
  const phase = (days % lunarCycle) / lunarCycle;

  if (phase < 0.03 || phase > 0.97) return "Bulan Baru 🌑";
  if (phase < 0.22) return "Sabit Awal 🌒";
  if (phase < 0.28) return "Kuartal Pertama 🌓";
  if (phase < 0.47) return "Cembung Awal 🌔";
  if (phase < 0.53) return "Purnama 🌕";
  if (phase < 0.72) return "Cembung Akhir 🌖";
  if (phase < 0.78) return "Kuartal Terakhir 🌗";
  return "Sabit Akhir 🌘";
}

const moonEl = document.getElementById("moon-phase");
if (moonEl) {
  moonEl.textContent = " Fase Bulan: " + getMoonPhase(now);
}

// observasi rekomendasi
const observationEl = document.getElementById("sky-observation");
if (observationEl) {
  const hour = now.getHours();
  let obs;

  if (hour >= 18 || hour <= 4) {
    obs = "Cocok untuk observasi Bulan, planet terang, dan rasi bintang.";
  } else {
    obs = "Siang hari: aman untuk observasi Matahari (WAJIB filter).";
  }

  observationEl.textContent = " Observasi: " + obs;
}

// tips astronomi harian
const tips = [
  "Gunakan tripod untuk pengamatan lebih stabil.",
  "Matikan lampu sekitar saat observasi malam.",
  "Arahkan pandangan ke selatan untuk galaksi.",
  "Biarkan mata beradaptasi dengan gelap ±20 menit.",
  "Gunakan aplikasi peta langit untuk membantu navigasi."
];

const tipEl = document.getElementById("sky-tip");
if (tipEl) {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  tipEl.textContent = " Tips: " + randomTip;
}


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
      const random = ieaFacts[Math.floor(Math.random() * ieaFacts.length)];
      factEl.textContent = "💡 Fakta: " + random;
    }
    updateFact();
    setInterval(updateFact, 8000);
  }

});
