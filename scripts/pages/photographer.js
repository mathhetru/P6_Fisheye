import {
    galeryFactory,
    photographerFactory,
} from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { modalContact } from "../utils/contactForm.js";

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
    const sortBy = document.querySelector(".sortby");
    PhotographerMain.appendChild(singlePhotographe);
    PhotographerMain.appendChild(sortBy);
   
    const splitName = photographerCard.name.split(" ");
    const firstName = splitName.shift().replace("-", " ");

    // Pour ce photographe, afficher sa galerie de photo sur sa page
    photographerMedia.forEach((hisGaleryElementsData) => {
        let media = '';
        if (hisGaleryElementsData.image != undefined) {
            media = hisGaleryElementsData.image;
        } else {
            media = hisGaleryElementsData.video;
        }

        // const media2 =  hisGaleryElementsData.image || hisGaleryElementsData.video

        const galeriePanel = galeryFactory(hisGaleryElementsData, firstName, media);
        galeriePanel.galeryPhotographDOM({
            date: galeriePanel.date,
            id: galeriePanel.id,
            likes: galeriePanel.likes,
            mediaPath: galeriePanel.mediaPath,
            photographeId: galeriePanel.photographeId,
            price: galeriePanel.price,
            title: galeriePanel.title
        });
    });

    const photographGalery = document.querySelector(".photograph-galery");
    PhotographerMain.appendChild(photographGalery);

    modalContact();
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
