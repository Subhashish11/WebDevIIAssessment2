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
      eventEl.classList.add('event-details');

      // Use defaults if values are missing
      const ticketPrice = event.ticket_price != null ? `$${event.ticket_price}` : "Free";
      const fundCollected = event.fund_collected != null ? `$${event.fund_collected}` : "$0";
      const fundraiserGoal = event.fundraiser_goal != null ? `$${event.fundraiser_goal}` : "$0";
      const organiser = event.organiser_name || "N/A";
      const contact = event.contact || "N/A";

      eventEl.innerHTML = `
        <h2>${event.event_name}</h2>
        <img src="${event.image_url}" alt="${event.event_name}" width="400">
        <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category_name}</p>
        <p><strong>Description:</strong> ${event.event_description}</p>

        <h3>Ticket Information</h3>
        <p><strong>Price:</strong> ${ticketPrice}</p>

        <h3>Fundraiser</h3>
        <p><strong>Collected:</strong> ${fundCollected}</p>
        <p><strong>Goal:</strong> ${fundraiserGoal}</p>

        <h3>Organizer</h3>
        <p>${organiser}</p>
        <p>Contact: ${contact}</p>
<!--previous register button
        <button onclick="alert('This feature is currently under construction')">Register</button>

-->
<button id="register-btn">Register</button>
<ul id="registration-list"></ul>
`;


      eventContainer.appendChild(eventEl);

//updated register button functionality
document.getElementById("register-btn").addEventListener("click",()=>{
window.location.href=`registration.html?event_id=${eventId}`;
});

    })
    .catch(err => {
      console.error("Error fetching event:", err);
      eventContainer.innerHTML = "<p>Failed to load event details.</p>";
    });
}





//fetch event data of registration
fetch(`api/events/${eventId}/registrations`)
.then(res=>res.json())
.then(data=>{
const regContainer=document.getElementById("registration-list");
//sort  by purchase date
data.sort((a,b)=>new Date(b.purchase_date)-new Date(a.purchase_date));
data.forEach(reg=>{
const li=document.createElement("li");
li.textContent=`${reg.user_name}(${reg.contact_email})-${reg.tickets} tickets`;
regContainer.appendChild(li);
});
})
.catch(err=>console.error("registration not found or error was found!!",err));