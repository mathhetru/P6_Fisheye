export function showPriceAndLikes(photographer, photographerMedia) {
    const blockLikes = document.querySelector(".block-likes");
    const blockPrice = document.querySelector(".block-price");

    const heart = document.createElement("i");
    heart.className = 'fas fa-heart';
    heart.addEventListener("click", function () {
        pNumberheart.textContent = likes + 1;
    });

    //! faire .map()
    const allLikes = [0];
    photographerMedia.forEach((hisGaleryElementsData) => {
        allLikes.push(hisGaleryElementsData.likes);
    });


    const initialLike = 0;
    const totalLike = allLikes.reduce(
        (accumulator, currentLike) => accumulator + currentLike,
        initialLike);
    
    const pLikes = document.createElement("p");
    pLikes.className = 'block-likes__text';
    pLikes.textContent = totalLike;
    const heartTotal = document.createElement("i");
    heartTotal.className = 'fas fa-heart';

    const pPrice = document.createElement("p");
    pPrice.className = 'block-price__text';
    pPrice.textContent = photographer.price + "€ / jour";

    blockLikes.appendChild(pLikes);
    blockLikes.appendChild(heart);
    blockPrice.appendChild(pPrice);
}