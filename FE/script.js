// Function to show content based on navigation
function showContent(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach((section) => {
    section.classList.remove('active');
  });

// Hapus semua kelas 'active' dari menu navigasi
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add('active');
  }
}

// Fungsi untuk mengambil data banner
async function fetchBannerData() {
  try {
    const response = await fetch('http://localhost:1337/api/banner?populate=*');
    const data = await response.json();
    
    if (data.data) {
      const banner = data.data;
      const heroSection = document.querySelector('.hero');
      
      // Set background image
      const img = heroSection.querySelector('img');
      img.src = `http://localhost:1337${banner.Background.url}`;
      img.alt = banner.Judul;
      
      // Set overlay text
      const overlayText = heroSection.querySelector('.overlay-text');
      overlayText.querySelector('h2').textContent = banner.Judul;
      overlayText.querySelector('p').textContent = banner.Deskripsi;
    }
  } catch (error) {
    console.error('Error fetching banner data:', error);
    const heroSection = document.querySelector('.hero');
    heroSection.querySelector('img').src = 'default-mosque.jpg';
    heroSection.querySelector('.overlay-text h2').textContent = 'Masjid Khairul Ba\'i';
    heroSection.querySelector('.overlay-text p').textContent = 'Tempat ibadah, ilmu, dan kebersamaan umat';
  }
}

// Fungsi untuk menampilkan konten berdasarkan navigasi
document.addEventListener('DOMContentLoaded', () => {
  fetchBannerData();
  fetchDokumentasiKegiatan();
  fetchDaftarKegiatan();
  fetchProfilMasjid();

});

// Ambil dokumentasi kegiatan
async function fetchDokumentasiKegiatan() {
  try {
    const response = await fetch('http://localhost:1337/api/dokumentasi-kegiatans?populate=*');
    const result = await response.json();
    const kegiatanData = result.data;

    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = ''; // Kosongkan dulu

    kegiatanData.forEach(item => {
      const namaKegiatan = item.Nama_Kegiatan || 'Kegiatan';

      const gambarObj = item.Gambar;
      const gambarUrl = gambarObj?.formats?.medium?.url || gambarObj?.url || '/default.jpg';

      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="http://localhost:1337${gambarUrl}" alt="${namaKegiatan}" />
        <h4>${namaKegiatan}</h4>
      `;

      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Gagal mengambil dokumentasi kegiatan:', error);
  }
}

// Ambil data kegiatan
async function fetchDaftarKegiatan() {
  try {
    const response = await fetch('http://localhost:1337/api/kegiatans?populate=*');
    const result = await response.json();
    const data = result.data;

    const list = document.querySelector('.kegiatan');
    list.innerHTML = ''; // kosongkan daftar

    data.forEach(item => {
      const nama = item.Nama_Kegiatan || 'Kegiatan';
      const li = document.createElement('li');
      li.textContent = nama;
      list.appendChild(li);
    });
  } catch (error) {
    console.error('Gagal mengambil daftar kegiatan:', error);
  }
}

// Ambil profil masjid
async function fetchProfilMasjid() {
  try {
    const response = await fetch('http://localhost:1337/api/profil-masjid?populate=*');
    const result = await response.json();
    const profil = result.data?.Profil || 'Profil belum tersedia.';

    const profilElement = document.getElementById('profilMasjid');
    profilElement.textContent = profil;
  } catch (error) {
    console.error('Gagal mengambil profil masjid:', error);
  }
}
