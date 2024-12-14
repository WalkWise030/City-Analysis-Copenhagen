<template>
  <div>
    <div ref="map" class="map"></div>

    <div class="map-overlay top">
      <div class="map-overlay-inner">
        <fieldset class="select-fieldset">
          <label>Select light preset</label>
          <select v-model="lightPreset">
            <option value="dawn">Dawn</option>
            <option value="day">Day</option>
            <option value="dusk">Dusk</option>
            <option value="night">Night</option>
          </select>
        </fieldset>
        <fieldset>
          <label for="showPlaceLabels">Show place labels</label>
          <input type="checkbox" id="showPlaceLabels" v-model="showPlaceLabels">
        </fieldset>
        <fieldset>
          <label for="showPointOfInterestLabels">Show POI labels</label>
          <input type="checkbox" id="showPointOfInterestLabels" v-model="showPointOfInterestLabels">
        </fieldset>
        <fieldset>
          <label for="showRoadLabels">Show road labels</label>
          <input type="checkbox" id="showRoadLabels" v-model="showRoadLabels">
        </fieldset>
        <fieldset>
          <label for="showTransitLabels">Show transit labels</label>
          <input type="checkbox" id="showTransitLabels" v-model="showTransitLabels">
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  data() {
    return {
      map: null,
      lightPreset: 'day',
      showPlaceLabels: true,
      showPointOfInterestLabels: true,
      showRoadLabels: true,
      showTransitLabels: true
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhaS05OCIsImEiOiJjbHY1b251cXUwNTlhMnFyb3N1aWw1aWJqIn0.ZQnazBd0z3c-cH4RPissrg';

    this.map = new mapboxgl.Map({
      container: this.$refs.map,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [16.33837, 48.20298],
      zoom: 17,
      pitch: 60,
      bearing: -50
    });

    this.map.on('load', () => {
      this.map.addSource('line', {
        type: 'geojson',
        lineMetrics: true,
        data: {
          type: 'LineString',
          coordinates: [
            [2.293389857555951, 48.85896319631851],
            [2.2890810326441624, 48.86174223718291]
          ]
        }
      });

      this.map.addLayer({
        id: 'line',
        source: 'line',
        type: 'line',
        paint: {
          'line-width': 12,
          'line-emissive-strength': 0.8,
          'line-gradient': [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'red',
            1,
            'blue'
          ]
        }
      });
    });

    // Watchers for UI interactions
    this.$watch('lightPreset', (newVal, oldVal) => {
      this.map.setStyle('mapbox://styles/mapbox/' + newVal + '-v10');
    });

    this.$watch('showPlaceLabels', (newVal, oldVal) => {
      this.map.setLayoutProperty('poi-label', 'visibility', newVal ? 'visible' : 'none');
    });

    this.$watch('showPointOfInterestLabels', (newVal, oldVal) => {
      this.map.setLayoutProperty('poi-label', 'visibility', newVal ? 'visible' : 'none');
    });

    this.$watch('showRoadLabels', (newVal, oldVal) => {
      this.map.setLayoutProperty('road-label', 'visibility', newVal ? 'visible' : 'none');
    });

    this.$watch('showTransitLabels', (newVal, oldVal) => {
      this.map.setLayoutProperty('transit-label', 'visibility', newVal ? 'visible' : 'none');
    });
  }
};
</script>

<style scoped>
.map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  padding: 10px;
}

.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay-inner fieldset {
  display: flex;
  justify-content: space-between;
  border: none;
}

.map-overlay-inner label {
  font-weight: bold;
  margin-right: 10px;
}

.map-overlay-inner .select-fieldset {
  display: block;
}

.map-overlay-inner .select-fieldset label {
  display: block;
  margin-bottom: 5px;
}

.map-overlay-inner .select-fieldset select {
  width: 100%;
}
</style>
