function navigate(page) {
  const main = document.getElementById("mainContent");

  let content = "";

  if (page === "beranda") {
    content = `
      <h2>Beranda</h2>
      <p>Selamat datang di website Masjid Khairul Ba'i. Ini adalah tempat informasi kegiatan dan layanan masjid kami.</p>
    `;
  } else if (page === "profil") {
    content = `
      <h2>Profil Masjid</h2>
      <p>Masjid Khairul Ba'i berdiri sejak tahun 2010 dan menjadi pusat pembinaan keagamaan di lingkungan SMK Negeri 1 Adiwerna.</p>
    `;
  } else if (page === "jadwal") {
    content = `
      <h2>Jadwal Sholat</h2>
      <table>
        <tr><th>Sholat</th><th>Waktu</th></tr>
        <tr><td>Subuh</td><td>04:35</td></tr>
        <tr><td>Dzuhur</td><td>12:05</td></tr>
        <tr><td>Ashar</td><td>15:20</td></tr>
        <tr><td>Maghrib</td><td>18:05</td></tr>
        <tr><td>Isya</td><td>19:15</td></tr>
      </table>
    `;
  } else if (page === "kegiatan") {
    content = `
      <h2>Kegiatan Masjid</h2>
      <ul>
        <li>Pengajian Rutin</li>
        <li>BTQ (Baca Tulis Al-Qur'an)</li>
        <li>Rohis, Tilawah, dan Hadroh</li>
      </ul>
    `;
  }

  main.innerHTML = content;
}


document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:1337/api/banner?populate=*")
    .then(response => response.json())
    .then(result => {
      const data = result.data;

      // Pilih gambar kualitas terbaik (original)
      const baseUrl = "http://localhost:1337";
      const imageUrl = baseUrl + data.Background.url;

      // Masukkan ke elemen HTML
      document.getElementById("heroImage").src = imageUrl;
      document.getElementById("heroTitle").textContent = data.Judul;
      document.getElementById("heroDescription").textContent = data.Deskripsi;
    })
    .catch(error => {
      console.error("Gagal mengambil data banner:", error);
    });
});
