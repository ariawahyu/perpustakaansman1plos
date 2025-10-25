# Perpustakaan Digital SMAN 1 Plosoklaten

**Demo:** https://ariawahyu.github.io/perpustakaansman1plos/

---

## Ringkasan singkat
Perpustakaan Digital SMAN 1 Plosoklaten adalah aplikasi web sederhana untuk mengelola dan membaca koleksi buku digital serta melakukan peminjaman buku fisik. Dirancang sebagai portofolio dan alat bantu pembelajaran untuk siswa, guru, dan admin sekolah — cepat, ringan, dan mudah di-deploy ke GitHub Pages.

> Catatan filosofi singkat: ini bukan hanya 'website perpustakaan'—ini prototipe edukasi. Kalau mau dipakai serius, kita perlu upgrade keamanan dan backendnya. Tapi untuk demo sekolah, ini keren.

---

## Fitur utama
- **Login multi-user** (Siswa / Guru / Admin) dengan hak akses berbeda.
- **Daftar & browsing buku** — tampilan grid lengkap judul, penulis, dan sinopsis.
- **Pembaca online** — integrasi viewer (FlipHTML) untuk membaca buku digital langsung di browser.
- **Riwayat baca** — melacak aktivitas membaca (fitur khusus siswa).
- **Panel Admin** — mengelola akun siswa, dan melihat statistik singkat.
- **Panel Guru** — akses baca dan melihat riwayat baca siswa (tanpa hak edit).
- **Pinjam Buku** — form peminjaman untuk buku fisik (data tersimpan di spreadsheet).
- **Pengumpulan Jumat Literasi** — siswa mengisi absen dan ringkasan setelah membaca (tersimpan ke spreadsheet).

---

## Demo & Akses
- **Tampilan live (GitHub Pages):** https://ariawahyu.github.io/perpustakaansman1plos/

> Jika Anda melihat tampilan dasar: Home, Books, Riwayat Baca, Admin, dan Login — itu normal untuk versi ini. Untuk detail halaman, buka menu "Books" dan "Admin".

---

## Menjalankan secara lokal (pengembangan)
1. Clone repository: `git clone https://github.com/ariawahyu/perpustakaansman1plos.git`
2. Buka folder proyek di VSCode.
3. Pastikan extension **Live Server** terpasang.
4. Klik kanan `index.html` → *Open with Live Server*.
5. Akses `http://127.0.0.1:5500` (atau port Live Server yang muncul).

**Akun demo (gunakan hanya untuk testing):**
- Admin: `admin` / `admin123`  
- Guru: `guru` / `guru123`  
- (Siswa: dibuat oleh admin melalui panel admin)

> **Penting:** Gantilah kredensial demo ini sebelum men-deploy untuk penggunaan nyata. Simpan password lebih kuat, atau pindahkan otentikasi ke backend.

---

## Teknologi
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome (ikon)
- Local Storage (penyimpanan demo)
- Integrasi FlipHTML untuk viewer buku
- Google Sheets / spreadsheet sebagai penyimpanan sementara untuk fitur peminjaman dan pengumpulan literasi

---

## Struktur proyek (inti)
```
perpustakaan/
├── index.html
├── books.html
├── read-options.html
├── styles.css
├── script.js
├── logo.png
├── penjelasan_website.txt
├── spreadsheet/   (integrasi / skrip terkait)
└── README.md
```

---

## Saran peningkatan (prioritas)
1. **Backend & Database** — pindahkan penyimpanan dari Local Storage/Spreadsheet ke server (Node.js + Express + Mongo/Postgres) supaya data aman dan konsisten.
2. **Otentikasi aman** — implementasikan hashing password (bcrypt) dan sesi/login token (JWT atau session server).
3. **Timestamp & logging** — tambahkan cap waktu (timestamp) pada aktivitas (peminjaman, ringkasan literasi, dll.).
4. **Validasi & sanitasi input** — cegah XSS dan injection dari input pengguna.
5. **Responsive & aksesibilitas** — perbaiki ARIA attributes dan breakpoints untuk akses mobile.
6. **Backup & export** — fitur ekspor CSV untuk riwayat dan peminjaman.

---

## Troubleshooting singkat
- Jika Live Server menampilkan halaman kosong: pastikan file `index.html` berada di root project, dan tidak ada console error (buka DevTools → Console).
- Jika integrasi FlipHTML tidak tampil: periksa URL viewer/iframe dan pastikan file PDF/flipbook telah di-publish.
- Jika form tidak mengirim data ke spreadsheet: cek koneksi script (webhooks / form action) dan izin akses spreadsheet.

---

## Kontribusi
1. Fork repository → buat branch fitur (`feature/nama-fitur`).
2. Buat perubahan dan testing lokal.
3. Pull request dengan deskripsi jelas dan screenshot bila perlu.

---

## Lisensi & Kontak
- Lisensi: bebas untuk penggunaan pendidikan. Untuk penggunaan komersial, hubungi pemilik repo.
- Kontak maintainer: `ariawahyu` (GitHub profile)

---

Terima kasih sudah membangun alat belajar ini — ringan, berguna, dan punya ruang besar untuk jadi lebih matang. Kalau mau, saya bantu:
- perbaiki README agar otomatis menampilkan badge (CI / Live demo),
- atau buatkan versi README bahasa Inggris untuk publikasi.

(README ini dibuat berdasarkan isi repo saat ini dan tampilan live demo.)

