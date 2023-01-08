# Add a .env file to the root directory
In order for this app to work, you must add a .env file to the root directory. In that root directory, in the .env file, you must add your weather api key as follows. Do not add a semicolon to the end of the expression.
`API_KEY=YOUR_API_KEY_HERE`
See the .env_sample file to for an example.

In order for an .env file to work in your application, you must install dotenv by typing npm install dotenv in your terminal while inside the root directory. Or you can simply type npm install, since dotnev is listed in the package.json file as a dependency. 

## What to install

Since dotnev is actually listed in the package.json file you can simply install it by entering npm install into the terminal.

## How to start application
Please make sure you have node installed to run the entire application. For more information, visit here: https://nodejs.dev/en/learn/how-to-install-nodejs/ 


### Start app locally with nodemon 

Since nodemon is also listed in the package.json file and will be installed as a dependency with npm install, you can simply type nodemon in the terminal and when you make changes the app will automatically refresh.

### Start app with npm start
You can also run the app locally by adding a start property to the package.json file under the scripts property  
`"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },`

Then you can start the app by typing the command npm start in the terminal

## Express and NeDB 
This app uses the Express JavaScript framework to make RESTful API calls that are then storeed in a NeDB database.
Express: https://expressjs.com/
NeDB: https://www.npmjs.com/package/nedb/v/0.8.6

## How the code works
1. The weather app geolocates with the latitude and longitude data coming from the geolocation feature of the browser. For Chrome browser, go to site settinngs and allow location
2. By using this url (const api_url = `weather/${lat},${lon}`;) located in the scripts.js file, The latitude and longitude (lat, lon) data are then passed to the node server located in the NodeJS file index.js 
3. Using the lat and lon as parameters, the Node server then makes a get request to both the OpenWeatherMap and OpenAQ apis using their respective api endpoints
4. The api data is then sent back to the client to be displayed to the user
5. When you click check in, a post request sends the data from the API to be stored in the database
6. Then a get request from log.js in the checkins directory, retrieves the data and binds it to the api JSON data's corresponding marker and the weather and air quality will display next to the location's marker. You can view this data by clicking on the view checkins link and clicking on one of the map markers. 


