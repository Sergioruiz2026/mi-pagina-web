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
            supportTitle: 'Soporte',
            nameLabel: 'Nombre:',
            emailLabel: 'Correo:',
            whatsappLabel: 'WhatsApp:',
            socialTitle: 'Síguenos en Nuestras Redes',
            copyright: '© 2017 Ayekantún - Escuela de Patinaje Artístico. Todos los derechos reservados.',
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
            inscripciones: 'Inscripciones',
            horarios: 'Conoce nuestros horarios',
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
            videos: 'Ayekantún - Videos',
            laEscuelita: 'Ayekantún - La Escuelita',
            horarios: 'Ayekantún - Horarios',
            inscripciones: 'Ayekantún - Inscripciones',
            transmisiones: 'Ayekantún - Transmisiones en Vivo',
            gracias: 'Gracias — Inscripción recibida'
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
                card2Text: 'Promovemos el respeto, la disciplina y el trabajo en equipo desde el inicio.',
                card3Title: 'Crecimiento integral',
                card3Text: 'Fomentamos el desarrollo físico, emocional y social de cada niño y niña.',
                card4Title: 'Actividades recreativas',
                card4Text: 'Ofrecemos diversas actividades que permiten a los niños y niñas disfrutar y socializar.'
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
                sectionTitle: 'Nuestros Videos',
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
            supportTitle: 'Support',
            nameLabel: 'Name:',
            emailLabel: 'Email:',
            whatsappLabel: 'WhatsApp:',
            socialTitle: 'Follow Us on Social Media',
            copyright: '© 2017 Ayekantún - Artistic Skating School. All rights reserved.',
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
            inscripciones: 'Registrations',
            horarios: 'Class Schedule',
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
            videos: 'Ayekantún - Videos',
            laEscuelita: 'Ayekantún - The Little School',
            horarios: 'Ayekantún - Schedule',
            inscripciones: 'Ayekantún - Registration',
            transmisiones: 'Ayekantún - Live Streams',
            gracias: 'Thank You — Registration Received'
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
                card2Text: 'We promote respect, discipline and teamwork from the beginning.',
                card3Title: 'Overall development',
                card3Text: 'We encourage the physical, emotional and social development of every child.',
                card4Title: 'Recreational activities',
                card4Text: 'We offer a variety of activities for children to have fun and socialize.'
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
                sectionTitle: 'Our Videos',
                caption: 'Video of the club presentation.'
            }
        }
    }
};

var staticTextTranslations = {
    'Inicio ▾': 'Home ▾',
    'La Escuelita ▾': 'The Little School ▾',
    'Inicio': 'Home',
    'Historia': 'History',
    'Nuestra Misión': 'Our Mission',
    'Nuestra Visión': 'Our Vision',
    'Información': 'Information',
    'Inscripciones': 'Registrations',
    'Conoce nuestros horarios': 'Class Schedule',
    'Deportistas': 'Athletes',
    'Entrenadora': 'Coach',
    'Galería': 'Gallery',
    'Videos': 'Videos',
    '🔴 En Vivo': '🔴 Live',
    'Transmisión en vivo': '🔴 Live',
    'Contacto': 'Contact',
    'Inscríbete': 'Register',
    'Quilpué · Desde 2017': 'Quilpué · Since 2017',
    'Escuela de patinaje artístico: un club formativo y competitivo donde las niñas y niños crecen con disciplina, respeto y pasión.': 'An artistic skating school: a development and competition club where children grow through discipline, respect and passion.',
    'Quiero inscribirme': 'I want to register',
    'Conócenos': 'Get to know us',
    'Año de fundación': 'Year founded',
    'Campeonatos disputados': 'Competitions entered',
    'Todas': 'All',
    'Edades y niveles': 'Ages and levels',
    'Gran comunidad': 'A great community',
    'Nuestra historia': 'Our history',
    'Nacimos en Quilpué, patinando': 'We were born skating in Quilpué',
    'El Club de Patinaje Artístico Ayekantún nació en enero de 2017. Desde entonces nos hemos consolidado como un referente formativo, participando en campeonatos nacionales con importantes resultados.': 'The Ayekantún Artistic Skating Club was founded in January 2017. Since then, we have become a leading development club, taking part in national competitions and achieving excellent results.',
    'Somos un espacio seguro, inclusivo y formativo, donde se desarrollan habilidades deportivas y valores como el respeto, el trabajo en equipo y la perseverancia.': 'We are a safe, inclusive learning space where athletes develop their skills and values such as respect, teamwork and perseverance.',
    'Lo que nos mueve': 'What drives us',
    'Misión y visión': 'Mission and vision',
    'Misión': 'Mission',
    'Formar deportistas y personas íntegras a través del patinaje artístico, en un ambiente de respeto, disciplina, compañerismo y pasión.': 'To develop well-rounded athletes and people through artistic skating in an environment of respect, discipline, camaraderie and passion.',
    'Visión': 'Vision',
    'Ser un club reconocido por la excelencia en la formación de deportistas y contribuir al crecimiento del patinaje en la Región de Valparaíso.': 'To be a club recognized for excellence in athlete development and to contribute to the growth of skating in the Valparaíso Region.',
    'Un espacio de aprendizaje, alegría y crecimiento para niñas y niños que dan sus primeros pasos sobre ruedas.': 'A place for learning, joy and growth for children taking their first steps on skates.',
    'Momentos': 'Moments',
    'Nuestro canal oficial': 'Our official channel',
    'Mantente informada': 'Stay up to date',
    'Aquí compartimos campeonatos, competencias, reuniones, calendario de actividades, cambios de horario, logros de nuestras deportistas y comunicados importantes. Síguenos en ': 'We share championships, competitions, meetings, activity calendars, schedule changes, athletes’ achievements and important announcements here. Follow us on ',
    ' y WhatsApp para no perderte nada.': ' and WhatsApp so you do not miss a thing.',
    'Soporte': 'Support',
    'Publicidad · Pulsso': 'Advertisement · Pulsso',
    '¿Lista para patinar con nosotras?': 'Ready to skate with us?',
    'Escríbenos y te contamos horarios, inscripciones y todo lo que necesitas saber. También publicamos novedades en nuestras redes.': 'Write to us and we will tell you about schedules, registration and everything else you need to know. We also share updates on our social media.',
    'Escribir por WhatsApp': 'Message us on WhatsApp',
    'Correo': 'Email',
    '© 2026 Ayekantún · Escuela de Patinaje Artístico · Quilpué, Región de Valparaíso, Chile': '© 2026 Ayekantún · Artistic Skating School · Quilpué, Valparaíso Region, Chile',
    'Horarios': 'Schedule',
    'Estos son nuestros horarios habituales para las clases de la escuelita.': 'These are the usual class times for our skating school.',
    'Lunes y miércoles: 4:00 PM - 6:00 PM': 'Monday and Wednesday: 4:00 PM - 6:00 PM',
    'Martes y jueves: 6:00 PM - 8:00 PM': 'Tuesday and Thursday: 6:00 PM - 8:00 PM',
    'Viernes: 4:00 PM - 6:00 PM': 'Friday: 4:00 PM - 6:00 PM',
    'Si quieres confirmar un turno o consultar disponibilidad, contáctanos directamente.': 'To confirm a time slot or check availability, contact us directly.',
    '← Volver a La Escuelita': '← Back to The Little School',
    'Las inscripciones están abiertas para quienes quieran formar parte de nuestra escuela de patinaje.': 'Registration is open to anyone who would like to join our skating school.',
    'La motivación de este formulario es recopilar información básica de contacto y detalles sobre la edad y nivel de interés de los aspirantes. Esto nos permitirá organizar mejor las clases y asegurarnos de que cada participante reciba la atención adecuada según su nivel y necesidades.': 'This form collects basic contact information, age and skating level so we can organize classes and ensure each participant receives the right support for their needs.',
    'Al enviar este formulario, nos pondremos en contacto contigo para confirmar tu inscripción y proporcionarte más detalles sobre los horarios y requisitos.': 'After you submit this form, we will contact you to confirm your registration and provide more information about schedules and requirements.',
    '¿Qué necesitas?': 'What do you need?',
    'Completar tus datos de contacto.': 'Fill in your contact details.',
    'Indicar edad y nivel de interés.': 'Provide your age and skill level of interest.',
    'Nombre completo Alumno/a': 'Student’s full name',
    'Nombre apoderado': 'Parent or guardian name',
    'Correo electrónico': 'Email address',
    'Teléfono': 'Phone',
    'Edad': 'Age',
    'Disciplina de interés': 'Activity of interest',
    '-- Selecciona (opcional) --': '-- Select (optional) --',
    'Patinaje artístico': 'Artistic skating',
    'Urbano/Recreativo': 'Urban/Recreational',
    'Nivel': 'Skill level',
    '-- Selecciona tu nivel --': '-- Select your level --',
    'Básico': 'Beginner',
    'Intermedio': 'Intermediate',
    'Mensaje': 'Message',
    'Enviar solicitud': 'Submit registration',
    'Esta solicitud se enviará directamente a patinaje.ayekantun@gmail.com mediante un servicio seguro.': 'This form will be securely sent to patinaje.ayekantun@gmail.com.',
    'Nombre:': 'Name:',
    'WhatsApp:': 'WhatsApp:',
    'Gracias — Inscripción recibida': 'Thank You — Registration Received',
    '¡Gracias! — Inscripción recibida': 'Thank you! — Registration received',
    'Hemos recibido tu solicitud de inscripción en Ayekantún. Revisa tu correo electrónico; te contactaremos en un plazo máximo de 48 horas para confirmar la inscripción y los horarios.': 'We have received your registration request for Ayekantún. Please check your email; we will contact you within 48 hours to confirm your registration and class schedule.',
    'Si no recibes respuesta, escríbenos a': 'If you do not hear from us, email us at',
    'o por WhatsApp al': 'or message us on WhatsApp at',
    'Volver a Inscripciones': 'Back to Registration',
    'EN VIVO': 'LIVE',
    'Transmisiones en Vivo': 'Live Streams',
    'Disfruta de nuestras competencias y eventos destacados en tiempo real, desde cualquier dispositivo.': 'Watch our competitions and featured events live from any device.',
    'Competencia en directo': 'Live competition',
    'Sigue la acción en tiempo real y acompaña a nuestros deportistas.': 'Follow the action in real time and cheer on our athletes.',
    'Si no conoces el': 'If you do not know the',
    ', indícame y te ayudo a obtenerlo.': ', let me know and I will help you find it.',
    'Próximas Transmisiones': 'Upcoming Streams',
    'Open Internacional de Patinaje': 'International Skating Open',
    'Fecha:': 'Date:',
    'Hora:': 'Time:',
    '18 de agosto de 2026': 'August 18, 2026',
    '25 de agosto de 2026': 'August 25, 2026',
    '01 de septiembre de 2026': 'September 1, 2026',
    'Competencia Juvenil': 'Youth Competition',
    'Clínica de Patinaje Artístico': 'Artistic Skating Clinic',
    'Transmisiones Anteriores': 'Past Streams',
    'Final de la semana': 'Weekly Final',
    'Competencia destacada del mes pasado.': 'A featured competition from last month.',
    'Ver repetición': 'Watch replay',
    'Reto de técnica': 'Technique Challenge',
    'Momento clave del entrenamiento y evaluación.': 'A key moment from training and evaluation.',
    'Nuestras Deportistas': 'Our Athletes',
    'Nuestro Equipo': 'Our Team',
    'En Ayekantún creemos que cada deportista representa el esfuerzo, la disciplina, el respeto y el compañerismo. Cada entrenamiento y competencia es una oportunidad para crecer tanto en lo deportivo como en lo personal.': 'At Ayekantún, we believe every athlete represents effort, discipline, respect and camaraderie. Every practice and competition is an opportunity to grow both athletically and personally.',
    'Leo es una apasionada del patinaje artístico, destacando por su creatividad y precisión en cada presentación.': 'Leo is passionate about artistic skating and stands out for her creativity and precision in every performance.',
    'Fio Con una técnica impecable y un espíritu competitivo, Fio inspira a sus compañeros a dar lo mejor de sí en cada entrenamiento.': 'With flawless technique and a competitive spirit, Fio inspires her teammates to give their best in every practice.',
    'Mya es conocida por su dedicación y pasión por el patinaje, lo que la ha llevado a participar en su primera competencia, obteniendo reconocimientos por su talento y esfuerzo.': 'Mya is known for her dedication and passion for skating. She recently competed for the first time and was recognized for her talent and hard work.',
    'Domi es conocida por su elegancia y gracia en la pista, combinando técnica y expresión artística en cada rutina.': 'Domi is known for her elegance and grace on the rink, combining technique and artistic expression in every routine.',
    'Pia es conocida por su enfoque en la mejora continua, esforzándose por superar sus límites y alcanzar nuevas metas en el patinaje.': 'Pia is focused on continuous improvement, always striving to push her limits and reach new goals in skating.',
    'Florencia es una deportista dedicada que combina su amor por el patinaje con un fuerte sentido de la disciplina y el trabajo en equipo.': 'Florencia is a dedicated athlete who combines her love of skating with a strong sense of discipline and teamwork.',
    'Seli es una joven promesa del patinaje artístico, destacando por su creatividad y pasión en cada presentación.': 'Seli is a promising young artistic skater who stands out for her creativity and passion in every performance.',
    'Isi es conocida por su enfoque en la mejora continua, esforzándose por superar sus límites y alcanzar nuevas metas en el patinaje.': 'Isi is focused on continuous improvement, always striving to push her limits and reach new goals in skating.',
    'Colomba es conocida por su elegancia y gracia en la pista, combinando técnica y expresión artística en cada rutina.': 'Colomba is known for her elegance and grace on the rink, combining technique and artistic expression in every routine.',
    'Jose es una deportista dedicada que combina su amor por el patinaje con un fuerte sentido de la disciplina y el trabajo en equipo.': 'Jose is a dedicated athlete who combines her love of skating with a strong sense of discipline and teamwork.',
    'Anto es reconocida por su dedicación y constancia, mostrando un compromiso inquebrantable con la excelencia en el patinaje.': 'Anto is recognized for her dedication and consistency, showing an unwavering commitment to excellence in skating.',
    'Elo es reconocida por su dedicación y constancia, mostrando un compromiso inquebrantable con la excelencia en el patinaje.': 'Elo is recognized for her dedication and consistency, showing an unwavering commitment to excellence in skating.',
    'Profesional y Apasionada': 'Professional and Passionate',
    'Formadora de nuevas generaciones de patinadores y patinadoras.': 'Trainer of the next generation of skaters.',
    'Trabajo en Equipo': 'Teamwork',
    'Cada entrenamiento está diseñado para crecer en técnica y confianza.': 'Every practice is designed to build skill and confidence.',
    'La entrenadora guía a cada patinador y patinadora en su desarrollo personal y deportivo.': 'The coach guides each skater in their personal and athletic development.',
    'Su enfoque es fomentar la disciplina, la perseverancia y el amor por el patinaje.': 'Her approach encourages discipline, perseverance and a love of skating.',
    'Explora nuestros mejores momentos en pista y competencia.': 'Explore our best moments on the rink and in competition.',
    'Video Destacado': 'Featured Video',
    'Últimos Videos': 'Latest Videos',
    'Cargando videos...': 'Loading videos...',
    'Error: No se encontró el canal. Verifica el Channel ID o la API Key.': 'Error: Channel not found. Check the channel ID or API key.',
    'No hay videos disponibles.': 'No videos available.',
    '⚠️ Error al cargar los videos. Verifica tu API Key y que esté correctamente configurada.': '⚠️ Error loading videos. Check that your API key is configured correctly.',
    'Aprendizaje divertido': 'Fun learning',
    'Valores y compañerismo': 'Values and teamwork',
    'Crecimiento integral': 'Overall development',
    'Actividades recreativas': 'Recreational activities',
    'Cada clase está pensada para que los más pequeños aprendan con entusiasmo y confianza.': 'Each class is designed to help young children learn with enthusiasm and confidence.',
    'Promovemos el respeto, la disciplina y el trabajo en equipo desde el inicio.': 'We promote respect, discipline and teamwork from the beginning.',
    'Fomentamos el desarrollo físico, emocional y social de cada niño y niña.': 'We encourage every child’s physical, emotional and social development.',
    'Ofrecemos diversas actividades que permiten a los niños y niñas disfrutar y socializar.': 'We offer a variety of activities for children to have fun and socialize.',
    'Información de contacto': 'Contact information',
    'Si deseas más información sobre nuestras clases, inscripciones o actividades, escríbenos y te responderemos pronto.': 'If you would like more information about our classes, registration or activities, write to us and we will get back to you soon.',
    'También puedes seguirnos en nuestras redes sociales para mantenerte al día con nuestras últimas novedades.': 'You can also follow us on social media to keep up with our latest news.',
    'Ubicación': 'Location',
    'Puedes encontrarnos en los siguientes lugares:': 'You can find us at the following locations:',
    'Dirección:': 'Address:',
    'Liceo Politecnico Marga Marga, Calle Cuatro Pinos 2159, Quilpué, Región de Valparaíso': 'Liceo Politecnico Marga Marga, Calle Cuatro Pinos 2159, Quilpué, Valparaíso Region',
    'Estadio Municipal Villa Olímpica - Paicaví 0127, Quilpué, Región de Valparaíso': 'Villa Olímpica Municipal Stadium - Paicaví 0127, Quilpué, Valparaíso Region',
    'Multicancha La Perlina, Del Nogal 1700, Quilpué, Región de Valparaíso': 'La Perlina Multi-use Court, Del Nogal 1700, Quilpué, Valparaíso Region',
    'Formulario de Contacto': 'Contact Form',
    'Completa el siguiente formulario y nos pondremos en contacto contigo pronto:': 'Complete the form below and we will contact you soon:',
    'Correo Electrónico:': 'Email:',
    'Comentarios:': 'Comments:',
    'Enviar': 'Send',
    'Limpiar': 'Clear',
    'Galería de Ayekantún': 'Ayekantún Gallery',
    'Dar like': 'Like',
    'Nuestros Videos': 'Our Videos',
    'Video de la presentación del club.': 'Video of the club performance.',
    'Ayekantún - Escuela de Patinaje Artístico': 'Ayekantún - Artistic Skating School',
    'Quilpué, Región de Valparaíso, Chile': 'Quilpué, Valparaíso Region, Chile',
    'Abrir menú': 'Open menu',
    'Submenú Inicio': 'Home submenu',
    'Submenú La Escuelita': 'The Little School submenu',
    'Cerrar': 'Close',
    'Subir arriba': 'Back to top',
    'Bajar abajo': 'Scroll to bottom',
    'Abrir Pulsso': 'Open Pulsso',
    'Publicidad Pulsso': 'Pulsso advertisement',
    'Abrir YouTube': 'Open YouTube',
    'Abrir Instagram': 'Open Instagram',
    'Abrir WhatsApp': 'Open WhatsApp',
    'Logo Ayekantún Patinaje Artístico': 'Ayekantún Artistic Skating logo',
    'Logo Ayekantún': 'Ayekantún logo',
    'Entrenadora Ayekantún': 'Ayekantún coach',
    'Entrenamiento Ayekantún': 'Ayekantún training',
    'Transmisión en vivo de Ayekantún': 'Ayekantún live stream',
    'Video destacado - Ayekantún': 'Featured video - Ayekantún',
    'Gala Ayekantún': 'Ayekantún gala',
    'Aprendizaje divertido': 'Fun learning',
    'Valores y compañerismo': 'Values and teamwork',
    'Crecimiento integral': 'Overall development',
    'Actividades recreativas': 'Recreational activities',
    'Clase de patinaje artístico': 'Artistic skating class',
    'Alumnas en la pista de patinaje': 'Skaters on the rink',
    'Presentación de patinaje en Villa Alemana': 'Skating performance in Villa Alemana',
    'Entrenamiento de patinaje': 'Skating practice',
    'Patinaje en pista': 'Skating on the rink',
    'Patinaje artístico en competencia': 'Artistic skating competition',
    'Reproducir música': 'Play music',
    'Pausar música': 'Pause music',
    'Reproductor de música': 'Music player',
    'Visitas al sitio': 'Website visits',
    'Tu nombre': 'Your name',
    'Nombre del apoderado': 'Parent or guardian name',
    'tu@email.com': 'you@email.com',
    'Tu teléfono': 'Your phone number',
    'Ej. 10': 'e.g. 10',
    'Cuéntanos tu interés por inscribirte': 'Tell us why you would like to register'
};

var originalTextNodes = new WeakMap();
var originalAttributes = new WeakMap();

function normalizeTranslationText(value) {
    return value.replace(/\s+/g, ' ').trim();
}

function translateSpanishDate(value) {
    var match = value.match(/^(\d{1,2}) de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de (\d{4})$/i);
    if (!match) return null;

    var months = {
        enero: 'January',
        febrero: 'February',
        marzo: 'March',
        abril: 'April',
        mayo: 'May',
        junio: 'June',
        julio: 'July',
        agosto: 'August',
        septiembre: 'September',
        octubre: 'October',
        noviembre: 'November',
        diciembre: 'December'
    };
    return months[match[2].toLowerCase()] + ' ' + Number(match[1]) + ', ' + match[3];
}

var siteVisitsUrl = 'https://sergioruiz2026.github.io/mi-pagina-web/';

function updateSiteClock() {
    var timeElement = document.querySelector('.site-utility__time');
    var dateElement = document.querySelector('.site-utility__date');
    if (!timeElement || !dateElement) return;

    var lang = document.documentElement.lang === 'en' ? 'en-US' : 'es-CL';
    var now = new Date();
    timeElement.textContent = new Intl.DateTimeFormat(lang, {
        timeZone: 'America/Santiago',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    }).format(now);
    dateElement.textContent = new Intl.DateTimeFormat(lang, {
        timeZone: 'America/Santiago',
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    }).format(now);
}

function updateSiteWidgetLanguage(lang) {
    var utility = document.querySelector('.site-utility');
    if (utility) {
        utility.setAttribute('aria-label', lang === 'en'
            ? 'Date and time in Quilpué'
            : 'Fecha y hora de Quilpué');
    }

    var counterImage = document.querySelector('.site-visit-counter img');
    var counterLink = document.querySelector('.site-visit-counter a');
    if (counterImage) {
        counterImage.alt = lang === 'en' ? 'Public visitor counter' : 'Contador público de visitas';
        counterImage.title = lang === 'en' ? 'Public visitor counter' : 'Contador público de visitas';
    }
    if (counterLink) {
        counterLink.setAttribute('aria-label', lang === 'en'
            ? 'View public visitor statistics'
            : 'Ver estadísticas públicas de visitas');
    }
}

function addSiteWidgetStyles() {
    if (document.getElementById('site-widget-styles')) return;
    var style = document.createElement('style');
    style.id = 'site-widget-styles';
    style.textContent = [
        '.site-utility{min-height:30px;padding:4px 20px;display:flex;justify-content:flex-end;align-items:center;gap:8px;background:var(--bg,#faf7f7);color:var(--muted,#5c5555);font:500 .72rem/1.35 Inter,system-ui,sans-serif;border-bottom:1px solid var(--line,#eadede)}',
        '.site-utility__group{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}',
        '.site-utility__separator{opacity:.55}',
        '.site-visit-counter{display:flex;justify-content:center;align-items:center;gap:8px;margin:12px auto 0;padding:10px 16px;border-top:1px solid var(--line,#eadede);color:var(--muted,#5c5555);font:500 .72rem/1.4 Inter,system-ui,sans-serif}',
        '.site-visit-counter a{display:inline-flex;align-items:center;min-height:20px}',
        '.site-visit-counter img{display:block;width:auto;height:20px;border:0}',
        '@media(max-width:480px){.site-utility{gap:5px;padding:4px 12px;font-size:.66rem}.site-utility__group{gap:4px}.site-visit-counter{padding:9px 12px}}'
    ].join('');
    document.head.appendChild(style);
}

function initSiteWidgets() {
    addSiteWidgetStyles();

    if (!document.querySelector('.site-utility')) {
        var utility = document.createElement('div');
        utility.className = 'site-utility';
        utility.setAttribute('role', 'group');
        utility.setAttribute('aria-label', 'Fecha y hora de Quilpué');
        utility.innerHTML = [
            '<span class="site-utility__group">Quilpué</span>',
            '<span class="site-utility__separator" aria-hidden="true">·</span>',
            '<time class="site-utility__time"></time>',
            '<span class="site-utility__separator" aria-hidden="true">·</span>',
            '<time class="site-utility__date"></time>'
        ].join('');
        var navigation = document.querySelector('.site-nav') || document.querySelector('body > nav');
        if (navigation) navigation.insertAdjacentElement('beforebegin', utility);
        else document.body.insertAdjacentElement('afterbegin', utility);
        updateSiteClock();
        window.setInterval(updateSiteClock, 30000);
    }

    if (!document.querySelector('.site-visit-counter')) {
        var counter = document.createElement('div');
        counter.className = 'site-visit-counter';
        var visitPath = encodeURIComponent(siteVisitsUrl);
        var badgeUrl = 'https://api.visitorbadge.io/api/visitors?path=' + visitPath + '&label=total&labelColor=%23555555&countColor=%23d6001c&style=flat&_=' + Date.now();
        var statusUrl = 'https://visitorbadge.io/status?path=' + visitPath;
        var badge = document.createElement('img');
        badge.src = badgeUrl;
        badge.referrerPolicy = 'no-referrer';
        badge.alt = 'Contador público de visitas';
        badge.title = 'Contador público de visitas';
        var statusLink = document.createElement('a');
        statusLink.href = statusUrl;
        statusLink.target = '_blank';
        statusLink.rel = 'noopener noreferrer';
        statusLink.setAttribute('aria-label', 'Ver estadísticas públicas de visitas');
        statusLink.appendChild(badge);
        var label = document.createElement('span');
        label.className = 'site-visit-label';
        label.textContent = 'Visitas al sitio';
        counter.appendChild(label);
        counter.appendChild(statusLink);

        var footer = document.querySelector('footer');
        if (footer) footer.appendChild(counter);
        else {
            var whatsapp = document.querySelector('.wa, .float-buttons');
            if (whatsapp) whatsapp.insertAdjacentElement('beforebegin', counter);
            else document.body.appendChild(counter);
        }
    }
}

function applyStaticTranslations(lang) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
        var parent = node.parentElement;
        if (!parent || parent.closest('script,style,.lang-toggle,.theme-toggle')) continue;
        var translatedElement = parent.closest('[data-i18n]');
        if (translatedElement && getTranslationValue(translations[lang], translatedElement.getAttribute('data-i18n'))) continue;

        var state = originalTextNodes.get(node);
        if (!state || node.nodeValue !== state.applied) {
            state = { source: node.nodeValue, applied: node.nodeValue };
        }
        var source = state.source;
        var normalizedSource = normalizeTranslationText(source);
        var translation = lang === 'en'
            ? staticTextTranslations[normalizedSource] || translateSpanishDate(normalizedSource)
            : null;
        var value = translation === undefined || translation === null
            ? source
            : source.replace(normalizeTranslationText(source), translation);
        if (node.nodeValue !== value) node.nodeValue = value;
        state.applied = value;
        originalTextNodes.set(node, state);
    }

    document.querySelectorAll('[title],[aria-label],[alt],[placeholder]').forEach(function (el) {
        if (el.matches('.lang-toggle,.theme-toggle')) return;
        ['title', 'aria-label', 'alt', 'placeholder'].forEach(function (attribute) {
            if (!el.hasAttribute(attribute)) return;
            var state = originalAttributes.get(el);
            if (!state) {
                state = {};
                originalAttributes.set(el, state);
            }
            if (state[attribute] === undefined || el.getAttribute(attribute) !== state[attribute].applied) {
                state[attribute] = {
                    source: el.getAttribute(attribute),
                    applied: el.getAttribute(attribute)
                };
            }
            var original = state[attribute].source;
            var translated = lang === 'en'
                ? staticTextTranslations[normalizeTranslationText(original)]
                : null;
            var value = translated || original;
            if (el.getAttribute(attribute) !== value) el.setAttribute(attribute, value);
            state[attribute].applied = value;
        });
    });
}

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
        var isEnglish = document.documentElement.lang === 'en';
        button.setAttribute('aria-label', theme === 'light'
            ? (isEnglish ? 'Switch to dark mode' : 'Cambiar a oscuro')
            : (isEnglish ? 'Switch to light mode' : 'Cambiar a claro'));
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
        button.textContent = lang === 'en' ? '🇺🇸' : '🇨🇱';
        button.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Cambiar a inglés');
    }
    var themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
        var isLightTheme = document.body.getAttribute('data-theme') === 'light';
        themeButton.setAttribute('aria-label', isLightTheme
            ? (lang === 'en' ? 'Switch to dark mode' : 'Cambiar a oscuro')
            : (lang === 'en' ? 'Switch to light mode' : 'Cambiar a claro'));
    }

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

    updateSiteClock();
    updateSiteWidgetLanguage(lang);

    var pageKey = 'home';
    var pathname = window.location.pathname.toLowerCase();
    if (pathname.indexOf('contacto') !== -1) pageKey = 'contacto';
    else if (pathname.indexOf('deportistas') !== -1) pageKey = 'deportistas';
    else if (pathname.indexOf('entrenadora') !== -1) pageKey = 'entrenadora';
    else if (pathname.indexOf('galeria') !== -1) pageKey = 'galeria';
    else if (pathname.indexOf('videos') !== -1) pageKey = 'videos';
    else if (pathname.indexOf('la-esculita') !== -1) pageKey = 'laEscuelita';
    else if (pathname.indexOf('horarios') !== -1) pageKey = 'horarios';
    else if (pathname.indexOf('inscripciones') !== -1) pageKey = 'inscripciones';
    else if (pathname.indexOf('transmisiones') !== -1) pageKey = 'transmisiones';
    else if (pathname.indexOf('gracias') !== -1) pageKey = 'gracias';
    applyStaticTranslations(lang);
    document.title = translations[lang].pageTitles[pageKey] || translations[lang].pageTitles.home;
}

function initMusicPlayers() {
    var cards = document.querySelectorAll('.page-deportistas .tarjeta');
    if (!cards.length) return;

    var trackList = [
        { title: 'Inspiración', src: 'audio/track.wav' },
        { title: 'Energía', src: 'audio/track.wav' },
        { title: 'Mya', src: 'audio/mya.mpeg' },
        { title: 'Movimiento', src: 'audio/track.wav' }
    ];

    cards.forEach(function (card, index) {
        if (card.querySelector('.tarjeta-player')) return;

        var textBlock = card.querySelector('.tarjeta-texto');
        if (!textBlock) return;

        var image = card.querySelector('img');
        if (image) {
            image.setAttribute('loading', 'lazy');
            image.setAttribute('decoding', 'async');
        }

        var track = trackList[index % trackList.length];
        var playerMarkup = [
            '<div class="tarjeta-player" role="group" aria-label="Reproductor de música">',
            '  <div class="tarjeta-player__meta">',
            '    <span class="tarjeta-player__label">Escucha</span>',
            '    <span class="tarjeta-player__title">' + track.title + '</span>',
            '  </div>',
            '  <audio preload="none" src="' + track.src + '"></audio>',
            '  <div class="tarjeta-player__controls">',
            '    <button class="tarjeta-player__play" type="button" aria-label="Reproducir música">▶</button>',
            '    <div class="tarjeta-player__bar" aria-hidden="true">',
            '      <span class="tarjeta-player__bar-fill"></span>',
            '    </div>',
            '  </div>',
            '  <span class="tarjeta-player__status">Listo para reproducir</span>',
            '</div>'
        ].join('');

        textBlock.insertAdjacentHTML('afterend', playerMarkup);

        var player = card.querySelector('.tarjeta-player');
        var button = player.querySelector('.tarjeta-player__play');
        var audio = player.querySelector('audio');
        var fill = player.querySelector('.tarjeta-player__bar-fill');
        var status = player.querySelector('.tarjeta-player__status');

        function pauseOtherPlayers(currentPlayer) {
            document.querySelectorAll('.tarjeta-player').forEach(function (otherPlayer) {
                if (otherPlayer === currentPlayer) return;
                var otherAudio = otherPlayer.querySelector('audio');
                if (otherAudio && !otherAudio.paused) {
                    otherAudio.pause();
                    var otherButton = otherPlayer.querySelector('.tarjeta-player__play');
                    var otherStatus = otherPlayer.querySelector('.tarjeta-player__status');
                    if (otherButton) otherButton.textContent = '▶';
                    if (otherStatus) otherStatus.textContent = 'Pausado';
                    var otherFill = otherPlayer.querySelector('.tarjeta-player__bar-fill');
                    if (otherFill) otherFill.style.width = '0%';
                }
            });
        }

        button.addEventListener('click', function () {
            if (audio.paused) {
                pauseOtherPlayers(player);
                audio.play().then(function () {
                    button.textContent = '❚❚';
                    button.setAttribute('aria-label', 'Pausar música');
                    status.textContent = 'Reproduciendo';
                }).catch(function () {
                    status.textContent = 'No disponible';
                });
            } else {
                audio.pause();
                button.textContent = '▶';
                button.setAttribute('aria-label', 'Reproducir música');
                status.textContent = 'Pausado';
            }
        });

        audio.addEventListener('timeupdate', function () {
            if (audio.duration) {
                fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
            }
        });

        audio.addEventListener('pause', function () {
            button.textContent = '▶';
            button.setAttribute('aria-label', 'Reproducir música');
            if (status.textContent !== 'No disponible') {
                status.textContent = 'Pausado';
            }
        });

        audio.addEventListener('ended', function () {
            button.textContent = '▶';
            button.setAttribute('aria-label', 'Reproducir música');
            fill.style.width = '0%';
            status.textContent = 'Listo para reproducir';
        });
    });
}

function initSite() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && typeof cerrarImagen === 'function') cerrarImagen();
    });

    initMusicPlayers();
    initSiteWidgets();

    var navInner = document.querySelector('.site-nav .nav-inner');
    if (navInner && !navInner.querySelector('.nav-controls')) {
        navInner.insertAdjacentHTML('beforeend', '<div class="nav-controls"><button class="theme-toggle" type="button" aria-label="Cambiar tema">🌙</button><button class="lang-toggle" type="button" aria-label="Cambiar idioma">ES</button></div>');
    }

    var themeToggle = document.querySelector('.theme-toggle');
    var langToggle = document.querySelector('.lang-toggle');
    var isHomePage = /(^|\/)index\.html?$/.test(window.location.pathname.toLowerCase());
    var initialTheme = getStoredPreference('theme', isHomePage ? 'light' : 'dark');
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
    var translationObserver = new MutationObserver(function () {
        applyStaticTranslations(document.documentElement.lang || 'es');
    });
    translationObserver.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['title', 'aria-label', 'alt', 'placeholder']
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
} else {
    initSite();
}
