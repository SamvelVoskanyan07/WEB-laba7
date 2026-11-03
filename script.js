document.addEventListener("DOMContentLoaded", function () {
    // --- ЛАБОРАТОРНАЯ №6: Калькулятор ---
    let a = document.querySelectorAll('input[name="productType"]');
    let b = document.getElementById("options-container");
    let c = document.getElementById("product-select");
    let d = document.getElementById("property-container");
    let e = document.getElementById("product-property");
    let f = document.getElementById("product-quantity");
    let g = document.getElementById("calc-result");
    let h = document.getElementById("calc-error");

    function calc() {
        let sel = document.querySelector('input[name="productType"]:checked');
        if (!sel) return;

        let p = parseFloat(sel.value);
        let o = 0;
        let pr = 0;

        if (sel.id === "type2") {
            if (b) b.classList.remove("d-none");
            if (d) d.classList.add("d-none");
            if (c) o = parseFloat(c.value) || 0;
        } else if (sel.id === "type3") {
            if (b) b.classList.add("d-none");
            if (d) d.classList.remove("d-none");
            if (e && e.checked) pr = parseFloat(e.value) || 0;
        } else {
            if (b) b.classList.add("d-none");
            if (d) d.classList.add("d-none");
        }

        let qv = f ? f.value.trim() : "1";
        let q = parseInt(qv, 10);

        if (qv === "" || isNaN(q) || q <= 0 || !/^\d+$/.test(qv)) {
            if (h) {
                h.style.display = "block";
                h.textContent = "Введите число";
            }
            if (g) g.textContent = "Стоимость заказа: —";
            return;
        } else {
            if (h) h.style.display = "none";
        }

        let res = (p + o + pr) * q;
        if (g) g.textContent = `Стоимость заказа: ${res} руб.`;
    }

    if (a.length > 0) {
        a.forEach(r => r.addEventListener("change", calc));
        if (c) c.addEventListener("change", calc);
        if (e) e.addEventListener("change", calc);
        if (f) f.addEventListener("input", calc);
        calc();
    }

    // --- ЛАБОРАТОРНАЯ №7: Плавная карусель (по 3 изображения) ---
    let imgs = [
        "images/photo1.jpg",
        "images/photo2.jpg",
        "images/photo3.jpg",
        "images/photo4.jpg",
        "images/photo5.jpg",
        "images/photo6.jpg",
        "images/photo7.jpg",
        "images/photo8.jpg"
    ];

    let idx = 0;

    function getCount() {
        return window.innerWidth < 768 ? 1 : 3;
    }

    let sBox = document.getElementById("slider-container");
    let pBtn = document.getElementById("prev-btn");
    let nBtn = document.getElementById("next-btn");
    let curP = document.getElementById("current-page");
    let totP = document.getElementById("total-pages");

    if (sBox) {
        sBox.style.display = "flex";
        sBox.style.transition = "transform 0.5s ease-in-out";
        sBox.style.width = "100%";
        
        if (!sBox.parentElement.style.overflow) {
            sBox.parentElement.style.overflow = "hidden";
            sBox.parentElement.style.position = "relative";
        }
    }

    function draw() {
        if (!sBox) return;
        
        let vis = getCount();
        let maxP = Math.ceil(imgs.length / vis);

        if (idx >= maxP) idx = maxP - 1;
        if (idx < 0) idx = 0;

        // Создаем карточки галереи один раз
        if (sBox.children.length !== imgs.length) {
            sBox.innerHTML = "";
            imgs.forEach((src, i) => {
                let el = document.createElement("img");
                el.src = src;
                el.alt = `Фото ${i + 1}`;
                el.className = "img-fluid rounded border flex-shrink-0";
                // Каждое изображение занимает примерно 33.33% от контейнера (минус отступы)
                el.style.width = vis === 1 ? "100%" : "calc(33.333% - 10px)";
                el.style.marginRight = "15px";
                el.style.height = "150px";
                el.style.objectFit = "cover";
                sBox.appendChild(el);
            });
        }

        // Сдвигаем ленту ровно на количество видимых картинок (на страницу)
        let shiftPercentage = idx * 100;
        sBox.style.transform = `translateX(-${shiftPercentage}%)`;

        if (curP) curP.textContent = idx + 1;
        if (totP) totP.textContent = maxP;
    }

    if (pBtn && nBtn) {
        pBtn.addEventListener("click", function () {
            let vis = getCount();
            let maxP = Math.ceil(imgs.length / vis);
            idx = (idx - 1 + maxP) % maxP;
            draw();
        });

        nBtn.addEventListener("click", function () {
            let vis = getCount();
            let maxP = Math.ceil(imgs.length / vis);
            idx = (idx + 1) % maxP;
            draw();
        });
    }

    window.addEventListener("resize", draw);
    draw();
});
