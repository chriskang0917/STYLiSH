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

    let mapOptions = {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 10,
    };
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    let marker0 = new google.maps.Marker({
      position: { lat: 25.045749558028554, lng: 121.514770213844373 },
      title: "Hello World!",
    });
    let marker1 = new google.maps.Marker({
      position: { lat: 25.044023639710836, lng: 121.50711269664501 },
      title: "Hello World!",
    });
    let marker2 = new google.maps.Marker({
      position: { lat: 25.006886285840675, lng: 121.47485399849825 },
      title: "Hello World!",
    });
    let marker3 = new google.maps.Marker({
      position: { lat: 24.96886585202906, lng: 121.2493434678071 },
      title: "Hello World!",
    });
    let marker4 = new google.maps.Marker({
      position: { lat: 25.02143530092362, lng: 121.55607186631653 },
      title: "Hello World!",
    });

    marker0.setMap(map);
    marker1.setMap(map);
    marker2.setMap(map);
    marker3.setMap(map);
    marker4.setMap(map);

    navigator.geolocation.getCurrentPosition(function (position) {
      currentPosition = {
        lat: 25.02143530092362,
        lng: 121.55607186631653,
      };
      map.setCenter(currentPosition);
      map.setZoom(10);
      const autoComplete = new google.maps.places.Autocomplete({
        bounds: {
          east: currentPosition.lng + 0.001,
          west: currentPosition.lng - 0.001,
          south: currentPosition.lat - 0.001,
          north: currentPosition.lat + 0.001,
        },
        strictBounds: false,
      });
    });
  }, [stock]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default GoogleMap;
