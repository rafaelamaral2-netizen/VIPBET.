const filters = document.querySelectorAll(".filter");
const matches = document.querySelectorAll(".match-card");
const matchCount = document.getElementById("matchCount");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const selectedFilter = filter.dataset.filter;

        let visibleMatches = 0;

        matches.forEach(match => {

            const categories = match.dataset.category.split(" ");

            if (
                selectedFilter === "all" ||
                categories.includes(selectedFilter)
            ) {
                match.classList.remove("hidden");
                visibleMatches++;
            } else {
                match.classList.add("hidden");
            }

        });

        matchCount.textContent =
            `${visibleMatches} ${visibleMatches === 1 ? "partido" : "partidos"}`;

    });

});

const detailButtons = document.querySelectorAll(".details");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "El análisis completo será integrado en la próxima versión de VIPBET YUCA."
        );

    });

});
