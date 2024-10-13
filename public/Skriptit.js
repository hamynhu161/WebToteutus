//tarkistaa, onko tämä pinkoodi tallessa
const savedPin = localStorage.getItem("pinkoodi")
if (savedPin != null && savedPin != undefined){
    showElements()
}

//Log out
function logOut(){
    localStorage.clear()
    window.location.reload()
}

//pin koodi tarkistus
async function checkPin() {
    var pin = document.getElementById("pin").value
    const response = await fetch("http://localhost:3000/api/getpin")
    const correctPin = await response.json()
    
    if(pin == correctPin){
        //kirjoittaminen localstorageen
        localStorage.setItem("pinkoodi", pin)
        showElements()      
    }
    else {
        alert("Väärä pinkoodi.")
    }
}

//show elements
function showElements(){
    var hiddenElements = document.getElementsByClassName("hidden")
    for(i = 0; i < hiddenElements.length; i++){
        hiddenElements[i].style.visibility = "visible"
        document.getElementById("pin-div").style.visibility = "hidden"
    }
}

//Datan aku
function naytaSivu(){
    document.getElementById("main_alue").innerHTML = ""
}

function naytaYrityksesta(){
    document.getElementById("main_alue").innerHTML = `
        <h2> Aurinko </h2>
        <div class="row">
            <section class="col-md-4">
                <p>Tarjoamme orkealaatuisia tuotteita, jotka täyttävät asiakkaidemme tiukat laatuvaatimukset.</p>
                <img src="Images/image7.jpg" style="height: 250px; width: 350px" />
            </section>
            <section class="col-md-4">
                <p>Meiltä löydät kaiken tarvitsemasi, olipa kyseessä sitten tuore elintarvike tai päivittäinen tarve-esine.</p>
                <img src="Images/image5.jpg" style="height: 250px; width: 350px" />
            </section>
            <section class="col-md-4">
                <p>Tarjoamme tuotteita edullisesti. Laadukkaat tuotteemme täyttävät tiukat vaatimukset ja sopivat budjettiisi.</p>
                <img src="Images/image3.jpg" style="height: 250px; width: 350px" />
            </section>
        </div>
    `
}

async function naytaHenkilokunta(){
    document.getElementById("main_alue").innerHTML = 
    `<h5>Tässä esittelemme teille tiimimme jäsenet, jotka tekevät yrityksestämme ainutlaatuisen.</h5>`
    
    //luo taulukko
    var x =`
        <table class="fixed-header">
            <thead>
                <tr>
                    <th>Numero</th>
                    <th>Kuva</th>
                    <th>Nimi</th>
                    <th>Tehtävä</th>
                    <th>Sähköpostiosoite</th>
                </tr>
            </thead>
            <tbody>
        `
    try{
        const response = await fetch("http://localhost:3000/api/henkilokunta")
        const henkilodata = await response.json()
        //loopataan läpi oliot map funktiolla, h on 1 henkilöolio
        await henkilodata.map(h => {
        x += `
            <tr>
                <td>${h.numero}</td>
                <td><img src="${h.kuva}" alt="Kuva" /></td>
                <td>${h.nimi}</td>
                <td>${h.tehtava}</td>
                <td>${h.email}</td>
            </tr>
            `    //käytä takamerkeja "`": niiden arvoa tulkita. Jos "'": näytetään vain tekstinä.
        })

        //taulukko päätetään
        x += '</tbody></table>'

    //renderöidään html elementtin
    document.getElementById("main_alue").innerHTML += x
    } 
    catch (error) {
        console.error("Error fetching data:" , error)
    }
    }

    function naytaYhteys(){
        document.getElementById("main_alue").innerHTML = 
        `
            <h3>Yhteystiedot</h3>
            <div class="contact-info">
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i> 
                    <span>Osoite: Palosaarentie 1, Vaasa</span> 
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i> 
                    <span>Email: info@aurinko.fi</span> 
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone-alt"></i>
                    <span>Puhelin: +358 40 123 4567</span> 
                </div>
            </div>
            <br>
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1804.753263753374!2d21.585621277768773!3d63.106103276658416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x467d60f76bd3c21b%3A0x8c2c282ce1a0a362!2sPalosaarentie%201%2C%2065200%20Vaasa!5e0!3m2!1svi!2sfi!4v1728745910428!5m2!1svi!2sfi" width="1100" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `
    }

//Aseta teema tumma tai vaalea
function asetaTeema(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

window.onload = function() {
    tarkistaJouluteema();
    const savedTheme = localStorage.getItem('theme') || 'vaalea';
    asetaTeema(savedTheme);
}

//valitse erilkoisteema 
function tarkistaJouluteema() {
    const now = new Date();
    const month = now.getMonth();
    
    if (month === 11) { 
        asetaTeema("joulu");
        document.getElementById("kuva").innerHTML = `<img src="Images/image8.jpg" class="background"/>`
    }
}
