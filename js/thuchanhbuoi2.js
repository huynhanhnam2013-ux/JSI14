const students = [
  {
    name: "An",
    scores: {
      Toan: { score: 7.4, evaluation: "Đ" },
      NguVan: { score: 8.9, evaluation: "Đ" },
      NgoaiNgu: { score: 8.5, evaluation: "Đ" },
      VatLy: { score: 9.0, evaluation: "Đ" },
      HoaHoc: { score: 3.9, evaluation: "KĐ" },
      SinhHoc: { score: 5.0, evaluation: "Đ" },
      LichSu: { score: 8.3, evaluation: "Đ" },
      DiaLy: { score: 9.4, evaluation: "Đ" },
      GDCD: { score: 6.6, evaluation: "Đ" }
    }
  },
  {
    name: "Bình",
    scores: {
      Toan: { score: 3.4, evaluation: "KĐ" },
      NguVan: { score: 5.9, evaluation: "Đ" },
      NgoaiNgu: { score: 5.4, evaluation: "Đ" },
      VatLy: { score: 7.4, evaluation: "Đ" },
      HoaHoc: { score: 9.3, evaluation: "Đ" },
      SinhHoc: { score: 8.6, evaluation: "Đ" },
      LichSu: { score: 5.2, evaluation: "Đ" },
      DiaLy: { score: 7.1, evaluation: "Đ" },
      GDCD: { score: 6.7, evaluation: "Đ" }
    }
  },
  // ... Tiếp tục tạo thêm dữ liệu mẫu
  { name: "Cường", scores: generateRandomScores() },
  { name: "Dũng", scores: generateRandomScores() },
  { name: "Em", scores: generateRandomScores() },
  { name: "Giang", scores: generateRandomScores() },
  { name: "Hòa", scores: generateRandomScores() },
  { name: "Khánh", scores: generateRandomScores() },
  { name: "Linh", scores: generateRandomScores() },
  { name: "Minh", scores: generateRandomScores() },
  { name: "Nam", scores: generateRandomScores() },
  { name: "Oanh", scores: generateRandomScores() },
  { name: "Phúc", scores: generateRandomScores() },
  { name: "Quân", scores: generateRandomScores() },
  { name: "Sơn", scores: generateRandomScores() },
  { name: "Thịnh", scores: generateRandomScores() },
  { name: "Uyên", scores: generateRandomScores() },
  { name: "Việt", scores: generateRandomScores() },
  { name: "Xuyên", scores: generateRandomScores() },
  { name: "Yến", scores: generateRandomScores() },
  { name: "Ân", scores: generateRandomScores() },
  { name: "Bảo", scores: generateRandomScores() },
  { name: "Chi", scores: generateRandomScores() },
  { name: "Danh", scores: generateRandomScores() },
  { name: "Hùng", scores: generateRandomScores() },
  { name: "Kiên", scores: generateRandomScores() },
  { name: "Long", scores: generateRandomScores() },
  { name: "Mạnh", scores: generateRandomScores() },
  { name: "Ngọc", scores: generateRandomScores() },
  { name: "Phương", scores: generateRandomScores() },
  { name: "Quyên", scores: generateRandomScores() },
  { name: "Tâm", scores: generateRandomScores() }
];

// Hàm hỗ trợ tạo điểm ngẫu nhiên để bộ dữ liệu đầy đủ 30 người
function generateRandomScores() {
  const subjects = ["Toan", "NguVan", "NgoaiNgu", "VatLy", "HoaHoc", "SinhHoc", "LichSu", "DiaLy", "GDCD"];
  let res = {};
  subjects.forEach(s => {
    let sVal = (Math.random() * 10).toFixed(1);
res[s] = { score: parseFloat(sVal), evaluation: sVal >= 5 ? "Đ" : "KĐ" };
  });
  return res;
}

function tinh_diem_tb(student) {
  let tong = 0;
  let soMon = 0;

  for (let mon in student.scores) {
    tong += student.scores[mon].score;
    soMon++;
  }

  return tong / soMon;
}



let top3 = [...students]
  .sort((a, b) => tinh_diem_tb(b) - tinh_diem_tb(a))
  .slice(0, 3);

console.log("=== TOP 3 HỌC SINH CAO NHẤT ===");

top3.forEach(student => {
  console.log(student.name);
});


let hocSinhThapNhat = students.reduce((min, student) => {
  if (tinh_diem_tb(student) < tinh_diem_tb(min)) {
    return student;
  } else {
    return min;
  }
});

console.log("\n=== HỌC SINH ĐIỂM THẤP NHẤT ===");
console.log(hocSinhThapNhat.name);


let tongDiemLop = 0;

students.forEach(student => {
  tongDiemLop += tinh_diem_tb(student);
});

let diemTBLop = tongDiemLop / students.length;

console.log("\n=== ĐIỂM TB CẢ LỚP ===");
console.log(diemTBLop);


let gioi = [];
let kha = [];
let trungBinh = [];

students.forEach(student => {
  let dtb = tinh_diem_tb(student);

  if (dtb >= 8) {
    gioi.push(student.name);
  } else if (dtb >= 6.5) {
    kha.push(student.name);
  } else {
    trungBinh.push(student.name);
  }
});

console.log("\n=== HỌC LỰC GIỎI ===");
console.log(gioi);

console.log("\n=== HỌC LỰC KHÁ ===");
console.log(kha);

console.log("\n=== HỌC LỰC TRUNG BÌNH ===");
console.log(trungBinh);


let hocSinhTren7 = students
  .filter(student => tinh_diem_tb(student) >= 7)
  .map(student => student.name);

console.log("\n=== HỌC SINH ĐIỂM >= 7 ===");
console.log(hocSinhTren7);