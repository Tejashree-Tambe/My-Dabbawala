// TO MAKE THE MAP APPEAR YOU MUST ADD YOUR ACCESS TOKEN FROM
mapboxgl.accessToken = 'pk.eyJ1IjoibXlkYWJiYXdhbGEiLCJhIjoiY2t0a2VuMHRxMDI4bzJvbjI3NG1hNXFiZyJ9.T2oOFPPEG5GZhr0mv-H2aA';
const map = new mapboxgl.Map({
    container: 'mapid', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [72.864017, 19.084737], // starting position [lng, lat]
    zoom: 12 // starting zoom
});

