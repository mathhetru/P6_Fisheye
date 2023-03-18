import { generateGallery } from "../factories/photographer.js";

let sortOptions = [
    { label: 'Popularité', id: 'popularity' },
    { label: 'Date', id: 'date' },
    { label: 'Titre', id: 'title' },
]

function generateDropdown() {
    const dropdownDOM = sortOptions.map(option => `
    <button class="sortby-select__button button" role="button" aria-haspopup="listbox" data-id="${option.id}}">
        ${option.label}
        <i class="fas fa-chevron-up"></i>
    </button>`);
    const dropdown = `
        <ul>
            ${dropdownDOM.join('')}
        </ul>
    `
}


export function dropDown(photographerCard, photographerMedia) {
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

    // document.querySelector('.sortby > div').innerHTML = generateDropdown()

    const allButtons = document.querySelectorAll(".button");

    let optionValue;
    allButtons.forEach((option) => {
        option.addEventListener("click", function () {
            optionValue = option.getAttribute("data-id");
            if ( optionValue == "popularity" ) {
                // const clickedOption = sortOptions.findIndex(o => o.id === optionValue)
                // sortOptions = 
                photographerMedia.sort(sortByPopularity);
            } else if ( optionValue == "date" ) {
                // const clickedOption = sortOptions.findIndex(o => o.id === optionValue)
                // sortOptions = 
                photographerMedia.sort(sortByDate);
                result = panel.classList.remove("flex");
                icone.classList.remove("rotate");
            } else if ( optionValue == "title" ) {
                photographerMedia.sort(sortByTitle);
                result = panel.classList.remove("flex");
                icone.classList.remove("rotate");
            } 
            generateGallery(photographerMedia, photographerCard)
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
