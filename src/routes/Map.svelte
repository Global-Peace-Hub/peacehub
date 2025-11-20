<script>
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import turf from "turf";

  export let subpage;
  export let all_polygons;
  export let geo_labels;

  let height;
  let map;
  let isOverlayVisible = true; // Controls the visibility of the overlay
  let hoveredPolygonId = null;

  function adjustMapForWindowSize() {
    let centerCoordinates = map.getCenter();
    if (window.innerWidth <= 750) {
      map.flyTo({
        center: [centerCoordinates.lng, centerCoordinates.lat],
        zoom: 0.8,
      });
    } else if (window.innerWidth <= 900) {
      map.flyTo({
        center: [centerCoordinates.lng, centerCoordinates.lat],
        zoom: 1.1,
      });
    } else if (window.innerWidth <= 1050) {
      map.flyTo({
        center: [centerCoordinates.lng, centerCoordinates.lat],
        zoom: 1.3,
      });
    } else {
      map.flyTo({
        center: [centerCoordinates.lng, centerCoordinates.lat],
        zoom: 1.5,
      });
    }
  }

  function removeOverlay() {
    isOverlayVisible = false;
  }

  // $effect(() => {
  //   console.log(all_polygons);
  // });

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2FzaGFnYXJpYmFsZHkiLCJhIjoiY2xyajRlczBlMDhqMTJpcXF3dHJhdTVsNyJ9.P_6mX_qbcbxLDS1o_SxpFg";
    map = new mapboxgl.Map({
      container: map,
      attributionControl: false,
      style: "mapbox://styles/sashagaribaldy/cm4aigyc400qc01s6bzp76jjf",
      center: [10, 15],
      zoom: 1.5,
      projection: "naturalEarth",
      maxZoom: 5,
      logoPosition: "bottom-right",
    });

    map.on("wheel", (event) => {
      if (event.originalEvent.ctrlKey) {
        return;
      }

      if (event.originalEvent.metaKey) {
        return;
      }

      if (event.originalEvent.altKey) {
        return;
      }

      event.preventDefault();
    });
  });

  $: {
    if (all_polygons && map) {
      // Ensure this block runs only after the map has fully loaded
      map.once("idle", () => {
        //add source
        if (!map.getSource("countries")) {
          map.addSource("countries", {
            type: "geojson",
            data: all_polygons,
            generateId: true, // Ensures all features have unique IDs
          });

          // Find the first symbol layer (typically a label layer)
          const labelLayerId = map
            .getStyle()
            .layers.find(
              (layer) =>
                layer.type === "symbol" && layer.layout?.["text-field"],
            )?.id;

          // Add fill layer with conditional color
          map.addLayer(
            {
              id: "countries_fill",
              type: "fill",
              source: "countries",
              paint: {
                "fill-color": [
                  "match",
                  ["get", "ADMIN"], // Get the country name from properties.ADMIN
                  "Sudan",
                  "steelblue",
                  "Libya",
                  "steelblue",
                  "Syria",
                  "steelblue",
                  "Afghanistan",
                  "steelblue",
                  "Yemen",
                  "steelblue",
                  "Israel",
                  "steelblue",
                  "#b3b3b3", // Default color for all other countries
                ],
                "fill-opacity": 0.9,
              },
            },
            labelLayerId,
          );

          map.addLayer({
            id: "countries_outline",
            type: "line",
            source: "countries",
            layout: {},
            paint: {
              "line-color": "black",
              "line-width": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1,
                0,
              ],
            },
          });

          const filteredCountries = [
            "Sudan",
            "Libya",
            "Afghanistan",
            "Yemen",
            "Syria",
            "Israel",
          ];

          // Create a tooltip element
          const tooltip = document.createElement("div");
          tooltip.style.position = "absolute";
          tooltip.style.background = "rgba(0, 0, 0, 0.7)";
          tooltip.style.color = "white";
          tooltip.style.padding = "5px 10px";
          tooltip.style.borderRadius = "5px";
          tooltip.style.fontSize = "12px";
          tooltip.style.pointerEvents = "none";
          tooltip.style.display = "none";
          document.body.appendChild(tooltip);

          map.on("mousemove", "countries_fill", (e) => {
            const countryName = e.features[0].properties.ADMIN;
            if (filteredCountries.includes(countryName)) {
              map.getCanvas().style.cursor = "pointer";
              if (hoveredPolygonId !== null) {
                map.setFeatureState(
                  { source: "countries", id: hoveredPolygonId },
                  { hover: false },
                );
              }

              hoveredPolygonId = e.features[0].id;
              map.setFeatureState(
                { source: "countries", id: hoveredPolygonId },
                { hover: true },
              );

              tooltip.innerText = "Explore " + countryName;
              tooltip.style.display = "block";
              tooltip.style.left = `${e.originalEvent.pageX + 10}px`;
              tooltip.style.top = `${e.originalEvent.pageY + 10}px`;
            }
          });

          map.on("mouseleave", "countries_fill", () => {
            map.getCanvas().style.cursor = "";

            if (hoveredPolygonId !== null) {
              map.setFeatureState(
                { source: "countries", id: hoveredPolygonId },
                { hover: false },
              );
            }

            hoveredPolygonId = null;
            tooltip.style.display = "none";
          });

          map.on("click", "countries_fill", (e) => {
            let clicked_country = e.features[0].properties.ADMIN;
            if (filteredCountries.includes(clicked_country)) {
              // zoomToCountry(clicked_country);
              subpage(clicked_country);
              tooltip.style.display = "none";
            }
          });

          map.addSource("country-centroids", {
            type: "geojson",
            data: geo_labels,
          });

          map.addLayer({
            id: "country-labels",
            type: "symbol",
            source: "country-centroids",
            layout: {
              "text-field": ["get", "name"],
              "text-font": ["Montserrat SemiBold", "Arial Unicode MS Bold"], // Use a bolder font variant
              "text-size": 12,
              "text-offset": [0, 0],
              "text-anchor": "center",
            },
            paint: {
              "text-color": "#4d4d4d",
              "text-halo-color": "white",
              "text-halo-width": 1,
              "text-halo-blur": 0.5,
            },
          });

          adjustMapForWindowSize();
          window.addEventListener("resize", adjustMapForWindowSize);
        }
      });
    }
  }

  function zoomToCountry(country) {
    let bound_box;
    if (country == "Russia") {
      bound_box = [
        68.1434025400001, 86.74555084800015, 97.36225305200006,
        35.49540557900009,
      ];
    } else if (country == "United States of America") {
      bound_box = [
        -160.3688042289999, 24.546282924364334, -36.7005916009999,
        32.71283640500015,
      ];
    } else if (country == "France") {
      bound_box = [
        -8.691314256999902, 40.909613348000065, 12.771169467000021, 50.84788646,
      ];
    } else {
      let countries = all_polygons.features;

      let the_country = countries.find(function (d) {
        return d.properties.ADMIN == country;
      });
      bound_box = turf.bbox(the_country);
    }

    if (bound_box) {
      map.fitBounds(bound_box, {
        padding: 50,
      });
    }
  }
</script>

<div
  class="map-container"
  bind:clientHeight={height}
  role="region"
  aria-label="Interactive map showing countries studied by the PeaceHub project"
>
  <div id="legend">
    <div class="legend-item">
      <div class="legend-color" style="background-color: #598FBC;"></div>
      <span>Analysis available</span>
    </div>
    <div class="legend-item">
      <div class="legend-color" style="background-color: #A8A8A8;"></div>
      <span>Analysis pending</span>
    </div>
  </div>
  <div class="map" bind:this={map}></div>
  <!-- {#if isOverlayVisible}
    <div class="overlay">
      <button class="remove-overlay" on:click={removeOverlay}>
        Ctrl + Scroll to Zoom
      </button>
    </div>
  {/if} -->
</div>

<style>
  .map-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .remove-overlay {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: none;
    background-color: rgba(0, 0, 0, 0.76);
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

  .remove-overlay:hover {
    cursor: pointer;
    background-color: #8f2121;
  }

  #legend {
    position: absolute;
    bottom: 5px;
    left: 5px;
    border-radius: 4px;
    padding: 10px;
    height: 50px;
    width: 150px;
    background-color: black;
    z-index: 9;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;
  }

  .legend-color {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
</style>
