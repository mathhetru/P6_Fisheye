import { generateGalery } from "../factories/photographer.js";
import { modalLightBox } from "../utils/lightBox.js";
import { showPriceAndLikes } from "../utils/priceAndLikesBlock.js";

/**
 * Création d'un array pour l'encart "trier par"
 */
let sortOptions = [
    { label: "Popularité", id: "popularity" },
    { label: "Date", id: "date" },
    { label: "Titre", id: "title" },
];


/**
 * Retourne le DOM pour l'encart "trier par"
 * @param {Array<Object>} sortOptions 
 * @returns {string}
 */
function generateDropdown(sortOptions) {
    const dropdownDOM = `
    <button class="sortby-select__button" role="button" aria-haspopup="listbox" data-id="${sortOptions[0].id}">
        ${sortOptions[0].label}
        <i class="fas fa-chevron-up"></i>
    </button>
    <div class="sortby-select-panel">
        <button class="sortby-select__option button" role="listbox" aria-labelledby="dropdown" data-id="${sortOptions[1].id}">
            ${sortOptions[1].label}
        </button>
        <button class="sortby-select__option button" role="listbox" aria-labelledby="dropdown" data-id="${sortOptions[2].id}">
            ${sortOptions[2].label}
        </button>
    </div>`;
    return dropdownDOM;
}


/**
 * Recherche l'option cliqué et génère les autres options en fonction
 * @param {string} optionValue 
 */
function generateOptionForDropdown(optionValue) {
    const clickedOption = sortOptions.find(o => o.id === optionValue);
    const otherOptions = sortOptions.filter(o => o.id !== optionValue);
    sortOptions = [clickedOption, ...otherOptions];
}


/**
 * Génére le DOM dans la balise HTML div, quand un bouton est cliqué, implémente les autres en fonction et trie selon le bouton cliqué
 * @param {string} photographerCard 
 * @param {string} photographerMedia 
 */
export function dropDown(photographerCard, photographerMedia) {
    document.querySelector(".sortby > div").innerHTML = generateDropdown(sortOptions);

    const firstButton = document.querySelector(".sortby-select__button");
    const panel = document.querySelector(".sortby-select-panel");
    const icone = document.querySelector(".fa-chevron-up");

    let result;
    firstButton.addEventListener("click", function () {
        result = panel.classList.toggle("flex");
        if (result) {
            icone.classList.add("rotate");
        } else {
            icone.classList.remove("rotate");
        }
    });

    const allButtons = document.querySelectorAll(".button");

    allButtons.forEach((option) => {
        option.addEventListener("click", function () {
            const optionValue = option.getAttribute("data-id");
            if ( optionValue == "popularity" ) {
                generateOptionForDropdown(optionValue);
                photographerMedia.sort(sortByPopularity);
                dropDown(photographerCard, photographerMedia);
            } else if ( optionValue == "date" ) {
                generateOptionForDropdown(optionValue);
                photographerMedia.sort(sortByDate);
                dropDown(photographerCard, photographerMedia);
            } else if ( optionValue == "title" ) {
                generateOptionForDropdown(optionValue);
                photographerMedia.sort(sortByTitle);
                dropDown(photographerCard, photographerMedia);
            } 
            generateGalery(photographerMedia, photographerCard);
            showPriceAndLikes(photographerCard, photographerMedia);
            modalLightBox(photographerMedia);
        });
    });
}


/**
 * Trie par popularité selon le nombre de likes
 * @param {number} a 
 * @param {number} b 
 * @returns 
 */
export function sortByPopularity(a, b) {
    if (a.likes > b.likes) {
        return -1;
    }
    if (a.likes < b.likes) {
        return 1;
    }
    return 0;
}


/**
 * Trie par le plus récent selon la date
 * @param {string} a 
 * @param {string} b 
 * @returns 
 */
function sortByDate(a, b) {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }
    return 0;
}


/**
 * Trie par ordre alphabet selon le titre
 * @param {string} a 
 * @param {string} b 
 * @returns 
 */
function sortByTitle(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}
