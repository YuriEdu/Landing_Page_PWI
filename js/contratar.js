const header = document.querySelector("header");
const heroSection = document.getElementById("hero-section");
const main = document.querySelector("main");
const body = document.querySelector("body");
const overlay = document.querySelector("#pageOverlay");
const form = document.getElementById('protoForm');
const clearBtn = document.getElementById('clearBtn');
const statusMsg = document.getElementById('statusMsg');
const STORAGE_KEY = 'saul_productions_briefing';

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

    function loadSavedData() {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          
          // Mapeia as propriedades salvas de volta para os campos do formulário
          Object.keys(parsedData).forEach(key => {
            const inputField = form.elements[key];
            if (inputField) {
              inputField.value = parsedData[key];
            }
          });
          showStatus('Rascunho de briefing recuperado do armazenamento local.', '#34d399');
        } catch (e) {
          console.error('Erro ao ler os dados do localStorage', e);
        }
      }
    }

    // 2. Captura os dados do formulário e salva como string no LocalStorage
    function saveFormData(event) {
      event.preventDefault(); // Evita o envio padrão do formulário HTTP
      
      const formData = new FormData(form);
      const dataObject = Object.fromEntries(formData.entries());
      
      console.log(dataObject);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObject));
      showStatus('Briefing salvo! Saul entrará em contato em breve.', '#f59e0b');
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
    clearBtn.addEventListener('click', clearStoredData);
    window.addEventListener('DOMContentLoaded', loadSavedData);

document.addEventListener("DOMContentLoaded", () => {
  if (!form) return;

  form.setAttribute("novalidate", "true");

  const fields = form.querySelectorAll("input, select, textarea");
  const telefoneInput = document.getElementById("telefone");

  // Injeta os elementos de erro dinamicamente
  fields.forEach(field => {
    const errorSpan = document.createElement("span");
    errorSpan.id = `${field.id}Error`;
    errorSpan.className = "error-message";
    errorSpan.setAttribute("aria-live", "polite");
    field.parentNode.appendChild(errorSpan);
    field.setAttribute("aria-describedby", errorSpan.id);
  });

  // Função para aplicar a máscara de telefone (Padrão BR)
  function aplicarMascaraTelefone(value) {
    if (!value) return "";
    
    // Remove qualquer caractere que não seja número
    value = value.replace(/\D/g, ""); 
    
    // Limita o máximo de caracteres a 11 (DDD + 9 dígitos)
    if (value.length > 11) value = value.slice(0, 11);

    // Aplica a formatação dinamicamente com base no tamanho
    if (value.length > 10) {
      // Formato com 9 dígitos: (XX) XXXXX-XXXX
      return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 6) {
      // Formato intermediário ou fixo com 8 dígitos: (XX) XXXX-XXXX
      return value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      // Formato inicial: (XX) XXXX
      return value.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (value.length > 0) {
      // Apenas o DDD: (XX
      return value.replace(/^(\d{0,2})$/, "($1");
    }
    return value;
  }

  // Intercepta a digitação no campo de telefone
  if (telefoneInput) {
    telefoneInput.addEventListener("input", (e) => {
      // Guarda a posição atual do cursor para evitar pulos chatos ao digitar
      const cursorPosition = e.target.selectionStart;
      const originalLength = e.target.value.length;

      // Aplica a máscara
      e.target.value = aplicarMascaraTelefone(e.target.value);

      // Ajusta a posição do cursor após a formatação
      const newLength = e.target.value.length;
      e.target.setSelectionRange(cursorPosition + (newLength - originalLength), cursorPosition + (newLength - originalLength));
    });
  }

  // Mensagens de erro personalizadas
  function getCustomMessage(field) {
    if (field.validity.valueMissing) {
      return "Este campo é obrigatório para fecharmos o contrato.";
    }
    if (field.validity.typeMismatch && field.type === "email") {
      return "Insira um endereço de email válido.";
    }
    // Validação extra para garantir que o telefone foi digitado por completo
    if (field.id === "telefone") {
      const apenasNumeros = field.value.replace(/\D/g, "");
      if (apenasNumeros.length < 10 && apenasNumeros.length > 0) {
        return "O telefone está incompleto. Insira o DDD + número.";
      }
    }
    return field.validationMessage;
  }

  // Função principal de validação por campo
  function validateField(field) {
    const errorSpan = document.getElementById(`${field.id}Error`);
    if (!errorSpan) return;

    const isSelectInvalid = field.tagName === "SELECT" && field.hasAttribute("required") && field.value === "";
    
    // Verifica se o telefone tem o tamanho mínimo de dígitos (10 para fixo, 11 para celular)
    let isPhoneInvalid = false;
    if (field.id === "telefone" && field.hasAttribute("required")) {
      const digitos = field.value.replace(/\D/g, "");
      if (digitos.length < 10) isPhoneInvalid = true;
    }

    const isNativeInvalid = !field.checkValidity();

    if (isNativeInvalid || isSelectInvalid || isPhoneInvalid) {
      field.classList.remove("valid");
      field.classList.add("invalid");
      errorSpan.textContent = getCustomMessage(field);
      errorSpan.style.display = "block";
      field.setAttribute("aria-invalid", "true");
    } else {
      if (field.value.trim() === "" && !field.hasAttribute("required")) {
        field.classList.remove("valid", "invalid");
        errorSpan.style.display = "none";
        return;
      }
      field.classList.remove("invalid");
      field.classList.add("valid");
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
      field.removeAttribute("aria-invalid");
    }
  }

  // Eventos para validação em tempo real
  fields.forEach(field => {
    field.addEventListener("blur", () => {
      validateField(field);
    });

    field.addEventListener("input", () => {
      if (field.classList.contains("invalid") || field.classList.contains("valid")) {
        validateField(field);
      }
    });

    field.addEventListener("change", () => {
      validateField(field);
    });
  });

  // Validação geral no Submit
  form.addEventListener("submit", (event) => {
    let isFormValid = true;

    fields.forEach(field => {
      validateField(field);
      if (field.classList.contains("invalid")) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      event.preventDefault();
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
    }
  });

  // Limpa o estado visual ao resetar o formulário
  const clearButtons = form.querySelectorAll(".btn-clear, .btn-wipe");
  clearButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      fields.forEach(field => {
        field.classList.remove("valid", "invalid");
        const errorSpan = document.getElementById(`${field.id}Error`);
        if (errorSpan) {
          errorSpan.textContent = "";
          errorSpan.style.display = "none";
        }
      });
    });
  });
});

mediaQuery.addEventListener("change", handleBreakpointChange);

handleBreakpointChange(mediaQuery);