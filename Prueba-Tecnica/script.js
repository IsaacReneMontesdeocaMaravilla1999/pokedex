//Menu de hamburguesa responsive
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");

  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});

const pokeCard = document.querySelector('[pokeball-card]');
const pokeName = document.querySelector('[pokeball-name]');
const pokeImg = document.querySelector('[pokeball-img]');
const pokeImgContainer = document.querySelector('[pokeball-img-container]');
const pokeId = document.querySelector('[pokeball-id]');
const pokeTypes = document.querySelector('[pokeball-types]');
const pokeStats = document.querySelector('[pokeball-stats]');
const colors = {
};

//Hace la busqueda de los personajes a traves de la Api
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

//Todos los datos se declaran para aparecer posteriormente
const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = colors[types[0].type.name];
    const colorTwo = types[1] ? colors[types[1].type.name] : colors.default;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

//Es la zona donde se genera el tipo de cada Pokemon
const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = colors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

//Genera los elementos al momento de buscarlos
const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const element = document.createElement("div");
        const elementName = document.createElement("div");
        const elementAmount = document.createElement("div");
        elementName.textContent = stat.stat.name;
        elementAmount.textContent = stat.base_stat;
        element.appendChild(elementName);
        element.appendChild(elementAmount);
        pokeStats.appendChild(element);
    });
}

//Zona donde indica si los datos fueon no encontrados, es decir aparece vacio en caso de ser asi.
const renderNotFound = () => {
    pokeName.textContent = 'Lo siento, pokemon no encontrado';
    pokeImg.style.background =  'rgb(199, 194, 194)';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}
