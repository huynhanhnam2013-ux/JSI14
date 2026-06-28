// ===== USER =====
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
// ===== HIỂN THỊ USER =====
const accountName =
document.getElementById(
    "accountName"
);
if (accountName) {
    accountName.textContent =
    currentUser.username;
}
// ===== ADMIN BUTTON =====
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
// ===== ACCOUNT MENU =====
const accountBox =
document.getElementById(
    "accountBox"
);
const accountMenu =
document.getElementById(
    "accountMenu"
);
if (
    accountBox &&
    accountMenu
) {
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
// ===== LOGOUT =====
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
// ================= FAVORITES =================
document.addEventListener(
    "DOMContentLoaded",
    loadFavorites
);
async function loadFavorites(){
    const user =
    auth.currentUser;
    if(!user){
        setTimeout(
            loadFavorites,
            500
        );
        return;
    }
    const favoriteList =
    document.getElementById(
        "favoriteList"
    );
    const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );
    favoriteList.innerHTML = "";
    const snapshot =
    await db
    .collection("favorites")
    .where(
        "userId",
        "==",
        user.uid
    )
    .get();
    if(snapshot.empty){
        emptyMessage.style.display =
        "block";
        return;
    }
    emptyMessage.style.display =
    "none";
    for(const doc of snapshot.docs){
        const favorite =
        doc.data();
        const movieDoc =
        await db
        .collection("movies")
        .doc(
            favorite.movieId
        )
        .get();
        if(!movieDoc.exists)
        continue;
        const movie = {
            id: movieDoc.id,
            ...movieDoc.data()
        };
        favoriteList.innerHTML += `
        <a
            href="movie-detail.html?id=${movie.id}"
            class="movie-card"
            style="
            text-decoration:none;
            color:white;
            "
        >
            <img
                src="${movie.poster}"
                alt="${movie.title}"
            >
            <div
                class="movie-title"
            >
                ${movie.title}
            </div>
        </a>
        `;
    }
}