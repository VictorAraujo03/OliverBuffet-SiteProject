// Máscara no telefone
var telefone = document.getElementById('telefone');
var maskOptions = {
    mask: '(00) 00000-0000'
};
var mask = IMask(telefone, maskOptions);

// Validação do nome (bloqueia números e símbolos)
var nomeInput = document.getElementById('nome');
nomeInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
});

nomeInput.addEventListener('blur', function () {
    if (this.value.trim().length > 0 && this.value.trim().length < 3) {
        this.setCustomValidity("O nome deve ter no mínimo 3 caracteres.");
        this.reportValidity();
    } else {
        this.setCustomValidity("");
    }
});

// Mensagens personalizadas de validação
const termos = document.getElementById("termosContato");

nomeInput.addEventListener("invalid", function () {
    nomeInput.setCustomValidity("Por favor, insira seu nome.");
});
nomeInput.addEventListener("input", function () {
    nomeInput.setCustomValidity("");
});

telefone.addEventListener("invalid", function () {
    telefone.setCustomValidity("Por favor, insira seu número de telefone.");
});
telefone.addEventListener("input", function () {
    telefone.setCustomValidity("");
});

termos.addEventListener("invalid", function () {
    termos.setCustomValidity("Você precisa aceitar os termos para continuar.");
});
termos.addEventListener("input", function () {
    termos.setCustomValidity("");
});

// ==================================================
// SISTEMA DE ABAS
// ==================================================

function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content-item').forEach(content => content.classList.remove('active'));
    event.target.closest('.tab-button').classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
    document.querySelector('.tabs-container').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Animação de scroll reveal
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-box, .produto-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================================================
// GALERIA DE FOTOS
// ==================================================

const galleryImages = [
    { src: 'img/imagem1.jpg', alt: 'Equipe Oliver Buffet' },
    { src: 'img/imagem2.jpg', alt: 'Crepes no palito' },
    { src: 'img/imagem3.jpg', alt: 'Nossos Fondue' },
    { src: 'img/imagem4.jpg', alt: 'Algodão doce' },
    { src: 'img/imagem5.jpg', alt: 'Equipe Oliver Buffet 2' },
    { src: 'img/imagem6.jpg', alt: 'Pipocas' },
    { src: 'img/imagem7.jpg', alt: 'Equipe Oliver Buffet 3' },
    { src: 'img/imagem8.jpg', alt: 'Equipe Oliver Buffet 4' }
];

let currentImageIndex = 0;

function openGallery(index) {
    currentImageIndex = index;
    showImage();
    document.getElementById('galleryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGallery(event) {
    if (event.target.id === 'galleryModal' || event.target.classList.contains('gallery-close')) {
        document.getElementById('galleryModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    showImage();
}

function showImage() {
    const img = galleryImages[currentImageIndex];
    document.getElementById('galleryImage').src = img.src;
    document.getElementById('galleryCaption').textContent = img.alt;
    document.getElementById('galleryCounter').textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('galleryModal');
    if (modal.classList.contains('active')) {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// ==================================================
// MENU HAMBÚRGUER (REDES SOCIAIS)
// ==================================================

const menuToggle = document.getElementById('menuToggle');
const socialMenu = document.getElementById('socialMenu');

if (menuToggle && socialMenu) {
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        socialMenu.classList.toggle('active');
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInside = menuToggle.contains(event.target) || socialMenu.contains(event.target);
        if (!isClickInside && socialMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            socialMenu.classList.remove('active');
        }
    });
}

// ==================================================
// MODAL DE SUCESSO E ENVIO DO FORMULÁRIO
// ==================================================

function fecharModal() {
    document.getElementById('modalSucesso').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Flag global para prevenir envios duplicados
let formularioEnviando = false;

// Aguarda DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // Fechar modal clicando fora
    const modalSucesso = document.getElementById('modalSucesso');
    if (modalSucesso) {
        modalSucesso.addEventListener('click', function(e) {
            if (e.target.id === 'modalSucesso') {
                fecharModal();
            }
        });
    }

    // ÚNICO addEventListener para o formulário
    const formulario = document.getElementById("formulario");
    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            // Previne envios duplicados
            if (formularioEnviando) {
                console.log('⚠️ Envio já em andamento, aguarde...');
                return false;
            }

            console.log('✅ Iniciando envio do formulário...');
            formularioEnviando = true;

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Adiciona data e hora
            data.data_envio = new Date().toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo"
            });

            // Desabilita botão
            const btnEnviar = document.getElementById('botao-enviar');
            const textoOriginal = btnEnviar.innerHTML;
            btnEnviar.disabled = true;
            btnEnviar.innerHTML = 'ENVIANDO... <i class="fas fa-spinner fa-spin"></i>';

            fetch("https://hook.us2.make.com/wj7ev8tj8p4xj4qan9thjebhn5rg3052", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                console.log('✅ Formulário enviado com sucesso!');
                
                // Reseta formulário
                formulario.reset();
                
                // Restaura botão
                btnEnviar.disabled = false;
                btnEnviar.innerHTML = textoOriginal;
                
                // Mostra modal
                document.getElementById('modalSucesso').classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Libera flag após 2 segundos
                setTimeout(function() {
                    formularioEnviando = false;
                    console.log('🔓 Flag liberada');
                }, 2000);
            })
            .catch(error => {
                console.error('❌ Erro ao enviar:', error);
                
                alert("Ops! Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.");
                
                // Restaura botão
                btnEnviar.disabled = false;
                btnEnviar.innerHTML = textoOriginal;
                
                // Libera flag
                formularioEnviando = false;
            });
        }, { once: false }); // Garante que só adiciona 1 listener
    }
});