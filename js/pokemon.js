
async function searchPokemon() {
    let input = document.getElementById("search").value.toLowerCase();

    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        let data = await res.json();

        document.getElementById("pokemon-img").src = data.sprites.front_default;

        document.getElementById("name").innerText = "Name: " + data.name;
        document.getElementById("type").innerText = "Type: " + data.types.map(t => t.type.name).join(", ");
        document.getElementById("height").innerText = "Height: " + data.height;
        document.getElementById("weight").innerText = "Weight: " + data.weight;

    } catch {
        alert("Không tìm thấy Pokémon!");
    }
}

document.getElementById("search").addEventListener("keypress", function(e) {
    if (e.key === "Enter") searchPokemon();
});
