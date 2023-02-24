export async function getData() {
    const requestURL = "http://localhost:5500/data/photographers.json"
    return fetch(requestURL)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
};