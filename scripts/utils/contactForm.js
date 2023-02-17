// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }

const modalContact = document.getElementById("contact-modal");
const modalBtn = document.querySelector(".contact-button");
const closeBtn = document.querySelector(".close-button");

modalBtn.addEventListener("click", function () {
	modalContact.style.display = "block";
});

closeBtn.addEventListener("click", function () {
	modalContact.style.display = "none";
});