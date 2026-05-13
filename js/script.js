document.addEventListener("DOMContentLoaded", () => {
    console.log("Sitio cargado correctamente y listo para interactuar.");

    /* ============================================================
       1. BOTÓN VOLVER ARRIBA (Scroll to Top)
       ============================================================ */
    const btnTop = document.getElementById("btnTop");
    if (btnTop) {
        window.addEventListener("scroll", () => {
            // El botón aparece si bajamos más de 300px
            if (window.scrollY > 300) {
                btnTop.style.display = "block";
            } else {
                btnTop.style.display = "none";
            }
        });

        btnTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Desplazamiento suave
            });
        });
    }

    /* ============================================================
       2. EFECTO DE ESCRITURA (Typewriter Effect)
       ============================================================ */
    const textoCambiante = document.getElementById("typewriter");
    if (textoCambiante) {
        const frases = [
            "Diseñador Freelancer", 
            "Desarrollador Web", 
            "Especialista en Frontend",
            "Ingeniero de Sistemas"
        ];
        let fraseIndex = 0;
        let letraIndex = 0;
        let estaBorrando = false;

        function animarTypewriter() {
            const fraseActual = frases[fraseIndex];
            
            if (estaBorrando) {
                textoCambiante.textContent = fraseActual.substring(0, letraIndex - 1);
                letraIndex--;
            } else {
                textoCambiante.textContent = fraseActual.substring(0, letraIndex + 1);
                letraIndex++;
            }

            let velocidad = estaBorrando ? 50 : 150;

            // Pausas al terminar de escribir o borrar
            if (!estaBorrando && letraIndex === fraseActual.length) {
                velocidad = 2000; // Pausa al final de la frase
                estaBorrando = true;
            } else if (estaBorrando && letraIndex === 0) {
                estaBorrando = false;
                fraseIndex = (fraseIndex + 1) % frases.length;
                velocidad = 500;
            }

            setTimeout(animarTypewriter, velocidad);
        }
        animarTypewriter();
    }

    /* ============================================================
       3. CONTADOR ANIMADO (Statistics Counter)
       ============================================================ */
    const contadores = document.querySelectorAll('.numero-contador');
    if (contadores.length > 0) {
        const iniciarContadores = () => {
            contadores.forEach(contador => {
                const actualizarConteo = () => {
                    const objetivo = +contador.getAttribute('data-objetivo');
                    const actual = +contador.innerText;
                    const incremento = objetivo / 50; // Ajusta la velocidad aquí

                    if (actual < objetivo) {
                        contador.innerText = Math.ceil(actual + incremento);
                        setTimeout(actualizarConteo, 30);
                    } else {
                        contador.innerText = objetivo;
                    }
                };
                actualizarConteo();
            });
        };
        
        // Inicia la animación de los números al cargar
        iniciarContadores();
    }

    /* ============================================================
       4. VALIDACIÓN DE FORMULARIO PARA guardar.php
       ============================================================ */
    const formulario = document.querySelector('.formulario-card') || document.querySelector('.formulario');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            // Buscamos los campos por su atributo 'name' para que coincidan con el PHP
            const nombre = formulario.querySelector('[name="nombre"]').value.trim();
            const telefono = formulario.querySelector('[name="telefono"]').value.trim();
            const correo = formulario.querySelector('[name="correo"]').value.trim();
            const mensaje = formulario.querySelector('[name="mensaje"]').value.trim();

            if (nombre === "" || telefono === "" || correo === "" || mensaje === "") {
                e.preventDefault(); // Detiene el envío si faltan datos
                alert("❌ Por favor, completa todos los campos obligatorios antes de enviar.");
            } else {
                // Si todo está bien, permitimos que el formulario se envíe a guardar.php
                console.log("Formulario validado. Enviando datos al servidor...");
            }
        });
    }
});