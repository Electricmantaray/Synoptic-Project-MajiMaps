
// Map initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map centered roughly around Johannesburg
    var map = L.map('map', {
        scrollWheelZoom: false
    }).setView([-26.193292, 28.072987], 15);

    // Add OpenStreetMap tile layer with attribution
    const street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const satillite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.control.layers({
        'Satillite View': satillite,
        'Street View': street
    }).addTo(map)

    // ############## Geolocate user ##############
    map.locate({ setView: true, maxZoom: 16});

    map.on('locationfound', (e) => {
        const {latlng, accuracy} = e;

        L.marker(latlng).addTo(map)
            .bindPopup("You are currently here").openPopup();

        L.circle(latlng, {
            radius: accuracy,
            color: '#3a31d8',
            fillOpacity: 0.1
        }).addTo(map);
    });


    map.on('locationerror', () => {
        console.warn("Unavailable Locations")
    });


    // ############## Click to mark ##############
    // TODO REFACTOR THIS
    const coordsDisplay = document.getElementById('coordsPlaceholder');
    const coordsEntry = document.getElementById('location');

    let currentMarker = null;

    map.on('click', (e) => {
        const {lat, lng} = e.latlng;
        if (currentMarker) {
            map.removeLayer(currentMarker);
        }
        currentMarker = L.marker([lat, lng]).addTo(map);


        coordsDisplay.textContent = `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;
        if (coordsEntry) coordsEntry.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;    
       
    });

    // ############## Scroll whell behaviour and zoom ##############
    // TODO REFACTOR
    const mapContainer = map.getContainer();


    mapContainer.addEventListener('focus', () => {
        map.scrollWheelZoom.enable();
    });

    mapContainer.addEventListener('blur', () => {
        map.scrollWheelZoom.disable();
    });


    // ############## Zone out makers valley ##############
    const makerValleyCoords = [
        [-26.187812, 28.0691181],
        [-26.190638, 28.062201],
        [-26.192005, 28.061958],
        [-26.192675, 28.063469],
        [-26.198137, 28.068011],
        [-26.200102, 28.065639],
        [-26.202096, 28.067495],
        [-26.201617, 28.0742371],
        [-26.201805, 28.0744061],
        [-26.201304, 28.0755161],
        [-26.198746, 28.0749791],
        [-26.198567, 28.0756871],
        [-26.197513, 28.0754971],
        [-26.197081, 28.0757871],
        [-26.195559, 28.0751621],
        [-26.194943, 28.0767094],
        [-26.194491, 28.076564],
        [-26.191602, 28.08435],
        [-26.184902, 28.081388],
        [-26.187674, 28.073685],
        [-26.187568, 28.0735461],
        [-26.187978, 28.0721801],
        [-26.18895, 28.0692401],
        [-26.187812, 28.0691181]
    ];

    const makersValley = L.polygon(makerValleyCoords, {
        color:'#3a31d8',
        fillColor: '#3a31d8',
        fillOpacity: 0.2,
        weight: 2
    }).addTo(map);




});


