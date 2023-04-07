import { currentFocusedElement, focusTrappedInsideModal } from "./focusInsideModal.js";

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

    const modalTitle = document.querySelector(".modal-header__title");
    modalTitle.innerHTML = `Contactez-moi </br> ${photographer.name}`;
    
    const form = document.getElementById("form");
    const inputFirst = document.querySelector(".first");
    const inputLast = document.querySelector(".last");
    const inputEmail = document.querySelector(".email");
    const inputMsg = document.querySelector(".msg");
    

    inputFirst.addEventListener("change", function () {
        const valueFirst = inputFirst.value;
        console.log(valueFirst);
    });

    inputLast.addEventListener("change", function () {
        const valueFirst = inputLast.value;
        console.log(valueFirst);
    });

    inputEmail.addEventListener("change", function () {
        const valueFirst = inputEmail.value;
        console.log(valueFirst);
    });

    inputMsg.addEventListener("change", function () {
        const valueFirst = inputMsg.value;
        console.log(valueFirst);
    });
    
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        getModalContact.classList.remove("contact-open");
        getModalContact.classList.add("contact-close");
        form.reset();
    });

    

    
}