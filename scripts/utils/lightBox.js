export function modalLightBox(photographer, photographerMedia) {
	const getLightbox = document.getElementById("lightbox-modal");
    const AllMedia = document.querySelectorAll(".photograph-galery-content__media")
	const closeBtn = document.querySelector(".js-lightbox-close__btn");

    let pictureId;
    AllMedia.forEach(media => {
        media.addEventListener("click", function () {
            getLightbox.classList.add("lightbox-open");
            pictureId = media.parentElement.getAttribute("data-id");
            // console.log(pictureId);
            const picture = findPicture(photographerMedia, pictureId);
            generateElementInLightBox(picture)
            console.log(picture);
        });
    });
    
	closeBtn.addEventListener("click", function () {
		getLightbox.classList.remove("lightbox-open");
	});

    function findPicture(photographerMedia, pictureId) {
        return photographerMedia.find(
            (element) => element.id == pictureId
        );
    }



    function generateElementInLightBox(picture) {
        const media = `


            <header class="lightbox-header">
                <img class="lightbox-header__img js-lightbox-close__btn" src="assets/icons/close-red.svg"/>
            </header>
            <main class="lightbox-main">
                <i class="fas fa-chevron-left js-lightbox-left__btn"></i>
                    <img class="lightbox-main__img" src="${picture.path}" alt="Benevides Wedding">
                <i class="fas fa-chevron-right js-lightbox-right__btn"></i>
            </main>
            <footer class="lightbox-footer">
                <p class="lightbox-footer__title">${picture.title}</p>
            </footer>
        `

        return media
    }

	// const modalTitle = document.querySelector(".modal-header__title");
	// modalTitle.innerHTML = `Contactez-moi </br> ${photographer.name}`
};