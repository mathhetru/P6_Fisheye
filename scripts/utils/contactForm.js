export function modalContact() {
	const sectionModalContact = document.getElementById("contact-modal");
	const modalBtn = document.querySelector(".contact-button");
	const closeBtn = document.querySelector(".close-button");

	modalBtn.addEventListener("click", function () {
		sectionModalContact.style.display = "block";
	});

	closeBtn.addEventListener("click", function () {
		sectionModalContact.style.display = "none";
	});
};