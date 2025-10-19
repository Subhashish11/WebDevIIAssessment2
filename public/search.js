// search.js

const form = document.getElementById("search-form");
const resultsContainer = document.getElementById("search-results");
const clearBtn = document.getElementById("clear-btn");
const categorySelect = document.getElementById("category");

// 1️ Load categories into dropdown
async function loadCategories() {
    try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to load categories");
        const categories = await response.json();

        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.category_id;   // use ID as value
            option.textContent = cat.category_name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

// Call it on page load
loadCategories();

//  Helper function to render events
function renderEvents(events) {
    if (!events || events.length === 0) {
        resultsContainer.innerHTML = "<p>No events found.</p>";
        return;
    }

    resultsContainer.innerHTML = events.map(event => `
        <div class="event-item">
            <h3>${event.event_name}</h3>
            <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Category:</strong> ${event.category_name}</p>
            <p>${event.event_description}</p>
            <a href="event.html?id=${event.event_id}">View Details</a>
        </div>
    `).join("");
}

//Search form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const location = document.getElementById("location").value;
    const category = categorySelect.value;

    // Build query string
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (location) params.append("location", location);
    if (category) params.append("category", category);

    try {
        const response = await fetch(`/api/event/search?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        renderEvents(data);
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = "<p>Error loading events.</p>";
    }
});

//CLear list button
clearBtn.addEventListener("click", () => {
    form.reset();
    resultsContainer.innerHTML = "";
});
