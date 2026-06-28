// ================= CURRENT USER =================

const currentUser =
JSON.parse(
    localStorage.getItem(
        "movie_currentUser"
    )
);

// chưa đăng nhập
if (!currentUser) {

    window.location.href =
    "login_register.html";
}

// ================= SHOW USER INFO =================

const profileName =
document.getElementById(
    "profileName"
);

const profileEmail =
document.getElementById(
    "profileEmail"
);

const accountName =
document.getElementById(
    "accountName"
);

// navbar
if (accountName) {

    accountName.textContent =
    currentUser.username;
}

// profile card
if (profileName) {

    profileName.textContent =
    currentUser.username;
}

if (profileEmail) {

    profileEmail.textContent =
    currentUser.email;
}

// ================= ROLE =================

const roleElement =
document.getElementById(
    "profileRole"
);

if (roleElement) {

    roleElement.textContent =
    currentUser.role;
}

// ================= PERSONAL INFO =================

const infoUsername =
document.getElementById(
    "infoUsername"
);

const infoEmail =
document.getElementById(
    "infoEmail"
);

const infoRole =
document.getElementById(
    "infoRole"
);

if (infoUsername) {

    infoUsername.textContent =
    currentUser.username;
}

if (infoEmail) {

    infoEmail.textContent =
    currentUser.email;
}

if (infoRole) {

    infoRole.textContent =
    currentUser.role;
}

// ================= ADMIN BUTTON =================

const adminBtn =
document.querySelector(
    ".admin-btn"
);

if (
    currentUser.role !==
    "admin"
) {

    if (adminBtn) {

        adminBtn.style.display =
        "none";
    }
}

// ================= LOGOUT =================

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if (logoutBtn) {

    logoutBtn
    .addEventListener(
        "click",

        async (e) => {

            e.preventDefault();

            try {

                await auth.signOut();

                localStorage.removeItem(
                    "movie_currentUser"
                );

                localStorage.removeItem(
                    "isAdmin"
                );

                alert(
                    "Đã đăng xuất!"
                );

                window.location.href =
                "login_register.html";

            } catch (error) {

                alert(
                    "Lỗi đăng xuất: "
                    + error.message
                );
            }
        }
    );
}

// ================= JOIN YEAR =================

async function loadJoinYear() {

    try {

        const userDoc =
        await db
        .collection("users")
        .doc(currentUser.uid)
        .get();

        const userData =
        userDoc.data();

        const joinYear =
        document.getElementById(
            "joinYear"
        );

        if (
            userData.createdAt
            && joinYear
        ) {

            const year =
            userData
            .createdAt
            .toDate()
            .getFullYear();

            joinYear.textContent =
            year;
        }

    } catch (error) {

        console.log(
            "Lỗi lấy năm:",
            error
        );
    }
}

loadJoinYear();