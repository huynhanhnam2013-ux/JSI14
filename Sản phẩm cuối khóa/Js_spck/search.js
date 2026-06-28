// ================= MOVIES =================

let allMovies = [];

// ================= LOAD MOVIES =================

window.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadMovies();

        setupCategory();

        setupAccountMenu();
    }
);

async function loadMovies() {

    try {

        const snapshot =
            await db.collection("movies").get();

        allMovies = [];

        snapshot.forEach(doc => {

            allMovies.push({
                id: doc.id,
                ...doc.data()
            });

        });

        displayMovies(allMovies);

    } catch (error) {

        console.log(error);

        alert("Không thể tải danh sách phim!");
    }
}

// ================= DISPLAY MOVIES =================

function displayMovies(list) {

    const box =
        document.querySelector(".div2");

    box.innerHTML = "";

    if (list.length === 0) {

        box.innerHTML = `
            <p class="no-result">
                Không tìm thấy phim nào
            </p>
        `;

        return;
    }

    list.forEach(movie => {

        
        box.innerHTML += `
        <a
            href="movie-detail.html?id=${movie.id}"
            class="movie-card"
        >
            <img src="${movie.poster}">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-category">${movie.category}</div>
        </a>
        `;
    });
}

window.openMovie = function(id){

    localStorage.setItem(
        "selectedMovie",
        id
    );

    window.location.href =
    "movie-detail.html";
};

// ================= SEARCH BUTTON =================

// function searchMovie(e) {

//     e.preventDefault();

//     const keyword =
//         document
//         .getElementById("searchInput")
//         .value
//         .toLowerCase()
//         .trim();

//     const result =
//         allMovies.filter(movie =>

//             movie.title
//             .toLowerCase()
//             .includes(keyword)

//             ||

//             movie.category
//             .toLowerCase()
//             .includes(keyword)
//         );

//     displayMovies(result);
// }

// ================= REALTIME SEARCH =================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const searchInput =
            document.getElementById(
                "searchInput"
            );

        searchInput.addEventListener(
            "input",
            () => {

                const keyword =
                    searchInput.value
                    .toLowerCase()
                    .trim();

                const result =
                    allMovies.filter(movie =>

                        movie.title
                        .toLowerCase()
                        .includes(keyword)

                        ||

                        movie.category
                        .toLowerCase()
                        .includes(keyword)
                    );

                displayMovies(result);
            }
        );
    }
);

// ================= CATEGORY FILTER =================

function setupCategory() {

    document
    .querySelectorAll(".category-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const category =
                    item.textContent
                    .toLowerCase()
                    .trim();

                const result =
                    allMovies.filter(movie =>

                        movie.category
                        .toLowerCase()
                        .includes(category)
                    );

                displayMovies(result);
            }
        );
    });
}

// ================= USER =================

const currentUser =
JSON.parse(
    localStorage.getItem(
        "movie_currentUser"
    )
);

if (!currentUser) {

    window.location.href =
    "login_register.html";
}

// ================= SHOW USER =================

const accountName =
document.getElementById(
    "accountName"
);

if (
    accountName &&
    currentUser
) {

    accountName.textContent =
    currentUser.username;
}

// ================= ADMIN BUTTON =================

const adminBtn =
document.getElementById(
    "adminBtn"
);

if (
    adminBtn &&
    currentUser.role !== "admin"
) {

    adminBtn.style.display =
    "none";
}

// ================= ACCOUNT MENU =================

function setupAccountMenu() {

    const accountBox =
        document.getElementById(
            "accountBox"
        );

    const accountMenu =
        document.getElementById(
            "accountMenu"
        );

    if (
        !accountBox ||
        !accountMenu
    ) return;

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
document.getElementById(
    "logoutBtn"
);

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

            } catch (error) {

                console.log(error);
            }
        }
    );
}