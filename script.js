// --- ЛАБОРАТОРНАЯ РАБОТА №7: Галерея-слайдер ---
document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "images/photo1.jpg",
        "images/photo2.jpg",
        "images/photo3.jpg",
        "images/photo4.jpg",
        "images/photo5.jpg",
        "images/photo6.jpg",
        "images/photo7.jpg",
        "images/photo8.jpg"
    ]; // Замените пути на ваши реальные 8 картинок (или плейсхолдеры)

    let currentIndex = 0;

    // Определяем сколько картинок показывать в зависимости от ширины экрана (ПК: 3, Смартфон: 1)
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

        if (currentIndex >= totalPages) {
            currentIndex = totalPages - 1;
        }
        if (currentIndex < 0) {
            currentIndex = 0;
        }

        // Отрисовка видимых картинок текущей страницы
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

        // Обновление пейджера
        currentPageSpan.textContent = currentIndex + 1;
        totalPagesSpan.textContent = totalPages;
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
