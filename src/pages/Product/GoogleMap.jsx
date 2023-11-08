import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../utils/api";

const Map = styled.div`
  display: none;

  @media screen and (min-width: 1279px) {
    display: block;
  }
`;

function GoogleMap({ mapTargetProduct }) {
  const [stock, setStock] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id > 1233) return;
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

      center: { lat: 25.03553343853973, lng: 121.49999326395795 },

      zoom: 10,
    };

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    let marker0 = new google.maps.Marker({
      position: { lat: 25.045749558028554, lng: 121.514770213844373 },
    });
    let marker1 = new google.maps.Marker({
      position: { lat: 25.010096251562125, lng: 121.50792219812861 },
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


        lat: 25.024384039644268,
        lng: 121.69745482973914,
      };
      map.setCenter(currentPosition);
      map.setZoom(11);


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
        `<p>${stock[0].name}</p><p>${stock[0].phone}</p><p>還有${stock[0].stock}件</p><a href="https://www.google.com/maps/place/100%E5%8F%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E6%AD%A3%E5%8D%80%E9%A4%A8%E5%89%8D%E8%B7%AF12%E8%99%9F/@25.0455649,121.5120719,17z/data=!3m1!4b1!4m6!3m5!1s0x3442a9732ed41f6d:0x96f7c92c2635b4d5!8m2!3d25.0455649!4d121.5146522!16s%2Fg%2F12hkbwq98?entry=ttu">來去Google Map</a>`
      );
      infoWindow0.open(map, marker0);
      infoWindow1.setContent(
        `<p>${stock[1].name}</p><p>${stock[1].phone}</p><p>還有${stock[1].stock}件</p><a href="https://www.google.com/maps/place/108%E5%8F%B0%E5%8C%97%E5%B8%82%E8%90%AC%E8%8F%AF%E5%8D%80%E6%BC%A2%E4%B8%AD%E8%A1%9752%E8%99%9F/@25.0438973,121.5045324,17z/data=!3m1!4b1!4m6!3m5!1s0x3442a90940129fe1:0xd4c1efc769d65131!8m2!3d25.0438973!4d121.5071127!16s%2Fg%2F12hlbp4zn?entry=ttu">來去Google Map</a>`
      );
      infoWindow1.open(map, marker1);
      infoWindow2.setContent(
        `<p>${stock[2].name}</p><p>${stock[2].phone}</p><p>還有${stock[2].stock}件</p><a href="https://www.google.com/maps/place/235%E6%96%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E5%92%8C%E5%8D%80%E4%B8%AD%E5%B1%B1%E8%B7%AF%E4%B8%89%E6%AE%B5122%E8%99%9F/@25.0066724,121.4721986,17z/data=!3m1!4b1!4m6!3m5!1s0x3442a827389b8269:0x5a6d3e0eda5d2f9d!8m2!3d25.0066724!4d121.4747789!16s%2Fg%2F11cslwzr0j?entry=ttu">來去Google Map</a>`
      );
      infoWindow2.open(map, marker2);
      infoWindow3.setContent(
        `<p>${stock[3].name}</p><p>${stock[3].phone}</p><p>還有${stock[3].stock}件</p><a href="https://www.google.com/maps/place/320%E6%A1%83%E5%9C%92%E5%B8%82%E4%B8%AD%E5%A3%A2%E5%8D%80%E4%B8%AD%E8%8F%AF%E8%B7%AF%E4%B8%80%E6%AE%B5699%E8%99%9F/@24.9686519,121.2467739,17z/data=!3m1!4b1!4m6!3m5!1s0x3468221ceccef403:0x3edff9d3ef28a9c1!8m2!3d24.9686519!4d121.2493542!16s%2Fg%2F11fy2vpmtc?entry=ttu">來去Google Map</a>`
      );
      infoWindow3.open(map, marker3);
      infoWindow4.setContent(
        `<p>${stock[4].name}</p><p>${stock[4].phone}</p><p>還有${stock[4].stock}件</p><a href="https://www.google.com/maps/place/110%E5%8F%B0%E5%8C%97%E5%B8%82%E4%BF%A1%E7%BE%A9%E5%8D%80%E5%92%8C%E5%B9%B3%E6%9D%B1%E8%B7%AF%E4%B8%89%E6%AE%B5319%E8%99%9F/@25.0213406,121.5535111,17z/data=!3m1!4b1!4m6!3m5!1s0x3442aa36ee7e438d:0x468c13971a279cbe!8m2!3d25.0213406!4d121.5560914!16s%2Fg%2F11c1yv3rb_?entry=ttu">來去Google Map</a>`
      );
      infoWindow4.open(map, marker4);
    });
  }, [stock]);

  return <Map id="map" style={{ width: "100%", height: "400px" }}></Map>;
}

export default GoogleMap;
