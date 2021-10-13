// alert('Access Location?');

if ('geolocation' in navigator) {
    // Geolocation is available
    console.log('Geolocation is available');
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        // document.getElementById('latitude').textContent = lat;
        // document.getElementById('latitude').value = lat;

        const long = position.coords.longitude;
        // document.getElementById('longitude').textContent = long;
        // document.getElementById('latitude').value = long;

        const location = { lat, long };
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
    });
}

else {
    // Geolocation is unavailable
    console.log('Geolocation is unavailable');
    alert('Geolocation is unavailable');
}

function user_address() {

}