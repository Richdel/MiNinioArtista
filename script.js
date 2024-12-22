document.addEventListener('DOMContentLoaded', () => {
    const loadMoreButton = document.getElementById('load-more');
    const hiddenImages = document.querySelectorAll('.gallery .hidden');
    let currentIndex = 0;
    const imagesPerLoad = 3;

    loadMoreButton.addEventListener('click', () => {
        for (let i = currentIndex; i < currentIndex + imagesPerLoad; i++) {
            if (hiddenImages[i]) {
                hiddenImages[i].classList.remove('hidden');
            } else {
                loadMoreButton.style.display = 'none'; // Ocultar botón si no hay más imágenes
                break;
            }
        }
        currentIndex += imagesPerLoad;
    });

    // Modal logic
    const modal = document.getElementById("media-modal");
    const modalImg = document.getElementById("modal-image");
    const modalVideo = document.getElementById("modal-video");
    const captionText = document.getElementById("caption");
    const images = document.querySelectorAll('.gallery img');
    const videos = document.querySelectorAll('.videos video');
    const span = document.getElementsByClassName("close")[0];

    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.style.display = "block";
            modalVideo.style.display = "none";
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
        });

        // Añadir sonido al pasar el mouse
        img.addEventListener('mouseover', () => {
            const hoverSound = new Audio('sounds/SonidoBurbujas.mp3');
            hoverSound.play();
        });
    });

    videos.forEach(video => {
        video.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.style.display = "none";
            modalVideo.style.display = "block";
            modalVideo.src = video.src;
            captionText.innerHTML = video.nextElementSibling ? video.nextElementSibling.innerHTML : "Video de Patineta";
        });

        // Añadir sonido al pasar el mouse
        video.addEventListener('mouseover', () => {
            const hoverSound = new Audio('sounds/SonidoBurbujas.mp3');
            hoverSound.play();
        });
    });

    span.onclick = function() { 
        modal.style.display = "none";
        modalVideo.pause(); // Pausar el video cuando se cierra el modal
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalVideo.pause(); // Pausar el video cuando se cierra el modal
        }
    }

    // Botón de acción con sonidos y animación
    const actionButton = document.getElementById('action-button');
    const smatchSound = document.getElementById('smatch-sound');
    const explosionSound = document.getElementById('explosionSound');
    const explosionImage = document.getElementById('explosion-image');

    actionButton.addEventListener('click', () => {
        // Reproducir el primer sonido
        smatchSound.play();

        // Cuando el primer sonido termine
        smatchSound.onended = () => {
            // Reproducir el sonido de explosión
            explosionSound.play();

            // Mostrar la animación de explosión
            explosionImage.style.display = 'block';
            explosionImage.style.animation = 'explosion 2s forwards';

            // Cuando el sonido de explosión termine
            explosionSound.onended = () => {
                // Mostrar la imagen de explosión
                explosionImage.src = 'images/Explosion.jpg';
                explosionImage.style.opacity = 1;
            };
        };
    });
});