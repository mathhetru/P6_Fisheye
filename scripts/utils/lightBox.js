import { extensionFactory } from "../utils/extension.js";
import { currentFocusedElement, focusTrappedInsideModal } from "./focusInsideModal.js";

export function modalLightBox(photographerMedia) {
    const getLightbox = document.getElementById("lightbox-modal");
    const AllMedia = document.querySelectorAll(".photograph-galery-content__media");
    const lightBox = document.querySelector(".lightbox");
    
    let pictureId;
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

    function handleNavigation(initialIndex) {
        const rightArrow = document.querySelector(".js-lightbox-right__btn");
        const leftArrow = document.querySelector(".js-lightbox-left__btn");
        let i = initialIndex;

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

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                i === photographerMedia.length - 1 ? i = 0 : i += 1;
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                updatePictureInLightbox(picture);
            }

            if (event.key === "ArrowLeft") {
                i === 0 ? i = photographerMedia.length - 1 : i -= 1;
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                updatePictureInLightbox(picture);
            }
        });
    }

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


    function findIndexOfPictureClicked(photographerMedia, pictureId) {
        return photographerMedia.findIndex(
            (element) => element.id == pictureId
        );
    }

    function findPictureClicked(photographerMedia, pictureId) {
        return photographerMedia.find(
            (element) => element.id == pictureId
        );
    }

    function generateElementInLightBox(picture) {
        const media = `
            <header class="lightbox-header">
                <img tabindex="0" role="button" alt="bouton fermer la lightbox" class="lightbox-header__img js-lightbox-close__btn" src="assets/icons/close-red.svg"/>
            </header>
            <section class="lightbox-main">
                <i tabindex="0" role="button" alt="bouton pour passer à l'image précédente" aria-hidden="true" class="fas fa-chevron-left js-lightbox-left__btn"></i>
                <div id="lightbox-picture">
                    ${extensionFactory(picture.path, picture.title, "lightbox-main__img")}
                </div>
                <i tabindex="0" role="button" alt="bouton pour passer à l'image suivante" aria-hidden="true" class="fas fa-chevron-right js-lightbox-right__btn"></i>
            </section>
            <footer class="lightbox-footer">
                <p aria-label="Titre de cette publication" class="lightbox-footer__title">${picture.title}</p>
            </footer>
        `;
        return media;
    }

    function updatePictureInLightbox(picture) {
        const pictureContainer = document.querySelector("#lightbox-picture");
        pictureContainer.innerHTML = extensionFactory(picture.path, picture.title, "lightbox-main__img");
    }
}