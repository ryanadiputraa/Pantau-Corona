import './style/index.scss';
// import { fetchGlobalPositive } from './js/script-1';
const proxyurl = "https://cors-anywhere.herokuapp.com";
const globalEndpoint = 'https://api.kawalcorona.com';

// { mode: 'no-cors' }
fetch(`${proxyurl}/${globalEndpoint}/positif`)
  .then(response => response.json())
  .then(response => console.log(response))