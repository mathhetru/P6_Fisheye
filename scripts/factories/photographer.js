export function photographerFactory(photographer) {
  const { name, id, city, country, tagline, price, portrait } = photographer;
  const picture = `img/photographers_ID/${portrait}`;
  return { name, id, city, country, tagline, price, picture, indexArticleDOM, singlePhotographDOM };
}

function galeryFactory(data, firstName, media) {
  const { date, id, likes, photographeId, price, title } = data;
  let mediaPath = `img/${firstName}/${media}`;
  return { date, id, likes, mediaPath, photographeId, price, title, generateMediaDOM };
}

export function generateGallery(mediasList, photographerCard) {
  const splitName = photographerCard.name.split(" ");
  const firstName = splitName.shift().replace("-", " ");
  
  const mediasListDOM = mediasList.map((oneElement) => {
      const media =  oneElement.image || oneElement.video;
      const galeriePanel = galeryFactory(oneElement, firstName, media);

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

function extensionFactory(mediaPath, title) {
  let file = mediaPath.split(".");
  let extension = file[1];
  switch (extension) {
    case "jpg":
    case "jpeg":
      return `<img class="photograph-galery-content__media" src="${mediaPath}" alt="${title}">`
    case "mp4":
      return `<video class="photograph-galery-content__media" alt="${title}">
        <source src="${mediaPath}" />
      </video>`
  }
}

function indexArticleDOM(name, id, city, country, tagline, price, picture) {
  // article
  const article = document.createElement("article");

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
  /*
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
  divInformations.appendChild(pPrice);*/
  return articleDOM;
}

function singlePhotographDOM({ name, city, country, tagline, picture }) {

  // const photographersHeader = `
  //   <header aria-label="header du contenu photographe" class="photograph-header">
  //     <div class="photograph-header-infos">
  //       <h1 class="photograph-header-infos__title">${name}</h1>
  //       <p class="photograph-header-infos__city">${city}, ${country}</p>
  //       <p class="photograph-header-infos__tag">${tagline}</p>
  //     </div>
  //     <button class="contact__btn" aria-label="Bouton pour ouvrir formulaire de contact">Contactez-moi</button>
  //     <img class="photograph-header__img" src="${picture}" alt="Portrait du photographe ${name}">
  //   </header>` 

  const photographersHeaderDOM = `
    <div class="photograph-header-infos">
      <h1 class="photograph-header-infos__title">${name}</h1>
      <p class="photograph-header-infos__city">${city}, ${country}</p>
      <p class="photograph-header-infos__tag">${tagline}</p>
    </div>
    <button class="contact__btn" aria-label="Bouton pour ouvrir formulaire de contact">Contactez-moi</button>
    <img class="photograph-header__img" src="${picture}" alt="Portrait du photographe ${name}">` 


  // const photographersHeader = document.querySelector(".photograph-header");

  // const divInformations = document.createElement("div");
  // divInformations.className = 'photograph-header-infos';
  // const h1 = document.createElement("h1");
  // h1.className = 'photograph-header-infos__title';
  // h1.textContent = name;
  // const pCity = document.createElement("p");
  // pCity.className = 'photograph-header-infos__city';
  // pCity.textContent = city + ", " + country;
  // const pTag = document.createElement("p");
  // pTag.className = 'photograph-header-infos__tag';
  // pTag.textContent = tagline;

  // const buttonContact = document.createElement("button");
  // buttonContact.className = 'contact__btn';
  // buttonContact.setAttribute('aria-label', "Bouton pour ouvrir formulaire de contact")
  // buttonContact.textContent = "Contactez-moi";

  // const img = document.createElement("img");
  // img.className = 'photograph-header__img';
  // img.setAttribute("src", picture);
  // img.setAttribute('alt', "Portrait du photographe " + name);

  // photographersHeader.appendChild(divInformations);
  // divInformations.appendChild(h1);
  // divInformations.appendChild(pCity);
  // divInformations.appendChild(pTag);
  // photographersHeader.appendChild(buttonContact);
  // photographersHeader.appendChild(img);

  return photographersHeaderDOM;
}

function generateMediaDOM({ id, likes, mediaPath, title }) {
  const media = `
    <div class="photograph-galery-panel" data-id="${id}">
      ${extensionFactory(mediaPath, title)}
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