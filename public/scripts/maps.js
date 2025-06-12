
// Map initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Map id declaration
    const publicMapId = "map";
    const adminMapId = "dashboardMap";

    const mapElement = document.getElementById(publicMapId) || document.getElementById(adminMapId);

    if (!mapElement) return;

    const isAdmin = mapElement.id === adminMapId;

    // Initialise the map centered roughly around Johannesburg
    const map = L.map(mapElement.id, {
        scrollWheelZoom: false
    }).setView([-26.193292, 28.072987], 15);

    // Add OpenStreetMap tile layer with attribution
    // both default and satellite
    const street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    L.control.layers({
        'Satellite View': satellite,
        'Street View': street
    }).addTo(map)

    // ############## Geolocate user ##############
    let userMarker = null;
    let accuracyCircle = null;

    // listens to maps container and if locate button is clicked it locates users location
    const locateButton = document.getElementById('locateButton');
    if (locateButton) {
        locateButton.addEventListener('click', () => {
            map.locate({ setView: true, maxZoom: 16 });
        });
    }

    // marks where the current locator is
    map.on('locationfound', (e) => {
        const { latlng, accuracy } = e;

        if (userMarker) map.removeLayer(userMarker);
        // draws a geometric circle around the users location
        if (accuracyCircle) map.removeLayer(accuracyCircle);

        userMarker = L.marker(latlng).addTo(map)
            .bindPopup("You are currently here").openPopup();

        // accuracy circle styleing
        accuracyCircle = L.circle(latlng, {
            radius: accuracy,
            color: '#3a31d8',
            fillOpacity: 0.1
        }).addTo(map);
    });

    map.on('locationerror', () => {
        console.warn("Unavailable Locations");
    });

    // ############## Click to mark ##############
    if (!isAdmin) {
        // only user needs to get location data not admin
        const coordsDisplay = document.getElementById('coordsPlaceholder');
        const coordsEntry = document.getElementById('location');

        let currentMarker = null;

        // Upon click pulls location data
        map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            currentMarker = L.marker([lat, lng]).addTo(map);

            // Inserts data into label below the map
            coordsDisplay.textContent = `Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`;
            if (coordsEntry) coordsEntry.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

        });
    };


    // ############## Scroll whell behaviour and zoom ##############
    const mapContainer = map.getContainer();

    // Prevents scroll from effecting map until after interaction begins
    mapContainer.addEventListener('focus', () => {
        map.scrollWheelZoom.enable();
    });

    mapContainer.addEventListener('blur', () => {
        map.scrollWheelZoom.disable();
    });


    // ############## Zone out makers valley ##############
    // Uses data available on resources to mark out current makers valley
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

    // Draws boudaries based on the lnglang data from before
    const makersValley = L.polygon(makerValleyCoords, {
        color: '#3a31d8',
        fillColor: '#3a31d8',
        fillOpacity: 0.2,
        weight: 2
    }).addTo(map);

    // ========== Report pins & Heatmap Integration ==========

    // Initiallises the 2 layers that provide visual feedback
    let reportMarkersLayer = L.layerGroup().addTo(map);
    let heatmapLayer = null;

    // Loads all current pins from database to map container
    async function loadReportPins() {
        try {
            if (!isAdmin) {
                // Public should never load pins - just clear any pins if they exist
                reportMarkersLayer.clearLayers();
                return;
            }
            const res = await fetch("/reports-map");
            const data = await res.json();

            reportMarkersLayer.clearLayers();

            // Styles pins
            data.reports.forEach(report => {
                const { latitude, longitude, report_type, context } = report;

                // Determine marker colour based on type
                let color = 'blue';
                if (report_type === 'theft') color = 'red';
                else if (report_type === 'leak') color = 'green';

                // Create custom coloured marker using a Leaflet packages
                const coloredMarker = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });

                // Applies custom marker to location markers
                const marker = L.marker([latitude, longitude], { icon: coloredMarker });
                
                // Provides report information linked to report id
                marker.bindPopup(`
                <b>Type:</b> ${report_type}<br>
                <b>Description:</b> ${context || 'No details'}`);


                reportMarkersLayer.addLayer(marker);
            });
        } catch (err) {
            console.error('Error loading report pins:', err);
        }
    }

    // Loads the heatmap a leaflet plugin
    async function loadHeatMap() {
        try {
            const res = await fetch('/reports-map');
            const data = await res.json();

            if (heatmapLayer) {
                map.removeLayer(heatmapLayer);
            }

            const heatPoints = data.reports.map(report => [
                report.latitude,
                report.longitude,
                // Intensity - effects visual feedback of # of reports
                2.0
            ]);

            // Fades out data to give gradient of heat
            heatmapLayer = L.heatLayer(heatPoints, {
                radius: 25,
                blur: 15,
                maxZoom: 17,
            }).addTo(map);
        } catch (err) {
            console.error('Error loading heatmap:', err);
        }
    }

    // Start showing heatmap by default as used by both user and admin
    let showingHeatmap = true;

    async function toggleHeatmap() {
        const toggleHeatmapBtn = document.getElementById('toggleHeatmapBtn');
        if (showingHeatmap) {
            // Switch to pins - security issue (admin only)
            if (heatmapLayer) map.removeLayer(heatmapLayer);

            await loadReportPins();

            if (isAdmin) {
                if (!map.hasLayer(reportMarkersLayer)) {
                    map.addLayer(reportMarkersLayer);
                }
                if (toggleHeatmapBtn) toggleHeatmapBtn.textContent = "Show Heatmap";
            } else {
                // Public map - ensure pins are removed
                if (map.hasLayer(reportMarkersLayer)) {
                    map.removeLayer(reportMarkersLayer);
                }
            }
            showingHeatmap = false;
        } else {
            // Switch to heatmap
            if (map.hasLayer(reportMarkersLayer)) {
                map.removeLayer(reportMarkersLayer);
            }
            await loadHeatMap();

            if (toggleHeatmapBtn) toggleHeatmapBtn.textContent = "Show Pins";
            showingHeatmap = true;
        }
    }

    // Initialisation
    loadHeatMap();

    // Setup toggle button listener on both maps, if button exists
    const toggleHeatmapBtn = document.getElementById('toggleHeatmapBtn');
    if (toggleHeatmapBtn) {
        // Initialize button text correctly at load time:
        toggleHeatmapBtn.textContent = "Show Pins";

        toggleHeatmapBtn.addEventListener('click', async () => {
            await toggleHeatmap();
        });
    }
});