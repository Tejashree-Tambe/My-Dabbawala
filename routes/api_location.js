const express = require('express');
const router = express.Router();

router.use(express.json({ limit: '1mb' }));

router.post('/', (request, response) => {
    const timestamp = Date.now();
    const data = request.body;
    // console.log(data)
    lat = data.lat;
    long = data.long;
    data.timestamp = timestamp;
    response.json({
        status: "success",
        timestamp: timestamp,
        latitude: lat,
        longitude: long,
    });
});

module.exports = router;