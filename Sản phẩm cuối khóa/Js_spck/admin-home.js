// ================= CHECK ADMIN =================

document.addEventListener(
    "DOMContentLoaded",
    async () => {
        auth.onAuthStateChanged(
            async (user) => {
                // chưa đăng nhập
                if (!user) {
                    alert(
                        "Bạn cần đăng nhập!"
                    );
                    window.location.href =
                    "login_register.html";
                    return;
                }
                try {
                    const userDoc =
                    await db
                    .collection("users")
                    .doc(user.uid)
                    .get();
                    // không có dữ liệu user
                    if (!userDoc.exists) {
                        alert(
                            "Không tìm thấy thông tin tài khoản!"
                        );
                        window.location.href =
                        "home.html";
                        return;
                    }
                    const userData =
                    userDoc.data();
                    // không phải admin
                    if (
                        userData.role !==
                        "admin"
                    ) {
                        alert(
                            "Bạn không có quyền truy cập trang Admin!"
                        );
                        window.location.href =
                        "home.html";
                        return;
                    }
                    // hiển thị tên admin
                    document.getElementById(
                        "accountName"
                    ).textContent =
                    userData.fullName;
                } catch (error) {
                    console.error(error);
                    window.location.href =
                    "home.html";
                }
            }
        );
    }
);

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadStatistics();
    }
);

async function loadStatistics() {

    try {

        // ===== MOVIES =====

        const movieSnapshot =
            await db.collection("movies").get();

        document.getElementById(
            "movieCount"
        ).textContent =
            movieSnapshot.size;

        // ===== USERS =====

        const userSnapshot =
            await db.collection("users").get();

        document.getElementById(
            "userCount"
        ).textContent =
            userSnapshot.size;

    } catch (error) {

        console.error(
            "Lỗi tải thống kê:",
            error
        );
    }
}