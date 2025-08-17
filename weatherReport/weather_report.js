function showweatherDetails(event) {
      event.preventDefault();
}

 const city = document.getElementById('city').value;
      const apiKey = '7896a8a3f803d8539bad7b3b6f40a766'; // Replace 'YOUR_API_KEY' with your actual API key
      const apiUrl = `https:api.openweathermap.org/data/2.5/weather?lat={13.067439}&lon={80.237617}&appid={7896a8a3f803d8539bad7b3b6f40a766}`;

       fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                const weatherInfo = document.getElementById('weatherInfo');
                weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                        <p>Temperature: ${data.main.temp} &#8451;</p>
                                        <p>Weather: ${data.weather[0].description}</p>`;
              })

               document.getElementById('weatherForm').addEventListener('submit',showweatherDetails );

