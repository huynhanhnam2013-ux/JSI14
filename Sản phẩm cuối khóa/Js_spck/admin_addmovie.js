// ================= CLOUDINARY =================

const CLOUD_NAME = "djteyx6ln";
const UPLOAD_PRESET = "movix-anhnam";

// ================= CHECK ADMIN =================

const currentUser =
JSON.parse(
    localStorage.getItem(
        "movie_currentUser"
    )
);

if (
    !currentUser ||
    currentUser.role !== "admin"
) {

    alert(
        "Bạn không có quyền truy cập!"
    );

    window.location.href =
    "home.html";
}

// ================= ACCOUNT =================

const accountName =
document.getElementById(
    "accountName"
);

if (accountName) {

    accountName.textContent =
    currentUser.username;
}

// ================= ACCOUNT MENU =================

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

// ================= POSTER PREVIEW =================

const posterFile =
document.getElementById(
    "posterFile"
);

const posterPreview =
document.getElementById(
    "posterPreview"
);

if (posterFile) {

    posterFile.addEventListener(
        "change",
        () => {

            const file =
            posterFile.files[0];

            if (!file) return;

            posterPreview.src =
            URL.createObjectURL(file);
        }
    );
}

// ================= ADD MOVIE =================

const movieForm =
document.getElementById(
    "movieForm"
);

movieForm.addEventListener(
    "submit",

    async (e) => {

        e.preventDefault();

        const title =
        document
        .getElementById(
            "movieTitle"
        )
        .value.trim();

        const category =
        document
        .getElementById(
            "movieCategory"
        )
        .value;

        const description =
        document
        .getElementById(
            "movieDescription"
        )
        .value.trim();

        const movieLink =
        document
        .getElementById(
            "movieLink"
        )
        .value.trim();

        const imageFile =
        document
        .getElementById(
            "posterFile"
        )
        .files[0];

        if (
            !title ||
            !category ||
            !description ||
            !movieLink ||
            !imageFile
        ) {

            alert(
                "Vui lòng nhập đầy đủ thông tin!"
            );

            return;
        }

        try {

            // ================= UPLOAD CLOUDINARY =================

            const formData =
            new FormData();

            formData.append(
                "file",
                imageFile
            );

            formData.append(
                "upload_preset",
                UPLOAD_PRESET
            );

            alert(
                "Đang upload poster..."
            );

            const uploadResponse =
            await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const uploadResult =
            await uploadResponse.json();

            if (
                !uploadResult.secure_url
            ) {

                throw new Error(
                    "Upload ảnh thất bại!"
                );
            }

            const poster =
            uploadResult.secure_url;

            // ================= SAVE FIRESTORE =================

            await db
            .collection("movies")
            .add({

                title: title,

                poster: poster,

                category: category,

                description:
                description,

                movieLink:
                movieLink,

                createdAt:
                firebase.firestore
                .FieldValue.serverTimestamp()

            });

            alert(
                "🎉 Thêm phim thành công!"
            );

            movieForm.reset();

            posterPreview.src =
            "https://via.placeholder.com/300x420?text=Poster";

        } catch (error) {

            console.error(error);

            alert(
                "❌ " +
                error.message
            );
        }
    }
);