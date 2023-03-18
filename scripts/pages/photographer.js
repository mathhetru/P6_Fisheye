import {
    generateGallery,
    photographerFactory,
} from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { modalContact } from "../utils/contactForm.js";
import { showPriceAndLikes } from "../utils/priceAndLikesBlock.js";
import { dropDown, sortByPopularity } from "../utils/sortBy.js";

// Function affiche tous les photograhes
async function displayOnePhotographer(photographer, photographerMedia) {
    // DOM Element - header des pages photographes uniques
    const PhotographerMain = document.getElementById("main");
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

    // DOM Element - insérer header dans le main puis le menu trier par
    const header = document.querySelector('.photograph-header')
    header.innerHTML = singlePhotographe;

    photographerMedia.sort(sortByPopularity);

    generateGallery(photographerMedia, photographerCard);

    modalContact(photographer);
    showPriceAndLikes(photographer, photographerMedia);
    dropDown(photographerCard, photographerMedia);
}

function findPhotographerById(photographersList, photographerId) {
    return photographersList.find(
        (element) => element.id == photographerId
    );
}

function findPhotographerMedias(mediaList, photographerId) {
    return mediaList.filter(
        (element) => element.photographerId == photographerId
    )
}

async function init() {
    const data = await getData();
    const url = new URL(window.location.href);
    const photographerId = url.searchParams.get("id");
    const photographer = findPhotographerById(data.photographers, photographerId);
    const photographerMedia = findPhotographerMedias(data.media, photographerId);

    displayOnePhotographer(photographer, photographerMedia);
}

init();
