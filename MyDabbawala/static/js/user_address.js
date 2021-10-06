const nodeGeocoder = require('node-geocoder');

console.log(cordinates[0]);

let options = {
    provider: 'openstreetmap'
};

let geoCoder = nodeGeocoder(options);
// Reverse Geocode
geoCoder.reverse({ lat: lat, lon: long })
    .then((res) => {
        console.log(res);
    })

    .catch((err) => {
        console.log(err);
    });

module.exports = router;