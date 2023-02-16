export function photographerFactory(data) {
    const { name, portrait } = data;
  const picture = `img/photographers_ID/${portrait}`;
  return { name, picture, articlePanelDOM };
}

function articlePanelDOM(name, picture) {
  const article = document.createElement("article");
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  const h2 = document.createElement("h2");
  h2.textContent = name;
  article.appendChild(img);
  article.appendChild(h2);
  return article;
}
