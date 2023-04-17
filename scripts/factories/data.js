/**
 * Retourne le .json avec le tableau de photographes
 * @returns {Array<Object>}
 */
export async function getData() {
    const requestURL = "/data/photographers.json";
    return fetch(requestURL)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));
}