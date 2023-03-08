export function modalContact(photographer) {
	const sectionModalContact = document.getElementById("contact-modal");
	const modalBtn = document.querySelector(".contact__btn");
	const closeBtn = document.querySelector(".js-close__btn");

	modalBtn.addEventListener("click", function () {
		sectionModalContact.style.display = "block";
	});

	closeBtn.addEventListener("click", function () {
		sectionModalContact.style.display = "none";
	});

	const modalTitle = document.querySelector(".modal-header__title");
	modalTitle.innerHTML = "Contactez-moi </br>" + photographer.name;

	const inputFirst = document.querySelector(".first");
	const inputLast = document.querySelector(".last");
	const inputEmail = document.querySelector(".email");
	const inputMsg = document.querySelector(".msg");

	inputFirst.addEventListener("change", function (e) {
		const valueFirst = inputFirst.value;
		console.log(valueFirst);
	});

	inputLast.addEventListener("change", function (e) {
		const valueFirst = inputLast.value;
		console.log(valueFirst);
	});

	inputEmail.addEventListener("change", function (e) {
		const valueFirst = inputEmail.value;
		console.log(valueFirst);
	});

	inputMsg.addEventListener("change", function (e) {
		const valueFirst = inputMsg.value;
		console.log(valueFirst);
	});
	
	form.addEventListener("submit", function (e) {
		e.preventDefault();
		sectionModalContact.style.display = "none";
		form.reset();
	});
};