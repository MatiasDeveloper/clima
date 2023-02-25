const button = document.getElementById("boton");
const C = document.getElementById("C");
const K = document.getElementById("K");
// Declaro las constantes que van a ser usadas para el switcher.

button.addEventListener("click", () => {
    button.classList.toggle("celsius");
    button.classList.toggle("kelvin");
    C.classList.toggle("desactivado");
    K.classList.toggle("desactivado");
    input.value = "";
})
// Si el switcher recibe un click, se limpia el input.


const api = {
    key: "50f28ecf3055118d09a7ad4de19a05a0",
    url: "https://api.openweathermap.org/data/2.5/weather"
}

const form = document.getElementById("busqueda");
const input = document.getElementById("busqueda__input");
const estado = document.getElementById("estado");
const tempmin = document.getElementById("tempmin");
const tempmax = document.getElementById("tempmax");
const lugar = document.getElementById("principal__titulo");
const fecha = document.getElementById("fecha"); 
const humedad = document.getElementById("humedad");
const vientoSpeed = document.getElementById("viento");
// Declaro los objetos que van a mostrar los datos solicitados



function toCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
}
function onSubmit(event) {
    event.preventDefault();
    search(input.value);


}
//      Declaro Las funciones para buscar y para pasar kelvin a Celsius que usaré mas adelante.


async function search(query) {
    try{
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
        const data = await response.json();

        estado.innerHTML = `${data.weather[0].description}`
        lugar.innerHTML = `${data.name}, ${data.sys.country}`
        humedad.innerHTML = ` <i class="fa-solid fa-droplet"></i> ${data.main.humidity}%`
        vientoSpeed.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.wind.speed}  mp/h`
        console.log(data);

        if (button.classList.contains("celsius")) {
            tempmin.innerHTML = `${toCelsius(data.main.temp_min)} ° C `
            tempmax.innerHTML = `${toCelsius(data.main.temp_max)} ° C`
        } else if (button.classList.contains("kelvin")) {
            tempmin.innerHTML = `${data.main.temp_min} ° K`
            tempmax.innerHTML = `${data.main.temp_max} ° K`
        }
        // hago la peticion y comienzo a sustituir datos, ademas de evaluar si el usuario quiere verlos en grados Celsius o Grados Kelvin.
        
        
        // Codigo para cambiar el icono principal segun el estado de la ciudad. 
        const nube = document.getElementById("nube");
        const sol = document.getElementById("sol");
        const nieve1 = document.getElementById("nieve1");
        const nieve2 = document.getElementById("nieve2");
        const viento = document.getElementById("viento");
        const rayo = document.getElementById("rayo");
        const lluvia = document.getElementById("nubecontainer"); // Agregar clase "lloviendo".

        if (data.weather[0].id == 800) {
            sol.classList.toggle("desactivado");  
        } // soleado
        if (data.weather[0].id == 801) {
            sol.classList.remove("desactivado");
            sol.style.cssText = "position: absolute;";
            nube.classList.remove("desactivado");
        } // sol y nubes
        if ((data.weather[0].id >= 802) && (data.weather[0].id <= 804)) {
            nube.classList.remove("desactivado");
        } // nublado, o nubes dispersas
        if ((data.weather[0].id >= 300) && (data.weather[0].id <= 531)) {
            lluvia.classList.add("lloviendo");
            nube.classList.remove("desactivado");
        } // lloviendo
        if ((data.weather[0].id >= 200) && (data.weather[0].id <= 232)) {
            nube.classList.remove("desactivado");
            rayo.classList.remove("desactivado");
            lluvia.classList.add("lloviendo");
        } // tormenta
        if ((data.weather[0].id >=600) && (data.weather[0].id <= 622)) {
            nube.classList.remove("desactivado");
            nieve1.classList.remove("desactivado");
            nieve2.classList.remove("desactivado");
        } // nevando
        if ((data.weather[0].id >= 701) && (data.weather[0].id <= 781)) {
            viento.classList.remove("desactivado");
        } // ventoso

    } catch (err) {
        console.log(err)
        alert("Hubo un Error o no se encontro la ciudad")
    }
}




form.addEventListener("submit", onSubmit, true);

// Se capturan los datos enviados, y se ejecuta la peticion y escritura

/*preloader */ 

const pagina = document.getElementById("pagina");
const body = document.getElementById("body");
const box = document.getElementById("preloader");

window.onload = function (){
    box.style.cssText = "display: none;";
    body.classList.remove("sincarga");
    pagina.classList.remove("desactivado");
}


//--------------- Modal --------------//
const botonInfo = document.getElementById("modal__boton");
const modal = document.getElementById("modal__container");
const modalCard = document.getElementById("modal__card");

botonInfo.addEventListener("click", () => {
    modal.classList.remove("desactivado");
    modalCard.style.cssText = "animation: modalAbrir .5s;";
    setTimeout(() => {
        modalCard.style.cssText = "transform: translateX(0vw);";
    },500);
    body.classList.add("bloquear");

    
})

const cerrar = document.getElementById("cerrar__modal");

cerrar.addEventListener("click", () => {
    modalCard.style.cssText = "animation: modalCerrar 1.2s;";
    setTimeout(() => {
        modalCard.style.cssText = "transform: translateX(100vw);";
        
    }, 1200);
    setTimeout(() => {
        modal.classList.add("desactivado");
        body.classList.remove("bloquear");
    }, 800);
    
})




