export function showPriceAndLikes(photographer, photographerMedia) {
    const hearts = document.querySelectorAll('.photograph-galery-content-hearts');

    hearts.forEach(heart => {
        const text = heart.querySelector('.photograph-galery-content-hearts__text')
        const likes = Number(text.textContent)
        const icon = heart.querySelector('.fa-heart')
        const onClick = () => {
            text.textContent = likes + 1;
            icon.setAttribute('aria-pressed', 'true');
            let addToTotalLikes = parseInt(document.querySelector('.block-likes__text').innerText);
            document.querySelector('.block-likes__text').innerText = addToTotalLikes + 1;
            icon.removeEventListener("click", onClick);
        }
        icon.addEventListener("click", onClick);
        icon.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                onClick();
            }
        });
    })

    const allLikes = photographerMedia.map(photographerMedia  => photographerMedia.likes);

    const initialLike = 0;
    const totalLikes = allLikes.reduce(
        (accumulator, currentLike) => accumulator + currentLike,
        initialLike);
    
    const likesAndPriceDOM = `
        <section class="block-price-likes">
            <div class="block-likes">
                <p tabindex="0" arialabel="nombre total de likes pour ce photographe" class="block-likes__text">${totalLikes}</p>
                <i class="fas fa-heart"></i>
            </div>
            <div class="block-price">
                <p tabindex="0" arialabel="Tarif journalier pour ce photographe" class="block-price__text">${photographer.price}€ / jour</p>
            </div>
        </section>`
    const blockLikes = document.querySelector(".block-likes");
    blockLikes.innerHTML = likesAndPriceDOM;
}