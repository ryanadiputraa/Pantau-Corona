// Global Data fecth

const globalLoading = document.querySelector('.loading-animation');
const table = document.querySelector('.table-data .table table');
startLoadingAnimation(globalLoading);
let loading = 0;

(async function getGLobalData() {
    try {
        // fecthing
        const globalPositif = await getGlobalPositif();
        const globalRecovered = await getGlobalRecovered();
        const globalDeaths = await getGlobalDeaths();
        const indoCase = await getIndoCase();
        const indoData = await getProvData();
        // updateUI
        updateIndoData(indoData);
        updateUIGlobal(globalPositif, globalRecovered, globalDeaths, indoCase);
        // finish
        if(loading == 2) {
            startLoadingAnimation(globalLoading);
            table.style.display = 'table';
        }
    } catch(err) {
        startLoadingAnimation(globalLoading);
        alert(err);
        const body = document.querySelector('.container');
        const errorPage = document.querySelector('.error-page');
        body.style.display = 'none';
        errorPage.style.display = 'block';
    }
})();


// Sub Data fetch

const subLoad = document.querySelector('.sub-data-animation');
const selectWilayah = document.querySelector('#wilayah');
selectWilayah.addEventListener('change', async function(e) {
    let provinsi = e.target.value;
    const subDataContainer = document.querySelector('.sub-data');

    if(innerWidth < 760 && provinsi != "Indonesia") {
        window.scrollTo(0, 350);
    }
    
    // Indo fecth
    if(provinsi == 'Indonesia') {
        subDataContainer.style.display = 'none'
    } 
    // Sulteng fecth
    else if(provinsi == 'Sulawesi Tengah') {
        try{
            startLoadingAnimation(subLoad);
            subDataContainer.style.display = 'flex'
            const subDataTitle = document.querySelector('.sub-data .title');
            subDataTitle.innerHTML = `Data Kasus Covid-19 di Provinsi ${provinsi}`
            const provData = await getSulteng();
            updateSubData(provData);
        } catch(err) {
            alert(err);
            const body = document.querySelector('.container');
            const errorPage = document.querySelector('.error-page');
            body.style.display = 'none';
            errorPage.style.display = 'block';
        }
    }
});





// All function

function startLoadingAnimation(loadingContainer) {
    loadingContainer.classList.toggle('show');
}

// Global Data
function getGlobalPositif(){
    return fetch('https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/positif')
        .then(response => response.json())
        .then(response => response.value);
}

function getGlobalRecovered(){
    return fetch('https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/sembuh')
        .then(response => response.json())
        .then(response => response.value);
};

function getGlobalDeaths(){
    return fetch('https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/meninggal')
        .then(response => response.json())
        .then(response => response.value);
}

function getIndoCase(){
    return fetch('https://kawalcovid19.harippe.id/api/summary')
        .then(response => response.json())
        .then(response => response);
}

function updateUIGlobal(positif, recoverd, deaths, indo) {
    const globalData = `<div class="cards globalPositif">
                            <div class= "data-title"><h4>Total Kasus</h4></div>
                            <div class="data"><p><strong>${positif}</strong></p></div>
                        </div>
                        <div class="cards globalRecovered">
                            <div class= "data-title"><h4>Pasien Sembuh</h4></div>
                            <div class="data"><p><strong>${recoverd}</strong></p></div>
                        </div>
                        <div class="cards globalDeaths">
                            <div class= "data-title"><h4>Pasien Meninggal</h4></div>
                            <div class="data"><p><strong>${deaths}</strong></p></div>
                        </div>
                        <div class="cards indoCase">
                            <div class= "data-title"><h4><span style="color: #f22;">Indo</span>nesia</h4></div>
                            <div class="data data-indo">
                                <p>Positif : <strong>${indo.confirmed.value}</strong></p>
                                <p>Sembuh : <strong>${indo.recovered.value}</strong></p>
                                <p>Meninggal : <strong>${indo.deaths.value}</strong></p>
                            </div>
                        </div>` 
    const mainData = document.querySelector('.main-data');
    mainData.innerHTML = globalData;
    return loading += 1;
}


// Indo Data
function getProvData() {
    return fetch('https://cors-anywhere.herokuapp.com/https://api.kawalcorona.com/indonesia/provinsi')
        .then(response => response.json())
        .then(response => response);
}

function updateIndoData(indoData) {
    data = [];
    for(let i = 0; i < indoData.length; i++) {
        data[i] = indoData[i].attributes;
    }

    let tableData = '';
    for(let i = 0; i < data.length; i++) {
        tableData += `<tr align="center" >
                        <td>${i+1}</td>
                        <td align="left">${data[i].Provinsi}</td>
                        <td>${data[i].Kasus_Posi}</td>
                        <td>${data[i].Kasus_Semb}</td>
                        <td>${data[i].Kasus_Meni}</td>
                    </tr>`
    }

    const tableBody = document.querySelector('.table-data .table table tbody');
    tableBody.innerHTML = tableData;
    return loading += 1;
}

// Sub Data

// SulTeng
function getSulteng() {
    return fetch('https://cors-anywhere.herokuapp.com/https://banuacoders.com/api/pico/kabupaten')
    .then(response => response.json())
    .then(response => {
        startLoadingAnimation(subLoad);
        return response.data
    });
}


// update Sub Data
function updateSubData(provData) {
    let provCards = '';
    for(let i = (provData.length - 1); i >= 0; i--) {
        provCards += `<div class="cards prov-cards">
                        <div class= "data-title"><h4>${provData[i].kabupaten}</h4></div>
                        <div class="data"><p>Positif : <strong>${provData[i].positif}</strong></p></div>
                        <div class="data"><p>Sembuh : <strong>${provData[i].sembuh}</strong></p></div>
                        <div class="data"><p>Meninggal : <strong>${provData[i].meninggal}</strong></p></div>
                        <div class="data"><p>ODP : <strong>${provData[i].dalam_pemantauan}</strong></p></div>
                        <div class="data"><p>PDP : <strong>${provData[i].dalam_pengawasan}</strong></p></div>
                    </div>`            
    }
    const subDataContainer = document.querySelector('.sub-data .sub-data-container');
    subDataContainer.innerHTML += provCards;
    
}


















