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

      // fallback if ticket/goal fields are missing
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
        <p><strong>Purpose:</strong> ${event.purpose || "N/A"}</p>
        <p>${event.event_description}</p>

        <hr>

        <h3>Ticket Information</h3>
        <p><strong>Price:</strong> ${ticketPrice}</p>

        <h3>Goal Progress</h3>
        <div class="progress-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <p>${raised} raised out of ${goal}</p>

        <button onclick="alert('This feature is currently under construction')">Register</button>
      `;

      eventContainer.appendChild(eventEl);
    })
    .catch(err => {
      console.error("Error fetching event:", err);
      eventContainer.innerHTML = "<p>Failed to load event details.</p>";
    });
}
