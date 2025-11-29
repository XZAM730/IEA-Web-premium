/* ===================== */
/* FONT & RESET          */
/* ===================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body, html {
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    background: #000;
    color: #fff;
}

/* ===================== */
/* STARFIELD CANVAS       */
/* ===================== */
#stars {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: black;
}

/* ===================== */
/* HERO SECTION           */
/* ===================== */
.hero {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px;
}

.hero .glow {
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 20px #9d00ff, 0 0 40px #d100ff, 0 0 60px #ff00ff;
    margin-bottom: 20px;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    max-width: 600px;
}

.hero .btn {
    padding: 15px 35px;
    border-radius: 30px;
    background: linear-gradient(90deg, #7a00ff, #d100ff);
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: 0.4s;
}

.hero .btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px #d100ff, 0 0 50px #ff00ff;
}

/* ===================== */
/* SECTION BASE           */
/* ===================== */
.section {
    padding: 80px 20px;
    min-height: 80vh;
}

.title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 0 0 10px #d100ff;
}

.description, .long-text {
    text-align: center;
    font-size: 1rem;
    max-width: 900px;
    margin: 0 auto 40px auto;
    line-height: 1.8;
    color: #ccc;
}

/* ===================== */
/* GRID CARD              */
/* ===================== */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    justify-items: center;
}

.card {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(15px);
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.4s;
    width: 100%;
    max-width: 250px;
    box-shadow: 0 0 15px #7a00ff;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 25px #d100ff, 0 0 50px #ff00ff;
}

/* ===================== */
/* MODAL                  */
/* ===================== */
.modal {
    display: none;
    position: fixed;
    top:0; left:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.85);
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-box {
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(15px);
    padding: 30px;
    border-radius: 20px;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 0 25px #9d00ff;
    animation: fadeIn 0.4s ease forwards;
}

.modal-box h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: #fff;
}

.modal-box p {
    font-size: 1rem;
    margin-bottom: 20px;
    color: #ccc;
}

.modal-box button {
    padding: 10px 25px;
    border-radius: 20px;
    background: #7a00ff;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}

.modal-box button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px #d100ff;
}

@keyframes fadeIn {
    from {opacity:0; transform: translateY(-20px);}
    to {opacity:1; transform: translateY(0);}
}

/* ===================== */
/* FOOTER                 */
/* ===================== */
footer {
    text-align: center;
    padding: 40px 20px;
    background: rgba(0,0,0,0.8);
    color: #aaa;
    font-size: 0.9rem;
}

/* ===================== */
/* RESPONSIVE             */
/* ===================== */
@media(max-width:768px) {
    .hero .glow {
        font-size: 2rem;
    }
    .grid {
        gap: 20px;
    }
}

/* ===================== */
/* PLANET/GALAKSI/BLACKHOLE PREVIEW */
/* ===================== */
.planet-preview, .galaxy-preview, .blackhole-preview {
    width: 100%;
    height: 400px;
    border-radius: 20px;
    margin-top: 20px;
    background: rgba(255,255,255,0.02);
    box-shadow: 0 0 25px #d100ff;
}

/* Bisa dipakai nanti untuk Three.js */

