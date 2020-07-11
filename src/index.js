import './style/index.scss';

const proxyurl = 'https://cors-anywhere.herokuapp.com';
const endpoint = 'https://api.kawalcorona.com';
const globalEndpoint = 'https://api.covid19api.com/summary';
const sulteng = 'https://banuacoders.com/api/pico/kabupaten';

// chaining promise
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}
const json = response => {
  return response.json()
}

// fetch indonesia
fetch(`${proxyurl}/${endpoint}/indonesia`)
  .then(status)
  .then(json)
  .then(data => {
    const indoCase = document.querySelector('.indo-total-case');
    const indoRecovered = document.querySelector('.indo-total-recovered');
    const indoDeath = document.querySelector('.indo-total-death');

    indoCase.append(data[0].positif);
    indoRecovered.append(data[0].sembuh);
    indoDeath.append(data[0].meninggal);
  })
  .catch(error => {
    console.log('Request Failed', error);
  });

// fetch indonesia region
fetch(`${proxyurl}/${endpoint}/indonesia/provinsi`)
  .then(status)
  .then(json)
  .then(data => {
    let tableData = '';
    for (let i = 0; i < data.length; i++) {
      i % 2 == 0 ? (
        tableData += `<tr class="tr-odd" align="center" >
                        <td>${i + 1}</td>
                        <td align="left">${data[i].attributes.Provinsi}</td>
                        <td>${data[i].attributes.Kasus_Posi}</td>
                        <td>${data[i].attributes.Kasus_Semb}</td>
                        <td>${data[i].attributes.Kasus_Meni}</td>
                    </tr>`
      ) : (
          tableData += `<tr class="tr-even" align="center" >
                        <td>${i + 1}</td>
                        <td align="left">${data[i].attributes.Provinsi}</td>
                        <td>${data[i].attributes.Kasus_Posi}</td>
                        <td>${data[i].attributes.Kasus_Semb}</td>
                        <td>${data[i].attributes.Kasus_Meni}</td>
                    </tr>`
        )
    }
    const table = document.querySelector('.indonesia-region');
    table.innerHTML = tableData;
  })
  .catch(error => {
    console.log('Request Failed', error);
  });



// fetch global
fetch(`${globalEndpoint}`)
  .then(status)
  .then(json)
  .then(data => {
    const newData = document.querySelectorAll('.new-data');
    const totalConfirmed = document.querySelector('.total-confirmed');
    const totalRecovered = document.querySelector('.total-recovered');
    const totalDeath = document.querySelector('.total-death');

    newData[0].append(data.Global.NewConfirmed);
    newData[1].append(data.Global.NewRecovered);
    newData[2].append(data.Global.NewDeaths);

    totalConfirmed.append(data.Global.TotalConfirmed)
    totalRecovered.append(data.Global.TotalRecovered)
    totalDeath.append(data.Global.TotalDeaths)

  })
  .catch(error => {
    console.log('Request Failed', error);
  });


fetch(`${proxyurl}/${endpoint}/indonesia/provinsi`)
  .then(status)
  .then(json)
  .then(data => {
    let tableData = '';
    for (let i = 0; i < data.length; i++) {
      i % 2 == 0 ? (
        tableData += `<tr class="tr-odd" align="center" >
                        <td>${i + 1}</td>
                        <td align="left">${data[i].attributes.Provinsi}</td>
                        <td>${data[i].attributes.Kasus_Posi}</td>
                        <td>${data[i].attributes.Kasus_Semb}</td>
                        <td>${data[i].attributes.Kasus_Meni}</td>
                    </tr>`
      ) : (
          tableData += `<tr class="tr-even" align="center" >
                        <td>${i + 1}</td>
                        <td align="left">${data[i].attributes.Provinsi}</td>
                        <td>${data[i].attributes.Kasus_Posi}</td>
                        <td>${data[i].attributes.Kasus_Semb}</td>
                        <td>${data[i].attributes.Kasus_Meni}</td>
                    </tr>`
        )
    }
    const table = document.querySelector('.indonesia-region');
    table.innerHTML = tableData;
  })
  .catch(error => {
    console.log('Request Failed', error);
  });


// sulteng
fetch(`${proxyurl}/${sulteng}`)
  .then(status)
  .then(json)
  .then(res => {
    let tableData = '';
    let tableNum = 1;
    for (let i = (res.data.length - 1); i >= 0; i--) {
      i % 2 == 0 ? (
        tableData += `<tr class="tr-odd" align="center" >
                        <td>${tableNum}</td>
                        <td align="left">${res.data[i].kabupaten}</td>
                        <td>${res.data[i].positif}</td>
                        <td>${res.data[i].sembuh}</td>
                        <td>${res.data[i].meninggal}</td>
                    </tr>`
      ) : (
          tableData += `<tr class="tr-even" align="center" >
                        <td>${tableNum}</td>
                        <td align="left">${res.data[i].kabupaten}</td>
                        <td>${res.data[i].positif}</td>
                        <td>${res.data[i].sembuh}</td>
                        <td>${res.data[i].meninggal}</td>
                    </tr>`
        )
      tableNum++;
    }
    const table = document.querySelector('.indonesia-sub-region');
    table.innerHTML = tableData;
  })
  .catch(error => {
    console.log('Request Failed', error);
  });


// fetch option

const sectionData = document.querySelector('#section-data');
sectionData.addEventListener('change', e => {

  if (innerWidth <= 600) {
    scrollTo(0, 1300)
  } else if (innerWidth <= 1024) {
    scrollTo(0, 1650)
  } else {
    scrollTo(0, 1400)
  }

  if (e.target.value == 'Sulawesi Tengah') {
    // sulteng
    fetch(`${proxyurl}/${sulteng}`)
      .then(status)
      .then(json)
      .then(res => {
        let tableData = '';
        let tableNum = 1;
        for (let i = (res.data.length - 1); i >= 0; i--) {
          i % 2 == 0 ? (
            tableData += `<tr class="tr-odd" align="center" >
                          <td>${tableNum}</td>
                          <td align="left">${res.data[i].kabupaten}</td>
                          <td>${res.data[i].positif}</td>
                          <td>${res.data[i].sembuh}</td>
                          <td>${res.data[i].meninggal}</td>
                      </tr>`
          ) : (
              tableData += `<tr class="tr-even" align="center" >
                          <td>${tableNum}</td>
                          <td align="left">${res.data[i].kabupaten}</td>
                          <td>${res.data[i].positif}</td>
                          <td>${res.data[i].sembuh}</td>
                          <td>${res.data[i].meninggal}</td>
                      </tr>`
            )
          tableNum++;
        }
        const table = document.querySelector('.indonesia-sub-region');
        table.innerHTML = tableData;
      })
      .catch(error => {
        console.log('Request Failed', error);
      });
  }

})