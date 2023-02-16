// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }

const modalContact = document.getElementById("contact_modal");
const modalBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close_button");

modalBtn.addEventListener("click", function () {
	modalContact.style.display = "block";
});

closeBtn.addEventListener("click", function () {
	modalContact.style.display = "none";
});