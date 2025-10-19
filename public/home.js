const track = document.getElementById('events-list');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let scrollAmount = 0;
const scrollStep = 320;

prevBtn.addEventListener('click', () => {
    scrollAmount = Math.max(scrollAmount - scrollStep, 0);
    track.style.transform = `translateX(-${scrollAmount}px)`;
});

nextBtn.addEventListener('click', () => {
    scrollAmount = Math.min(scrollAmount + scrollStep, track.scrollWidth - track.offsetWidth);
    track.style.transform = `translateX(-${scrollAmount}px)`;
});

// Fetch upcoming events from API and generate cards
async function loadUpcomingEvents() {
    try {
        const response = await fetch("/api/event/upcoming");
        if (!response.ok) throw new Error("Network response was not ok");

        const events = await response.json();
        track.innerHTML = ""; // clear previous content

        if (events.length === 0) {
            track.innerHTML = "<p>No upcoming events.</p>";
            return;
        }

        events.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <img src="${event.image_url}" alt="${event.event_name}">
                <div class="event-info">
                    <h3>${event.event_name}</h3>
                    <p>${event.event_description}</p>
                    <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <a href="event.html?id=${event.event_id}" style="color:white;">View Details</a>
                </div>
            `;
            track.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading events:", error);
        track.innerHTML = "<p>Failed to load events.</p>";
    }
}

// Run on page load
window.addEventListener("DOMContentLoaded", loadUpcomingEvents);
