const ENDPOINT = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_iptdsI1Ru8L4LETQYtOgAfDFEvUzpau4IsYRg2MZd2sQbR8lTXcllFLtcbXwMyfH';

export function fetchBreeds() {
  return fetch(`${ENDPOINT}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${ENDPOINT}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
