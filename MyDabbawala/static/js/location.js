// alert('Access Location?');

// if ('geolocation' in navigator) {
//     // Geolocation is available
//     console.log('Geolocation is available');
//     navigator.geolocation.getCurrentPosition(async position => {
//         const lat = position.coords.latitude;

//         const long = position.coords.longitude;

//         const location = { lat, long };
//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify(location)
//         };

//         const response = await fetch('/api/location', options);
//         const json = await response.json();
//         console.log(json);

var lat;
var long;

// Mark the location:
function addMarkersToMap(map, position) {
    var locationMarker = new H.map.Marker({
        lat: position.coords.latitude,
        lng: position.coords.longitude
    });
    map.addObject(locationMarker);
}

// Initialize communication with the platform
const platform = new H.service.Platform({
    'apikey': 'T7W4VVgjrXZEFXWIXHa6DdezMvLGEvD9tKSt4CBykQI'
});
// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers();

// Initialize a map
const map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
        zoom: 16,
        center: { lat: 19, lng: 72 }
    });

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// Behavior implements default interactions for pan/zoom
const mapEvents = new H.mapevents.MapEvents(map);
const behavior = new H.mapevents.Behavior(mapEvents);
const geocoderService = platform.getGeocodingService();

// Get Latitude and Longitude
if (navigator.geolocation) {
    console.log('Geolocation is available');

    navigator.geolocation.getCurrentPosition(async position => {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        const location = {
            "lat": position.coords.latitude,
            "lng": position.coords.latitude
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(location)
        };

        const response = await fetch('/api/location', options);
        const json = await response.json();
        console.log(json);

        map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        });

        geocoderService.reverseGeocode({
            mode: "retrieveAddress",
            maxresults: 1,
            prox: position.coords.latitude + "," + position.coords.longitude
        },
            success => {
                // Create the default UI components
                var ui = H.ui.UI.createDefault(map, defaultLayers);

                // Now use the map as required...
                var locationMarker = new H.map.Marker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

                map.addObject(locationMarker);

                console.log("Success");
                const user_location = success.Response.View[0].Result[0].Location;
                const address = user_location.Address.Label
                document.getElementById('address').textContent = address;
            },

            error => {
                console.error(error);
            },
        );
    });
}
