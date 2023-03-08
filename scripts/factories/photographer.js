export function photographerFactory(photographer) {
  const { name, id, city, country, tagline, price, portrait } = photographer;
  const picture = `img/photographers_ID/${portrait}`;
  return { name, id, city, country, tagline, price, picture, indexArticleDOM, singlePhotographDOM };
}

export function galeryFactory(data, firstName, media) {
  const { date, id, likes, photographeId, price, title } = data;
  let mediaPath = `img/${firstName}/${media}`;
  return { date, id, likes, mediaPath, photographeId, price, title, galeryPhotographDOM };
}

function extensionFactory(mediaPath, title, divGalery) {
  let file = mediaPath.split(".");
  let extension = file[1];
  switch (extension) {
    case "jpg":
    case "jpeg":
      const img = document.createElement("img");
      img.className = 'photograph-galery-content__media';
      img.setAttribute("src", mediaPath);
      img.setAttribute('alt', title);
      divGalery.appendChild(img);
      break;
    case "mp4":
      const video = document.createElement("video");
      video.className = 'photograph-galery-content__media';
      video.setAttribute("src", mediaPath);
      video.setAttribute('alt', title);
      divGalery.appendChild(video);
      break;
  }
}

function indexArticleDOM(name, id, city, country, tagline, price, picture) {
  // article
  const article = document.createElement("article");
  article.className = 'card-article';
  article.setAttribute("aria-label", "Fiche du photographe " + name);
  // dans article, le lien
  const link = document.createElement("a");
  link.className = 'card-article__link';
  link.setAttribute('href', "./photographer.html?id=" + id);
  link.setAttribute('aria-label', "Lien vers la page du photographe " + name)
  // dans le lien, l'image et le h2
  const img = document.createElement("img");
  img.className = 'card-article__img';
  img.setAttribute("src", picture);
  img.setAttribute('alt', "Portrait du photographe " + name);
  const h2 = document.createElement("h2");
  h2.className = 'card-article-title';
  h2.textContent = name;

  // dans article, après lien, div avec 3 paragraphes
  const divInformations = document.createElement("div");
  divInformations.className = 'card-info';
  const pCity = document.createElement("p");
  pCity.className = 'card-info-city';
  pCity.textContent = city + ", " + country;
  const pTag = document.createElement("p");
  pTag.className = 'card-info-tag';
  pTag.textContent = tagline;
  const pPrice = document.createElement("p");
  pPrice.className = 'card-info-price';
  pPrice.textContent = price + "€/jour";

  article.appendChild(link);
  article.appendChild(divInformations);
  link.appendChild(img);
  link.appendChild(h2);
  divInformations.appendChild(pCity);
  divInformations.appendChild(pTag);
  divInformations.appendChild(pPrice);
  return article;
}

function singlePhotographDOM({ name, id, city, country, tagline, price, picture }) {
  const photographersHeader = document.querySelector(".photograph-header");

  const divInformations = document.createElement("div");
  divInformations.className = 'photograph-header-infos';
  const h1 = document.createElement("h1");
  h1.className = 'photograph-header-infos__title';
  h1.textContent = name;
  const pCity = document.createElement("p");
  pCity.className = 'photograph-header-infos__city';
  pCity.textContent = city + ", " + country;
  const pTag = document.createElement("p");
  pTag.className = 'photograph-header-infos__tag';
  pTag.textContent = tagline;

  const buttonContact = document.createElement("button");
  buttonContact.className = 'contact-button';
  buttonContact.setAttribute('aria-label', "Bouton pour ouvrir formulaire de contact")
  buttonContact.textContent = "Contactez-moi";

  const img = document.createElement("img");
  img.className = 'photograph-header__img';
  img.setAttribute("src", picture);
  img.setAttribute('alt', "Portrait du photographe " + name);

  photographersHeader.appendChild(divInformations);
  divInformations.appendChild(h1);
  divInformations.appendChild(pCity);
  divInformations.appendChild(pTag);
  photographersHeader.appendChild(buttonContact);
  photographersHeader.appendChild(img);

  return photographersHeader;
}

function galeryPhotographDOM({ date, id, likes, mediaPath, photographeId, price, title }) {
  const photographGalery = document.querySelector(".photograph-galery");

  const divGalery = document.createElement("div");
  divGalery.className = "photograph-galery-panel";
  
  extensionFactory(mediaPath, title, divGalery);

  const divContent = document.createElement("div");
  divContent.className = "photograph-galery-content"

  const h2 = document.createElement("h2");
  h2.className = 'photograph-galery-content__title';
  h2.textContent = title;

  const divNumberHeart = document.createElement("div");
  divNumberHeart.className = 'photograph-galery-content-hearts';

  const pNumberheart = document.createElement("p");
  pNumberheart.className = 'photograph-galery-content-hearts__text';
  pNumberheart.textContent = likes;

  const heart = document.createElement("i");
  heart.className = 'fas fa-heart';
  heart.addEventListener("click", function () {
    pNumberheart.textContent = likes + 1;
  });

  photographGalery.appendChild(divGalery);
  divGalery.appendChild(divContent);
  divContent.appendChild(h2);
  divContent.appendChild(divNumberHeart);
  divNumberHeart.appendChild(pNumberheart);
  divNumberHeart.appendChild(heart);
}