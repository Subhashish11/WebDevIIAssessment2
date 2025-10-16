// event.js
const eventContainer = document.getElementById('event-details');

// Get the event ID from URL query string, e.g., event.html?id=3
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

if (!eventId) {
    eventContainer.innerHTML = "<p>No event selected.</p>";
} else {
    fetch(`http://localhost:3030/api/event/${eventId}`)
        .then(res => {
            if (!res.ok) throw new Error("Event not found");
            return res.json();
        })
        .then(event => {
            const eventEl = document.createElement('div');
            eventEl.classList.add('event-item');
            eventEl.innerHTML = `
                <h2>${event.event_name}</h2>
                <p>${event.event_description}</p>
                <p>Date: ${new Date(event.event_date).toLocaleDateString()}</p>
                <p>Location: ${event.location}</p>
                <p>Category: ${event.category_name}</p>
                <img src="${event.image_url}" alt="${event.event_name}" width="400">
                <button onclick="alert('This feature is currently under construction')">Register</button>
            `;
            eventContainer.appendChild(eventEl);
        })
        .catch(err => {
            console.error("Error fetching event:", err);
            eventContainer.innerHTML = "<p>Failed to load event details.</p>";
        });
}
