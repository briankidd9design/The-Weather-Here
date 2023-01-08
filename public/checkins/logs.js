// Lattitude, Longitude, Zoom Level
// making a map and tiles
// import setup from './scripts.js';
const mymap = L.map("checkinMap").setView([10, 0], 1);
const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileUrl = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  console.log("Map Marker Data");
  console.log(data);
  for (item of data) {
    console.log("item");
    console.log(item);
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    // We are pulling information for each item of the array which we fetched from the database by using the node file index.js which has access to the db on the server.
    // using a template literal to display weather informaton corresponding to a particular marker by binding the txt template literal to the marker using the bindPopup method from leafletjs.com

   let txt = `<p>
      The weather here in ${item.weather.name}, coordinates ${item.lat}&deg;,
      ${item.lon}&deg;, is ${item.weather.weather[0].description} with a
      temperature of ${Math.ceil(item.weather.main.temp)}&deg; Fahrenheit.`;
      
      if (item.air.value < 0) {
      txt += " No air quality reading.";
    } else {
      txt += `The concentration of particulate matter ${item.air.parameter} is
        ${item.air.value} ${item.air.unit} last read on ${item.air.lastUpdated}
      </p>`;
    }

    // this is a function from leaflet.js where you can bind some text to a popup anytime you hove or click on a marker
    marker.bindPopup(txt);
  }

  console.log(data);
}
