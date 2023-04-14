import { generateGalery, photographerFactory } from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { modalContact } from "../utils/contactForm.js";
import { showPriceAndLikes } from "../utils/priceAndLikesBlock.js";
import { dropDown, sortByPopularity } from "../utils/sortBy.js";
import { modalLightBox } from "../utils/lightBox.js";

/**
 * Génère et affiche un photographe en asynchrone
 * @param {Object} photographer 
 * @param {Object} photographerMedia 
 */
async function displayOnePhotographer(photographer, photographerMedia) {
    const photographerCard = photographerFactory(photographer);

    const singlePhotographe = photographerCard.singlePhotographDOM({
        name: photographerCard.name,
        picture: photographerCard.picture,
        city: photographerCard.city,
        country: photographerCard.country,
        tagline: photographerCard.tagline,
    });

    // insère les élements du photographe dans le header
    const header = document.querySelector(".photograph-header");
    header.innerHTML = singlePhotographe;

    //Trie les médias par popularité par défaut
    photographerMedia.sort(sortByPopularity);

    /**
     * génère la galerie du photographe
     * génère la modal de contact
     * génère le dropdown de tri 
     * affiche l'encart likes et prices
     * génère la lightbox des médias
     */
    generateGalery(photographerMedia);
    modalContact(photographer);
    dropDown(photographerCard, photographerMedia);
    showPriceAndLikes(photographer, photographerMedia);
    modalLightBox(photographerMedia);
}


/**
 * Trouve le photographe via son id
 * @param {Array<Object>} photographersList 
 * @param {string | number} photographerId 
 * @returns {Object | undefined}
 */
function findPhotographerById(photographersList, photographerId) {
    return photographersList.find(
        (element) => element.id == photographerId
    );
}


/**
 * Trouve les médias d'un photographe et ajoute une @property {string} path comprenant le chemin vers le media image ou video
 * @param {Array<Object>} mediaList 
 * @param {Array<Object>} photographer 
 * @returns {Object | undefined}
 */
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


/**
 * initialize en asynchrone la page du photographe
 */
async function init() {
    const data = await getData();
    const url = new URL(window.location.href);
    const photographerId = url.searchParams.get("id");
    const photographer = findPhotographerById(data.photographers, photographerId);
    const photographerMedia = findPhotographerMedias(data.media, photographer);
    displayOnePhotographer(photographer, photographerMedia);
}

init();


