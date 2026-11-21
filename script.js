
const bangalore = [12.9716, 77.5946];
const varanasi = [25.3176, 82.9739];

/*

// 1. Initialize the map
const map = L.map('map');

// 2. Add map tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// 3. Fit the map to both cities
map.fitBounds([bangalore, varanasi], {
    padding: [50, 50]
});

// 4. Add city markers
L.marker(bangalore).addTo(map).bindPopup("Bangalore");
L.marker(varanasi).addTo(map).bindPopup("Varanasi");

// 5. Create curved route points
const routePoints = [];

const start = L.latLng(bangalore);
const end = L.latLng(varanasi);

// Control point to make the route curve
const control = L.latLng(
    21.5,
    75.0
);

// Generate points using quadratic Bezier curve
for (let t = 0; t <= 1; t += 0.01) {

    const lat =
        (1 - t) * (1 - t) * start.lat +
        2 * (1 - t) * t * control.lat +
        t * t * end.lat;

    const lng =
        (1 - t) * (1 - t) * start.lng +
        2 * (1 - t) * t * control.lng +
        t * t * end.lng;

    routePoints.push([lat, lng]);
}

// 6. Draw the route
const route = L.polyline(routePoints, {
    color: '#1565C0',
    weight: 4,
    opacity: 0.8,
    dashArray: '8, 8'
}).addTo(map);

// 7. Create plane icon
const planeIcon = L.divIcon({
    html: '<div style="font-size:30px;">✈️</div>',
    className: '',
    iconSize: [35, 35],
    iconAnchor: [17, 17]
});

// 8. Place plane at Bangalore initially
const plane = L.marker(bangalore, {
    icon: planeIcon
}).addTo(map);

// 9. Animation settings
let index = 0;

const speed = 2; // higher value = faster plane

// 10. Animation function
function animatePlane() {

    if (index >= routePoints.length) {
        return; // Stop when plane reaches Varanasi
    }

    // Move plane to next point
    plane.setLatLng(routePoints[index]);

    index += speed;

    // Run animation again
    requestAnimationFrame(animatePlane);
}

// Start animation after 2 seconds
setTimeout(() => {
    animatePlane();
}, 2000);


function startFlight() {
    index = 0;

    plane.setLatLng(bangalore);

    animatePlane();
}
*/

const journey = [
    {
        title: "The Beginning",
        location: "Bangalore",
        coords: [12.9716, 77.5946],
        time: "11:30 AM",
        text: "The journey begins in Bangalore.",
        image: "images/bangalore.jpg"
    },
    {
        title: "Above the Clouds",
        location: "Somewhere in the sky",
        coords: [19.5, 79.5],
        time: "During flight",
        text: "Watching the clouds from the airplane window.",
        image: "images/clouds.jpg"
    },
    {
        title: "Arrival in Varanasi",
        location: "Varanasi",
        coords: [25.3176, 82.9739],
        time: "Arrival",
        text: "Finally arriving in the ancient city of Varanasi.",
        image: "images/varanasi.jpg"
    }, 
    {
        title: "Check-in at Shanteshwar Mahadev Inn",
        location: "Gai Ghat, Varanasi",
        coords: [25.3195, 83.0190],
        time: "After arrival",
        text: "After landing in Varanasi, we head to Shanteshwar Mahadev Inn, our place of stay in the city.",
        image: "images/shanteshwar_inn.jpg"
    },

    // 5. Kashi Mutt
    {
        title: "Visit to Kashi Mutt",
        location: "Kashi Moola Math, Brahma Ghat",
        coords: [25.3160, 83.0193],
        time: "Next stop",
        text: "We visit Kashi Mutt at Brahma Ghat and spend time at this sacred math in the heart of Kashi.",
        image: "images/kashi_mutt.jpg"
    },

    // 6. Kavale Mutt
    {
        title: "Visit to Kavale Mutt",
        location: "Kavale Math, Durga Ghat",
        coords: [25.3155, 83.0185],
        time: "After Kashi Mutt",
        text: "Our next visit takes us to Kavale Mutt near Durga Ghat, another important spiritual stop during our Varanasi journey.",
        image: "images/kavale_mutt.jpg"
    }

];


let currentStory = 0;

// Display a story
function showStory(index) {

    currentStory = index;

    const story = journey[index];

    document.getElementById("story-title").textContent =
        story.title;

    document.getElementById("story-location").textContent =
        story.location;

    document.getElementById("story-time").textContent =
        story.time;

    document.getElementById("story-text").textContent =
        story.text;

    document.getElementById("story-image").src =
        story.image;

    // Move map to this story location
    map.flyTo(story.coords, 6, {
        duration: 2
    });

    // Update timeline highlighting
    updateTimeline();
}

function nextStory() {

    if (currentStory < journey.length - 1) {
        showStory(currentStory + 1);
    }
}

function previousStory() {

    if (currentStory > 0) {
        showStory(currentStory - 1);
    }
}


function createTimeline() {

    const timeline = document.getElementById("timeline");

    journey.forEach((story, index) => {

        const item = document.createElement("div");

        item.className = "timeline-item";
        item.textContent = `${index + 1}. ${story.title}`;

        item.onclick = () => {
            showStory(index);
        };

        timeline.appendChild(item);
    });
}

function updateTimeline() {

    const items = document.querySelectorAll(".timeline-item");

    items.forEach((item, index) => {

        item.classList.toggle(
            "active",
            index === currentStory
        );
    });
}


function addStoryMarkers() {

    journey.forEach((story, index) => {

        const marker = L.marker(story.coords)
            .addTo(map);

        marker.bindTooltip(story.title);

        marker.on("click", () => {
            showStory(index);
        });
    });
}

createTimeline();
addStoryMarkers();
showStory(0);
