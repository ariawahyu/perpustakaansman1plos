# Perpustakaan Digital SMAN 1 Plosoklaten

## Deskripsi Singkat
Perpustakaan Digital SMAN 1 Plosoklaten adalah sistem perpustakaan online yang dikembangkan untuk memfasilitasi akses buku digital bagi siswa, guru, dan admin SMAN 1 Plosoklaten. Sistem ini dirancang untuk meningkatkan efisiensi pembelajaran dengan menyediakan koleksi buku digital yang dapat diakses kapan saja dan di mana saja.

### Fitur Utama
- **Login Multi-User**: Sistem login untuk siswa, guru, dan admin dengan hak akses berbeda.
- **Browsing Buku**: Tampilan grid buku dengan informasi judul, penulis, dan sinopsis.
- **Pembaca Buku**: Integrasi dengan FlipHTML untuk membaca buku secara online.
- **Riwayat Baca**: Pelacakan aktivitas membaca siswa (khusus siswa).
- **Panel Admin**: Kelola buku, kelola akun siswa, dan lihat statistik aktivitas.
- **Panel Guru**: Akses baca buku dan lihat riwayat baca siswa (tanpa hak edit).
- **Pinjam Buku**: Fitur untuk meminjam buku fisik dari perpustakaan (terintegrasi dengan spreadsheet untuk menyimpan data peminjaman).
- **Pengumpulan Jumat Literasi**: Setelah membaca buku, siswa dapat mengisi absen dan ringkasan cerita (data yang diisi akan masuk ke spreadsheet).


## Cara Menjalankan/Mengakses Karya

### (GitHub Pages)
Jika sudah di-upload ke GitHub, akses melalui GitHub Pages:
1. Buka URL GitHub Pages repository (misalnya: https://username.github.io/perpustakaan-sman1-plosoklaten).
2. Login menggunakan kredensial berikut:
   - **Admin**: Username: admin, Password: admin123
   - **Guru**: Username: guru, Password: guru123
   - **Siswa**: Daftar akun baru melalui admin (admin dapat menambah akun siswa di panel admin)@

### Menjalankan Secara Lokal di VSCode
Jika ingin menjalankan dan menguji proyek secara lokal setelah mendownload dari GitHub:
1. Clone atau download repository ke komputer Anda.
2. Buka VSCode dan buka folder proyek (perpustakaan).
3. Pastikan Anda memiliki extension "Live Server" di VSCode (cari di marketplace jika belum ada).
4. Klik kanan pada file `index.html` dan pilih "Open with Live Server" untuk menjalankan server lokal.
5. Browser akan terbuka otomatis di `http://localhost:5500` (atau port lain yang tersedia).
6. Login menggunakan kredensial yang sama seperti di atas untuk menguji fitur.

## Teknologi yang Digunakan
- **HTML5**: Struktur dasar halaman web dan markup semantik.
- **CSS3**: Styling modern dengan Flexbox, Grid, dan animasi untuk UI yang menarik.
- **JavaScript (ES6+)**: Logika aplikasi, event handling, dan manipulasi DOM.
- **Font Awesome 6.0.0**: Library ikon untuk elemen UI seperti navbar dan tombol.
- **Local Storage**: Penyimpanan data sederhana untuk demo (buku, akun, riwayat).
- **FlipHTML**: Integrasi eksternal untuk viewer buku digital.

## Struktur Proyek
```
perpustakaan/
├── index.html              # Halaman utama
├── books.html              # Halaman daftar buku
├── read-options.html       # Halaman opsi baca buku
├── styles.css              # Styling CSS
├── script.js               # Logika JavaScript
├── logo.png                # Logo sekolah
├── sekolah.jpeg            # Gambar latar belakang sekolah
├── fotosekolah.jpeg        # Gambar sekolah tambahan
├── penjelasan_website.txt  # Penjelasan website
├── spreadsheet/            # Folder spreadsheet (jika ada)
└── README.md               # Dokumentasi ini
```

## Kontribusi
Untuk berkontribusi, silakan fork repository ini dan buat pull request dengan perubahan yang diusulkan

sekian terimakasih
