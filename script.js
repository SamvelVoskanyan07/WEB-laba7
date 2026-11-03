document.addEventListener("DOMContentLoaded", function () {
    // --- КАЛЬКУЛЯТОР (Лабораторная №6) ---
    let typeRadios = document.querySelectorAll('input[name="productType"]');
    let optionsContainer = document.getElementById("options-container");
    let productSelect = document.getElementById("product-select");
    let propertyContainer = document.getElementById("property-container");
    let productProperty = document.getElementById("product-property");
    let productQuantity = document.getElementById("product-quantity");
    let calcResult = document.getElementById("calc-result");
    let calcError = document.getElementById("calc-error");

    function calculate() {
        let selected = document.querySelector('input[name="productType"]:checked');
        if (!selected) return;

        let base = parseFloat(selected.value) || 0;
        let opt = 0;
        let prop = 0;

        if (selected.id === "type2") {
            if (optionsContainer) optionsContainer.classList.remove("d-none");
            if (propertyContainer) propertyContainer.classList.add("d-none");
            if (productSelect) opt = parseFloat(productSelect.value) || 0;
        } else if (selected.id === "type3") {
            if (optionsContainer) optionsContainer.classList.add("d-none");
            if (propertyContainer) propertyContainer.classList.remove("d-none");
            if (productProperty && productProperty.checked) prop = parseFloat(productProperty.value) || 0;
        } else {
            if (optionsContainer) optionsContainer.classList.add("d-none");
            if (propertyContainer) propertyContainer.classList.add("d-none");
        }

        let qVal = productQuantity ? productQuantity.value.trim() : "1";
        let qty = parseInt(qVal, 10);

        if (qVal === "" || isNaN(qty) || qty <= 0 || !/^\d+$/.test(qVal)) {
            if (calcError) {
                calcError.style.display = "block";
                calcError.textContent = "Введите корректное число";
            }
            if (calcResult) calcResult.textContent = "Стоимость заказа: —";
            return;
        } else {
            if (calcError) calcError.style.display = "none";
        }

        let total = (base + opt + prop) * qty;
        if (calcResult) calcResult.textContent = `Стоимость заказа: ${total} руб.`;
    }

    if (typeRadios.length > 0) {
        typeRadios.forEach(r => r.addEventListener("change", calculate));
        if (productSelect) productSelect.addEventListener("change", calculate);
        if (productProperty) productProperty.addEventListener("change", calculate);
        if (productQuantity) productQuantity.addEventListener("input", calculate);
        calculate();
    }

    // --- ПЛАВНАЯ КАРУСЕЛЬ (Лабораторная №7) ---
    const images = [
        "images/photo1.jpg",
        "images/photo2.jpg",
        "images/photo3.jpg",
        "images/photo4.jpg",
        "images/photo5.jpg",
        "images/photo6.jpg",
        "images/photo7.jpg",
        "images/photo8.jpg"
    ];

    let currentIndex = 0;

    function getVisibleCount() {
        return window.innerWidth < 768 ? 1 : 3;
    }

    const sliderBox = document.getElementById("slider-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const curPageSpan = document.getElementById("current-page");
    const totPageSpan = document.getElementById("total-pages");

    if (sliderBox && sliderBox.parentElement) {
        // Жестко задаем стили для безупречной работы карусели
        sliderBox.parentElement.style.overflow = "hidden";
        sliderBox.parentElement.style.position = "relative";
        
        sliderBox.style.display = "flex";
        sliderBox.style.transition = "transform 0.4s ease-in-out";
        sliderBox.style.width = "100%";

        // Создаем картинки один раз
        sliderBox.innerHTML = "";
        images.forEach((src, index) => {
            let img = document.createElement("img");
            img.src = src;
            img.alt = `Фото ${index + 1}`;
            img.className = "rounded border";
            img.style.height = "160px";
            img.style.objectFit = "cover";
            img.style.flexShrink = "0";
            sliderBox.appendChild(img);
        });
    }

    function updateSlider() {
        if (!sliderBox) return;

        let visible = getVisibleCount();
        let totalPages = Math.ceil(images.length / visible);

        if (currentIndex >= totalPages) currentIndex = totalPages - 1;
        if (currentIndex < 0) currentIndex = 0;

        // Вычисляем точную ширину для каждого фото в процентах
        let itemWidthPercent = 100 / visible;
        let imgElements = sliderBox.children;

        for (let i = 0; i < imgElements.length; i++) {
            imgElements[i].style.width = `${itemWidthPercent}%`;
            imgElements[i].style.flexBasis = `${itemWidthPercent}%`;
            imgElements[i].style.boxSizing = "border-box";
            imgElements[i].style.padding = "0 5px";
        }

        // Плавный сдвиг всей ленты влево
        let shift = currentIndex * 100;
        sliderBox.style.transform = `translateX(-${shift}%)`;

        if (curPageSpan) curPageSpan.textContent = currentIndex + 1;
        if (totPageSpan) totPageSpan.textContent = totalPages;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", function () {
            let visible = getVisibleCount();
            let totalPages = Math.ceil(images.length / visible);
            currentIndex = (currentIndex - 1 + totalPages) % totalPages;
            updateSlider();
        });

        nextBtn.addEventListener("click", function () {
            let visible = getVisibleCount();
            let totalPages = Math.ceil(images.length / visible);
            currentIndex = (currentIndex + 1) % totalPages;
            updateSlider();
        });
    }

    window.addEventListener("resize", updateSlider);
    updateSlider();
});
