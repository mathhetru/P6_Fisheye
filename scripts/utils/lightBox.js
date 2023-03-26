import { extensionFactory } from "../utils/extension.js";

export function modalLightBox(photographerMedia) {
	const getLightbox = document.getElementById("lightbox-modal");
    const AllMedia = document.querySelectorAll(".photograph-galery-content__media")
    const lightBox = document.querySelector('.lightbox');
    

    console.log(photographerMedia);
    
    let pictureId;
    AllMedia.forEach(media => {
        media.addEventListener("click", function () {
            getLightbox.classList.add("lightbox-open");
            pictureId = media.parentElement.getAttribute("data-id");

            const picture = findPictureClicked(photographerMedia, pictureId);
            lightBox.innerHTML = generateElementInLightBox(picture);
            closeLightBox();
        });
    });
    
	function closeLightBox() {
        const closeBtn = document.querySelector(".js-lightbox-close__btn");
        closeBtn.addEventListener("click", function () {
            getLightbox.classList.remove("lightbox-open");
        });
    }

    function findPictureClicked(photographerMedia, pictureId) {
        return photographerMedia.find(
            (element) => element.id == pictureId
        );
    }

    function generateElementInLightBox(picture) {
        const media = `
            <header class="lightbox-header">
                <img class="lightbox-header__img js-lightbox-close__btn" src="assets/icons/close-red.svg"/>
            </header>
            <section class="lightbox-main">
                <i class="fas fa-chevron-left js-lightbox-left__btn"></i>
                    ${extensionFactory(picture.path, picture.title, "lightbox-main__img")}
                <i class="fas fa-chevron-right js-lightbox-right__btn"></i>
            </section>
            <footer class="lightbox-footer">
                <p class="lightbox-footer__title">${picture.title}</p>
            </footer>
        `
        return media
    }
	// const modalTitle = document.querySelector(".modal-header__title");
	// modalTitle.innerHTML = `Contactez-moi </br> ${photographer.name}`
};