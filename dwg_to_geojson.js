import proj4 from 'proj4';
import dxfParser from 'dxf-parser';

const convertDXFToGeoJSON = (dxfData) => {
    const sourceProjection = "+proj=utm +zone=44 +datum=WGS84 +units=m +no_defs";
    const targetProjection = "+proj=longlat +datum=WGS84 +no_defs";

    const geoJSONFeatures = dxfData.entities
        .map((entity) => {
            if (entity.type === "LWPOLYLINE" || entity.type === "POLYLINE" || entity.type === "LINE") {
                const coordinates = entity.vertices.map((vertex) => {
                    const [x, y] = proj4(sourceProjection, targetProjection, [vertex.x, vertex.y]);
                    return [x, y];
                });
                return {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: coordinates,
                    },
                    properties: {
                        // Add properties here, for example:
                        name: entity.name,
                        description: entity.description,
                    },
                };
            } else {
                return null;
            }
        })
        .filter(Boolean);

    return {
        type: "FeatureCollection",
        features: geoJSONFeatures,
    };
};

const handleDXFFileInput = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const parser = new dxfParser();
        const dxfData = parser.parseSync(e.target.result);
        const geoJSONData = convertDXFToGeoJSON(dxfData);
        // Use the geoJSONData here, for example:
        console.log(geoJSONData);
    };
    reader.readAsText(file);
};