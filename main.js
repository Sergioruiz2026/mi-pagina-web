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

const translations = {
    es: {
        themeLabel: 'Cambiar tema',
        langLabel: 'Cambiar idioma',
        logoArc: 'Escuela de Patinaje Artístico',
        heroSubtitle: 'Club formativo y competitivo',
        homeTitle: 'Conoce más sobre Ayekantún',
        footer: {
            supportTitle: '📞 Soporte',
            nameLabel: 'Nombre:',
            emailLabel: '📧 Correo:',
            whatsappLabel: '💬 WhatsApp:',
            socialTitle: 'Síguenos en Nuestras Redes',
            copyright: '© 2024 Ayekantún - Escuela de Patinaje Artístico. Todos los derechos reservados.',
            location: 'Quilpué, Región de Valparaíso, Chile'
        },
        cards: {
            history: { title: '📖 Nuestra Historia', desc: 'Conoce cómo nació Ayekantún en 2017 y nuestra trayectoria en el patinaje artístico.' },
            mission: { title: '🎯 Nuestra Misión', desc: 'Formar deportistas íntegras a través de la disciplina, respeto y pasión por el patinaje.' },
            vision: { title: '✨ Nuestra Visión', desc: 'Ser referentes en la formación de deportistas y contribuir al patinaje artístico en la región.' },
            laEscuelita: { title: '🏫 La Escuelita', desc: 'Descubre el espacio de aprendizaje, alegría y crecimiento para niñas y niños.' },
            info: { title: 'ℹ️ Información', desc: 'Mantente informado sobre campeonatos, eventos y novedades del club.' }
        },
        sections: {
            history: {
                title: '📖 Nuestra Historia',
                text: 'El Club de Patinaje Artístico Ayekantún nació en enero de 2017 en Quilpué. Durante estos años nos hemos consolidado como referente formativo, siendo cuna de destacados deportistas. Participamos en campeonatos nacionales, obteniendo importantes resultados.',
                extra1: 'Somos una organización comprometida con la excelencia en la formación de nuestros deportistas. A través de entrenamiento riguroso y apoyo integral, hemos logrado que muchas de nuestras patinadores participen en competencias a nivel nacional y regional.',
                extra2: 'Nuestro club es un espacio seguro, inclusivo y formativo donde se desarrollan no solo habilidades deportivas, sino también valores como el respeto, la disciplina, el trabajo en equipo y la perseverancia que les acompañarán toda la vida.'
            },
            mission: {
                title: '🎯 Nuestra Misión',
                text: 'Formar deportistas y personas íntegras a través del patinaje artístico, promoviendo el desarrollo deportivo, personal y social en un ambiente basado en el respeto, la disciplina, el compañerismo y la pasión.'
            },
            vision: {
                title: '✨ Nuestra Visión',
                text: 'Ser un club reconocido por la excelencia en la formación de deportistas, por el compromiso con nuestra comunidad y contribuir al crecimiento del patinaje artístico en Quilpué y la Región de Valparaíso.'
            },
            information: {
                title: 'ℹ️ Información',
                text: 'Este es nuestro canal oficial de comunicación. Aquí encontrarás información relevante del club: campeonatos, competencias, reuniones, calendario de actividades, noticias y novedades. Mantenemos a todas las familias informadas de manera clara y oportuna.',
                extra1: 'Mediante este canal nos mantenemos en contacto permanente con las familias, compartiendo actualizaciones sobre competencias, entrenamientos especiales, cambios de horario, y eventos relevantes para nuestra comunidad.',
                extra2: 'También aquí publicamos logros de nuestras deportistas, fotos de eventos, videos de competencias y comunicados importantes. Te invitamos a seguirnos en WhatsApp e Instagram para no perderte ninguna noticia.'
            }
        },
        nav: {
            inicio: 'Inicio',
            laEscuelita: 'La Escuelita',
            deportistas: 'Deportistas',
            entrenadora: 'Entrenadora',
            galeria: 'Galería',
            videos: 'Videos',
            contacto: 'Contacto',
            historia: 'Historia',
            mision: 'Nuestra Misión',
            vision: 'Nuestra Visión',
            informacion: 'Información'
        },
        pageTitles: {
            home: 'Ayekantún - Escuela de Patinaje Artístico',
            contacto: 'Ayekantún - Contacto',
            deportistas: 'Ayekantún - Deportistas',
            entrenadora: 'Ayekantún - Entrenadora',
            galeria: 'Ayekantún - Galería',
            videos: 'Ayekantún - Videos'
        },
        pages: {
            laEscuelita: {
                heroTitle: 'La Escuelita',
                heroText: 'Un espacio de formación, alegría y crecimiento para niñas y niños.',
                sectionTitle: '¿Qué es La Escuelita?',
                intro: 'La Escuelita es un espacio cercano donde las niñas y niños pueden aprender, moverse, expresarse y crecer con seguridad. Aquí se combina la disciplina del patinaje con la diversión, el compañerismo y el desarrollo personal.',
                card1Title: 'Aprendizaje divertido',
                card1Text: 'Cada clase está pensada para que los más pequeños aprendan con entusiasmo y confianza.',
                card2Title: 'Valores y compañerismo',
                card2Text: 'Promovemos el respeto, la disciplina y el trabajo en equipo desde el inicio.'
            },
            contacto: {
                heroTitle: 'Contacto',
                heading: 'Información de contacto',
                intro1: 'Si deseas más información sobre nuestras clases, inscripciones o actividades, escríbenos y te responderemos pronto.',
                intro2: 'También puedes seguirnos en nuestras redes sociales para mantenerte al día con nuestras últimas novedades.',
                locationTitle: 'Ubicación',
                locationText: 'Puedes encontrarnos en los siguientes lugares:',
                formTitle: 'Formulario de Contacto',
                formText: 'Completa el siguiente formulario y nos pondremos en contacto contigo pronto:',
                name: 'Nombre:',
                email: 'Correo Electrónico:',
                phone: 'Teléfono:',
                comments: 'Comentarios:',
                send: 'Enviar',
                clear: 'Limpiar'
            },
            deportistas: {
                heroTitle: 'Nuestras Deportistas',
                heroText: 'Conoce a las patinadoras que representan con orgullo al Club de Patinaje Artístico Ayekantún en competencias.',
                sectionTitle: 'Nuestro Equipo',
                intro: 'En Ayekantún creemos que cada deportista representa el esfuerzo, la disciplina, el respeto y el compañerismo. Cada entrenamiento y competencia es una oportunidad para crecer tanto en lo deportivo como en lo personal.',
                cardTitle: 'Patinadora'
            },
            entrenadora: {
                heroTitle: 'Nuestra Entrenadora',
                card1Title: 'Profesional y Apasionada',
                card1Text: 'Formadora de nuevas generaciones de patinadores y patinadoras.',
                card2Title: 'Trabajo en Equipo',
                card2Text: 'Cada entrenamiento está diseñado para crecer en técnica y confianza.'
            },
            galeria: {
                heroTitle: 'Galería de Ayekantún',
                heroText: 'Explora nuestros mejores momentos en pista y competencia.'
            },
            videos: {
                heroTitle: 'Videos del Club',
                heroText: 'Observa los mejores momentos de nuestros entrenamientos y presentaciones.',
                caption: 'Video de la presentación del club.'
            }
        }
    },
    en: {
        themeLabel: 'Switch theme',
        langLabel: 'Switch language',
        logoArc: 'Artistic Skating School',
        heroSubtitle: 'Formative and competitive club',
        homeTitle: 'Discover more about Ayekantún',
        footer: {
            supportTitle: '📞 Support',
            nameLabel: 'Name:',
            emailLabel: '📧 Email:',
            whatsappLabel: '💬 WhatsApp:',
            socialTitle: 'Follow Us on Social Media',
            copyright: '© 2024 Ayekantún - Artistic Skating School. All rights reserved.',
            location: 'Quilpué, Valparaíso Region, Chile'
        },
        cards: {
            history: { title: '📖 Our History', desc: 'Learn how Ayekantún was born in 2017 and our journey in artistic skating.' },
            mission: { title: '🎯 Our Mission', desc: 'Train athletes through discipline, respect and passion for skating.' },
            vision: { title: '✨ Our Vision', desc: 'Be a reference in the training of athletes and contribute to artistic skating in the region.' },
            laEscuelita: { title: '🏫 The Little School', desc: 'Discover the space for learning, joy and growth for girls and boys.' },
            info: { title: 'ℹ️ Information', desc: 'Stay informed about championships, events and club news.' }
        },
        sections: {
            history: {
                title: '📖 Our History',
                text: 'The Ayekantún Artistic Skating Club was born in January 2017 in Quilpué. Over these years we have become a formative benchmark, being a cradle of outstanding athletes. We participate in national championships, achieving important results.',
                extra1: 'We are an organization committed to excellence in the training of our athletes. Through rigorous training and comprehensive support, we have helped many of our skaters participate in national and regional competitions.',
                extra2: 'Our club is a safe, inclusive and formative space where not only sports skills are developed, but also values such as respect, discipline, teamwork and perseverance that will accompany them throughout life.'
            },
            mission: {
                title: '🎯 Our Mission',
                text: 'To train athletes and integral people through artistic skating, promoting sports, personal and social development in an environment based on respect, discipline, companionship and passion.'
            },
            vision: {
                title: '✨ Our Vision',
                text: 'To be a club recognized for excellence in athlete training, commitment to our community and contributing to the growth of artistic skating in Quilpué and the Valparaíso Region.'
            },
            information: {
                title: 'ℹ️ Information',
                text: 'This is our official communication channel. Here you will find relevant information about the club: championships, competitions, meetings, activity calendar, news and updates. We keep all families informed clearly and promptly.',
                extra1: 'Through this channel we stay in permanent contact with families, sharing updates about competitions, special training, schedule changes, and relevant events for our community.',
                extra2: 'We also publish achievements of our athletes, event photos, competition videos and important announcements here. We invite you to follow us on WhatsApp and Instagram so you do not miss any news.'
            }
        },
        nav: {
            inicio: 'Home',
            laEscuelita: 'The Little School',
            deportistas: 'Athletes',
            entrenadora: 'Coach',
            galeria: 'Gallery',
            videos: 'Videos',
            contacto: 'Contact',
            historia: 'History',
            mision: 'Our Mission',
            vision: 'Our Vision',
            informacion: 'Information'
        },
        pageTitles: {
            home: 'Ayekantún - Artistic Skating School',
            contacto: 'Ayekantún - Contact',
            deportistas: 'Ayekantún - Athletes',
            entrenadora: 'Ayekantún - Coach',
            galeria: 'Ayekantún - Gallery',
            videos: 'Ayekantún - Videos'
        },
        pages: {
            laEscuelita: {
                heroTitle: 'The Little School',
                heroText: 'A space for learning, joy and growth for girls and boys.',
                sectionTitle: 'What is The Little School?',
                intro: 'The Little School is a welcoming space where girls and boys can learn, move, express themselves and grow with confidence. Here, the discipline of skating is combined with fun, teamwork and personal development.',
                card1Title: 'Fun learning',
                card1Text: 'Each class is designed so that the youngest can learn with enthusiasm and confidence.',
                card2Title: 'Values and teamwork',
                card2Text: 'We promote respect, discipline and teamwork from the beginning.'
            },
            contacto: {
                heroTitle: 'Contact',
                heading: 'Contact information',
                intro1: 'If you want more information about our classes, registrations or activities, write to us and we will reply soon.',
                intro2: 'You can also follow us on our social media to stay up to date with our latest news.',
                locationTitle: 'Location',
                locationText: 'You can find us in the following places:',
                formTitle: 'Contact Form',
                formText: 'Fill out the following form and we will contact you soon:',
                name: 'Name:',
                email: 'Email:',
                phone: 'Phone:',
                comments: 'Comments:',
                send: 'Send',
                clear: 'Clear'
            },
            deportistas: {
                heroTitle: 'Our Athletes',
                heroText: 'Meet the skaters who proudly represent the Ayekantún Artistic Skating Club in competitions.',
                sectionTitle: 'Our Team',
                intro: 'At Ayekantún we believe every athlete represents effort, discipline, respect and camaraderie. Every training session and competition is an opportunity to grow both athletically and personally.',
                cardTitle: 'Skater'
            },
            entrenadora: {
                heroTitle: 'Our Coach',
                card1Title: 'Professional and Passionate',
                card1Text: 'Trainer of new generations of skaters.',
                card2Title: 'Teamwork',
                card2Text: 'Each training session is designed to grow in technique and confidence.'
            },
            galeria: {
                heroTitle: 'Ayekantún Gallery',
                heroText: 'Explore our best moments on the rink and in competitions.'
            },
            videos: {
                heroTitle: 'Club Videos',
                heroText: 'Watch the best moments from our training sessions and performances.',
                caption: 'Video of the club presentation.'
            }
        }
    }
};

function getStoredPreference(key, fallback) {
    try {
        return localStorage.getItem(key) || fallback;
    } catch (e) {
        return fallback;
    }
}

function setStoredPreference(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // ignore storage errors
    }
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    setStoredPreference('theme', theme);
    var button = document.querySelector('.theme-toggle');
    if (button) {
        button.innerHTML = theme === 'light' ? '🌙' : '☀️';
        button.setAttribute('aria-label', theme === 'light' ? 'Cambiar a oscuro' : 'Cambiar a claro');
    }
}

function getTranslationValue(data, key) {
    return key.split('.').reduce(function (acc, part) {
        return acc && acc[part] !== undefined ? acc[part] : null;
    }, data);
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    setStoredPreference('lang', lang);

    var button = document.querySelector('.lang-toggle');
    if (button) {
        button.textContent = lang === 'en' ? '🇺🇸' : '🇪🇸';
        button.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Cambiar a inglés');
    }

    var navMap = translations[lang].nav;
    document.querySelectorAll('.site-nav .nav-links a, .site-nav .nav-links button').forEach(function (el) {
        var text = (el.textContent || '').trim();
        var normalized = text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[▾▸▼▶⬇⬆]/g, '')
            .trim()
            .toLowerCase();

        var key = normalized;
        if (normalized === 'nuestra mision' || normalized === 'our mission') key = 'mision';
        else if (normalized === 'nuestra vision' || normalized === 'our vision') key = 'vision';
        else if (normalized === 'informacion' || normalized === 'information') key = 'informacion';

        if (navMap[key]) {
            el.textContent = navMap[key];
        }
    });

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var value = getTranslationValue(translations[lang], el.getAttribute('data-i18n'));
        if (value) {
            el.textContent = value;
        }
    });

    var heroSubtitle = document.querySelector('.hero-sub');
    if (heroSubtitle) {
        heroSubtitle.textContent = translations[lang].heroSubtitle;
    }

    var logoArcText = document.querySelector('.logo-arc textPath');
    if (logoArcText) {
        logoArcText.textContent = translations[lang].logoArc;
    }

    var pageKey = 'home';
    var pathname = window.location.pathname.toLowerCase();
    if (pathname.indexOf('contacto') !== -1) pageKey = 'contacto';
    else if (pathname.indexOf('deportistas') !== -1) pageKey = 'deportistas';
    else if (pathname.indexOf('entrenadora') !== -1) pageKey = 'entrenadora';
    else if (pathname.indexOf('galeria') !== -1) pageKey = 'galeria';
    else if (pathname.indexOf('videos') !== -1) pageKey = 'videos';
    document.title = translations[lang].pageTitles[pageKey] || translations[lang].pageTitles.home;
}

function initSite() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') cerrarImagen();
    });

    var navInner = document.querySelector('.site-nav .nav-inner');
    if (navInner && !navInner.querySelector('.nav-controls')) {
        navInner.insertAdjacentHTML('beforeend', '<div class="nav-controls"><button class="theme-toggle" type="button" aria-label="Cambiar tema">🌙</button><button class="lang-toggle" type="button" aria-label="Cambiar idioma">ES</button></div>');
    }

    var themeToggle = document.querySelector('.theme-toggle');
    var langToggle = document.querySelector('.lang-toggle');
    var initialTheme = getStoredPreference('theme', 'dark');
    var initialLang = getStoredPreference('lang', 'es');

    applyTheme(initialTheme);
    applyLanguage(initialLang);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var nextTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }

    if (langToggle) {
        langToggle.addEventListener('click', function () {
            var nextLang = document.documentElement.lang === 'en' ? 'es' : 'en';
            applyLanguage(nextLang);
        });
    }

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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
} else {
    initSite();
}
