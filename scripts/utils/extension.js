export function extensionFactory(mediaPath, title, className) {
    let file = mediaPath.split(".");
    let extension = file[1];
    switch (extension) {
        case "jpg":
        case "jpeg":
            return `<img class=${className} src="${mediaPath}" alt="${title}">`
        case "mp4":
            return `<video class=${className} alt="${title}" autoplay loop>
                <source src="${mediaPath}" type="video/mp4">
            </video>`
        }
    }