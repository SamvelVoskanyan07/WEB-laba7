// --- ЛАБОРАТОРНАЯ РАБОТА №6: Калькулятор стоимости ---
document.addEventListener("DOMContentLoaded", function () {
    const typeRadios = document.querySelectorAll('input[name="productType"]');
    const optionsContainer = document.getElementById("options-container");
    const productSelect = document.getElementById("product-select");
    const propertyContainer = document.getElementById("property-container");
    const productProperty = document.getElementById("product-property");
    const productQuantity = document.getElementById("product-quantity");
    const calcResult = document.getElementById("calc-result");
    const calcError = document.getElementById("calc-error");

    function calculateTotal() {
        let selectedType = document.querySelector('input[name="productType"]:checked');
        if (!selectedType) return;

        let basePrice = parseFloat(selectedType.value);
        let optionsPrice = 0;
        let propertyPrice = 0;

        // Показываем/скрываем опции или свойства в зависимости от типа
        if (selectedType.id === "type2") {
            optionsContainer.classList.remove("d-none");
            propertyContainer.classList.add("d-none");
            optionsPrice = parseFloat(productSelect.value);
        } else if (selectedType.id === "type3") {
            optionsContainer.classList.add("d-none");
            propertyContainer.classList.remove("d-none");
            if (productProperty.checked) {
                propertyPrice = parseFloat(productProperty.value);
            }
        } else {
            optionsContainer.classList.add("d-none");
            propertyContainer.classList.add("d-none");
        }

        // Проверка количества (только целые положительные числа)
        let qtyVal = productQuantity.value.trim();
        let quantity = parseInt(qtyVal, 10);

        if (qtyVal === "" || isNaN(quantity) || quantity <= 0 || !/^\d+$/.test(qtyVal)) {
            calcError.style.display = "block";
            calcError.textContent = "Пожалуйста, введите корректное целое положительное число.";
            calcResult.textContent = "Стоимость заказа: —";
            return;
        } else {
            calcError.style.display = "none";
        }

        let total = (basePrice + optionsPrice + propertyPrice) * quantity;
        calcResult.textContent = `Стоимость заказа: ${total} руб.`;
    }

    if (typeRadios.length > 0) {
        typeRadios.forEach(radio => radio.addEventListener("change", calculateTotal));
        if (productSelect) productSelect.addEventListener("change", calculateTotal);
        if (productProperty) productProperty.addEventListener("change", calculateTotal);
        if (productQuantity) productQuantity.addEventListener("input", calculateTotal);
        calculateTotal();
    }

    // --- ЛАБОРАТОРНАЯ РАБОТА №7: Галерея-слайдер ---
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

    const sliderContainer = document.getElementById("slider-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const currentPageSpan = document.getElementById("current-page");
    const totalPagesSpan = document.getElementById("total-pages");

    function renderGallery() {
        if (!sliderContainer) return;
        
        sliderContainer.innerHTML = "";
        const visibleCount = getVisibleCount();
        const totalPages = Math.ceil(images.length / visibleCount);

        if (currentIndex >= totalPages) currentIndex = totalPages - 1;
        if (currentIndex < 0) currentIndex = 0;

        const start = currentIndex * visibleCount;
        const end = Math.min(start + visibleCount, images.length);

        for (let i = start; i < end; i++) {
            const imgElement = document.createElement("img");
            imgElement.src = images[i];
            imgElement.alt = `Фото ${i + 1}`;
            imgElement.className = "img-fluid rounded border";
            imgElement.style.width = visibleCount === 1 ? "100%" : "30%";
            imgElement.style.height = "150px";
            imgElement.style.objectFit = "cover";
            sliderContainer.appendChild(imgElement);
        }

        if (currentPageSpan) currentPageSpan.textContent = currentIndex + 1;
        if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            const visibleCount = getVisibleCount();
            const totalPages = Math.ceil(images.length / visibleCount);
            currentIndex = (currentIndex - 1 + totalPages) % totalPages;
            renderGallery();
        });

        nextBtn.addEventListener("click", () => {
            const visibleCount = getVisibleCount();
            const totalPages = Math.ceil(images.length / visibleCount);
            currentIndex = (currentIndex + 1) % totalPages;
            renderGallery();
        });
    }

    window.addEventListener("resize", renderGallery);
    renderGallery();
});
