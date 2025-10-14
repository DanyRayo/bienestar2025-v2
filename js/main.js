document.addEventListener('DOMContentLoaded', () => {
    // Remover flag no-js
    document.documentElement.classList.remove('no-js');
    // Detectar soporte de flex gap (Safari <14 falla)
    (function detectFlexGap(){
        try {
            if (CSS && CSS.supports && CSS.supports('gap','1rem')) return; // soportado
        } catch(e) { /* continuar con test manual */ }
        const flex = document.createElement('div');
        flex.style.display = 'flex';
        flex.style.flexDirection = 'column';
        flex.style.rowGap = '1px';
        flex.style.position = 'absolute';
        flex.style.top = '-9999px';
        const child1 = document.createElement('div');
        const child2 = document.createElement('div');
        child1.style.height = '1px';
        child2.style.height = '1px';
        flex.appendChild(child1); flex.appendChild(child2);
        document.body.appendChild(flex);
        const supported = flex.scrollHeight === 1 + 1 + 1; // si gap aplicado => altura total = 3
        document.body.removeChild(flex);
        if (!supported) document.documentElement.classList.add('no-flex-gap');
    })();

    // --- Lógica del contador (multi-instancia hero + nav) ---
    const countdownTargets = {
        hero: {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        },
        nav: {
            days: document.getElementById('navDays'),
            hours: document.getElementById('navHours'),
            minutes: document.getElementById('navMinutes'),
            seconds: document.getElementById('navSeconds')
        }
    };

    function pad(v){ return v < 10 ? '0' + v : '' + v; }

    const COUNTDOWN_END_TEXT = '00';
    const targetDate = new Date('October 20, 2025 00:00:00').getTime();
    let countdownInterval = null;
    let countUpInterval = null;
    let countUpStarted = false;

    function switchToCountUp(){
        if (countUpStarted) return;
        countUpStarted = true;
        if (countdownInterval) clearInterval(countdownInterval);
        const start = targetDate; // punto de referencia: inicio del evento
        // Cambiar títulos "Faltan:" -> "Transcurrido:" si existen
        const heroTitle = document.querySelector('.hero-contador__title');
        const fixedTitle = document.querySelector('.contador-fixed__title');
        if (heroTitle) heroTitle.textContent = 'Transcurrido:';
        if (fixedTitle) fixedTitle.textContent = 'Transcurrido:';
        document.querySelectorAll('.hero-contador, .contador-fixed').forEach(el=>el.classList.add('countup-active'));

        function updateCountUp(){
            const now = Date.now();
            let elapsed = now - start;
            if (elapsed < 0) elapsed = 0;

            const second = 1000;
            const minute = 60 * second;
            const hour = 60 * minute;
            const day = 24 * hour;

            const d = Math.floor(elapsed / day);
            const h = Math.floor((elapsed % day) / hour);
            const m = Math.floor((elapsed % hour) / minute);
            const s = Math.floor((elapsed % minute) / second);

            Object.values(countdownTargets).forEach(group => {
                if(!group) return;
                group.days && (group.days.textContent = pad(d));
                group.hours && (group.hours.textContent = pad(h));
                group.minutes && (group.minutes.textContent = pad(m));
                group.seconds && (group.seconds.textContent = pad(s));
            });
        }
        updateCountUp();
        countUpInterval = setInterval(updateCountUp, 1000);
    }

    function updateCountdown(){
        const now = Date.now();
        let gap = targetDate - now;

        if (gap <= 0){
            // Cambiar a modo count-up
            switchToCountUp();
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        Object.values(countdownTargets).forEach(group => {
            if(!group) return;
            group.days && (group.days.textContent = pad(d));
            group.hours && (group.hours.textContent = pad(h));
            group.minutes && (group.minutes.textContent = pad(m));
            group.seconds && (group.seconds.textContent = pad(s));
        });
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // --- Datos y lógica de los Ponentes ---
    const speakersData = [
        {
            name: "Aldo <br> García",
            imgSrc: "./images/speakers/aldo-garcia.jpg",
            imgAlt: "Foto de Aldo García",
            description: "Consultor con experiencia en el sector financiero, especializado en estrategias de inversión y planes de pensiones privado.",
            p: "Skandia"
        },
        {
            name: "Roberto <br> Breedingham",
            imgSrc: "./images/speakers/roberto-breedingham.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Roberto Breedingham",
            description: "Titular de Wellness Journal, experto en impulsar talentos y conexión emocional."
        },
        {
            name: "Vanya <br> Perez",
            imgSrc: "./images/speakers/vanya-perez.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Vanya Perez",
            description: "Directora Comercial en Cocoon, experta en programas de transformación y resultados de negocio.",
            p: "Cocoon"
        },
        {
            name: "Tere <br> Estrada",
            imgSrc: "./images/speakers/tere-estrada.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Tere Estrada",
            description: "Coach en Salud y Antiaging, experta en psicología, musicoterapia y nutrición fitness.",
            p: "Sintropía Martínez"        
        },
        {
            name: "Germán <br> Rodríguez",
            imgSrc: "./images/speakers/german-rodriguez.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Germán Rodríguez",
            description: "Experto en mercados inmobiliarios, ingeniero por el IPN con trayectoria de más de 12 años.",
            p: "Axa"
        },
        {
            name: "Guillermo <br> Villasana",
            imgSrc: "./images/speakers/guillermo-villasana.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Guillermo Villasana",
            description: "Profesional que une experiencia en TI con terapias holísticas para un impacto humano integral.",
            p: "TuPrimero.mx"
        },
        {
            name: "Oscar <br> Viau",
            imgSrc: "./images/speakers/oscar-viau.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Oscar Viau",
            description: "Ejecutivo con amplia experiencia en operaciones, digitalización y desarrollo humano.",
            p: "Red Integral"
        },
        {
            name: "Joshua <br> Aguilar",
            imgSrc: "./images/speakers/joshua-aguilar.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Joshua Aguilar",
            description: "Gerente en Red Integral, especialista en transformación digital, analítica de datos e IA.",
            p: "Red Integral"
        },
        /*Nuevo se quita a Raul Medina*/
        {
            name: "Oscar <br> Jimenez",
            imgSrc: "./images/speakers/oscar-jimenez.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Oscar Jimenez",
            description: "Socio fundador de FCB Consultores, con 22 años de experiencia en planificación de retiro.",
            p: "FCB Consultores"
        },
        {
            name: "Arturo <br> Guillén",
            imgSrc: "./images/speakers/arturo-guilen.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Arturo Guillén",
            description: "Lic. en Quiropráctica, líder en tratamientos ajustados a cada paciente.",
            p: "Dolorfin"
        },
        {
            name: "Nayeli <br> Meza",
            imgSrc: "./images/speakers/nayeli-meza.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Nayeli Meza",
            description: "Editora en Jefe de MIT SMR México, especializada en economía, negocios e innovación.",
            p: "MIT"
        },
        {
            name: "Jorge <br> Alcántara",
            imgSrc: "./images/speakers/jorge-alcantara.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Jorge Alcántara",
            description: "Lic. en Economía por la UNAM, experto en finanzas e inversiones y académico activo.",
            p: "Skandia"
        },
        {
            name: "Mafalda <br> Hurtado",
            imgSrc: "./images/speakers/mafalda-hurtado.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Mafalda Hurtado",
            description: "Director Médico en Auna Oncosalud, experto en endocrinología y liderazgo en oncología.",
            p: "Auna"
        },
        {
            name: "Julián <br> Robles",
            imgSrc: "./images/speakers/julian-robles.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Julián Robles",
            description: "ICF Coach y Maestro en Filosofía, especializado en desarrollo de líderes y equipos.",
            p: "Lumine"
        },
        {
            name: "Miguel <br> Hernández",
            imgSrc: "./images/speakers/miguel-hernandez.jpg", // Asegúrate de tener esta imagen
            imgAlt: "Foto de Miguel Hernández",
            description: "Profesional en nutrición funcional, combinando ciencia, innovación y salud intestinal.",
            p: "Usana"
        }
    ];

    const speakersContent = document.querySelector('.speakers-content');

    function renderSpeakers() {
        speakersContent.innerHTML = ''; // Limpiar contenido
        speakersData.forEach(speaker => {
            const speakerCardHTML = `
                <div class="speaker-card fade-in">
                    <div class="speaker-card-inner">
                        <div class="speakers-item">
                            <figure class="speakers-item__img-container">
                                <img src="${speaker.imgSrc}" alt="${speaker.imgAlt}" class="speakers-item__img">
                            </figure>
                            <b class="speakers-item__name">${speaker.name}</b>
                            <p class="speakers-item__company">${speaker.p ? speaker.p : '...'}</p>
                            <i class="bi bi-arrow-right-circle-fill speakers-item__icon"></i>
                        </div>
                        <div class="speakers-item__back">
                            <b class="speakers-item__name">${speaker.name}</b>
                            <hr class="speakers-item__divider">
                            <p class="speakers-item__description">${speaker.description}</p>
                        </div>
                    </div>
                </div>
            `;
            speakersContent.innerHTML += speakerCardHTML;
        });
    }

    renderSpeakers(); // Llamar a la función para generar los ponentes

    // --- Speakers: colapsar a 4 en móvil con botón "Ver todos" ---
    const speakersContainer = document.querySelector('.speakers-content');
    const speakersToggleBtn = document.getElementById('speakersToggle');

    const applySpeakersCollapseByViewport = () => {
        const isMobile = window.matchMedia('(max-width: 992px)').matches;
        if (!speakersContainer || !speakersToggleBtn) return;
        if (isMobile) {
            // Solo colapsar si no fue expandido por el usuario
            if (!speakersContainer.hasAttribute('data-user-expanded')) {
                speakersContainer.classList.add('is-collapsed');
                speakersToggleBtn.style.display = 'inline-block';
                speakersToggleBtn.textContent = 'Ver todos';
                speakersToggleBtn.setAttribute('aria-expanded', 'false');
            }
        } else {
            speakersContainer.classList.remove('is-collapsed');
            speakersToggleBtn.style.display = 'none';
            speakersToggleBtn.setAttribute('aria-expanded', 'true');
            // Limpiar el estado de interacción del usuario en desktop
            speakersContainer.removeAttribute('data-user-expanded');
        }
    };

    applySpeakersCollapseByViewport();
    window.addEventListener('resize', applySpeakersCollapseByViewport);

    if (speakersToggleBtn) {
        speakersToggleBtn.addEventListener('click', () => {
            const collapsed = speakersContainer.classList.toggle('is-collapsed');
            const expanded = !collapsed;
            speakersToggleBtn.textContent = expanded ? 'Ver menos' : 'Ver todos';
            speakersToggleBtn.setAttribute('aria-expanded', String(expanded));
            // Marcar que el usuario ha interactuado
            if (expanded) {
                speakersContainer.setAttribute('data-user-expanded', 'true');
            } else {
                speakersContainer.removeAttribute('data-user-expanded');
            }
        });
    }

    // --- Datos y lógica de la Agenda ---
    const agendaData = [
        {
            day: 2,
            imgSrc: './images/agenda/La-verdad-de-las-finanzas-personales.jpg',
            imgAlt: 'Mujer preocupada revisando sus finanzas personales',
            title: 'La verdad incómoda de las finanzas personales',
            presenter: 'Aldo García',
            date: '20 Octubre 2025',
            time: '09:00 AM - 10:00 AM',
            dateTime: '2025-10-20T09:00',
            topic: 'Finanzas',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-verdad-incomoda-finanzas-20-oct-2025'
        },
        {
            day: 2,
            imgSrc: './images/agenda/amor-propio.jpg',
            imgAlt: 'Persona meditando en un ambiente tranquilo',
            title: 'Amor propio',
            presenter: 'Roberto Breedingham',
            date: '20 Octubre 2025',
            time: '10:00 AM - 11:30 AM',
            dateTime: '2025-10-20T10:00',
            topic: 'Salud Emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-amor-propio-20-oct-2025'
        },
        {
            day: 2,
            imgSrc: './images/agenda/IA-para-un-liderazgo-asertivo.jpg',
            imgAlt: 'Mujer con gafas trabajando con una computadora portátil',
            title: 'Cómo utilizar la IA para lograr un liderazgo asertivo',
            presenter: 'Gerardo Joshua Aguilar Vasquez',
            date: '20 Octubre 2025',
            time: '12:00 PM - 01:00 PM',
            dateTime: '2025-10-21T12:00',
            topic: 'Liderazgo',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-ia-liderazgo-asertivo-21-oct-2025'
        },
        {
            day: 2,
            imgSrc: './images/agenda/paz-con-bano-de-gong.jpg',
            imgAlt: 'Persona tocando el gong',
            title: 'Elige crear tu paz con baño de Gong',
            presenter: 'Guillermo Villasana',
            date: '20 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-20T13:30',
            topic: 'Salud Emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-paz-con-bano-de-gong-20-oct-2025',
            // Agregar esta linea (soldOut: true) para indicar que está agotado 
            // soldOut: true
        },
        {
            day: 2,
            imgSrc: './images/agenda/Strong-funcional-ritmico.jpg',
            imgAlt: 'Funcional rítmico',
            title: 'Strong: Funcional - Rítmico',
            presenter: 'Ali Hernández',
            date: '20 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-20T13:30',
            topic: 'Danzaterapia',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-strong-funcional-ritmico-20-oct-2025'
        },
        {
            day: 3,
            imgSrc: './images/agenda/interes-financiero.jpg',
            imgAlt: 'Mujer tranquila disfrutando sus relaciones personales',
            title: 'La clave para una vida sin estrés financiero',
            presenter: 'Germán Rodríguez',
            date: '21 Octubre 2025',
            time: '09:00 AM - 10:00 AM',
            dateTime: '2025-10-21T09:00',
            topic: 'Finanzas',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-vida-sin-estres-financiero-21-oct-2025'
        },
        {
            day: 3,
            imgSrc: './images/agenda/inteligencia-emocional-para-vivir-y-trabajar-mejor.jpg',
            imgAlt: 'Mujer sonriente en un entorno laboral',
            title: 'Equilibrio en acción: Inteligencia emocional para vivir y trabajar mejor',
            presenter: 'Oscar Viau Gómez',
            date: '21 Octubre 2025',
            time: '10:30 AM - 11:30 AM',
            dateTime: '2025-10-21T10:30',
            topic: 'Salud Emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-equilibrio-en-accion-21-oct-2025'
        },
        {
            day: 3,
            imgSrc: './images/agenda/liderar-es-crecer-juntos.jpg',
            imgAlt: 'Grupo de personas colaborando en una oficina moderna',
            title: 'Liderar es crecer juntos',
            presenter: 'Vanya Pérez',
            date: '21 Octubre 2025',
            time: '12:00 PM - 01:00 PM',
            dateTime: '2025-10-20T12:00',
            topic: 'Liderazgo',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-liderar-crecer-juntos-20-oct-2025'
        },
        {
            day: 3,
            imgSrc: './images/agenda/introduccion-a-pmr.jpg',
            imgAlt: 'Hombre relajado con los ojos cerrados meditando',
            title: 'Introducción a PMR "Progresive Muscle Relaxation"',
            presenter: 'Tere Estrada',
            date: '21 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-21T13:30',
            topic: 'Salud física',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-introduccion-a-pmr-21-oct-2025'
        },
        {
            day: 3,
            imgSrc: './images/agenda/danzaterapia.jpg',
            imgAlt: 'Mujer bailando en un entorno alegre',
            title: 'Danzaterapia',
            presenter: 'Vanya Pérez',
            date: '21 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-21T13:30',
            topic: 'Salud física',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-danzaterapia-21-oct-2025'
        },
        {
            day: 4,
            imgSrc: './images/agenda/prepararme-para-mi-retiro.jpg',
            imgAlt: 'Hombre sentado pensativo',
            title: 'El camino hacia el retiro',
            presenter: 'Oscar Jiménez',
            date: '22 Octubre 2025',
            time: '09:00 AM - 10:00 AM',
            dateTime: '2025-10-22T09:00',
            topic: 'Finanzas',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-camino-hacia-el-retiro-22-oct-2025'
        },
        {
            day: 4,
            imgSrc: './images/agenda/higiene-de-la-columna.jpg',
            imgAlt: 'Mujer realizando ejercicios de estiramiento',
            title: 'Higiene de la columna',
            presenter: 'Arturo Guillén Huerta',
            date: '22 Octubre 2025',
            time: '10:30 AM - 11:30 AM',
            dateTime: '2025-10-22T10:30',
            topic: 'Salud Física',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-higiene-de-columna-22-oct-2025'
        },
        {
            day: 4,
            imgSrc: './images/agenda/5-estrategias-de-mario-bros.jpg',
            imgAlt: 'Estrellita de videojuego',
            title: 'Conéctate contigo: 5 estrategias de Mario Bros para cuidar tu salud mental en el trabajo',
            presenter: 'Nayeli Meza Orozco',
            date: '22 Octubre 2025',
            time: '12:00 AM - 01:00 PM',
            dateTime: '2025-10-22T12:00',
            topic: 'Salud emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-conectate-contigo-22-oct-2025'
        },
        {
            day: 4,
            imgSrc: './images/agenda/relaja-tu-cuerpo-relaja-tu-mente.jpg',
            imgAlt: 'Mujer relajada con los ojos cerrados meditando',
            title: 'Relaja tu cuerpo, relaja tu mente',
            presenter: 'Tere Estrada',
            date: '22 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-22T13:30',
            topic: 'Salud emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-relaja-tu-cuerpo-relaja-tu-mente-22-oct-2025'
        },
        {
            day: 4,
            imgSrc: './images/agenda/body-balance.jpg',
            imgAlt: 'Mujeres haciendo ejercicio en un gimnasio',
            title: 'Body Balance Mix Yoya-Pilates',
            presenter: 'Guadalupe Avalos',
            date: '22 Octubre 2025',
            time: '01:30 AM - 02:30 PM',
            dateTime: '2025-10-22T13:30',
            topic: 'Salud física',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-body-balance-22-oct-2025'
        },
        {
            day: 5,
            imgSrc: './images/agenda/aprender-a-gastar.jpg',
            imgAlt: 'Mujer feliz con sus finanzas personales',
            title: 'No es ahorrar,  es aprender a gastar',
            presenter: 'Jorge Eduardo Alcántara Uribe',
            date: '23 Octubre 2025',
            time: '09:00 AM - 10:00 AM',
            dateTime: '2025-10-23T09:00',
            topic: 'Finanzas',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-aprender-a-gastar-23-oct-2025'
        },
        {
            day: 5,
            imgSrc: './images/agenda/tu-salud-tu-eleccion.jpg',
            imgAlt: 'Hombre de la tercera edad sonriendo al aire libre',
            title: 'Tu salud, tu elección: Prevenir es poder',
            presenter: 'Dra. Mafalda Hurtado ',
            date: '23 Octubre 2025',
            time: '10:30 AM - 11:30 AM',
            dateTime: '2025-10-23T10:30',
            topic: 'Salud',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-prevenir-es-poder-23-oct-2025'
        },
        {
            day: 5,
            imgSrc: './images/agenda/liderazgo-5-0.jpg',
            imgAlt: 'Manos unidas en señal de trabajo en equipo',
            title: 'Liderazgo 5.0',
            presenter: 'Julián Robles',
            date: '23 Octubre 2025',
            time: '12:00 PM - 01:00 PM',
            dateTime: '2025-10-23T12:00',
            topic: 'Liderazgo',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-liderazgo-5-0-23-oct-2025'
        },
        {
            day: 5,
            imgSrc: './images/agenda/transforma-creencias-con-el-gong.jpg',
            imgAlt: 'Gong con fondo de atardecer',
            title: 'Transforma tus creencias con el Gong',
            presenter: 'Guillermo Villasana',
            date: '23 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-23T13:30',
            topic: 'Salud emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-transforma-creencias-con-el-gong-23-oct-2025'
        },
        {
            day: 5,
            imgSrc: './images/agenda/estiramiento-relajante.jpg',
            imgAlt: 'Mujer realizando estiramientos',
            title: 'Stretch: Estiramiento-Relajante',
            presenter: 'Adrián Ruíz',
            date: '23 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-23T13:30',
            topic: 'Salud emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-estiramiento-relajante-23-oct-2025'
        },
        {
            day: 6,
            imgSrc: './images/agenda/amor-y-dinero.jpg',
            imgAlt: 'Pareja con una alcancia en forma de cerdito',
            title: 'Amor y dinero: guía para finanzas en pareja',
            presenter: 'Aldo García',
            date: '24 Octubre 2025',
            time: '09:00 AM - 10:00 AM',
            dateTime: '2025-10-24T09:00',
            topic: 'Finanzas',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-amor-y-dinero-24-oct-2025'
        },
        {
            day: 6,
            imgSrc: './images/agenda/epigenetica.jpg',
            imgAlt: 'Mujer observando genetica en una pantalla',
            title: 'Epigenética: ¿destino de enfermedad o herramienta de prevención?',
            presenter: 'Dr. Miguel Angel Hernández',
            date: '24 Octubre 2025',
            time: '10:30 AM - 11:30 AM',
            dateTime: '2025-10-24T10:30',
            topic: 'Salud',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-epigenetica-24-oct-2025'
        },
        {
            day: 6,
            imgSrc: './images/agenda/soft-power-skills-en-liderazgo.jpg',
            imgAlt: 'Mujer feliz',
            title: 'De soft a power skills en el liderazgo',
            presenter: 'Julián Robles',
            date: '24 Octubre 2025',
            time: '12:00 PM - 01:00 PM',
            dateTime: '2025-10-24T12:00',
            topic: 'Liderazgo',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-soft-power-skills-24-oct-2025'
        },
        {
            day: 6,
            imgSrc: './images/agenda/que-puede-hacer-la-musica-por-ti.jpg',
            imgAlt: 'Mujer disfrutando de un concierto',
            title: '¿Qué puede hacer la música por ti?',
            presenter: 'Tere Estrada',
            date: '24 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-24T13:30',
            topic: 'Salud emocional',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-musica-por-ti-24-oct-2025'
        },
        {
            day: 6,
            imgSrc: './images/agenda/power-hits.jpg',
            imgAlt: 'Mujeres haciendo ejercicio en un gimnasio',
            title: 'Power Hits: Funcional Multinivel',
            presenter: 'Cecy Flores',
            date: '24 Octubre 2025',
            time: '01:30 PM - 02:30 PM',
            dateTime: '2025-10-24T13:30',
            topic: 'Salud física',
            link: 'https://mailchi.mp/grupomedios.com/registro-bl-power-hits-24-oct-2025'
        }
    ];

    const agendaContent = document.querySelector('.agenda-content');
    const dateButtons = document.querySelectorAll('.agenda-dates__btn');

    function renderAgenda(day) {
        agendaContent.innerHTML = ''; // Limpiar el contenido actual
        const filteredEvents = agendaData.filter(event => event.day == day);

        if (filteredEvents.length === 0) {
            agendaContent.innerHTML = '<p class="agenda-empty">No hay ponencias programadas para este día.</p>';
            return;
        }

        filteredEvents.forEach(event => {
            const isSoldOut = !!event.soldOut;
            const figure = `
                <figure class="agenda-item__img-container">
                    <img src="${event.imgSrc}" alt="${event.imgAlt}">
                    ${isSoldOut ? '<div class="agenda-item__soldout">Agotado</div>' : ''}
                </figure>
            `;

            const actions = isSoldOut
                ? `<button class="agenda-item__btn agenda-item__btn--disabled" disabled>Agotado</button>`
                : `<a href="${event.link || '#'}" target="_blank" class="agenda-item__btn">Registrarme aquí</a>`;

            const eventCard = `
                <div class="agenda-item">
                    ${figure}
                    <div class="agenda-item__details">
                        <h3 class="agenda-item__title">${event.title}</h3>
                        <p class="agenda-item__presenter"><b>Presentado por:</b> ${event.presenter}</p>
                        <div class="agenda-item__meta">
                            <p class="agenda-item__date"><b>Fecha:</b> <time datetime="${event.dateTime}">${event.date}</time></p>
                            <p class="agenda-item__time"><b>Hora:</b> <time datetime="${event.dateTime}">${event.time}</time></p>
                        </div>
                    </div>
                    <div class="agenda-item__actions">
                        <span class="agenda-item__topic">Temática: ${event.topic}</span>
                        ${actions}
                    </div>
                </div>
            `;
            agendaContent.innerHTML += eventCard;
        });
    }

    dateButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar el botón activo
            dateButtons.forEach(btn => btn.classList.remove('agenda-dates__btn--active'));
            button.classList.add('agenda-dates__btn--active');

            // Renderizar los eventos para el día seleccionado
            const selectedDay = button.getAttribute('data-day');
            renderAgenda(selectedDay);
        });
    });

    // Renderizar los eventos del primer día por defecto
    const initialDay = document.querySelector('.agenda-dates__btn--active').getAttribute('data-day');
    renderAgenda(initialDay);

    // --- Menú fijo: visible solo cuando el header del héroe deja de estar en viewport ---
    const heroHeader = document.querySelector('section.hero');
    const navFixed = document.getElementById('navFixed');
    const contadorFixed = document.querySelector('.contador-fixed');

    function syncContadorPosition(){
        if(!navFixed || !contadorFixed) return;
        // Altura real del nav (incluye padding) para colocar debajo
        const navHeight = navFixed.getBoundingClientRect().height;
        contadorFixed.style.top = navHeight + 'px';
    }
    window.addEventListener('resize', syncContadorPosition);
    window.addEventListener('orientationchange', syncContadorPosition);

    if (heroHeader && navFixed) {
        // Observamos el NAV visible dentro del header (desktop o móvil)
        const getVisibleHeroNav = () => {
            const desktopNav = heroHeader.querySelector('nav.nav:not(.nav--mobile)');
            const mobileNav = heroHeader.querySelector('nav.nav--mobile');
            const mobileVisible = mobileNav && window.getComputedStyle(mobileNav).display !== 'none';
            return mobileVisible ? mobileNav : desktopNav;
        };

        let observedTarget = getVisibleHeroNav();
        let heroNavObserver;

        const createHeroNavObserver = () => {
            if (heroNavObserver) heroNavObserver.disconnect();
            observedTarget = getVisibleHeroNav();
            if (!observedTarget) return;

            heroNavObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // El nav del hero es visible, ocultamos el fijo
                        navFixed.classList.remove('is-visible');
                        if(contadorFixed) contadorFixed.classList.remove('is-visible');
                    } else {
                        // El nav del hero ya salió, mostramos el fijo y el contador
                        navFixed.classList.add('is-visible');
                        navFixed.classList.remove('is-hidden');
                        if(contadorFixed){
                            contadorFixed.classList.add('is-visible');
                        }
                        syncContadorPosition();
                    }
                });
            }, {
                root: null,
                threshold: 0,
                rootMargin: '0px 0px 0px 0px'
            });

            heroNavObserver.observe(observedTarget);
        };

        createHeroNavObserver();
        // Recalcular al cambiar el viewport (p. ej., pasar de desktop a móvil)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(createHeroNavObserver, 150);
        });

        // Fallback por si IntersectionObserver no está disponible
        if (!('IntersectionObserver' in window)) {
            const heroNavBottom = () => {
                const t = getVisibleHeroNav();
                return t ? t.getBoundingClientRect().bottom : (document.querySelector('.hero')?.getBoundingClientRect().bottom || 0);
            };
            const onScroll = () => {
                if (heroNavBottom() <= 0) {
                    navFixed.classList.add('is-visible');
                    navFixed.classList.remove('is-hidden');
                    if(contadorFixed){ contadorFixed.classList.add('is-visible'); syncContadorPosition(); }
                } else {
                    navFixed.classList.remove('is-visible');
                    if(contadorFixed) contadorFixed.classList.remove('is-visible');
                }
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        // Sin menú móvil: limpieza completa de lógica de hamburguesa/overlay

        // Menú móvil (hamburguesa) en nav fijo
        const toggleBtn = document.getElementById('navFixedToggle');
        const menu = document.getElementById('navFixedMenu');
        if (toggleBtn && menu) {
            const closeMenu = () => {
                toggleBtn.classList.remove('is-open');
                toggleBtn.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
            };
            toggleBtn.addEventListener('click', () => {
                const isOpen = toggleBtn.classList.toggle('is-open');
                toggleBtn.setAttribute('aria-expanded', String(isOpen));
                menu.classList.toggle('is-open');
            });
            // Cerrar al hacer click en un link
            menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
            // Cerrar con tecla ESC
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeMenu();
            });
        }

        // Scroll suave con offset para enlaces del nav fijo
        navFixed.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (!target) return;
                e.preventDefault();
                const offset = navFixed.getBoundingClientRect().height + 12; // pequeño padding
                const top = window.scrollY + target.getBoundingClientRect().top - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });

        // Scrollspy básico para resaltar el enlace activo
        const sections = Array.from(document.querySelectorAll('section[id], header.hero'));
        const links = Array.from(navFixed.querySelectorAll('.nav-links a'));

        const activateLink = (id) => {
            links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
        };

        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id || 'home';
                    activateLink(id);
                }
            });
        }, { threshold: 0.4 });

        sections.forEach(sec => spyObserver.observe(sec));

        // --- Menú móvil del héroe ---
        const heroToggle = document.getElementById('heroNavToggle');
        const heroMenu = document.getElementById('heroNavMenu');
        if (heroToggle && heroMenu) {
            const closeHeroMenu = () => {
                heroToggle.classList.remove('is-open');
                heroToggle.setAttribute('aria-expanded', 'false');
                heroMenu.classList.remove('is-open');
                // Restaurar visibilidad del nav fijo según observer
                const target = observedTarget || getVisibleHeroNav();
                if (target && target.getBoundingClientRect().bottom <= 0) {
                    navFixed.classList.add('is-visible');
                    navFixed.classList.remove('is-hidden');
                    if(contadorFixed){ contadorFixed.classList.add('is-visible'); syncContadorPosition(); }
                }
            };
            heroToggle.addEventListener('click', () => {
                const isOpen = heroToggle.classList.toggle('is-open');
                heroToggle.setAttribute('aria-expanded', String(isOpen));
                heroMenu.classList.toggle('is-open');
                // Si se abre el menú del héroe, ocultar el nav fijo para no superponer
                if (isOpen) {
                    navFixed.classList.remove('is-visible');
                    if(contadorFixed) contadorFixed.classList.remove('is-visible');
                } else {
                    const target = observedTarget || getVisibleHeroNav();
                    if (target && target.getBoundingClientRect().bottom <= 0) {
                        navFixed.classList.add('is-visible');
                        navFixed.classList.remove('is-hidden');
                        if(contadorFixed){ contadorFixed.classList.add('is-visible'); syncContadorPosition(); }
                    }
                }
            });
            heroMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeHeroMenu));
            window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeHeroMenu(); });
        }

        // --- Auto-hide desactivado: mantener fijo visible mientras se hace scroll ---
        // Aseguramos que, cuando deba mostrarse, no tenga la clase is-hidden
        const ensureVisibleOnScroll = () => {
            if (!navFixed.classList.contains('is-visible')) return;
            navFixed.classList.remove('is-hidden');
            if(contadorFixed){
                // Si nav está visible, asegurar contador visible y alineado
                contadorFixed.classList.add('is-visible');
                syncContadorPosition();
            }
        };
        window.addEventListener('scroll', ensureVisibleOnScroll, { passive: true });
    }

    // Posicionar inicialmente si ya debería verse (p.ej. reload a mitad de la página)
    requestAnimationFrame(syncContadorPosition);

    // ======================
    // Fade-in on scroll
    // ======================
    const fadeItems = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.22, rootMargin: '0px 0px -5% 0px' });
        fadeItems.forEach(el => {
            // Aplicar delay vía inline style si data-fade-delay presente (para Safari que no soporta attr() en calc todavía)
            const delay = el.getAttribute('data-fade-delay');
            if (delay) {
                el.style.transitionDelay = `${parseInt(delay,10)}ms`;
            }
            fadeObserver.observe(el);
        });
    } else {
        // Fallback: mostrar todo inmediatamente
        fadeItems.forEach(el => el.classList.add('is-visible'));
    }
});