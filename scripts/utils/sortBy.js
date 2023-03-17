import { galeryFactory } from "../factories/photographer.js";

export function dropDown(photographerCard, photographerMedia) {
    //! faire le sort par tag
    const button = document.querySelector(".sortby-select__button");

    button.addEventListener("click", function () {
        const panel = document.querySelector(".sortby-select-panel");
        const icone = document.querySelector(".fa-chevron-up");
        let result = panel.classList.toggle("flex");
        if (result) {
            icone.classList.add("rotate");
        } else {
            icone.classList.remove("rotate");
        }
    });

    const allOptions = document.querySelectorAll(".sortby-select-option");

    let optionValue;
    allOptions.forEach((option) => {
        option.addEventListener("click", function () {
            optionValue = option.getAttribute("data-categorie");
            if ( optionValue == "date" ) {
                photographerMedia.sort(sortByDate);
            } else if ( optionValue == "title" ) {
                photographerMedia.sort(sortByTitle);
            } 
            const splitName = photographerCard.name.split(" ");
            const firstName = splitName.shift().replace("-", " ");
            
            photographerMedia.forEach((oneElement) => {
                let media =  oneElement.image || oneElement.video;
        
                const galeriePanel = galeryFactory(oneElement, firstName, media);
        
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

export function sortByDate(a, b) {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }
    return 0;
}

export function sortByTitle(a, b) {
    if (a.title > b.title) {
        return -1;
    }
    if (a.title < b.title) {
        return 1;
    }
    return 0;
}
