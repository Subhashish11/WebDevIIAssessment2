const track = document.getElementById('events-list');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let scrollAmount = 0;
const scrollStep = 320;

prevBtn.addEventListener('click', () => {
  if (index > 0) index--;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  const totalCards = track.children.length;
  const maxIndex = Math.max(0, totalCards - maxVisible);
  if (index < maxIndex) index++;
  updateCarousel();
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
//limiting the upcoming events to 5 for tidyness
         const limitedEvents = events.slice(0, 5);

            limitedEvents.forEach(event => {
              const card = document.createElement("div");
              card.classList.add("event-card");

              card.innerHTML = `
                <img src="${event.image_url}" alt="${event.event_name}">
                <div class="event-info">
                  <h3>${event.event_name}</h3>
                  <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> ${event.location}</p>
                  <a href="event.html?id=${event.event_id}" style="color:#007BFF;">View Details</a>
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
