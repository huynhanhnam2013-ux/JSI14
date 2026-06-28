// ================= USER =================

const currentUser =
JSON.parse(localStorage.getItem("movie_currentUser"));

const isAdmin =
localStorage.getItem("isAdmin") === "true";

if (!currentUser && !isAdmin) {

    window.location.href =
    "login_register.html";
}

// ================= ACCOUNT NAME =================

const accountName =
document.getElementById("accountName");

if (accountName) {

    if (currentUser) {

        accountName.textContent =
        currentUser.username;

    } else {

        accountName.textContent =
        "Admin 👑";
    }
}

// ================= ADMIN BUTTON =================

const adminBtn =
document.getElementById("adminBtn");

if (adminBtn) {

    adminBtn.style.display =
    isAdmin ? "block" : "none";
}

// ================= ACCOUNT MENU =================

const accountBox =
document.getElementById("accountBox");

const accountMenu =
document.getElementById("accountMenu");

if (accountBox && accountMenu) {

    accountBox.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            accountMenu.style.display =
                accountMenu.style.display === "flex"
                ? "none"
                : "flex";
        }
    );

    document.addEventListener(
        "click",
        () => {

            accountMenu.style.display =
            "none";
        }
    );
}

// ================= LOGOUT =================

const logoutBtn =
document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",

        async () => {

            try {

                await auth.signOut();

                localStorage.removeItem(
                    "movie_currentUser"
                );

                localStorage.removeItem(
                    "isAdmin"
                );

                window.location.href =
                "login_register.html";

            } catch(error) {

                console.log(error);
            }
        }
    );
}

// ================= LOAD MOVIES =================

window.addEventListener(
    "DOMContentLoaded",
    loadMovies
);

async function loadMovies() {

    const movieList =
    document.getElementById("movieList");

    if (!movieList) return;

    movieList.innerHTML = `
        <p style="
            color:white;
            text-align:center;
            grid-column:1/-1;
        ">
            🎬 Đang tải phim...
        </p>
    `;

    try {

        const snapshot =
        await db
        .collection("movies")
        .orderBy("createdAt", "desc")
        .get();

        const movies = [];

        snapshot.forEach(doc => {

            movies.push({

                id: doc.id,

                ...doc.data()
            });
        });

        renderMovies(movies);

    } catch(error) {

        console.error(error);

        movieList.innerHTML = `
            <p style="
                color:#ef4444;
                text-align:center;
                grid-column:1/-1;
            ">
                ❌ Không thể tải phim
            </p>
        `;
    }
}

// ================= RENDER MOVIES =================

function renderMovies(movies) {

    const container =
    document.getElementById("movieList");

    if (!container) return;

    container.innerHTML = "";

    if (movies.length === 0) {

        container.innerHTML = `
            <p style="
                color:white;
                text-align:center;
                grid-column:1/-1;
            ">
                Chưa có phim nào
            </p>
        `;

        return;
    }

    movies.forEach(movie => {

        container.innerHTML += `
        <a
            href="movie-detail.html?id=${movie.id}"
            class="movie-card"
        >
            <img src="${movie.poster}">
            <p class="movie-title">${movie.title}</p>
        </a>
        `;
    });
}

window.openMovie = function(id){

    console.log(id);

    localStorage.setItem(
        "selectedMovie",
        id
    );

    window.location.href =
    "movie-detail.html";
};