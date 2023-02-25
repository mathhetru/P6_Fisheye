import { galeryFactory, photographerFactory } from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { modalContact } from "../utils/contactForm.js";

// Function affiche tous les photograhes
async function displayOnePhotographer(data) {
    const string = window.location.href;
    const url = new URL(string);
    const id = url.searchParams.get("id");

    // DOM Element - header des pages photographes uniques
    const PhotographerMain = document.getElementById("main");

    // Find() le photographe dans le tableau des photographes
    const AllPhotographersData = data.photographers;
    const singlePhotographerData = AllPhotographersData.find(element => element.id == id);
    
    // Pour ce photographe, afficher ses élements sur sa page
    const photographerCard = photographerFactory(singlePhotographerData);
    const singlePhotographe = photographerCard.singlePhotographDOM(photographerCard.name, photographerCard.id, photographerCard.city, photographerCard.country, photographerCard.tagline, photographerCard.price, photographerCard.picture);
    
    // DOM Element - insérer header dans le main puis le menu trier par
    const sortBy = document.querySelector(".sortby");
    PhotographerMain.appendChild(singlePhotographe);
    PhotographerMain.appendChild(sortBy);

    // filter() la gallerie de ce photographe
    const AllGaleriesData = data.media;
    const hisGaleryData = AllGaleriesData.filter(element => element.photographerId == id )
    // console.log(singlePhotographerData.name);

    // Pour ce photographe, afficher sa galerie de photo sur sa page
    hisGaleryData.forEach(hisGaleryElementsData => {
        const galeriePanel = galeryFactory(hisGaleryElementsData);
        galeriePanel.galeryPhotographDOM(galeriePanel.date, galeriePanel.id, galeriePanel.likes, galeriePanel.image,galeriePanel.photographeId, galeriePanel.price, galeriePanel.title);
    });

    const photographGalery = document.querySelector(".photograph-galery");
    PhotographerMain.appendChild(photographGalery);

    modalContact();
};

async function init() {
    const photographers = await getData();
    displayOnePhotographer(photographers);
};

init(); 