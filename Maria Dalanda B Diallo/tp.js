// ──  TYPEWRITER sur le nom ──
function typewriter(el, vitesse = 60) {
    if (!el) return;
    const texte = el.textContent;
    el.textContent = '';
    let i = 0;
    const t = setInterval(() => {
        el.textContent += texte[i++];
        if (i >= texte.length) clearInterval(t);
    }, vitesse);
}
typewriter(document.querySelector('.sidbar h3 em'));


// ──  BARRES DE COMPÉTENCES (animation au scroll) ──
const observateur = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
            target.style.width = target.dataset.niveau + '%';
            observateur.unobserve(target);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.remplissage').forEach(b => observateur.observe(b));


// ──  SURVOL DES COMPÉTENCES ──
document.querySelectorAll('.comp-label').forEach(label => {
    const li = label.closest('li');
    if (!li) return;
    li.addEventListener('mouseenter', () => li.classList.add('comp-hover'));
    li.addEventListener('mouseleave', () => li.classList.remove('comp-hover'));
});


// ──  BOUTON RETOUR EN HAUT ──
const btnTop = document.getElementById('top');
if (btnTop) {
    window.addEventListener('scroll', () => {
        btnTop.classList.toggle('visible', window.scrollY > 200);
    });
    btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}


// ──  MODE SOMBRE / CLAIR + localStorage ──
const boutonTheme = document.createElement('button');
boutonTheme.id = 'themeToggle';
document.querySelector('.navbar').appendChild(boutonTheme);

const estSombre = localStorage.getItem('theme') === 'dark';
document.body.classList.toggle('dark-mode', estSombre);
boutonTheme.textContent = estSombre ? '☀️' : '🌙';

boutonTheme.addEventListener('click', () => {
    const sombre = document.body.classList.toggle('dark-mode');
    boutonTheme.textContent = sombre ? '☀️' : '🌙';
    localStorage.setItem('theme', sombre ? 'dark' : 'light');
});


// ──  MENU HAMBURGER + SMOOTH SCROLL ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(lien => {
    lien.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(lien.getAttribute('href'))
            ?.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('open');
        hamburger.textContent = '☰';
    });
});


// ──  FORMULAIRE DE CONTACT ──
function validerEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setEtat(id, etat, msg = '') {
    const champ  = document.getElementById(id);
    const erreur = document.getElementById('erreur-' + id);
    champ.classList.toggle('invalide', etat === 'erreur');
    champ.classList.toggle('valide',   etat === 'ok');
    if (erreur) erreur.textContent = msg;
}
 // Empêche le rechargement de la page
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById("nom");
    let email = document.getElementById("email");
    let message = document.getElementById("message");

    if (name.value !== "" && email.value !== "" && message.value !== "") {
        showToast('Merci pour votre message ! Nous vous répondrons dès que possible.', 'success');
        document.getElementById('contactForm').reset();
    } else {
        showToast('Veuillez remplir tous les champs !', 'error');
    }
});

function showToast(texte, type) {
    const toast = document.createElement('div');
    toast.textContent = texte;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#16202b' : '#c0392b'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 9999;
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
