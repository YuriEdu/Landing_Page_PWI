const header = document.querySelector("header");
const heroSection = document.getElementById("hero-section");
const main = document.querySelector("main");
const body = document.querySelector("body");
const overlay = document.querySelector("#pageOverlay");

const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleBreakpointChange(event) {
  if (event.matches) {
    header.innerHTML = `
        <div id="mobile-header">
            <div id="mobile-brand">
                <img src="images/SGP_Logo_Small.png" alt="">
            </div>
            <div id="mobile-nav">
                <i id="bars" class="fa-solid fa-bars fa-2x"></i>
            </div>
            <ul class="mobile-nav-links" id="mobile-nav-links">
                <div id="mobile-nav-brand">
                    <img src="images/SGP_Logo_Small.png" alt="">
                </div>
                <a href="#inicio"><li><i class="fa-solid fa-home"></i>Início</li></a>
                <a href="#serviços"><li><i class="fa-solid fa-handshake"></i>Serviços</li></a>
                <a href="#depoimentos"><li><i class="fa-solid fa-comments"></i>Depoimentos</li></a>
                <a href="#contato"><li><i class="fa-solid fa-address-book"></i>Contato</li></a>
            </ul>
        </div>
    `;
    heroSection.innerHTML = `
        <div id="mobile-big-hero">
            <img src="images/SGP_Logo.png" alt="">
        </div>
    `;
    main.innerHTML = `
        <div id="mobile-main-section">
            <div class="mobile-card" id="mobile-card1">
                <img id="escrita" src="images/escrita.png" alt="">
            </div>
            <div class="mobile-card" id="mobile-card2">
                <img src="images/editing.png" alt="">
            </div>
            <div class="mobile-card" id="mobile-card3">
                <img src="images/tv.png" alt="">
            </div>
        </div>
    `
    const hamburger = document.getElementById('bars');
    const navLinks = document.getElementById('mobile-nav-links');

    hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');

            body.classList.toggle('nav-open');

            hamburger.classList.toggle('fa-x');
            hamburger.classList.toggle('fa-bars');

            const isOpen = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });
  } else {
    header.innerHTML = `        
        <div id="header-content">
            <div id="brand">
                <img src="images/SGP_Logo_Small.png" alt="">
            </div>
            <div id="links">
                <nav id="nav">
                    <a href="#início">Início</a>
                    <a href="#serviços">Serviços</a>
                    <a href="#depoimentos">Depoimentos</a>
                    <a href="#contato">Contato</a>
                </nav>
            </div>
        </div>
        `;
    heroSection.innerHTML = `
        <div id="bigger-hero">
            <img src="images/SGP_Logo.png" alt="">
        </div>
        <h3>Trazendo comerciais <strong>profissionais</strong> para o seu negócio</h3>
    `;
    main.innerHTML = `
        <div id="main-section">
            <div id="hero">
                <img id="herocard" src="images/herocard.png" alt="">
            </div>
            <div class="card" id="card1">
                <img id="escrita" src="images/escrita.png" alt="">
            </div>
            <div class="card" id="card2">
                <img src="images/editing.png" alt="">
            </div>
            <div class="card" id="card3">
                <img src="images/tv.png" alt="">
            </div>
        </div>
    `;
  }
}

mediaQuery.addEventListener("change", handleBreakpointChange);

handleBreakpointChange(mediaQuery);