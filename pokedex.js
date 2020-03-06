const pokeContainer = document.getElementById('poke_container');
const pokeNumber = 150;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#e1bdf0',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const tagColors = {
	normal: "#A8A878",
	fighting: "#C03028",
	flying: "#A890F0",
	poison: "#A040A0",
	ground: "#E0C068",
	rock: "#B8A038",
	bug: "#A8B820",
	ghost: "#705898",
	steel: "#B8B8D0",
	fire: "#F08030",
	water: "#6890F0",
	grass: "#78C850",
	electric: "#F8D030",
	psychic: "#F85888",
	ice: "#98D8D8",
	dragon: "#7038F8",
	dark: "#705848",
	fairy: "#EE99AC"
};

const main_types = Object.keys(colors);

const fetchPokemon = async () => {
  for(i=1; i<=pokeNumber; i++) {
    await getPokemon(i);
  };
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

function setColor(color) {
  let actColor = tagColors[color];
  return `style="background-color: ${actColor}"`;
}

function setState(el) {
	const display = document.getElementById(el).style.display;

	if (display == "info") {
		document.getElementById(el).style.display = "block"
	} else {
		document.getElementById(el).style.display = "none"
	}
}

const setAbility = async (url) => {
  const res = await fetch(url);
	const ability = await res.json();
	return ability;
}

const createPokemonCard = async (pokemon) => {

  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
	const poke_types = pokemon.types.map(el => el.type.name);

	const type = main_types.find(
		type => poke_types.indexOf(type) > -1
	);

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];
	const types = pokemon.types.map(types => types.type.name);
	const abilityUrl = pokemon.abilities.map(ability => ability.ability.url);
	const selectAbility = await setAbility(abilityUrl[0]);
	const ability = {
		name: selectAbility.name[0].toUpperCase() + selectAbility.name.slice(1),
		effect: selectAbility.effect_entries.map(ablt => ablt.short_effect)

	}; 

	pokemonEl.style.backgroundColor = color;

	if (pokemon.types.length === 2) {
		let firstType = types[1];
		let secondType = types[0];

		const stringHTML = `
		<div id="${pokemon.name}" class="poke-container" onClick="selectPokemon(${pokemon.id})">
			<div id="${pokemon.name}_container" class="poke-container">
				<div class="img-container">
					<img src="${pokemon.sprites['front_default']}"/>
				</div>
				<div class="info">
					<span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
					<h3 class="name">${name}</h3>
				</div>
				<div class="types">
					<span class="types" ${setColor(firstType)}>${firstType}</span>
					<span class="types" ${setColor(secondType)}>${secondType}</span>
				</div>
			</div>
			<div id="${pokemon.name}_info" class="more_info" style="display:none; opacity: 0;">
				<span class="title">Ability Info</span>
				<h3 class="name_ability">${ability.name}</h3>
				<p>${ability.effect}</p>
			</div>
		</div>
		
		`;

		let pokeInnerHTML = stringHTML;

		pokemonEl.innerHTML = pokeInnerHTML;
	  pokeContainer.appendChild(pokemonEl);

	} else {
		let uniqueType = types[0];
		const stringHTML = `
		<div id="${pokemon.name}" class="poke-container" value="on" onClick="selectPokemon(${pokemon.id})">
			<div id="${pokemon.name}_container" class="poke-container">
				<div class="img-container">
					<img src="${pokemon.sprites['front_default']}"/>
				</div>
				<div class="info">
					<span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
					<h3 class="name">${name}</h3>
				</div>
				<div class="types">
					<span class="types" ${setColor(uniqueType)}">${uniqueType}</span>
				</div>
			</div>
			<div id="${pokemon.name}_info" class="more_info" style="display:none; opacity: 0;">
				<span class="title">Ability Info</span>
				<h3 class="name_ability">${ability.name}</h3>
				<p>${ability.effect}</p>
			</div>
		</div>
		`;

		let pokeInnerHTML = stringHTML;

		pokemonEl.innerHTML = pokeInnerHTML;
 		pokeContainer.appendChild(pokemonEl);

	}
};

const selectPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPopUpCard(pokemon);

};

const createPopUpCard = (pokemon) => {

	const popEl = `${pokemon.name}_info`;
	const actEl =  document.getElementById(popEl).style.display;

	if (actEl == "none") {
		document.getElementById(popEl).style.display = "block"
		document.getElementById(popEl).style.opacity = "1"
		document.getElementById(pokemon.name+"_container").style.opacity = "0"

	} else {
		document.getElementById(popEl).style.display = "none"
		document.getElementById(pokemon.name+"_container").style.opacity = "1"

	}
};


fetchPokemon();
