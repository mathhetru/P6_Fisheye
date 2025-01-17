import { extensionFactory } from "../utils/extension.js";
import { currentFocusedElement, focusTrappedInsideModal } from "./focusInsideModal.js";

/**
 * Affiche la modal LightBox et ses fonctions
 * @param {Array<Object>} photographerMedia 
 */
export function modalLightBox(photographerMedia) {
    const getLightbox = document.getElementById("lightbox-modal");
    const AllMedia = document.querySelectorAll(".photograph-galery-content__media");
    const lightBox = document.querySelector(".lightbox");
    
    /**
     * Tous les médias : pour chacun, écoute le click ou la touche entrée et ouvre la lightBox
     */
    AllMedia.forEach(media => {
        media.addEventListener("click", function () {
            openLightBox(media);
        });

        media.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                openLightBox(media);
            }
        });
    });


    let pictureId;
    /**
     * A l'ouverture de la lightBox, affiche l'image cliquée, récupère l'id de celle-ci 
     * Gère les fonctions de navigation et de fermeture
     * Capture le focus lors de la navigation clavier
     * @param {string} media 
     */
    function openLightBox(media) {
        getLightbox.classList.add("lightbox-open");
        getLightbox.setAttribute("aria-hidden", "true");
        pictureId = media.parentElement.getAttribute("data-id");

        const picture = findPictureClicked(photographerMedia, pictureId);
        const pictureIndex = findIndexOfPictureClicked(photographerMedia, pictureId);
        lightBox.innerHTML = generateElementInLightBox(picture);

        handleNavigation(pictureIndex);     
        closeLightBox();
        focusTrappedInsideModal("#lightbox-modal");
    }


    /**
     * Gestionnaire de navigation au clavier et souris
     * @param {number} initialIndex 
     */
    function handleNavigation(initialIndex) {
        const rightArrow = document.querySelector(".js-lightbox-right__btn");
        const leftArrow = document.querySelector(".js-lightbox-left__btn");
        let i = initialIndex;

        // Click sur flêche droite : met à jour l'image
        rightArrow.addEventListener("click", function () {
            i === photographerMedia.length - 1 ? i = 0 : i += 1;
            // if (i === photographerMedia.length - 1) {
            //     i = 0
            // } else {
            //     i += 1;
            // }
            const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
            updatePictureInLightbox(picture);
        });

        // Click sur flêche gauche : met à jour l'image
        leftArrow.addEventListener("click", function () {
            i === 0 ? i = photographerMedia.length - 1 : i -= 1;
            // if (i === 0) {
            //     i = photographerMedia.length - 1;
            // } else {
            //     i -= 1
            // }
            const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
            updatePictureInLightbox(picture);
        });

        // Écoute navigation clavier
        document.addEventListener("keydown", (event) => {
            // Si flêche droite
            if (event.key === "ArrowRight") {
                i === photographerMedia.length - 1 ? i = 0 : i += 1;
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                updatePictureInLightbox(picture);
            }

            // Si flêche gauche
            if (event.key === "ArrowLeft") {
                i === 0 ? i = photographerMedia.length - 1 : i -= 1;
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                updatePictureInLightbox(picture);
            }
        });
    }


    /**
     * Ferme la modal lors du click sur croix ou de la touche échap
     * Et reprends la navigation clavier où elle en était 
     */
    function closeLightBox() {
        const closeBtn = document.querySelector(".js-lightbox-close__btn");
        closeBtn.addEventListener("click", function () {
            getLightbox.classList.remove("lightbox-open");
            getLightbox.setAttribute("aria-hidden", "false");
            currentFocusedElement.focus();
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                getLightbox.classList.remove("lightbox-open");
                currentFocusedElement.focus();
            }
        });
    }


    /**
     * Recherche l'index du média selon l'id de celui-ci
     * @param {Array<Object>} photographerMedia 
     * @param {number} pictureId 
     * @returns 
     */
    function findIndexOfPictureClicked(photographerMedia, pictureId) {
        return photographerMedia.findIndex(
            (element) => element.id == pictureId
        );
    }


    /**
     * Recherche le média cliqué selon l'id de celui-ci
     * @param {Array<Object>} photographerMedia 
     * @param {number} pictureId 
     * @returns 
     */
    function findPictureClicked(photographerMedia, pictureId) {
        return photographerMedia.find(
            (element) => element.id == pictureId
        );
    }


    /**
     * Retourne le DOM pour les élements dans la lightBox
     */
    function generateElementInLightBox(picture) {
        const media = `
            <header class="lightbox-header">
                <span tabindex="0" role="button" class="js-lightbox-close__btn lightbox-header-button-close">
                    <img alt="bouton fermer la lightbox" class="lightbox-header__img" src="assets/icons/close-red.svg">
                </button>
            </header>
            <section class="lightbox-main">
                <button class="js-lightbox-left__btn lightbox-button" tabindex="0" alt="bouton pour passer à l'image précédente">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div id="lightbox-picture">
                    ${extensionFactory(picture.path, picture.title, "lightbox-main__img", { autoplayVideo: true })}
                </div>
                <button class="js-lightbox-right__btn lightbox-button" tabindex="0" alt="bouton pour passer à l'image suivante">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </section>
            <footer class="lightbox-footer">
                <p aria-label="Titre de cette publication" class="lightbox-footer__title">${picture.title}</p>
            </footer>
        `;
        return media;
    }


    /**
     * Met à jour le média dans la lightBox avec la fonction extensionFactory
     * @param {string} picture 
     */
    function updatePictureInLightbox(picture) {
        const pictureContainer = document.querySelector("#lightbox-picture");
        pictureContainer.innerHTML = extensionFactory(picture.path, picture.title, "lightbox-main__img", { autoplayVideo: true });
    }
}