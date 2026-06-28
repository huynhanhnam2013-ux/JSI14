// ================= VALIDATION =================

const emailRegex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex =
/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

// ================= REGISTER =================

window.registerUser = async function () {

    const email =
    document.getElementById(
        "reg-email"
    ).value.trim();

    const password =
    document.getElementById(
        "reg-password"
    ).value.trim();

    const fullName =
    document.getElementById(
        "reg-name"
    )?.value.trim() || "";

    // Validate
    if (!email || !password) {
        alert(
            "Vui lòng nhập đầy đủ email và mật khẩu!"
        );
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert(
            "Mật khẩu phải có ít nhất 6 ký tự, có chữ hoa, chữ thường và số!"
        );
        return;
    }

    try {

        // Firebase Auth
        const userCredential =
        await auth
        .createUserWithEmailAndPassword(
            email,
            password
        );

        // Firestore
        await db
        .collection("users")
        .doc(userCredential.user.uid)
        .set({

            fullName:
            fullName || "Người dùng mới",

            email: email,

            role: "user",

            createdAt:
            firebase.firestore
            .FieldValue.serverTimestamp()

        });

        alert(
            "🎉 Đăng ký thành công!"
        );

        // qua login
        window.location.href =
        "../Html_spck/login_register.html";;

    } catch (error) {

        alert(
            "❌ Lỗi đăng ký: " +
            error.message
        );
    }
};

// ================= LOGIN =================

window.loginUser = async function () {

    const email =
    document.getElementById(
        "login-email"
    ).value.trim();

    const password =
    document.getElementById(
        "login-password"
    ).value.trim();

    if (!email || !password) {

        alert(
            "Vui lòng nhập email và mật khẩu!"
        );

        return;
    }

    try {

        const userCredential =
        await auth
        .signInWithEmailAndPassword(
            email,
            password
        );

        const user =
        userCredential.user;

        // lấy thông tin user
        const userDoc =
        await db
        .collection("users")
        .doc(user.uid)
        .get();

        const userData =
        userDoc.data();

        // lưu localStorage
        localStorage.setItem(
            "movie_currentUser",

            JSON.stringify({
                uid: user.uid,
                email: user.email,
                username:
                userData.fullName,
                role:
                userData.role
            })
        );

        // admin hay user
        localStorage.setItem(
            "isAdmin",
            userData.role === "admin"
        );

        alert(
            "✅ Đăng nhập thành công!"
        );

        // vào home
        window.location.href =
            "home.html";

    } catch (error) {

        alert(
            "❌ Đăng nhập thất bại: "
            + error.message
        );
    }
};

// ================= CHECK LOGIN =================

// tự động login nếu còn session
auth.onAuthStateChanged(
async (user) => {

    if (!user) return;

    try {

        const userDoc =
        await db
        .collection("users")
        .doc(user.uid)
        .get();

        if (!userDoc.exists)
            return;

        const userData =
        userDoc.data();

        localStorage.setItem(
            "movie_currentUser",

            JSON.stringify({
                uid: user.uid,
                email: user.email,
                username:
                userData.fullName,
                role:
                userData.role
            })
        );

        localStorage.setItem(
            "isAdmin",
            userData.role === "admin"
        );

    } catch (error) {
        console.log(error);
    }
});

// ================= LOGOUT =================

window.logoutUser =
function () {

    auth.signOut()
    .then(() => {

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
    })
    .catch((error) => {

        alert(
            "Lỗi đăng xuất: "
            + error.message
        );
    });
};