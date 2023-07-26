# Where in the World is Joe Johnson

An app to track me, and show where I am at all times.

Using React on a Node.js platform, it utilizes:
- Life360 API to provide live location
- OpenCageData to translate the latitude and logitude to city, state, and country
- OpenStreetMap to display a map with a pin in the location from Life360
- leaflet to generate the map object, along with the floating head icon and the voice box with the location name