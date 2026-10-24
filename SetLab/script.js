document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Elemen DOM References
    // -------------------------------------------------------------------------
    const inputA = document.getElementById('input-a');
    const inputB = document.getElementById('input-b');
    const inputU = document.getElementById('input-u');

    const previewA = document.getElementById('preview-a');
    const previewB = document.getElementById('preview-b');
    const previewU = document.getElementById('preview-u');

    const btnOps = document.querySelectorAll('.btn-op');
    const btnCalculate = document.getElementById('btn-calculate');
    const btnDemo = document.getElementById('btn-demo');
    const btnReset = document.getElementById('btn-reset');

    const errorBox = document.getElementById('error-box');

    const resultOpBadge = document.getElementById('result-op-badge');
    const resultOpTitle = document.getElementById('result-op-title');
    const resultFormula = document.getElementById('result-formula');
    const resultSetValue = document.getElementById('result-set-value');
    const resultCardinality = document.getElementById('result-cardinality');
    const resultStatus = document.getElementById('result-status');

    const explanationContent = document.getElementById('explanation-content');

    // SVG Regions & Text
    const regionU = document.getElementById('region-u');
    const regionOnlyA = document.getElementById('region-only-a');
    const regionOnlyB = document.getElementById('region-only-b');
    const regionInter = document.getElementById('region-inter');

    const textOnlyA = document.getElementById('text-only-a');
    const textInter = document.getElementById('text-inter');
    const textOnlyB = document.getElementById('text-only-b');
    const textOutsideU = document.getElementById('text-outside-u');

    // State Aplikasi
    let currentOperation = 'UNION'; // Default: Gabungan

    // -------------------------------------------------------------------------
    // 2. Utility & Helper Functions (Matematika Diskrit Engine)
    // -------------------------------------------------------------------------

    /**
     * Memecah string input menjadi array elemen himpunan unik.
     * Mengutamakan koma (,) dan titik koma (;) sebagai pemisah utama.
     * Jika tidak ada koma/titik koma, sistem memecah berdasarkan spasi.
     */
    function parseSet(rawInput) {
        if (!rawInput || typeof rawInput !== 'string') return [];
        const s = rawInput.trim();
        if (!s) return [];

        let tokens = [];
        if (s.includes(',') || s.includes(';')) {
            tokens = s.replace(/;/g, ',').split(',');
        } else {
            tokens = s.split(/\s+/);
        }

        const uniqueElements = [];
        const seen = new Set();

        for (let token of tokens) {
            const trimmed = token.trim();
            if (trimmed !== '' && !seen.has(trimmed)) {
                seen.add(trimmed);
                uniqueElements.push(trimmed);
            }
        }
        return uniqueElements;
    }

    /**
     * Format array elemen menjadi string notasi himpunan matematis {a, b, c}
     */
    function formatSet(array) {
        if (!array || array.length === 0) return '∅';
        return `{${array.join(', ')}}`;
    }

    /**
     * Mengecek apakah SubSet ⊆ SuperSet
     */
    function isSubset(subArray, superArray) {
        const superSet = new Set(superArray);
        return subArray.every(item => superSet.has(item));
    }

    // --- OPERASI HIMPUNAN MATEMATIKA --- //

    // Gabungan: A ∪ B = {x | x ∈ A atau x ∈ B}
    function calcUnion(a, b) {
        const result = [...a];
        for (let item of b) {
            if (!a.includes(item)) {
                result.push(item);
            }
        }
        return result;
    }

    // Irisan: A ∩ B = {x | x ∈ A dan x ∈ B}
    function calcIntersection(a, b) {
        const setB = new Set(b);
        return a.filter(x => setB.has(x));
    }

    // Selisih: A - B = {x | x ∈ A dan x ∉ B}
    function calcDifference(a, b) {
        const setB = new Set(b);
        return a.filter(x => !setB.has(x));
    }

    // Komplemen: Aᶜ = U - A = {x | x ∈ U dan x ∉ A}
    function calcComplement(target, u) {
        const setTarget = new Set(target);
        return u.filter(x => !setTarget.has(x));
    }

    // -------------------------------------------------------------------------
    // 3. UI Update & Safe Rendering Logic
    // -------------------------------------------------------------------------

    // Update Teks Pratinjau Himpunan Bersih
    function updatePreviews() {
        const arrayA = parseSet(inputA.value);
        const arrayB = parseSet(inputB.value);
        const arrayU = parseSet(inputU.value);

        previewA.textContent = `A = ${formatSet(arrayA)}`;
        previewB.textContent = `B = ${formatSet(arrayB)}`;
        previewU.textContent = `U = ${formatSet(arrayU)}`;
    }

    // Sembunyikan Pesan Error
    function clearError() {
        errorBox.classList.add('hidden');
        errorBox.textContent = '';
    }

    // Tampilkan Pesan Error
    function showError(message) {
        errorBox.textContent = message;
        errorBox.classList.remove('hidden');
    }

    /**
     * Render Penjelasan Langkah secara Aman Menggunakan DOM API (Bebas XSS / innerHTML)
     */
    function renderExplanationStepsSafely(steps) {
        explanationContent.replaceChildren();

        steps.forEach(step => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'step-item';

            const titleSpan = document.createElement('span');
            titleSpan.className = 'step-title';
            titleSpan.textContent = step.title;

            const detailSpan = document.createElement('span');
            detailSpan.className = 'step-detail';
            detailSpan.textContent = step.detail;

            itemDiv.appendChild(titleSpan);
            itemDiv.appendChild(detailSpan);
            explanationContent.appendChild(itemDiv);
        });
    }

    /**
     * Menampilkan Tampilan Error Validasi (Perhitungan Dibatalkan)
     */
    function renderInvalidState(opSymbol, opTitle, formula) {
        resultOpBadge.textContent = opSymbol;
        resultOpTitle.textContent = opTitle;
        resultFormula.textContent = formula;
        resultSetValue.textContent = '—';
        resultCardinality.textContent = '—';
        resultStatus.textContent = 'Operasi Tidak Valid (Syarat Tidak Terpenuhi)';

        renderVennInvalid();
        renderExplanationStepsSafely([
            {
                title: 'Status Validasi:',
                detail: 'Perhitungan dibatalkan karena syarat operasi komplemen tidak terdefinisi pada data input.'
            }
        ]);
    }

    /**
     * Reset Diagram Venn ke Status Netral saat Error
     */
    function renderVennInvalid() {
        regionU.classList.remove('active');
        regionOnlyA.classList.remove('active');
        regionOnlyB.classList.remove('active');
        regionInter.classList.remove('active');

        textOnlyA.textContent = '';
        textInter.textContent = '';
        textOnlyB.textContent = '';
        textOutsideU.textContent = '';
    }

    // Fungsi Utama Kalkulasi & Render Tampilan
    function calculateAndRender() {
        clearError();

        const arrayA = parseSet(inputA.value);
        const arrayB = parseSet(inputB.value);
        const arrayU = parseSet(inputU.value);

        let result = [];
        let opTitleText = '';
        let opSymbolText = '';
        let formulaText = '';
        let stepList = [];

        // Data Daerah Diagram Venn
        const onlyA = calcDifference(arrayA, arrayB);
        const inter = calcIntersection(arrayA, arrayB);
        const onlyB = calcDifference(arrayB, arrayA);
        const unionAB = calcUnion(arrayA, arrayB);
        const outsideU = calcDifference(arrayU, unionAB);

        // Validasi & Perhitungan Berdasarkan Operasi Aktif
        switch (currentOperation) {
            case 'UNION':
                opSymbolText = 'A ∪ B';
                opTitleText = 'Gabungan Himpunan A dan B';
                formulaText = 'A ∪ B = {x | x ∈ A atau x ∈ B}';
                result = unionAB;

                stepList = [
                    { title: 'Langkah 1: Identifikasi Anggota', detail: `A = ${formatSet(arrayA)}, B = ${formatSet(arrayB)}` },
                    { title: 'Langkah 2: Ambil Semua Elemen Unik', detail: `Gabungkan seluruh anggota A dan B tanpa duplikasi.` },
                    { title: 'Langkah 3: Perolehan Hasil', detail: `A ∪ B = ${formatSet(result)}` }
                ];
                break;

            case 'INTERSECTION':
                opSymbolText = 'A ∩ B';
                opTitleText = 'Irisan Himpunan A dan B';
                formulaText = 'A ∩ B = {x | x ∈ A dan x ∈ B}';
                result = inter;

                stepList = [
                    { title: 'Langkah 1: Identifikasi Anggota', detail: `A = ${formatSet(arrayA)}, B = ${formatSet(arrayB)}` },
                    { title: 'Langkah 2: Cari Anggota Persekutuan', detail: `Pilih elemen yang ada di A sekaligus ada di B.` },
                    { title: 'Langkah 3: Perolehan Hasil', detail: `A ∩ B = ${formatSet(result)}` }
                ];
                break;

            case 'DIFF_A_B':
                opSymbolText = 'A − B';
                opTitleText = 'Selisih Himpunan A terhadap B';
                formulaText = 'A − B = {x | x ∈ A dan x ∉ B}';
                result = onlyA;

                stepList = [
                    { title: 'Langkah 1: Identifikasi Anggota', detail: `A = ${formatSet(arrayA)}, B = ${formatSet(arrayB)}` },
                    { title: 'Langkah 2: Eliminasi Elemen B', detail: `Keluarkan semua anggota B yang muncul di A.` },
                    { title: 'Langkah 3: Perolehan Hasil', detail: `A − B = ${formatSet(result)}` }
                ];
                break;

            case 'DIFF_B_A':
                opSymbolText = 'B − A';
                opTitleText = 'Selisih Himpunan B terhadap A';
                formulaText = 'B − A = {x | x ∈ B dan x ∉ A}';
                result = onlyB;

                stepList = [
                    { title: 'Langkah 1: Identifikasi Anggota', detail: `B = ${formatSet(arrayB)}, A = ${formatSet(arrayA)}` },
                    { title: 'Langkah 2: Eliminasi Elemen A', detail: `Keluarkan semua anggota A yang muncul di B.` },
                    { title: 'Langkah 3: Perolehan Hasil', detail: `B − A = ${formatSet(result)}` }
                ];
                break;

            case 'COMP_A':
                opSymbolText = 'Aᶜ';
                opTitleText = 'Komplemen Himpunan A (U − A)';
                formulaText = 'Aᶜ = {x | x ∈ U dan x ∉ A}';

                // VALIDASI KETAT KOMPLEMEN A
                if (arrayU.length === 0) {
                    showError('Kesalahan Komplemen: Himpunan Semesta (U) tidak boleh kosong untuk operasi komplemen. Masukkan anggota U terlebih dahulu.');
                    renderInvalidState(opSymbolText, opTitleText, formulaText);
                    return;
                }
                if (!isSubset(arrayA, arrayU)) {
                    const invalidElements = arrayA.filter(x => !arrayU.includes(x));
                    showError(`Kesalahan Validasi Komplemen: Semua anggota A harus terdapat dalam Semesta U (A ⊆ U). Elemen berikut ada di A tetapi tidak ada di U: {${invalidElements.join(', ')}}. Tambahkan elemen tersebut ke U atau hapus dari A.`);
                    renderInvalidState(opSymbolText, opTitleText, formulaText);
                    return;
                }

                result = calcComplement(arrayA, arrayU);
                stepList = [
                    { title: 'Langkah 1: Verifikasi Syarat Komplemen', detail: `A ⊆ U terpenuhi. A = ${formatSet(arrayA)}, U = ${formatSet(arrayU)}` },
                    { title: 'Langkah 2: Cari Elemen Semesta Diluar A', detail: `Ambil seluruh anggota U yang tidak ada di dalam A.` },
                    { title: 'Langkah 3: Perolehan Hasil', detail: `Aᶜ = ${formatSet(result)}` }
                ];
                break;

            case 'COMP_B':
                opSymbolText = 'Bᶜ';
                opTitleText = 'Komplemen Himpunan B (U − B)';
                formulaText = 'Bᶜ = {x | x ∈ U dan x ∉ B}';

                // VALIDASI KETAT KOMPLEMEN B
                if (arrayU.length === 0) {
                    showError('Kesalahan Komplemen: Himpunan Semesta (U) tidak boleh kosong untuk operasi komplemen. Masukkan anggota U terlebih dahulu.');
                    renderInvalidState(opSymbolText, opTitleText, formulaText);
                    return;
                }
                if (!isSubset(arrayB, arrayU)) {
                    const invalidElements = arrayB.filter(x => !arrayU.includes(x));
                    showError(`Kesalahan Validasi Komplemen: Semua anggota B harus terdapat dalam Semesta U (B ⊆ U). Elemen berikut ada di B tetapi tidak ada di U: {${invalidElements.join(', ')}}. Tambahkan elemen tersebut ke U atau hapus dari B.`);
                    renderInvalidState(opSymbolText, opTitleText, formulaText);
                    return;
                }

                result = calcComplement(arrayB, arrayU);
                stepList = [
                    { title: 'Langkah 1: Verifikasi Syarat Komplemen', detail: `B ⊆ U terpenuhi. B = ${formatSet(arrayB)}, U = ${formatSet(arrayU)}` },
                    { title: 'Langkah 2: Cari Elemen Semesta Diluar B', detail: `Ambil seluruh anggota U yang tidak ada di dalam B.` },
                    { title: 'Langkah 3: Perolehan Hasil', detail: `Bᶜ = ${formatSet(result)}` }
                ];
                break;
        }

        // --- Render UI Hasil Perhitungan Valid ---
        resultOpBadge.textContent = opSymbolText;
        resultOpTitle.textContent = opTitleText;
        resultFormula.textContent = formulaText;
        resultSetValue.textContent = formatSet(result);
        resultCardinality.textContent = `|${opSymbolText}| = ${result.length}`;
        resultStatus.textContent = result.length === 0 ? 'Himpunan Kosong (∅)' : 'Bukan Himpunan Kosong';

        // Render Penjelasan Langkah Secara Aman
        renderExplanationStepsSafely(stepList);

        // Render Visual Diagram Venn
        renderVenn(currentOperation, onlyA, inter, onlyB, outsideU);
    }

    /**
     * Render dan Mewarnai Daerah SVG Diagram Venn secara Dinamis & Presisi
     */
    function renderVenn(op, onlyA, inter, onlyB, outsideU) {
        // Reset Highlight
        regionU.classList.remove('active');
        regionOnlyA.classList.remove('active');
        regionOnlyB.classList.remove('active');
        regionInter.classList.remove('active');

        // Terapkan Highlight sesuai Operasi
        switch (op) {
            case 'UNION':
                regionOnlyA.classList.add('active');
                regionInter.classList.add('active');
                regionOnlyB.classList.add('active');
                break;
            case 'INTERSECTION':
                regionInter.classList.add('active');
                break;
            case 'DIFF_A_B':
                regionOnlyA.classList.add('active');
                break;
            case 'DIFF_B_A':
                regionOnlyB.classList.add('active');
                break;
            case 'COMP_A':
                // A^c = U - A (Daerah di luar A: regionU dan B-A)
                regionU.classList.add('active');
                regionOnlyB.classList.add('active');
                break;
            case 'COMP_B':
                // B^c = U - B (Daerah di luar B: regionU dan A-B)
                regionU.classList.add('active');
                regionOnlyA.classList.add('active');
                break;
        }

        // Tampilkan Teks Anggota di dalam Daerah Diagram Venn
        textOnlyA.textContent = truncateText(onlyA.join(', '), 14);
        textInter.textContent = truncateText(inter.join(', '), 10);
        textOnlyB.textContent = truncateText(onlyB.join(', '), 14);
        
        if (outsideU.length > 0) {
            textOutsideU.textContent = `Elemen U di luar A&B: ${truncateText(outsideU.join(', '), 25)}`;
        } else {
            textOutsideU.textContent = '';
        }
    }

    // Utility Pembatas Panjang Teks pada SVG
    function truncateText(str, maxLength) {
        if (!str) return '';
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength - 3) + '...';
    }

    // -------------------------------------------------------------------------
    // 4. Event Listeners & Handler
    // -------------------------------------------------------------------------

    // Real-time Update saat Pengguna Mengisi Input
    [inputA, inputB, inputU].forEach(inputEl => {
        inputEl.addEventListener('input', () => {
            updatePreviews();
            calculateAndRender();
        });
    });

    // Pilihan Operasi Keypad
    btnOps.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btnOps.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-checked', 'false');
            });

            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');
            targetBtn.setAttribute('aria-checked', 'true');

            currentOperation = targetBtn.dataset.op;
            calculateAndRender();
        });
    });

    // Tombol Hitung
    btnCalculate.addEventListener('click', () => {
        calculateAndRender();
    });

    // Tombol Isi Contoh Data
    btnDemo.addEventListener('click', () => {
        inputA.value = '1, 2, 3, 4';
        inputB.value = '3, 4, 5, 6';
        inputU.value = '1, 2, 3, 4, 5, 6, 7, 8';

        updatePreviews();
        calculateAndRender();
    });

    // Tombol Reset Data
    btnReset.addEventListener('click', () => {
        inputA.value = '';
        inputB.value = '';
        inputU.value = '';

        updatePreviews();
        calculateAndRender();
    });

    // Inisialisasi Tampilan Awal saat Aplikasi Pertama Dibuka
    updatePreviews();
    calculateAndRender();
});