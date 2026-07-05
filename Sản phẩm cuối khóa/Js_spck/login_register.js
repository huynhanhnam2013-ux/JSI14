// ================= ELEMENT =================

const loginTab =
document.getElementById("loginTab");

const registerTab =
document.getElementById("registerTab");

const loginForm =
document.getElementById("loginForm");

const registerForm =
document.getElementById("registerForm");


// ================= LOGIN TAB =================

loginTab.addEventListener("click", () => {

    // active button
    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    // show form
    loginForm.classList.add("active-form");
    registerForm.classList.remove("active-form");

    // đổi title tab trình duyệt
    document.title = "MoviX NOVA - Đăng nhập";

    authTitle.textContent ="Chào mừng trở lại MoviX NOVA";
    authDesc.textContent ="Đăng nhập để tiếp tục khám phá thế giới phim ảnh không giới hạn cùng MoviX NOVA 3.0";
});


// ================= REGISTER TAB =================

registerTab.addEventListener("click", () => {

    // active button
    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    // show form
    registerForm.classList.add("active-form");
    loginForm.classList.remove("active-form");

    // đổi title tab trình duyệt
    document.title = "MoviX NOVA - Đăng ký";

    authTitle.textContent ="Chào mừng đến MoviX NOVA";
    authDesc.textContent ="Tạo tài khoản để bắt đầu hành trình khám phá hàng ngàn bộ phim hấp dẫn cùng MoviX NOVA 3.0";
});