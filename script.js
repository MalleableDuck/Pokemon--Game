var pokemon1_selected;
var pokemon2_selected;
var user_pokemon;
var opps_pokemon;

document.querySelector("#search1").addEventListener("click", getPokemon1);
document.querySelector("#search2").addEventListener("click", getPokemon2);
document.getElementById("start-battle").addEventListener("click", start_duel);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon1(e) {
  const name = document.querySelector("#pokemonName1").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      //sessionStorage.setItem('userpokemon',data.name);
      user_pokemon=data.name
      document.querySelector(".pokemonBox1").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="pokemonInfos">
        <h1>${capitalizeFirstLetter(data.name)}</h3>
        <p>HP: ${data.stats[0].base_stat*4}</p>
      </div>`;
    })
    .then(pokemon1_selected=1)
    .then(show_button())
    .catch((err) => {
      pokemon1_selected=0;
      document.querySelector(".pokemonBox1").innerHTML = `
      <h4>Pokemon not found 😞</h4>
      `;
      console.log("Pokemon not found", err);
      show_button();
    });

  e.preventDefault();

}

function getPokemon2(e) {
  const name = document.querySelector("#pokemonName2").value;
  const pokemonName = lowerCaseName(name);


  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      // sessionStorage.setItem("oppPokemon",data.name);
      opps_pokemon=data.name;
      document.querySelector(".pokemonBox2").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="pokemonInfos">
        <h1>${capitalizeFirstLetter(data.name)}</h3>
        <p>HP: ${data.stats[0].base_stat*4}</p>
      </div>`;
    })
    .then(pokemon2_selected=1)
    .then(show_button())
    .catch((err) => {
      pokemon2_selected=0;
      document.querySelector(".pokemonBox2").innerHTML = `
      <h4>Pokemon not found 😞</h4>
      `;
      console.log("Pokemon not found", err);
      show_button()
    });

  e.preventDefault();
}

function show_button(){
  if(pokemon1_selected==1 & pokemon2_selected==1){
    document.querySelector("#start-battle").style.display="inline";
  }
  else{
    document.querySelector("#start-battle").style.display="none";
  }
}



function start_duel(){
  sessionStorage.setItem("pokemon1",user_pokemon);
  sessionStorage.setItem("pokemon2",opps_pokemon)
  window.location.href = "duel_screen.html";
}
