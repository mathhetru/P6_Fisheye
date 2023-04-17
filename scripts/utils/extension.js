/**
 * Prend l'extension du chemin media, si jpg > retourne la balise <img>, si mp4 > retourne la balise <video>
 * @param {string} mediaPath 
 * @param {string} title 
 * @param {string} className 
 * @returns {string}
 */
export function extensionFactory(mediaPath, title, className) {
    let file = mediaPath.split(".");
    let extension = file[1];
    switch (extension) {
    case "jpg":
    case "jpeg":
        return `<img tabindex="0" role="link" class=${className} src="${mediaPath}" alt="photographie nommée ${title}">`;
    case "mp4":
        return `<video tabindex="0" role="link" class=${className} alt="Vidéo nommée ${title}" autoplay loop>
            <source src="${mediaPath}" type="video/mp4">
        </video>`;
    }
}