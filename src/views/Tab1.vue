<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>


        <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content
            :pulling-icon="chevronDownCircleOutline"
            pulling-text="Pull to refresh"
            refreshing-spinner="circles"
            refreshing-text="Refreshing...">
        </ion-refresher-content>
        </ion-refresher>
      
        <ion-list v-if="items">
          <ion-item v-for="item in items" :key="item">
            <ion-label>{{ item.name.first }} {{ item.name.last }}</ion-label>
          </ion-item>
        </ion-list>

      <ion-infinite-scroll
        @ionInfinite="loadData($event)" 
        threshold="100px" 
        id="infinite-scroll"
        :disabled="isDisabled"
        >
        <ion-infinite-scroll-content
          loading-spinner="lines"
          loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>


    </ion-content>
  </ion-page>
</template>

<script>
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonInfiniteScroll, 
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent
 } from '@ionic/vue';

import {ref, onMounted } from 'vue'
import { useStore } from 'vuex'

import axios from 'axios'
import { chevronDownCircleOutline } from 'ionicons/icons'
export default  {
  name: 'Tab1',
  components: { 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonPage,
    IonInfiniteScroll, 
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent
  },
  setup() {
    const isDisabled = ref(false);
    const perPage = ref(50);
    const pageNumber = ref(1)
    const store = useStore()

    const toggleInfiniteScroll = () => {
      isDisabled.value = !isDisabled.value;
    }
    const items = ref([])
    const pushData = () => {
      return new Promise((resolve, reject) => {
          
        axios.get(`https://randomuser.me/api/?page=${pageNumber.value}&results=${perPage.value}`)
          .then(posts => {
            
            posts.data.results.forEach(res => {
              items.value.push(res)
            })

            if(posts.data.length) { 
              return resolve(true);  
            } else {    
              return resolve(false);  
            }

            })
            .catch(() => {
              return reject('asier')
            })
      })
    }

    const doRefresh = (ev) => {
      console.log('Begin async operation');
      items.value = []
      pageNumber.value = 1
      isDisabled.value = false
      pushData()
        .then(() => {
          ev.target.complete();
          pageNumber.value++
          store.commit('INCREMENT', Math.random())
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const loadData = (ev) => {
      console.log(pageNumber.value)
      pushData()
        .then(() => {
          ev.target.complete();
          pageNumber.value++
        })
        .catch(() => {
          isDisabled.value = true;
        })
    }

    onMounted(() => {
      pushData()
        .then(() => {
          pageNumber.value++
        })
    })

    return {
      isDisabled,
      toggleInfiniteScroll,
      loadData,
      items,
      doRefresh,
      chevronDownCircleOutline
    }
  }
}
</script>