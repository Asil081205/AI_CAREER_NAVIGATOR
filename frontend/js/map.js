// Interactive map for job locations
let jobsMap;
let mapMarkers = [];

function initializeJobsMap(jobs) {
  // Initialize map centered on US
  jobsMap = L.map("jobsMap").setView([39.8283, -98.5795], 4);

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(jobsMap);

  // Add markers for each job
  addJobMarkers(jobs);
}

function addJobMarkers(jobs) {
  // Clear existing markers
  mapMarkers.forEach((marker) => jobsMap.removeLayer(marker));
  mapMarkers = [];

  // Job location coordinates (mock data)
  const locationCoords = {
    "Mountain View, CA": [37.4221, -122.0841],
    "Seattle, WA": [47.6432, -122.1378],
    "San Francisco, CA": [37.7749, -122.4194],
    "Los Gatos, CA": [37.2533, -121.9815],
    "New York, NY": [40.7128, -74.006],
    "Menlo Park, CA": [37.4852, -122.1483],
    "Austin, TX": [30.2672, -97.7431],
    "San Jose, CA": [37.3541, -121.9552],
  };

  // Add marker for each job
  jobs.forEach((job) => {
    const coords = locationCoords[job.location];
    if (coords) {
      const marker = L.marker(coords).addTo(jobsMap);

      // Create popup content
      const popupContent = `
                <div class="map-popup">
                    <h4>${job.title}</h4>
                    <p><strong>${job.company}</strong></p>
                    <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                    <div class="popup-links">
                        <a href="${job.linkedinLink}" target="_blank" class="popup-link linkedin">LinkedIn</a>
                        <a href="${job.naukriLink}" target="_blank" class="popup-link naukri">Naukri</a>
                    </div>
                </div>
            `;

      marker.bindPopup(popupContent);
      mapMarkers.push(marker);
    }
  });

  // Add custom CSS for map popups
  addMapStyles();
}

function addMapStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .map-popup {
            min-width: 200px;
        }
        
        .map-popup h4 {
            margin: 0 0 0.5rem 0;
            color: #667eea;
        }
        
        .map-popup p {
            margin: 0.25rem 0;
            font-size: 0.9rem;
        }
        
        .popup-links {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.75rem;
        }
        
        .popup-link {
            padding: 0.25rem 0.5rem;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.8rem;
            color: white;
        }
        
        .popup-link.linkedin {
            background-color: #0077b5;
        }
        
        .popup-link.naukri {
            background-color: #ff6b6b;
        }
        
        .leaflet-popup-content-wrapper {
            border-radius: 8px;
        }
    `;

  if (!document.querySelector("#map-styles")) {
    style.id = "map-styles";
    document.head.appendChild(style);
  }
}

// Function to filter map markers based on job category
function filterMapMarkers(category) {
  if (!window.allJobs) return;

  const filteredJobs =
    category === "all"
      ? window.allJobs
      : window.allJobs.filter((job) => job.category === category);

  // Clear and re-add markers
  addJobMarkers(filteredJobs);
}

// Add click handler to sync map with job filters
document.addEventListener("DOMContentLoaded", function () {
  // Override the filterJobs function to also update map
  const originalFilterJobs = window.filterJobs;
  window.filterJobs = function (category) {
    if (originalFilterJobs) {
      originalFilterJobs.call(this, category);
    }

    // Also filter map markers
    if (typeof filterMapMarkers === "function") {
      filterMapMarkers(category);
    }
  };
});
