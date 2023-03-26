import { generateGallery } from "../factories/photographer.js";
import { modalLightBox } from "../utils/lightBox.js";
import { showPriceAndLikes } from "../utils/priceAndLikesBlock.js";

let sortOptions = [
    { label: 'Popularité', id: 'popularity' },
    { label: 'Date', id: 'date' },
    { label: 'Titre', id: 'title' },
]

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
    </div>`
    return dropdownDOM;
}

function generateOptionForDropdown(optionValue) {
    /*const clickedOptionIndex = sortOptions.findIndex(o => o.id === optionValue);
    const clickedActualOption = sortOptions[clickedOptionIndex];
    const firstOption = sortOptions[0];
    sortOptions.splice(0, 1, clickedActualOption);
    sortOptions.splice(clickedOptionIndex, 1, firstOption);*/
    const clickedOption = sortOptions.find(o => o.id === optionValue);
    const otherOptions = sortOptions.filter(o => o.id !== optionValue);
    sortOptions = [clickedOption, ...otherOptions];
}

export function dropDown(photographerCard, photographerMedia) {
    document.querySelector('.sortby > div').innerHTML = generateDropdown(sortOptions);

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

    // let optionValue;
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
            generateGallery(photographerMedia, photographerCard);
            showPriceAndLikes(photographerCard, photographerMedia);
            modalLightBox(photographerMedia);
        });
    });
}

export function sortByPopularity(a, b) {
    if (a.likes > b.likes) {
        return -1;
    }
    if (a.likes < b.likes) {
        return 1;
    }
    return 0;
}

function sortByDate(a, b) {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }
    return 0;
}

function sortByTitle(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}
