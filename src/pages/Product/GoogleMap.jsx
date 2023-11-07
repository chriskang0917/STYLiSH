import React, { useEffect, useState } from "react";
import api from "../../utils/api";

function GoogleMap() {
  const [stock, setStock] = useState({});
  useEffect(() => {
    const google = window.google;
    let currentPosition;
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 10,
    });
    navigator.geolocation.getCurrentPosition(function (position) {
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(currentPosition);
      console.log(currentPosition);
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

        selectRestaurant = {
          location: place.geometry.location,
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_phone_number,
          rating: place.rating,
        };
      });
    });
  }, []);

  useEffect(() => {
    async function getStock() {
      const { data } = await api.getStock();
      setStock(data);
      console.log(stock);
    }
    getStock();
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default GoogleMap;
