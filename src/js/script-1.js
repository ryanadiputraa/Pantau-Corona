const globalEndpoint = 'https://api.kawalcorona.com';

const fetchGlobalPositive = fetch(`${globalEndpoint}/positif`, { mode: 'no-cors' })
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.log(err));

// .catch(function (err) {
//   console.log('Fetch Error :-S', err);
// });

export { fetchGlobalPositive };