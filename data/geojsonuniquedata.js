// Example of loading GeoJSON data using fetch
fetch('greenareas.geojson')
    .then(response => response.json())
    .then(data => {
        // Data processing goes here
    });


// Example assuming geojsonData is already loaded
const features = geojsonData.features;
const uniqueValues = new Set();

features.forEach(feature => {
    // Replace 'property_name' with the actual property name you want to get unique values from
    uniqueValues.add(feature.properties.id);
});

// Convert Set to Array if needed
const uniqueArray = Array.from(uniqueValues);
console.log(uniqueArray);
