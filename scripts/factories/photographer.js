export function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `img/photographers_ID/${portrait}`;
  return { name, id, city, country, tagline, price, picture, articlePanelDOM };
}

function articlePanelDOM(name, id, city, country, tagline, price, picture) {
  // article
  const article = document.createElement("article");
  article.className = 'card-article';
  // dans article, le lien
  const link = document.createElement("a");
  link.className = 'card-article__link';
  link.setAttribute('href', "./photographer.html?id=" + id);
  // dans le lien, l'image et le h2
  const img = document.createElement("img");
  img.className = 'card-article__img';
  img.setAttribute("src", picture);
  img.setAttribute('alt', name);
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
