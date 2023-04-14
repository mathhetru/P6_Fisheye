import { generateGallery, photographerFactory } from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { modalContact } from "../utils/contactForm.js";
import { showPriceAndLikes } from "../utils/priceAndLikesBlock.js";
import { dropDown, sortByPopularity } from "../utils/sortBy.js";
import { modalLightBox } from "../utils/lightBox.js";

// Function affiche tous les photograhes
async function displayOnePhotographer(photographer, photographerMedia) {
    // DOM Element - header des pages photographes uniques
    // Pour ce photographe, afficher ses élements sur sa page
    const photographerCard = photographerFactory(photographer);

    const singlePhotographe = photographerCard.singlePhotographDOM({
        name: photographerCard.name,
        id: photographerCard.id,
        picture: photographerCard.picture,
        city: photographerCard.city,
        country: photographerCard.country,
        tagline: photographerCard.tagline,
        price: photographerCard.price,
    });

    // DOM Element - insérer header dans le main 
    const header = document.querySelector(".photograph-header");
    header.innerHTML = singlePhotographe;

    photographerMedia.sort(sortByPopularity);

    generateGallery(photographerMedia);
    modalContact(photographer);
    dropDown(photographerCard, photographerMedia);
    showPriceAndLikes(photographer, photographerMedia);
    modalLightBox(photographerMedia);
}

/**
 * @typedef Photographer
*	@property {string} name
*	@property {number} id
*	@property {string} city
*	@property {string} country
*	@property {string} tagline
*	@property {number} price
*	@property {string} portrait
 */

/**
 * 
 * @param {Array<Photographer>} photographersList 
 * @param {string | number} photographerId 
 * @returns {Photographer | undefined}
 */
function findPhotographerById(photographersList, photographerId) {
    return photographersList.find(
        (element) => element.id == photographerId
    );
}

function findPhotographerMedias(mediaList, photographer) {
    return mediaList.filter(
        (element) => element.photographerId == photographer.id
    ).map(media => {
        const photographerName = photographer.name.split(" ").shift().replace("-", " ");
        const mediaSubPath = media.video || media.image;
        return {
            ...media,
            path: `img/${photographerName}/${mediaSubPath}`
        };
    });
}

async function init() {
    const data = await getData();
    const url = new URL(window.location.href);
    const photographerId = url.searchParams.get("id");
    const photographer = findPhotographerById(data.photographers, photographerId);
    const photographerMedia = findPhotographerMedias(data.media, photographer);
    displayOnePhotographer(photographer, photographerMedia);
}

init();
