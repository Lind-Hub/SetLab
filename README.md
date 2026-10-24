SETLAB — KALKULATOR OPERASI HIMPUNAN

IDENTITAS KELOMPOK

Nama Kelompok : InnoLab

DAFTAR ANGGOTA

1   Lindung Amirullah                        26312062                                                                                                                                                      
2   Marria Ulvatur Rabaniyah                 26312036                                                                                                                                                      
3   Munadhil Isman Rafie                     26312051                                                                                                                                                      
4   ANSORI                                   26312022                                                                                                                                                      

1. NAMA APLIKASI
--------------------------------------------------------------------------------
SetLab — Kalkulator Operasi Himpunan

2. DESKRIPSI APLIKASI
--------------------------------------------------------------------------------
SetLab adalah aplikasi web interaktif berbasis Single-Page Application (SPA)
yang dirancang sebagai media pembelajaran dan alat bantu komputasi materi
operasi himpunan dalam mata kuliah Matematika Diskrit.

Aplikasi ini menerima input himpunan dari pengguna, memproses komputasi
matematika, menampilkan kardinalitas hasil, memberikan penjelasan langkah
perhitungan, serta mengilustrasikan hasil secara visual melalui Diagram Venn
interaktif.

3. TUJUAN APLIKASI
--------------------------------------------------------------------------------
- Membantu pengguna menghitung hasil operasi himpunan secara akurat dan cepat.
- Membantu pemahaman konsep abstrak Matematika Diskrit melalui penjelasan
  langkah demi langkah.
- Menyediakan visualisasi daerah himpunan menggunakan Diagram Venn berbasis
  SVG yang dinamis.
- Mengurangi potensi kesalahan komputasi manual, seperti duplikasi elemen
  atau pelanggaran syarat semesta pada operasi komplemen.

4. FITUR UTAMA
--------------------------------------------------------------------------------
- Input Himpunan A dan B: Menerima elemen berupa angka maupun teks.
- Input Himpunan Semesta (U): Digunakan sebagai landasan komputasi komplemen.
- Operasi Gabungan (A ∪ B): Menghitung seluruh elemen unik dari A dan B.
- Operasi Irisan (A ∩ B): Menghitung elemen yang terdapat pada A dan B.
- Operasi Selisih (A − B): Menghitung elemen yang ada di A tetapi tidak di B.
- Operasi Selisih (B − A): Menghitung elemen yang ada di B tetapi tidak di A.
- Operasi Komplemen (Aᶜ): Menghitung elemen U yang tidak ada di A.
- Operasi Komplemen (Bᶜ): Menghitung elemen U yang tidak ada di B.
- Hasil dan Kardinalitas: Menampilkan notasi himpunan hasil dan jumlah
  anggotanya, yaitu |Hasil|.
- Penjelasan Langkah Perhitungan: Menjabarkan proses terbentuknya hasil.
- Visualisasi Diagram Venn: Menyorot daerah hasil operasi pada diagram
  dua lingkaran berbasis SVG.
- Pembersihan dan Eliminasi Duplikat: Menghapus spasi berlebih dan anggota
  yang sama secara otomatis.
- Validasi Matematika: Memeriksa syarat himpunan semesta sebelum menghitung
  operasi komplemen.
- Kontrol Pembantu: Menyediakan tombol "Hitung Hasil", "Isi Contoh Data",
  dan "Reset".

5. KONSEP MATEMATIKA DISKRIT
--------------------------------------------------------------------------------
- Himpunan (Set):
  Kumpulan objek yang terdefinisi secara jelas. Setiap elemen hanya dihitung
  satu kali meskipun dimasukkan berulang kali.

- Kardinalitas (|S|):
  Banyaknya anggota unik dalam suatu himpunan.

- Himpunan Kosong (∅):
  Himpunan yang tidak memiliki anggota, dengan kardinalitas |∅| = 0.

- Himpunan Semesta (U):
  Himpunan yang memuat seluruh objek yang menjadi pembahasan.

- Gabungan (Union — A ∪ B):
  A ∪ B = {x | x ∈ A atau x ∈ B}.

- Irisan (Intersection — A ∩ B):
  A ∩ B = {x | x ∈ A dan x ∈ B}.

- Selisih (Difference — A − B):
  A − B = {x | x ∈ A dan x ∉ B}.

- Selisih (Difference — B − A):
  B − A = {x | x ∈ B dan x ∉ A}.

- Komplemen A (Complement — Aᶜ):
  Aᶜ = U − A = {x | x ∈ U dan x ∉ A}.
  Syarat: A ⊆ U dan U tidak boleh kosong.

- Komplemen B (Complement — Bᶜ):
  Bᶜ = U − B = {x | x ∈ U dan x ∉ B}.
  Syarat: B ⊆ U dan U tidak boleh kosong.

6. PETUNJUK PENGGUNAAN
--------------------------------------------------------------------------------
1. Buka file index.html menggunakan web browser.
2. Masukkan anggota Himpunan A pada kolom "Himpunan A".
3. Masukkan anggota Himpunan B pada kolom "Himpunan B".
4. Masukkan anggota Himpunan Semesta U pada kolom "Himpunan Semesta (U)",
   terutama jika ingin menghitung operasi komplemen.
5. Pilih operasi yang diinginkan melalui tombol operasi yang tersedia:
   A ∪ B, A ∩ B, A − B, B − A, Aᶜ, atau Bᶜ.
6. Tekan tombol "Hitung Hasil". Perhitungan juga dapat berjalan otomatis
   ketika input diubah, sesuai mekanisme aplikasi.
7. Amati hasil komputasi, kardinalitas, daerah yang disorot pada Diagram Venn,
   serta penjelasan langkah perhitungan.
8. Gunakan tombol "Isi Contoh Data" untuk memuat data contoh atau tombol
   "Reset" untuk mengosongkan seluruh input.

7. FORMAT INPUT
--------------------------------------------------------------------------------
- Pemisah utama:
  Gunakan koma (,) atau titik koma (;).
  Contoh: 1, 2, 3, 4 atau apel, jeruk, pisang.

- Input berupa frasa:
  Contoh: apel merah, jeruk manis.
  Jika dipisahkan dengan koma atau titik koma, input tersebut dibaca sebagai
  dua elemen berbeda.

- Pemisah alternatif:
  Jika input tidak mengandung koma atau titik koma, sistem menggunakan
  spasi sebagai pemisah elemen.

- Penanganan spasi:
  Spasi pada awal dan akhir setiap elemen dihapus secara otomatis (trim).

- Penanganan duplikasi:
  Elemen yang dimasukkan lebih dari satu kali dieliminasi sehingga hanya
  satu elemen unik yang tersisa.

- Input kosong:
  Jika input berupa string kosong, himpunan diperlakukan sebagai himpunan
  kosong (∅).

8. CONTOH PENGGUNAAN
--------------------------------------------------------------------------------
INPUT DATA UJI

Himpunan A = {1, 2, 3, 4}
Himpunan B = {3, 4, 5, 6}
Himpunan Semesta U = {1, 2, 3, 4, 5, 6, 7, 8}

HASIL KOMPUTASI

1. Gabungan (A ∪ B)
   Hasil        = {1, 2, 3, 4, 5, 6}
   Kardinalitas = |A ∪ B| = 6

2. Irisan (A ∩ B)
   Hasil        = {3, 4}
   Kardinalitas = |A ∩ B| = 2

3. Selisih (A − B)
   Hasil        = {1, 2}
   Kardinalitas = |A − B| = 2

4. Selisih (B − A)
   Hasil        = {5, 6}
   Kardinalitas = |B − A| = 2

5. Komplemen A (Aᶜ)
   Hasil        = {5, 6, 7, 8}
   Kardinalitas = |Aᶜ| = 4

6. Komplemen B (Bᶜ)
   Hasil        = {1, 2, 7, 8}
   Kardinalitas = |Bᶜ| = 4

9. VALIDASI DAN BATASAN
--------------------------------------------------------------------------------
- Validasi Semesta Kosong:
  Jika pengguna memilih operasi Aᶜ atau Bᶜ ketika kolom U kosong, aplikasi
  menolak komputasi dan menampilkan pesan kesalahan.

- Validasi Subset Semesta:
  Jika terdapat elemen A atau B yang tidak terdaftar dalam U, operasi
  komplemen ditolak. Pesan kesalahan merinci elemen yang berada di luar U.

- Independensi Operasi Non-Komplemen:
  Operasi gabungan, irisan, dan selisih dapat dihitung tanpa ketergantungan
  pada Himpunan Semesta U.

- Batasan Visualisasi Diagram Venn:
  Diagram dirancang untuk memvisualisasikan dua himpunan utama, yaitu A dan B,
  beserta semesta U. Aplikasi tidak mendukung komputasi tiga himpunan atau
  lebih secara bersamaan.

10. CARA MENJALANKAN APLIKASI
--------------------------------------------------------------------------------
Aplikasi dapat dijalankan secara lokal tanpa instalasi server atau dependensi
tambahan, sesuai implementasi yang digunakan.

Langkah-langkah:
1. Pastikan file index.html, style.css, dan script.js berada dalam satu folder.
2. Buka file index.html dengan klik dua kali atau melalui menu "Open File"
   pada web browser.
3. Gunakan browser modern seperti Google Chrome, Mozilla Firefox, Microsoft
   Edge, atau Safari.
4. Aplikasi siap digunakan.

STRUKTUR FOLDER

SetLab/
├── index.html
├── style.css
├── script.js
└── README.txt

11. PENUTUP
--------------------------------------------------------------------------------
SetLab hadir sebagai solusi praktis dan interaktif untuk mempelajari konsep
dasar operasi himpunan. Dengan mengintegrasikan perhitungan matematika,
validasi, penjelasan langkah, dan visualisasi Diagram Venn, aplikasi ini
diharapkan menjadi media pembelajaran yang efektif serta hasil proyek yang
dapat dipertanggungjawabkan dalam mata kuliah Matematika Diskrit.

================================================================================
AKHIR README — SETLAB
================================================================================
