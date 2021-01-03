<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Map</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Map</ion-title>
        </ion-toolbar>
      </ion-header>

        <div id="mapContainer" class="basemap"></div>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import {ref, onMounted} from 'vue';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

export default  {
  name: 'Map',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup(){
    const map = ref()
    onMounted(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiYXNpZXJtdXNhIiwiYSI6ImNrMzRkaDByeDBvZ24zbm1xa21mc2w0Zm4ifQ.7vunOoH1vCyWY7kufTJBoA';
      
      setTimeout(() => {

        map.value = new mapboxgl.Map({
          container: 'mapContainer',
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: [-74.5, 40], // starting position [lng, lat]
          zoom: 9 // starting zoom
        });
      }, 500)

    })

  }
}
</script>

<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: 400px;
}
</style>