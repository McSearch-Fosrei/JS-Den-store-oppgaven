const startKnappEl = document.querySelector(".starten")
const bordEl = document.querySelector(".bord")
const kortEls = document.querySelectorAll(".kortene")
const livEl = document.querySelector(".liv")
const tidEl = document.querySelector(".tid")
const startTekstEl = document.querySelector(".startTekst")
const sluttTekstEl = document.querySelector(".sluttTekst")
const klokkeTekstEl = document.querySelector(".tid")
const restartEl = document.querySelector(".restart")


let starting = false
let låstBrett = false
let valgtKort = []
let liv = 5
let klokkeRef = 1
let sekunder = 0
let antallKortKlart = 0

function start(){
    klokkeRef = 1
    starting = true
    startKnappEl.classList.add("startBorte")
    setTimeout(() => {
        kortEls.forEach((kort) => {
            kort.classList.add("snudd")
        })
    }, 500)
    
    kortEls.forEach((kort) => {
        kort.addEventListener("click", snuKort)
    })
    
    if(klokkeRef == 1){
        klokkeRef = setInterval(klokke, 1000)
    }
}

function klokke(){
    sekunder = sekunder + 1
    klokkeTekstEl.innerHTML = sekunder + " Sekunder"
}
    
function snuKort() {
    if (låstBrett) return
    if (this === valgtKort[0]) return

    this.classList.remove("kortene")
    this.classList.remove("snudd")
    this.classList.add("kortene2")
    valgtKort.push(this)
    
    if (valgtKort.length === 2) {
        låstBrett = true
        sjekkMatch()
    }
}

function sjekkMatch() {
    let [kort1, kort2] = valgtKort

    let bilde1 = kort1.querySelector("img").src
    let bilde2 = kort2.querySelector("img").src

    console.log("Comparing:", bilde1, bilde2)

    if (bilde1 === bilde2){
        console.log("Match! Keeping them flipped.")
        kort1.classList.remove("snudd")
        kort2.classList.remove("snudd")
        valgtKort = []
        låstBrett = false
        antallKortKlart = antallKortKlart + 1

        if (antallKortKlart == 6){
            hentKnapp()
            klokkeRef = clearTimeout
        }

    } 
    
    else {
        console.log("No match! Flipping back.")
        liv = liv - 1
        livEl.innerHTML = liv + " Liv"
        setTimeout(() => {
            kort1.classList.add("snudd")
            kort2.classList.add("snudd")
            valgtKort = []
            låstBrett = false
        }, 500)
        if (liv == 0){
            hentKnapp()
        }
    }
}

function hentKnapp(){
    clearInterval(klokkeRef)
    kortEls.forEach((kort) => {
        kort.removeEventListener("click", snuKort)
    })
    restartEl.classList.add("starten")
    restartEl.classList.remove("restart")
    
    if (antallKortKlart == 6){
        sluttTekstEl.innerHTML = "CHAMPION! Trykk for å spille igjen"
    }
    else {
        sluttTekstEl.innerHTML = "Huff, du tapte. Prøv igjen"
    }
}

function restart(){
    restartEl.classList.add("restart")
    restartEl.classList.remove("starten")
    
    liv = 5
    sekunder = 0
    antallKortKlart = 0
    livEl.innerHTML = liv + " Liv"
    klokkeTekstEl.innerHTML = sekunder + " Sekunder"

    kortEls.forEach((kort) => {
        kort.classList.add("kortene")
        kort.classList.remove("kortene2")
        kort.removeEventListener("click", snuKort)
    })

    startKnappEl.classList.remove("startBorte")
    startKnappEl.classList.add("starten")

    startTekstEl.innerHTML = "Start spillet"
}


