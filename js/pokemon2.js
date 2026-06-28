function compare(){
    if(!p1 || !p2) return;

    let score1 = p1.stats.reduce((a,b)=>a+b.base_stat,0);
    let score2 = p2.stats.reduce((a,b)=>a+b.base_stat,0);

    document.getElementById("card1").classList.remove("winner");
    document.getElementById("card2").classList.remove("winner");

    if(score1 > score2){
        document.getElementById("card1").classList.add("winner");
    } else {
        document.getElementById("card2").classList.add("winner");
    }
}

function renderCard(data, el){
    document.getElementById(el).innerHTML = `
        <h3>${data.name} (#${data.id})</h3>
        <img src="${data.sprites.front_default}">
        <p>${data.types.map(t=>t.type.name).join(", ")}</p>

        <p><b>Abilities:</b> ${data.abilities.map(a=>a.ability.name).join(", ")}</p>

        ${data.stats.map(s=>`
            <div class="stat">
                ${s.stat.name}
                <div class="bar">
                    <div style="width:${Math.min(s.base_stat,100)}%"></div>
                </div>
            </div>
        `).join("")}

        <button onclick="saveFav(${data.id},'${data.name}','${data.sprites.front_default}')">⭐</button>
    `;
}

function renderFav(){
    let fav = JSON.parse(localStorage.getItem("fav")||"[]");

    document.getElementById("favorites").innerHTML =
        fav.map(f=>`
            <div class="fav-card" onclick="searchAgain('${f.name}')">
                <img src="${f.img}">
                <div>${f.name}</div>
            </div>
        `).join("");
}