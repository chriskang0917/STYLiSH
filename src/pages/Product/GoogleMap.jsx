import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

function GoogleMap({ mapTargetProduct }) {
  const [stock, setStock] = useState({});
  const { id } = useParams();
  const [map, setMap] = useState(null);
  useEffect(() => {
    async function getStock() {
      const { data } = await api.getStock(id);
      const selectShopStocks = [...data].filter(
        (obj) =>
          obj.color_code === mapTargetProduct.color &&
          obj.size === mapTargetProduct.size
      );

      setStock(selectShopStocks[0].shopStocks);
    }
    getStock();
    console.log(stock);
    console.log(mapTargetProduct);
  }, [id, mapTargetProduct]);

  useEffect(() => {
    const google = window.google;
    let currentPosition;
    let directionRenderer;
    let infoWindow0;
    let infoWindow1;
    let infoWindow2;
    let infoWindow3;
    let infoWindow4;

    let mapOptions = {
      center: { lat: 25.022330099901676, lng: 121.52089994165058 },
      zoom: 10,
    };
    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    let marker0 = new google.maps.Marker({
      position: { lat: 25.045749558028554, lng: 121.514770213844373 },
    });
    let marker1 = new google.maps.Marker({
      position: { lat: 25.044023639710836, lng: 121.50711269664501 },
    });
    let marker2 = new google.maps.Marker({
      position: { lat: 25.006886285840675, lng: 121.47485399849825 },
    });
    let marker3 = new google.maps.Marker({
      position: { lat: 24.96886585202906, lng: 121.2493434678071 },
    });
    let marker4 = new google.maps.Marker({
      position: { lat: 25.02143530092362, lng: 121.55607186631653 },
    });

    marker0.setMap(map);
    marker1.setMap(map);
    marker2.setMap(map);
    marker3.setMap(map);
    marker4.setMap(map);

    navigator.geolocation.getCurrentPosition(function (position) {
      currentPosition = {
        lat: 25.022330099901676,
        lng: 121.52089994165058,
      };
      map.setCenter(currentPosition);
      map.setZoom(12);
      const autoComplete = new google.maps.places.Autocomplete({
        bounds: {
          east: currentPosition.lng + 0.001,
          west: currentPosition.lng - 0.001,
          south: currentPosition.lat - 0.001,
          north: currentPosition.lat + 0.001,
        },
        strictBounds: false,
      });
      if (!directionRenderer) {
        directionRenderer = new google.maps.DirectionsRenderer({ map: map });
      }
      directionRenderer.set("directions", null);
      if (!infoWindow0) {
        infoWindow0 = new google.maps.InfoWindow();
      }
      if (!infoWindow1) {
        infoWindow1 = new google.maps.InfoWindow();
      }
      if (!infoWindow2) {
        infoWindow2 = new google.maps.InfoWindow();
      }
      if (!infoWindow3) {
        infoWindow3 = new google.maps.InfoWindow();
      }
      if (!infoWindow4) {
        infoWindow4 = new google.maps.InfoWindow();
      }
      infoWindow0.setContent(
        `<p>${stock[0].name}</p><p>${stock[0].phone}</p><p>還有${stock[0].stock}件</p>`
      );
      infoWindow0.open(map, marker0);
      infoWindow1.setContent(
        `<p>${stock[1].name}</p><p>${stock[1].phone}</p><p>還有${stock[1].stock}件</p>`
      );
      infoWindow1.open(map, marker1);
      infoWindow2.setContent(
        `<p>${stock[2].name}</p><p>${stock[2].phone}</p><p>還有${stock[2].stock}件</p>`
      );
      infoWindow2.open(map, marker2);
      infoWindow3.setContent(
        `<p>${stock[3].name}</p><p>${stock[3].phone}</p><p>還有${stock[3].stock}件</p>`
      );
      infoWindow3.open(map, marker3);
      infoWindow4.setContent(
        `<p>${stock[4].name}</p><p>${stock[4].phone}</p><p>還有${stock[4].stock}件</p>`
      );
      infoWindow4.open(map, marker4);
    });
  }, [stock]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default GoogleMap;
