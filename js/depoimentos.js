const header = document.querySelector("header");
const heroSection = document.getElementById("hero-section");
const main = document.querySelector("main");
const body = document.querySelector("body");
const overlay = document.querySelector("#pageOverlay");
const form = document.getElementById('protoForm');
const clearBtn = document.getElementById('clearBtn');
const statusMsg = document.getElementById('statusMsg');
const STORAGE_KEY = 'saul_productions_depoimento';

const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleBreakpointChange(event) {
  if (event.matches) {
    header.innerHTML = `
        <div id="mobile-header">
            <div id="mobile-brand">
                <a href="index.html"><img src="images/SGP_Logo_Small.png" alt=""></a>
            </div>
            <div id="mobile-nav">
                <i id="bars" class="fa-solid fa-bars fa-2x"></i>
            </div>
            <ul class="mobile-nav-links" id="mobile-nav-links">
                <div id="mobile-nav-brand">
                    <i id="close" style="color: white" class="fa-solid fa-x fa-2x"></i>
                    <img src="images/SGP_Logo_Small.png" alt="">
                </div>
                <a id="home" href="index.html"><li><i class="fa-solid fa-arrow-left fa-2x"></i>Voltar à Página Inicial</li></a>
                <a id="home" href="#inicio"><li><i class="fa-solid fa-home fa-2x"></i>Início</li></a>
                <a id="address" href="#contato"><li><i class="fa-solid fa-address-book fa-2x"></i>Contato</li></a>
            </ul>
        </div>
    `;

    const hamburger = document.getElementById('bars');
    const closeHamburger = document.getElementById('close');

    const navLinks = document.getElementById('mobile-nav-links');
    
    hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('nav-open');

            const isOpen = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        navLinks.classList.remove('active');
    })

    closeHamburger.addEventListener('click', () => {
        overlay.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('nav-open');
    })

  } else {
    header.innerHTML = `        
        <div id="header-content">
            <div id="brand">
                <a style="margin: 0; padding: 0" href="index.html"><img src="images/SGP_Logo_Small.png" alt=""></a>
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
  }
}

    // 2. Captura os dados do formulário e salva como string no LocalStorage
    function saveFormData(event) {
      event.preventDefault(); // Evita o envio padrão do formulário HTTP
      
      const formData = new FormData(form);
      const dataObject = Object.fromEntries(formData.entries());
      
      console.log(dataObject);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObject));
      showStatus('Depoimento enviado!', '#f59e0b');
    }

    function clearForm() {
        // Selects the form by its ID and resets it
        form.reset();
    }

    // 3. Apaga os dados do LocalStorage
    function clearStoredData() {
      localStorage.removeItem(STORAGE_KEY);
      form.reset(); // Reseta os campos visíveis na interface
      showStatus('Dados apagados com sucesso!', '#ef4444');
    }

    // Função auxiliar para exibir mensagens de status na tela
    function showStatus(text, color) {
      statusMsg.textContent = text;
      statusMsg.style.color = color;
      setTimeout(() => { statusMsg.textContent = ''; }, 4000);
    }

    function resetStars() {
        // Find all radio inputs inside your star-rating container
        const stars = document.querySelectorAll('.star-rating input[type="radio"]');
        
        // Uncheck every single one
        stars.forEach(star => star.checked = false);

        clearForm();
    }
    // Eventos do Formulário
    form.addEventListener('submit', saveFormData);

mediaQuery.addEventListener("change", handleBreakpointChange);

handleBreakpointChange(mediaQuery);