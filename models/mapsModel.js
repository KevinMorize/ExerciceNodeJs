// import { Loader } from "@googlemaps/js-api-loader"

// class mapsModel {

//     static maps (req, res) {

//         let city = req.user.city

//         const localisation = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=a56bebdc973c623464e7885da32d7c2d`)
//             .then(response => response.json())
//             .then(json => json.city)

//         const loader = new Loader({
//             apiKey: "AIzaSyCg1TOK5I8HDTMcXKYk9Z1Vu3jpUFnU8nY",
//             version: "weekly",
//           });

//           loader.load().then(() => {

//             let lat = localisation.coor.lat;
//             let lng = localisation.coor.lon;

//             function initMap() {
//               map = new google.maps.Map(document.getElementById("map"), {
//                 center: { lat: lat, lng: lng },
//                 zoom: 15,
//               });
//             }
//           });
//     }
// }

// module.exports = mapsModel