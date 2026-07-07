// LIKES
function darLike(boton) {
    var span      = boton.querySelector('span');
    var yaLikeado = boton.getAttribute('data-liked') === 'si';
    var cantidad  = parseInt(span.textContent) || 0;

    if (yaLikeado) {
        span.textContent = cantidad - 1;
        boton.setAttribute('data-liked', 'no');
        boton.classList.remove('liked');
    } else {
        span.textContent = cantidad + 1;
        boton.setAttribute('data-liked', 'si');
        boton.classList.add('liked');
        boton.style.transform = 'scale(1.2)';
        setTimeout(function () {
            boton.style.transform = 'scale(1)';
        }, 150);
    }
}

// MODAL
function abrirImagen(src, alt) {
    var modal        = document.getElementById('modal');
    var imagenGrande = document.getElementById('imagenGrande');
    imagenGrande.src = src;
    imagenGrande.alt = alt || '';
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden';
}

function cerrarImagen(event) {
    var modal        = document.getElementById('modal');
    var imagenGrande = document.getElementById('imagenGrande');
    if (event && event.target === imagenGrande) return;
    modal.classList.remove('activo');
    document.body.style.overflow = '';
    setTimeout(function () {
        imagenGrande.src = '';
        imagenGrande.alt = '';
    }, 200);
}

// Cerrar con Escape — espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') cerrarImagen();
    });
    // Menu toggle
    var toggles = document.querySelectorAll('.nav-toggle');
    toggles.forEach(function(btn){
        btn.addEventListener('click', function(){
            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            var nav = this.closest('.site-nav');
            var links = nav ? nav.querySelector('.nav-links') : null;
            if (links) {
                links.classList.toggle('show');
                var submenu = links.querySelector('.submenu');
                var submenuToggle = links.querySelector('.submenu-toggle');
                if (submenu) submenu.classList.remove('open');
                if (submenuToggle) submenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Submenu toggle for Inicio
    var submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(function(btn){
        btn.addEventListener('click', function(event){
            event.stopPropagation();
            var submenu = this.parentElement.querySelector('.submenu');
            if (!submenu) return;

            var expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));

            // Close any other open submenu before toggling this one
            document.querySelectorAll('.submenu.open').forEach(function(other){
                if (other !== submenu) {
                    other.classList.remove('open');
                    var otherToggle = other.parentElement.querySelector('.submenu-toggle');
                    if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                }
            });

            submenu.classList.toggle('open');
        });
    });

    // Close mobile menu and reset submenu when a link is selected
    var navLinks = document.querySelectorAll('.site-nav .nav-links a');
    navLinks.forEach(function(link){
        link.addEventListener('click', function(){
            var nav = this.closest('.site-nav');
            var toggle = nav ? nav.querySelector('.nav-toggle') : null;
            var links = nav ? nav.querySelector('.nav-links') : null;
            var submenus = links ? links.querySelectorAll('.submenu') : [];
            var submenuToggles = links ? links.querySelectorAll('.submenu-toggle') : [];

            submenus.forEach(function(submenu){
                submenu.classList.remove('open');
            });
            submenuToggles.forEach(function(btn){
                btn.setAttribute('aria-expanded', 'false');
            });
            if (links && links.classList.contains('show')) {
                links.classList.remove('show');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
