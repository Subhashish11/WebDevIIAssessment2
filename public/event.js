const eventContainer = document.getElementById('event-details');

// Get the event ID from URL query string
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
      eventEl.classList.add('event-item', 'event-details'); // centered, styled container

      // fallback values
      const ticketPrice = event.ticket_price ? `$${event.ticket_price}` : "Free";
      const goal = event.goal_amount || 0;
      const raised = event.raised_amount || 0;
      const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

      eventEl.innerHTML = `
        <h2>${event.event_name}</h2>
        <img src="${event.image_url}" alt="${event.event_name}" width="400">
        <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category_name}</p>
        <p>${event.event_description}</p>

        <hr>

        <p><strong>Ticket Price:</strong> ${ticketPrice}</p>
        <p><strong>Goal Progress:</strong> ${raised} raised out of ${goal} (${progress.toFixed(0)}%)</p>

        <button onclick="alert('This feature is currently under construction')">Register</button>
      `;

      eventContainer.appendChild(eventEl);
    })
    .catch(err => {
      console.error("Error fetching event:", err);
      eventContainer.innerHTML = "<p>Failed to load event details.</p>";
    });
}
