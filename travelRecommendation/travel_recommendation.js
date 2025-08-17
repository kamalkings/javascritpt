// Handle navigation between pages
const homeSection = document.getElementById('homeSection');
const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    homeSection.classList.add('hidden');
    aboutSection.classList.add('hidden');
    contactSection.classList.add('hidden');
    if(link.textContent === "Home") homeSection.classList.remove('hidden');
    if(link.textContent === "About Us") aboutSection.classList.remove('hidden');
    if(link.textContent === "Contact Us") contactSection.classList.remove('hidden');
  });
});

// Search Recommendations
document.getElementById('searchBtn').addEventListener('click', function(){
  const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
  fetch('travel_recommendation_api.json')
    .then(res => res.json())
    .then(data => {
      let resultsHtml = "";
      let recommendations = [];
      if (['beach','beaches'].includes(keyword)) {
        recommendations = data.beach;
      } else if (keyword === 'temple' || keyword === 'temples') {
        recommendations = data.temple;
      } else if (keyword === 'country' || keyword === 'countries') {
        recommendations = data.country;
      }
      if(recommendations.length > 0){
        recommendations.slice(0,2).forEach(rec => {
          resultsHtml += `<div class="rec-result">
            <img src="${rec.imageUrl}" alt="${rec.name}" height="160"><br>
            <strong>${rec.name}</strong>
            <p>${rec.description}</p>
            ${rec.country ? `<div>Current time in ${rec.country}: <span id="time-${rec.country}"></span></div>` : ''}
          </div>`;
        });
        document.getElementById('results').innerHTML = resultsHtml;

        // Optional: Show time for country recommendations
        recommendations.forEach(rec => {
          if(rec.country && rec.timeZone){
            const timeStr = new Date().toLocaleTimeString('en-US', { timeZone: rec.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
            document.getElementById('time-'+rec.country).textContent = timeStr;
          }
        });
      } else {
        document.getElementById('results').innerHTML = "No recommendations found for that keyword.";
      }
    })
    .catch(err => document.getElementById('results').innerHTML = "Error loading recommendations.");
});

// Clear/Reset button logic
document.getElementById('resetBtn').addEventListener('click', function(){
  document.getElementById('searchInput').value = "";
  document.getElementById('results').innerHTML = "";
});

// Contact Form Submission (example: logs data)
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thank you for reaching out!');
  // You can add code to send the message to your server if needed.
  this.reset();
});
