
class MapboxField {
  constructor($container) {
    this.$container = $container;
    this.rendered = false;
  }

  /**
   * Gets the Mapbox token from the window.
   * Inserted via CustomScript in LeftAndMainExtension.
   * Value must be defined in config yml.
   */
  static _getAccessToken() {
    return window.mapboxAccessToken;
  }

  /**
   * Gets the Mapbox token from the window.
   * Inserted via CustomScript in LeftAndMainExtension.
   * Will load default style ("mapbox://styles/mapbox/basic-v9") if not defined in your own yml.
   */
  static _getMapStyle() {
    return window.mapStyle;
  }

  /**
   * Returns the values of Latitude and Longitude as an array.
   * Added default values in case it is undefined.
   */
  _getLngLatValue() {
    const lngVal = this._getLngField().val() || 174.7762;
    const latVal = this._getLatField().val() || -41.2865;

    return [lngVal, latVal]
  }

  /**
   * Sets the Latitude and Longitude.
   */
  _setLngLatValue(coords) {
    this._getLngField().val(coords[0]).change();
    this._getLatField().val(coords[1]).change();
  }

  /**
   * Gets the Silverstripe Longitude field by data attribute.
   */
  _getLngField() {
    return this.$container.find('input[data-mapbox-field="Longitude"]');
  }

  /**
   * Gets the Silverstripe Latitude field by data attribute.
   */
  _getLatField() {
    return this.$container.find('input[data-mapbox-field="Latitude"]');
  }

  /**
   * Handle the marker when dragged mouse on map.
   */
  _onMarkerUpdate(marker) {
    const lngLat = marker.getLngLat();
    this._setLngLatValue([lngLat.lng, lngLat.lat]);
  }

  /**
   * Render the map.
   */
  render() {
    if (this.rendered) {
      return;
    }

    // Set up map via MapboxGL script
    mapboxgl.accessToken = MapboxField._getAccessToken();

    const map = new mapboxgl.Map({
      container: this.$container.find('.mapbox__map').get(0),
      center: this._getLngLatValue(),
      style: MapboxField._getMapStyle(),
      zoom: 15
    });

    // Add marker
    const marker = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat(this._getLngLatValue())
        .addTo(map);

    // Update the coordinates after dragging marker
    marker.on('dragend', () => {
      this._onMarkerUpdate(marker);
    });

    // Add geocoder to map
    const geocoder = new MapboxGeocoder({
      accessToken: MapboxField._getAccessToken()
    });
    map.addControl(geocoder);

    // Update the marker after geocoding
    geocoder.on('result', (event) => {
      marker.setLngLat(event.result.geometry.coordinates);
      this._onMarkerUpdate(marker);
    });

    map.addControl(new mapboxgl.NavigationControl());

    this.rendered = true;
  }
}

export default MapboxField;
