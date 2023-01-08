// import fetch from 'node-fetch';
// api_key 94ee37769c9b930475ebd17c4a02a487
// full api call
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=94ee37769c9b930475ebd17c4a02a487
// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
//this is the equivalent of window.onload or jQuery's ready function
  let lat, lon;
  // if the geolocation is coming from the browser
  if ("geolocation" in navigator) {
    console.log("geolocation available");
    // This brings in the lat an lon from the browser's geolocation feature
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat, lon, weather, air;
      try {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        document.getElementById("latitude").textContent = lat;
        document.getElementById("longitude").textContent = lon;
        // lat and lon gets sent to to the node server
        // See file index.js line 42 app.get("/weather/:latlon", async (request, response) => {
        const api_url = `weather/${lat},${lon}`;
        // console.log(api_url);
        // this api_url gets kicked back to the node.js file index.js where the actual api call is made
        // All the data that is being used here is coming from the index.js file in which a call to the OpenWeatherMap and OpenAQ are called
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
        weather = json.weather;
        air = json.air_quality.results[0].measurements[0];
        document.getElementById('location').textContent = weather.name;
        document.getElementById('summary').textContent = weather.weather[0].description;
        document.getElementById('temp').textContent = Math.ceil(weather.main.temp);
        // // air quality
        document.getElementById('aq_parameter').textContent = air.parameter;
        document.getElementById('aq_value').textContent = air.value;
        document.getElementById('aq_location').textContent = json.air_quality.results[0].location;
        document.getElementById('aq_units').textContent = air.unit;
        document.getElementById('aq_date').textContent = `last read on ${air.lastUpdated}`;
        // console.log(json);

        // console.log('db_json');
        // console.log(db_json);
      } catch (error) {
        console.log(error);
        console.log("There is no AQ data for this location " + weather.name);
        air = { value: -1 } 
        // document.getElementById('aq_value').textContent = 'There is no air quality data for this location'
      }
      const data = { lat, lon, weather, air };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      // Posting data to the databse that you are gettinf from the apis
      const db_response = await fetch("/api", options);
      const db_json = await db_response.json();
      console.log('db_json');
      console.log(db_json);
    });
  } else {
    console.log("geolocation not available");
  }

