const platform = new H.service.Platform({
    'apikey': 'tfKuqIZ4QiCAbT68skTFdKw2WD1anLHtrNDyERwvs6s'
});

// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers();

// Get map
const map = new H.Map(
    document.getElementById('mapid'),

    platform.defaultLayers.vector.normal.map,
    {
        zoom: 12,
        center: { lat: lat, lng: long }
    }

);

const mapEvents = new H.mapevents.MapEvents(map);
const behavior = new H.mapevents.Behavior(map);
const geocoderService = platform.getGeocodingService();

// Get Latitude and Longitude
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        map.setCenter({
            lat: position.coords.latitude,
            long: position.coords.longitude,
        });

        geocoderService.reverseGeocode({
            mode: "retriveAddress",
            maxresults: 1,
            prox: position.coords.latitude + "," + position.coords.longitude
        },
            success => {
                console.log("Success");
            },

            error => {
                console.error();
            },
        );
    });
}

