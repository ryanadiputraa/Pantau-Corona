import './style/index.scss';
import './scripts/header';
import dataFormatting from './scripts/dataFormatting';

const format = dataFormatting.format;
const changer = dataFormatting.changer;

const proxyurl = 'https://cors-anywhere.herokuapp.com';
const endpoint = 'https://api.kawalcorona.com';
const globalEndpoint = 'https://api.covid19api.com/summary';
const sulteng = 'https://banuacoders.com/api/pico/kabupaten';

const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
const json = response => response.json()

// Indonesia
fetch(`${proxyurl}/${endpoint}/indonesia`)
.then(status)
.then(json)
.then(data => {
  const indoCase = document.querySelector('.indo-total-case');
  const indoRecovered = document.querySelector('.indo-total-recovered');
  const indoDeath = document.querySelector('.indo-total-death');

  // format numeric data
  let positif = changer(data[0].positif);
  let sembuh = changer(data[0].sembuh);
  let meninggal = changer(data[0].meninggal);

  indoCase.append(positif);
  indoRecovered.append(sembuh);
  indoDeath.append(meninggal);
})
.catch(error => console.log('Request Failed', error));

// Indonesia region
fetch(`${proxyurl}/${endpoint}/indonesia/provinsi`)
.then(status)
.then(json)
.then(data => {
  // format numeric data
  let positif = [];
  let sembuh = [];
  let meninggal = [];

  data.forEach(data => {
    positif.push(format(data.attributes.Kasus_Posi.toString()));
    sembuh.push(format(data.attributes.Kasus_Semb.toString()));
    meninggal.push(format(data.attributes.Kasus_Meni.toString()));
  });

  // render data
  let tableData = '';
  for (let i = 0; i < data.length; i++) {
    i % 2 == 0 ? (
      tableData += `<tr class="tr-odd" align="center" >
                      <td class="td-1">${i + 1}</td>
                      <td align="left" class="td-2">${data[i].attributes.Provinsi}</td>
                      <td class="td-3">${positif[i]}</td>
                      <td class="td-3">${sembuh[i]}</td>
                      <td class="td-3">${meninggal[i]}</td>
                  </tr>`
    ) : (
        tableData += `<tr class="tr-even" align="center" >
                      <td class="td-1">${i + 1}</td>
                      <td align="left" class="td-2">${data[i].attributes.Provinsi}</td>
                      <td class="td-3">${positif[i]}</td>
                      <td class="td-3">${sembuh[i]}</td>
                      <td class="td-3">${meninggal[i]}</td>
                  </tr>`
      )
  }
  const table = document.querySelector('.indonesia-region');
  table.innerHTML = tableData;
})
.catch(error => console.log('Request Failed', error));


// global
fetch(globalEndpoint)
.then(status)
.then(json)
.then(data => {
  const newData = document.querySelectorAll('.new-data');
  const totalConfirmed = document.querySelector('.total-confirmed');
  const totalRecovered = document.querySelector('.total-recovered');
  const totalDeath = document.querySelector('.total-death');

  // format numeric data
  let newConfirmed = format(data.Global.NewConfirmed.toString());
  let newRecovered = format(data.Global.NewRecovered.toString());
  let newDeaths = format(data.Global.NewDeaths.toString());

  let totalConfirmedData = format(data.Global.TotalConfirmed.toString());
  let totalRecoveredData = format(data.Global.TotalRecovered.toString());
  let totalDeathsData = format(data.Global.TotalDeaths.toString());

  // render data
  newData[0].append(newConfirmed);
  newData[1].append(newRecovered);
  newData[2].append(newDeaths);

  totalConfirmed.append(totalConfirmedData);
  totalRecovered.append(totalRecoveredData);
  totalDeath.append(totalDeathsData);

})
.catch(error => console.log('Request Failed', error));



// sulteng
fetch(`${proxyurl}/${sulteng}`)
.then(status)
.then(json)
.then(res => {
  // format numeric data
  let positif = [];
  let sembuh = [];
  let meninggal = [];

  res.data.forEach(data => {
    positif.push(format(data.positif.toString()));
    sembuh.push(format(data.sembuh.toString()));
    meninggal.push(format(data.meninggal.toString()));
  });

  // render data
  let tableData = '';
  let tableNum = 1;
  for (let i = (res.data.length - 1); i >= 0; i--) {
    i % 2 == 0 ? (
      tableData += `<tr class="tr-odd" align="center" >
                      <td class="td-1">${tableNum}</td>
                      <td align="left" class="td-2">${res.data[i].kabupaten}</td>
                      <td class="td-3">${positif[i]}</td>
                      <td class="td-3">${sembuh[i]}</td>
                      <td class="td-3">${meninggal[i]}</td>
                  </tr>`
    ) : (
        tableData += `<tr class="tr-even" align="center" >
                      <td class="td-1">${tableNum}</td>
                      <td align="left" class="td-2">${res.data[i].kabupaten}</td>
                      <td class="td-3">${positif[i]}</td>
                      <td class="td-3">${sembuh[i]}</td>
                      <td class="td-3">${meninggal[i]}</td>
                  </tr>`
      )
    tableNum++;
  }
  const table = document.querySelector('.indonesia-sub-region');
  table.innerHTML = tableData;
})
.catch(error => console.log('Request Failed', error));