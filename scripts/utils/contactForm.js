import { currentFocusedElement, focusTrappedInsideModal } from "./focusInsideModal.js";

/**
 * Affiche la modal contact et ses propriétés
 * @param {Object} photographer 
 */
export function modalContact(photographer) {
    const getModalContact = document.getElementById("contact-modal");
    const modalBtn = document.querySelector(".contact__btn");
    const closeBtn = document.querySelector(".js-modal-close__btn");

    modalBtn.addEventListener("click", function () {
        getModalContact.classList.remove("contact-close");
        getModalContact.classList.add("contact-open");
        getModalContact.setAttribute("aria-hidden", "true");
        focusTrappedInsideModal("#contact-modal");
    });

    closeBtn.addEventListener("click", function () {
        getModalContact.classList.add("contact-close");
        getModalContact.classList.remove("contact-open");
        getModalContact.setAttribute("aria-hidden", "false");
        currentFocusedElement.focus();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            getModalContact.classList.add("contact-close");
            getModalContact.classList.remove("contact-open");
            getModalContact.setAttribute("aria-hidden", "false");
            currentFocusedElement.focus();
        }
    });

    // Ajoute le nom du photographe dans le titre de la modal
    const modalTitle = document.querySelector(".modal-header__title");
    modalTitle.innerHTML = `Contactez-moi </br> ${photographer.name}`;
    
    const form = document.getElementById("form");
    const inputFirst = document.querySelector(".first");
    const inputLast = document.querySelector(".last");
    const inputEmail = document.querySelector(".email");
    const inputMsg = document.querySelector(".msg");
    
    // Affiche le contenu des inputs dans un console.log
    // Ferme la modal et vide les champs du formulaire
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log({
            firstName: inputFirst.value,
            lastName: inputLast.value,
            Email: inputEmail.value,
            Message: inputMsg.value
        });
        getModalContact.classList.remove("contact-open");
        getModalContact.classList.add("contact-close");
        form.reset();
    });
}