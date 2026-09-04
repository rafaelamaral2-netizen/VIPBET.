// ============================================
// VIPBET YUCA
// V2 — Navigation & UI Engine
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // ELEMENTOS PRINCIPALES
    // -----------------------------

    const navItems = document.querySelectorAll("[data-page]");
    const pages = document.querySelectorAll(".page");

    const sidebar = document.querySelector(".sidebar");
    const menuButton = document.querySelector(".menu-button");

    const filterButtons = document.querySelectorAll("[data-filter]");
    const matchCards = document.querySelectorAll("[data-match]");

    const modal = document.querySelector(".match-modal");
    const modalClose = document.querySelector(".modal-close");

    // -----------------------------
    // NAVEGACIÓN
    // -----------------------------

    function showPage(pageName) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const selectedPage = document.querySelector(
            `[data-page-content="${pageName}"]`
        );

        if (selectedPage) {
            selectedPage.classList.add("active");
        }

        navItems.forEach(item => {

            if (item.dataset.page === pageName) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }

        });

        // Cerrar menú móvil después de navegar
        if (sidebar) {
            sidebar.classList.remove("open");
        }

        // Regresar arriba
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const pageName = item.dataset.page;

            showPage(pageName);

        });

    });


    // -----------------------------
    // MENÚ MOBILE
    // -----------------------------

    if (menuButton && sidebar) {

        menuButton.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    // -----------------------------
    // FILTROS DE PARTIDOS
    // -----------------------------

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            let visibleMatches = 0;

            matchCards.forEach(match => {

                const categories =
                    match.dataset.match.split(" ");

                if (
                    filter === "all" ||
                    categories.includes(filter)
                ) {

                    match.classList.remove("hidden");

                    visibleMatches++;

                } else {

                    match.classList.add("hidden");

                }

            });

            updateMatchCounter(visibleMatches);

        });

    });


    // -----------------------------
    // CONTADOR DE PARTIDOS
    // -----------------------------

    function updateMatchCounter(number) {

        const counter =
            document.querySelector(".match-counter");

        if (!counter) return;

        counter.textContent =
            `${number} ${number === 1 ? "partido" : "partidos"}`;

    }


    // -----------------------------
    // ABRIR ANÁLISIS DE PARTIDO
    // -----------------------------

    const analysisButtons =
        document.querySelectorAll("[data-open-analysis]");

    analysisButtons.forEach(button => {

        button.addEventListener("click", () => {

            const matchId =
                button.dataset.openAnalysis;

            openMatchAnalysis(matchId);

        });

    });


    function openMatchAnalysis(matchId) {

        if (!modal) return;

        const match =
            document.querySelector(
                `[data-match-id="${matchId}"]`
            );

        if (!match) return;

        // Copiar información del partido
        const modalTitle =
            modal.querySelector(".modal-title");

        const modalSubtitle =
            modal.querySelector(".modal-subtitle");

        if (modalTitle) {
            modalTitle.textContent =
                match.dataset.title || "Análisis VIPBET";
        }

        if (modalSubtitle) {
            modalSubtitle.textContent =
                match.dataset.subtitle || "";
        }

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    // -----------------------------
    // CERRAR MODAL
    // -----------------------------

    if (modalClose) {

        modalClose.addEventListener("click", closeModal);

    }


    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal();
            }

        });

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    // -----------------------------
    // ESC PARA CERRAR MODAL
    // -----------------------------

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeModal();

        }

    });


    // -----------------------------
    // BOTONES DE MERCADOS
    // -----------------------------

    const marketButtons =
        document.querySelectorAll("[data-market]");

    marketButtons.forEach(button => {

        button.addEventListener("click", () => {

            marketButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const market =
                button.dataset.market;

            updateSelectedMarket(market);

        });

    });


    function updateSelectedMarket(market) {

        const marketLabel =
            document.querySelector(".selected-market");

        if (!marketLabel) return;

        const names = {
            "1x2": "1X2",
            "ou25": "Over / Under 2.5",
            "btts": "Ambos marcan",
            "double": "Doble oportunidad",
            "draw-no-bet": "Draw No Bet"
        };

        marketLabel.textContent =
            names[market] || market;

    }


    // -----------------------------
    // SIMULACIÓN DE CARGA
    // -----------------------------

    const loadingElements =
        document.querySelectorAll("[data-loading]");

    loadingElements.forEach(element => {

        setTimeout(() => {

            element.classList.add("loaded");

        }, 400);

    });


    // -----------------------------
    // RELOJ DE ACTUALIZACIÓN
    // -----------------------------

    function updateLastUpdate() {

        const updateElement =
            document.querySelector(".last-update");

        if (!updateElement) return;

        const now = new Date();

        updateElement.textContent =
            `Actualizado ${now.toLocaleTimeString(
                "es-PR",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )}`;

    }

    updateLastUpdate();


    // -----------------------------
    // INICIO
    // -----------------------------

    showPage("dashboard");

});
