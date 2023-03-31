import { extensionFactory } from "../utils/extension.js";

export function modalLightBox(photographerMedia) {
	const getLightbox = document.getElementById("lightbox-modal");
    const AllMedia = document.querySelectorAll(".photograph-galery-content__media")
    const lightBox = document.querySelector('.lightbox');
    
    let pictureId;
    AllMedia.forEach(media => {
        media.addEventListener("click", function () {
            getLightbox.classList.add("lightbox-open");
            getLightbox.setAttribute('aria-hidden', 'true');
            pictureId = media.parentElement.getAttribute("data-id");

            const picture = findPictureClicked(photographerMedia, pictureId);
            const pictureIndex = findIndexOfPictureClicked(photographerMedia, pictureId);
            lightBox.innerHTML = generateElementInLightBox(picture);

            clickOnRightArrow(pictureIndex);
            clickOnLeftArrow(pictureIndex);
            closeLightBox();
        });
    });
    
	function clickOnRightArrow(pictureIndex) {
        const rightArrow = document.querySelector('.js-lightbox-right__btn');
        rightArrow.addEventListener("click", function () {
            let i = pictureIndex = pictureIndex + 1;

            if (pictureIndex !== photographerMedia.length) {
                // console.log(pictureIndex, photographerMedia.length);
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            } else {
                pictureIndex = 0;
                i = 0;
                const picture = findPictureClicked(photographerMedia, photographerMedia[0].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            }

            clickOnRightArrow(i);
            clickOnLeftArrow(i);
            closeLightBox();
        });
    }

    function clickOnLeftArrow(pictureIndex) {
        const leftArrow = document.querySelector('.js-lightbox-left__btn');
        leftArrow.addEventListener("click", function () {
            let i = pictureIndex = pictureIndex - 1;

            // console.log(pictureIndex, photographerMedia.length);
            if (pictureIndex !== 0) {
                console.log(pictureIndex, photographerMedia.length);
                console.log(i);
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            } else {
                // console.log(pictureIndex, photographerMedia.length);
                // console.log("PROUT");
                pictureIndex = photographerMedia.length;
                i = photographerMedia.length;
                const picture = findPictureClicked(photographerMedia, photographerMedia[0].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            }

            clickOnRightArrow(i);
            clickOnLeftArrow(i);
            closeLightBox();
        });
    }


    function closeLightBox() {
        const closeBtn = document.querySelector(".js-lightbox-close__btn");
        closeBtn.addEventListener("click", function () {
            getLightbox.classList.remove("lightbox-open");
            getLightbox.setAttribute('aria-hidden', 'false');
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            getLightbox.classList.remove("lightbox-open");
        };
        if (event.key === "ArrowRight") {
            const pictureIndex = findIndexOfPictureClicked(photographerMedia, pictureId);

            let i = pictureIndex + 1;

            if (pictureIndex !== photographerMedia.length) {
                // console.log(pictureIndex, photographerMedia.length);
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            } else {
                pictureIndex = 0;
                i = 0;
                const picture = findPictureClicked(photographerMedia, photographerMedia[0].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            }

            clickOnRightArrow(i);
            clickOnLeftArrow(i);
            closeLightBox();
        };
        if (event.key === "ArrowLeft") {
            const pictureIndex = findIndexOfPictureClicked(photographerMedia, pictureId);

            let i = pictureIndex - 1;

            // console.log(pictureIndex, photographerMedia.length);
            if (pictureIndex !== 0) {
                // console.log(pictureIndex, photographerMedia.length);
                const picture = findPictureClicked(photographerMedia, photographerMedia[i].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            } else {
                // console.log(pictureIndex, photographerMedia.length);
                // console.log("PROUT");
                pictureIndex = photographerMedia.length;
                i = photographerMedia.length;
                const picture = findPictureClicked(photographerMedia, photographerMedia[0].id);
                lightBox.innerHTML = generateElementInLightBox(picture);
            }

            clickOnRightArrow(i);
            clickOnLeftArrow(i);
            closeLightBox();
        };
    });


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
                    ${extensionFactory(picture.path, picture.title, "lightbox-main__img")}
                <i tabindex="0" role="button" alt="bouton pour passer à l'image suivante" aria-hidden="true" class="fas fa-chevron-right js-lightbox-right__btn"></i>
            </section>
            <footer class="lightbox-footer">
                <p tabindex="0" class="lightbox-footer__title">${picture.title}</p>
            </footer>
        `
        return media
    }
	// const modalTitle = document.querySelector(".modal-header__title");
	// modalTitle.innerHTML = `Contactez-moi </br> ${photographer.name}`
};