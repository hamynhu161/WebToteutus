//pin koodi tarkistus
async function checkPin() {
    var pin = document.getElementById("pin").value
    const response = await fetch("http://localhost:3000/api/getpin")
    const correctPin = await response.json()
    
    if(pin == correctPin){
        var hiddenElements = document.getElementsByClassName("hidden")
        for(i = 0; i < hiddenElements.length; i++){
            hiddenElements[i].style.visibility = "visible"
            document.getElementById("pin-div").style.visibility = "hidden"
        }
    }
    else {
        alert("Väärä pinkoodi.")
    }
}

//Datan aku
async function fetchData(){
    //document.getElementById("alue").innerHTML = "<h4>Ladataan henkilökuntaa </h4>"
    
    var x ='<table><thead><th>ID</th><th>Nimi</th></thead><tbody>'
    
    try{
        const response = await fetch("http://localhost:3000/api/henkilokunta")
        const henkilodata = await response.json()
        await henkilodata.map(h => {//loopataan läpi oliot map funktiolla, h on 1 herkkuolio
        x += `<tr><td>${h.id}</td><td>${h.name}</td></tr>`    //käytä takamerkeja "`": niiden arvoa tulkita. Jos "'": näytetään vain tekstinä.
        })

        //taulukko päätetään ja renderöidään html elementtin
        x += '</tbody></table>'
        document.getElementById("alue").innerHTML = x
    } 
    catch (error) {
        console.error("Error fetching data:" , error)
    }
    }

    fetchData()             //Kutsutaan funktio