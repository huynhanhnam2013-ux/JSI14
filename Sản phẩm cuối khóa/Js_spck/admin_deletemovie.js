// ================= USER =================

const currentUser = JSON.parse(
    localStorage.getItem("movie_currentUser")
);

if (!currentUser || currentUser.role !== "admin") {
    window.location.href = "home.html";
}

// ================= LOAD MOVIES =================

const movieList =
document.getElementById("movieList");

let allMovies = [];

window.addEventListener(
    "DOMContentLoaded",
    loadMovies
);

async function loadMovies(){

    try{

        const snapshot =
        await db.collection("movies").get();

        allMovies = [];

        snapshot.forEach(doc=>{

            allMovies.push({
                id:doc.id,
                ...doc.data()
            });

        });

        renderMovies(allMovies);

    }catch(error){

        console.log(error);

    }

}

// ================= RENDER =================

function renderMovies(list){

    movieList.innerHTML = "";

    if(list.length === 0){

        movieList.innerHTML =
        "<h3>Không tìm thấy phim.</h3>";

        return;
    }

    list.forEach(movie=>{

        movieList.innerHTML += `
        <div class="delete-card">

            <img src="${movie.poster}">

            <div class="delete-info">

                <h3>${movie.title}</h3>

                <button
                    class="delete-btn"
                    onclick="deleteMovie('${movie.id}')"
                >
                    🗑 Xóa
                </button>

            </div>

        </div>
        `;

    });

}

// ================= SEARCH =================

const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener(
        "input",
        ()=>{

            const keyword =
            searchInput.value
            .toLowerCase();

            const result =
            allMovies.filter(movie=>

                movie.title
                .toLowerCase()
                .includes(keyword)

                ||

                movie.category
                .toLowerCase()
                .includes(keyword)

            );

            renderMovies(result);

        }
    );

}

// ================= DELETE =================

async function deleteMovie(id){

    const ok = confirm(
        "Bạn chắc chắn muốn xóa phim này?"
    );

    if(!ok) return;

    try{

        await db
        .collection("movies")
        .doc(id)
        .delete();

        alert("Đã xóa phim!");

        loadMovies();

    }catch(error){

        console.log(error);

        alert("Xóa thất bại!");

    }

}

// ================= ACCOUNT =================

const accountName =
document.getElementById("accountName");

if(accountName){

    accountName.textContent =
    currentUser.username;

}

const accountBox =
document.getElementById("accountBox");

const accountMenu =
document.getElementById("accountMenu");

if(accountBox){

    accountBox.onclick=(e)=>{

        e.stopPropagation();

        accountMenu.style.display=
        accountMenu.style.display==="flex"
        ?"none"
        :"flex";

    };

    document.onclick=()=>{

        accountMenu.style.display="none";

    };

}

// ================= LOGOUT =================

document
.getElementById("logoutBtn")
.onclick = async ()=>{

    await auth.signOut();

    localStorage.removeItem(
        "movie_currentUser"
    );

    window.location.href =
    "login_register.html";

};