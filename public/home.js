// home.js

const eventsList = document.getElementById("events-list");

// Fetch upcoming events from API
async function loadUpcomingEvents() {
  try {
    const response = await fetch("/api/event/upcoming");
    if (!response.ok) throw new Error("Network response was not ok");

    const events = await response.json();

    // Clear existing content
    eventsList.innerHTML = "";

    if (events.length === 0) {
      eventsList.innerHTML = "<p>No upcoming events.</p>";
      return;
    }

    // Loop through events and render
    events.forEach(event => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event-item");

      eventDiv.innerHTML = `
        <h3>${event.event_name}</h3>
        <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category_name}</p>
        <p>${event.event_description}</p>
        <a href="event.html?id=${event.event_id}">View Details</a>
      `;

      eventsList.appendChild(eventDiv);
    });

  } catch (error) {
    console.error("Error loading events:", error);
    eventsList.innerHTML = "<p>Failed to load events.</p>";
  }
}

// Run on page load
window.addEventListener("DOMContentLoaded", loadUpcomingEvents);
