//Get event id from url
const urlParams=new URLSearchParams(window.location.search);
const eventId=urlParams.get("event_id");

const eventTitle=document.getElementById("event-title");
const ticketCountEl=document.getElementById("ticket-count");
const form=document.getElementById("registration-form");
const confirmationEl=document.getElementById("confirmation");

let tickets=1; //setting default ticket number

//Fetch event details
fetch(`http://localhost:3030/api/event/${eventId}`)
.then(res=>res.json())
.then(event=>{
eventTitle.textContent=`Register for ${event.event_name}`;
})
.catch(err=>{
console.error("Error fetching events:",err);
eventTitle.textContent="event not found";
});

//ticket plus/minus button
document.getElementById("plus-btn").addEventListener("click",()=>{
tickets++;
ticketCountEl.textContent=tickets;
});

document.getElementById("minus-btn").addEventListener("click",()=>{
if(tickets>1){
tickets--;
ticketCountEl.textContent=tickets;

}
});

//Handle form submission
form.addEventListener("submit",(e)=>{
e.preventDefault();

const user_name=document.getElementById("user_name").value.trim();
const contact_email=document.getElementById("contact_email").value.trim();
if(!user_name||!contact_email){
alert("Please fill in all fields to continue!!");
return;
}

const data={event_id:eventId,user_name,contact_email,tickets};

//Setting POST method for registration
fetch(`http://localhost:3030/api/registrations`, {
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})
.then(res=>{
if(!res.ok)throw new Error("Failed to register");
return res.json();
})
.then(resData=>{
confirmationEl.textContent="Registration is sucessfull!!";
form.reset();
tickets=1;
ticketCountEl.textContent=tickets;
})
.catch(err=>{
console.error(err);
alert("Error in submitting the registration form. PLease try again.");
});
});


