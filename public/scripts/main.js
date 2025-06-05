// index javascript functionality

// Map initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map centered roughly around Johannesburg
    var map = L.map('map', {
        scrollWheelZoom: false
    }).setView([-26.2041028, 28.0473051], 15);

    // Add OpenStreetMap tile layer with attribution
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // TODO REFACTOR THIS
    const coordsDisplay = document.querySelector('#maps > div.flex > div.text-2xl');
    const coordsEntry = document.querySelector('#location');

    let currentMarker = null;

    map.on('click', function(e) {
        const {lat, lng} = e.latlng;
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        currentMarker = L.marker([lat, lng]).addTo(map);


        coordsDisplay.textContent = `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;
        coordsEntry.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;    
       
    });

    // Map Functionality
    // TODO REFACTOR
    const mapContainer = map.getContainer();


    mapContainer.addEventListener('focus', () => {
        map.scrollWheelZoom.enable();
    });

    mapContainer.addEventListener('blur', () => {
        map.scrollWheelZoom.disable();
    });

});


