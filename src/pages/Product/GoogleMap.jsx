import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

function GoogleMap() {
  const [stock, setStock] = useState({});
  const { id } = useParams();
  const [map, setMap] = useState(null);
  useEffect(() => {
    async function getStock() {
      const { data } = await api.getStock(id);
      setStock(data);
    }
    getStock();
    console.log(stock);
  }, [id]);
  useEffect(() => {
    const google = window.google;
    let currentPosition;
    let marker;
    let directionService;
    let directionRenderer;
    let infoWindow;

    const mapElement = document.getElementById("map");

    const map = new google.maps.Map(mapElement, {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 10,
    });
    setMap(map);

    navigator.geolocation.getCurrentPosition(function (position) {
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(currentPosition);
      map.setZoom(16);
      const autoComplete = new google.maps.places.Autocomplete({
        bounds: {
          east: currentPosition.lng + 0.001,
          west: currentPosition.lng - 0.001,
          south: currentPosition.lat - 0.001,
          north: currentPosition.lat + 0.001,
        },
        strictBounds: false,
      });

      autoComplete.addListener("place_changed", function () {
        const place = autoComplete.getPlace();

        if (!marker) {
          marker = new google.maps.Marker({
            map: map,
          });
        }
        marker.setPosition(stock.location);

        if (!directionService) {
          directionService = new google.maps.DirectionsService();
        }
        if (!directionRenderer) {
          directionRenderer = new google.maps.DirectionsRenderer({ map: map });
        }
        directionRenderer.set("directions", null);

        directionService.route(
          {
            origin: new google.maps.LatLng(
              currentPosition.lat,
              currentPosition.lng
            ),
            destination: {
              // stock.shopStocks[0].lat,
              // stock.shopStocks[0].lng
            },
            travelMode: "WALKING",
          },
          function (response, status) {
            if (status === "OK") {
              directionRenderer.setDirections(response);
              if (!infoWindow) {
                infoWindow = new google.maps.InfoWindow();
              }
              stock.shopStocks.forEach((shop) => {
                const shopMarker = new google.maps.Marker({
                  map: map,
                  position: new google.maps.LatLng(
                    shopStocks.lat,
                    shopStocks.lng
                  ),
                  title: shop.name,
                });
                shopMarker.addListener("click", function () {
                  infoWindow.setContent(`<h3>${shop.name}</h3>`);
                  infoWindow.open(map, shopMarker);
                });
              });
            }
          }
        );
      });
    });
  }, [stock]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default GoogleMap;
