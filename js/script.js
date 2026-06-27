const header = document.querySelector("header");
const heroSection = document.getElementById("hero-section")

const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleBreakpointChange(event) {
  if (event.matches) {
    header.innerHTML = `
        <div id="mobile-header">
            <div id="mobile-brand">
                <img src="images/SGP_Logo_Small.png" alt="">
            </div>
            <div id="mobile-nav">
                <i class="fa-solid fa-bars fa-3x"></i>
            </div>
        </div>
    `;
    heroSection.innerHTML = `
        <div id="mobile-big-hero">
            <img src="images/SGP_Logo.png" alt="">
        </div>
    `;
  } else {
    header.innerHTML = `        
        <div id="header-content">
            <div id="brand">
                <img src="images/SGP_Logo_Small.png" alt="">
            </div>
            <div id="links">
                <nav id="nav">
                    <a href="#">Início</a>
                    <a href="#">Serviços</a>
                    <a href="#">Sobre</a>
                    <a href="#">Contato</a>
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
  }
}

mediaQuery.addEventListener("change", handleBreakpointChange);

handleBreakpointChange(mediaQuery);