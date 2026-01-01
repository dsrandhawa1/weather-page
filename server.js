const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch
const app = express();
const PORT = process.env.PORT || 3000;

// Your Google Maps API key
const API_KEY = 'AIzaSyCdf0Y6MXleuEFpaBgX-TmCdap_UX_BeBM';

// Serve static files (your HTML page)
app.use(express.static('public'));

// Travel time endpoint
app.get('/travel-time', async (req, res) => {
  try {
    const origin = encodeURIComponent('24010 Greening Dr, Novi, MI');
    const destination = encodeURIComponent('1051 Oakland Ave, Birmingham, MI 48009');

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&departure_time=now&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.rows && data.rows[0].elements[0].status === "OK") {
      const duration = data.rows[0].elements[0].duration_in_traffic.text;
      res.json({ duration });
    } else {
      res.status(500).json({ error: "Unable to get travel time" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
