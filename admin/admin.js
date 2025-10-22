
const eventsTableBody = document.querySelector("#events-table tbody");
const eventForm = document.getElementById("event-form");
const formTitle = document.getElementById("form-title");
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");

let editEventId = null;

// Fetch to display events
async function fetchEvents() {
  try {
    const res = await fetch("http://localhost:3030/api/event/upcoming");
    const events = await res.json();

    eventsTableBody.innerHTML = "";

    events.forEach(event => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${event.event_id}</td>
        <td>${event.event_name}</td>
        <td>${event.event_date}</td>
        <td>${event.location}</td>
        <td>${event.category_name}</td>
        <td>
          <button class="edit-btn" data-id="${event.event_id}">Edit</button>
          <button class="delete-btn" data-id="${event.event_id}">Delete</button>
        </td>
      `;
      eventsTableBody.appendChild(row);
    });

    // Attach event listeners
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => startEdit(btn.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteEvent(btn.dataset.id));
    });

  } catch (err) {
    console.error("Error fetching events:", err);
  }
}

// Add event
eventForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    event_name: eventForm.event_name.value,
    event_description: eventForm.event_description.value,
    event_date: eventForm.event_date.value,
    location: eventForm.location.value,
    category_id: eventForm.category_id.value,
    image_url: eventForm.image_url.value
  };

  try {
    let url = "http://localhost:3030/admin/api/event";
    let method = "POST";

    if (editEventId) {
      url += `/${editEventId}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Something went wrong!");
      return;
    }

    alert(result.message || "Operation successful!");
    eventForm.style.display = "none";
    eventForm.reset();
    editEventId = null;
    fetchEvents();

  } catch (err) {
    console.error("Error submitting event:", err);
  }
});

// Delete event function
async function deleteEvent(id) {
  if (!confirm("Are you sure you want to delete this event?")) return;

  try {
    const res = await fetch(`http://localhost:3030/admin/api/event/${id}`, { method: "DELETE" });
    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "Cannot delete event!");
      return;
    }

    alert(result.message || "Event deleted!");
    fetchEvents();

  } catch (err) {
    console.error("Error deleting event:", err);
  }
}

//
async function startEdit(id) {
  editEventId = id;
  formTitle.textContent = "Edit Event";
  eventForm.style.display="block";

  try {
    const res = await fetch(`http://localhost:3030/api/event/${id}`);
    const event = await res.json();

    eventForm.event_name.value = event.event_name;
    eventForm.event_description.value = event.event_description;
    eventForm.event_date.value = event.event_date.split("T")[0];
    eventForm.location.value = event.location;
    eventForm.category_id.value = event.category_id;
    eventForm.image_url.value = event.image_url || "";

    eventForm.style.display = "block";

  } catch (err) {
    console.error("Error fetching event details:", err);
  }
}

// Add button function
addBtn.addEventListener("click", () => {
  editEventId = null;
  formTitle.textContent = "Add New Event";
  eventForm.reset();
  eventForm.style.display = "block";
});

// cancel button function
cancelBtn.addEventListener("click", () => {
  editEventId = null;
  eventForm.reset();
  eventForm.style.display = "none";
  formTitle.textContent=""
});

//initialise
fetchEvents();
