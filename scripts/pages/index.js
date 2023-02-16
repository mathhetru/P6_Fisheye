    function getAllData() {
        const requestURL = "http://localhost:5500/data/photographers.json"
        fetch(requestURL)
        .then(response => response.json())
        .then(async function (resultatAPI) {
            allPhotographers = await resultatAPI;
            displayPhotographers(allPhotographers);
        })
        .catch(error => alert("Erreur : " + error));
    }

    // Function affiche tous les photograhes
    async function displayPhotographers(data) {
        // DOM Element - div contenant tous les articles
        const photographersSection = document.querySelector(".photographer_section");

        // Pour chaque photographe
        data.photographers.forEach((photographer) => {
            const photographerCard = photographerFactory(photographer);
            const articlePanel = photographerCard.articlePanelDOM(photographerCard.name, photographerCard.picture);
            photographersSection.appendChild(articlePanel);
        });
    };

    async function init() {
        const photographers = await getAllData();
        displayPhotographers(photographers);
    };
    
    init();
    
