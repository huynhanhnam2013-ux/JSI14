let currentMovie = null;

// ================= LOAD =================

document.addEventListener(
    "DOMContentLoaded",
    loadMovie
);

async function loadMovie(){

    const params =
        new URLSearchParams(
            window.location.search
        );

    const movieId =
        params.get("id");

    if(!movieId){

        alert("Không tìm thấy phim!");

        location.href = "home.html";

        return;
    }

    try{

        const doc =
            await db
            .collection("movies")
            .doc(movieId)
            .get();

        if(!doc.exists){

            alert("Phim không tồn tại!");

            return;
        }

        currentMovie = {
            id: doc.id,
            ...doc.data()
        };

        renderMovie();

        loadFavorite();

        loadRelatedMovies();

        setupRating();

    }
    catch(error){

        console.log(error);
    }
}

// ================= RENDER =================

function renderMovie(){

    document.getElementById(
        "moviePoster"
    ).src =
    currentMovie.poster;

    document.getElementById(
        "movieTitle"
    ).textContent =
    currentMovie.title;

    document.querySelector(
        ".movie-category"
    ).textContent =
    currentMovie.category;

    document.getElementById(
        "movieDescription"
    ).textContent =
    currentMovie.description;

    document.getElementById(
        "watchBtn"
    ).href =
    currentMovie.movieLink;
}

// ================= FAVORITE =================

async function loadFavorite(){

    const user = auth.currentUser;

    if(!user) return;

    const btn =
    document.getElementById(
        "favoriteBtn"
    );

    const doc =
    await db
    .collection("favorites")
    .doc(
        `${currentMovie.id}_${user.uid}`
    )
    .get();

    if(doc.exists){

        btn.textContent =
        "⭐ Đã yêu thích";
    }
}

document
.getElementById("favoriteBtn")
.addEventListener(
    "click",
    toggleFavorite
);

async function toggleFavorite(){

    const user =
    auth.currentUser;

    if(!user){

        alert(
            "Vui lòng đăng nhập!"
        );

        return;
    }

    const favoriteId =
    `${currentMovie.id}_${user.uid}`;

    const btn =
    document.getElementById(
        "favoriteBtn"
    );

    const doc =
    await db
    .collection("favorites")
    .doc(favoriteId)
    .get();

    if(doc.exists){

        await db
        .collection("favorites")
        .doc(favoriteId)
        .delete();

        btn.textContent =
        "⭐ Yêu thích";
    }
    else{

        await db
        .collection("favorites")
        .doc(favoriteId)
        .set({

            movieId:
            currentMovie.id,

            userId:
            user.uid,

            createdAt:
            firebase.firestore
            .FieldValue
            .serverTimestamp()
        });

        btn.textContent =
        "⭐ Đã yêu thích";
    }
}

// ================= RATING =================

function setupRating(){

    document
    .querySelectorAll(".rating-stars span")
    .forEach(star=>{

        star.addEventListener(
            "click",
            async ()=>{

                const user =
                auth.currentUser;

                if(!user){

                    alert(
                        "Vui lòng đăng nhập!"
                    );

                    return;
                }

                const rate =
                Number(
                    star.dataset.rate
                );

                await db
                .collection("ratings")
                .doc(
                    `${currentMovie.id}_${user.uid}`
                )
                .set({

                    movieId:
                    currentMovie.id,

                    userId:
                    user.uid,

                    rating:
                    rate
                });

                document
                .getElementById(
                    "ratingText"
                )
                .textContent =

                `Bạn đã đánh giá ${rate}/5 sao`;

                updateAverageRating();
            }
        );
    });

    updateAverageRating();
}

async function updateAverageRating(){

    const snapshot =
    await db
    .collection("ratings")
    .where(
        "movieId",
        "==",
        currentMovie.id
    )
    .get();

    if(snapshot.empty){

        document
        .getElementById(
            "movieScore"
        )
        .textContent =
        "⭐ Chưa có";

        return;
    }

    let total = 0;

    snapshot.forEach(doc=>{

        total +=
        doc.data().rating;
    });

    const average =
    total /
    snapshot.size;

    document
    .getElementById(
        "movieScore"
    )
    .textContent =

    `⭐ ${average.toFixed(1)} (${snapshot.size})`;
}

// ================= RELATED MOVIES =================
async function loadRelatedMovies(){
    const box =
        document.getElementById(
            "relatedMovies"
        );

    box.innerHTML = "";
    const snapshot =
        await db
        .collection("movies")
        .get();

    let count = 0;
    snapshot.forEach(doc=>{
        const movie = {
            id: doc.id,
            ...doc.data()
        };
        if(
            movie.category ===
            currentMovie.category
            &&
            movie.id !==
            currentMovie.id
            &&
            count < 4
        ){
            count++;
            box.innerHTML += `
            <div
                class="related-card"
                onclick="openMovie('${movie.id}')"
            >
                <img
                    src="${movie.poster}"
                >
                <h4>
                    ${movie.title}
                </h4>
            </div>
            `;
        }
    });
}
// ================= OPEN MOVIE =================
window.openMovie = function(id){
    window.location.href =
        `movie-detail.html?id=${id}`;
};


