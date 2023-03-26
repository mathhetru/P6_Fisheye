import { extensionFactory } from "../utils/extension.js";

export function photographerFactory(photographer) {
  const { name, id, city, country, tagline, price, portrait } = photographer;
  const picture = `img/photographers_ID/${portrait}`;
  return { name, id, city, country, tagline, price, picture, indexArticleDOM, singlePhotographDOM };
}

function galeryFactory(media) {
  const { date, id, likes, photographeId, price, title, path } = media;
  return { date, id, likes, mediaPath: path, photographeId, price, title, generateMediaDOM };
}

export function generateGallery(mediasList) {
  const mediasListDOM = mediasList.map((oneElement) => {
      const galeriePanel = galeryFactory(oneElement);

      return galeriePanel.generateMediaDOM({
          date: galeriePanel.date,
          id: galeriePanel.id,
          likes: galeriePanel.likes,
          mediaPath: galeriePanel.mediaPath,
          photographeId: galeriePanel.photographeId,
          price: galeriePanel.price,
          title: galeriePanel.title
      });
  });
  document.querySelector(".photograph-galery").innerHTML = mediasListDOM.join('')
}

export function generatePhotographers(photographers) {
  const photographersListDOM = photographers.map((onePhotographer) => {
    const photographerCard = photographerFactory(onePhotographer);

      return photographerCard.indexArticleDOM(
        photographerCard.name,
        photographerCard.id,
        photographerCard.city,
        photographerCard.country,
        photographerCard.tagline,
        photographerCard.price,
        photographerCard.picture,
    );
  });
  document.querySelector(".photographer-section").innerHTML = photographersListDOM.join('')
}

function indexArticleDOM(name, id, city, country, tagline, price, picture) {
  const articleDOM = `
  <article class="card-article" aria-label="Fiche du photographe ${name}" data-photographer-id="${id}">
    <a class="card-article__link" href="./photographer.html?id=${id}" aria-label="Lien vers la page du photographe ${name}">
      <img class="card-article__img" src="${picture}" alt="Portrait du photographe ${name}">
      <h2 class="card-article-title">${name}</h2>
    </a>
    <div class="card-info">
      <p class="card-info-city">${city}, ${country}</p>
      <p class="card-info-tag">${tagline}</p>
      <p class="card-info-price">${price}€/jour</p>
    </div>
  </article>`
  return articleDOM;
}

function singlePhotographDOM({ name, city, country, tagline, picture }) {
  const photographersHeaderDOM = `
    <div class="photograph-header-infos">
      <h1 class="photograph-header-infos__title">${name}</h1>
      <p class="photograph-header-infos__city">${city}, ${country}</p>
      <p class="photograph-header-infos__tag">${tagline}</p>
    </div>
    <button class="contact__btn" aria-label="Bouton pour ouvrir formulaire de contact">Contactez-moi</button>
    <img class="photograph-header__img" src="${picture}" alt="Portrait du photographe ${name}">` 
  return photographersHeaderDOM;
}

function generateMediaDOM({ id, likes, mediaPath, title }) {
  const media = `
    <div class="photograph-galery-panel" data-id="${id}">
      ${extensionFactory(mediaPath, title, "photograph-galery-content__media")}
      <div class="photograph-galery-content">
        <h2 class="photograph-galery-content__title">${title}</h2>
        <div class="photograph-galery-content-hearts">
          <p class="photograph-galery-content-hearts__text">${likes}</p>
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </div>
  `
  return media
}