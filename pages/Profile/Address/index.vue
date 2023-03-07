<template>
  <div class="">
    <div class="nav d-flex align-center d-sm-none" @click="goBack">
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13.1428L1 7.14282L7 1.14282"
          stroke="#252626"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h4 class="w100">Адрес доставки</h4>
    </div>
    <h2 class="fw600 d-none d-sm-block">Адрес доставки</h2>
    <div class="address-grid d-flex flex-column-reverse flex-lg-row w100">
      <v-form class="w100" ref="addressForm" @submit.prevent="submitAddress">
        <p class="grey-color mt-8">Адрес доставки</p>
        <v-text-field
          placeholder="г. Алматы, ул. Масанчи 98В"
          class="mt-3 my-input"
          v-model="finaladdress"
          solo
          :rules="[rules.required]"
          @input="handleInput"
        >
        </v-text-field>

        <button type="submit" class="orange-btn mt-4">Сохранить</button>
      </v-form>
      <div class="map mt-10">
        <div
          ref="mymap"
          id="map"
          style="width: 100%; height: 214px"
          class=""
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadYmap } from "vue-yandex-maps";
const settings = {
  apiKey: "60a2f55f-507c-422b-a21c-f085e410f08e",
  lang: "ru_RU",
  version: "2.1",
  coordorder: "latlong",
};
export default {
  layout: "profile",
  middleware: "auth",
  data: () => ({
    coords: [53.2123, 43.1231123],
    form: {},
    myMap: null,
    myPlacemark: null,
    finaladdress: null,
    timer: null,
    zoom: 10,
    rules: {
      required: (v) => !!v || "Обязательное поле",
    },
  }),
  async mounted() {
    await loadYmap({ ...settings, debug: true }).catch((e) => {
      console.log(e);
    });

    if (
      this.$auth.user.longitude &&
      this.$auth.user.latitude &&
      this.$auth.user.address
    ) {
      this.coords = [this.$auth.user.latitude, this.$auth.user.longitude];
      this.finaladdress = this.$auth.user.address;
      this.form.address = this.$auth.user.address;
    }
    try {
      this.myMap = new ymaps.Map(
        "map",
        {
          center: this.coords,
          zoom: this.zoom,
          controls: ["geolocationControl", "searchControl"],
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

      if (
        this.$auth.user.longitude &&
        this.$auth.user.latitude &&
        this.$auth.user.address
      ) {
        this.getPlacemark();
      } else {
        this.getMyLocation();
      }

      this.findOnClick();
    } catch (e) {
      console.log(e);
    }
  },
  created() {
    this.$store.commit("changeProfileMenu", "address");
  },
  methods: {
    async submitAddress() {
      if (!this.$refs.addressForm.validate()) return;
      this.form = {
        address: this.finaladdress,
        latitude: this.coords[0],
        longitude: this.coords[1],
      };

      this.$axios
        .$patch(`auth/users/me/`, this.form)
        .then((res) => {
          this.$notifier.showMessage({
            color: "success",
            text: "Успешно сохранен",
          });
        })
        .catch((err) => {
          this.$notifier.showMessage({
            color: "error",
            text: "Не удалось сохранить",
          });
        });
    },
    handleInput() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.searchOnMap(this.finaladdress);
      }, 1000);
    },
    onDrag() {
      let vm = this;
      let address = null;
      vm.myPlacemark.events.add("dragend", function () {
        address = vm.myPlacemark.geometry.getCoordinates();
        vm.getAddress(vm.myPlacemark.geometry.getCoordinates());
      });
      this.form.address = address;
    },
    getMyLocation() {
      let geolocation = ymaps.geolocation;
      geolocation
        .get({
          provider: "browser",
          mapStateAutoApply: true,
        })
        .then((res) => {
          this.coords = res.geoObjects.position;
          this.getPlacemark();
        })
        .catch((err) => {
          this.$notifier.showMessage({
            text: `Не удалось найтти вашу локацию`,
            color: "error",
          });
        });
    },
    findOnClick() {
      let vm = this;
      this.myMap.events.add("click", function (e) {
        vm.coords = e.get("coords");
        vm.getPlacemark();
      });
    },
    getAddress(coords) {
      ymaps
        .geocode(coords)
        .then((res) => {
          var firstGeoObject = res.geoObjects.get(0);
          this.finaladdress = firstGeoObject.getAddressLine();
          this.myPlacemark.properties.set({
            iconCaption: [
              firstGeoObject.getLocalities().length
                ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
            ]
              .filter(Boolean)
              .join(", "),
            balloonContent: firstGeoObject.getAddressLine(),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createPlacemark(coords) {
      return new ymaps.Placemark(
        coords,
        {
          iconCaption: "searching...",
        },
        {
          preset: "islands#violetDotIconWithCaption",
          draggable: true,
        }
      );
    },
    getPlacemark() {
      if (this.myPlacemark)
        this.myPlacemark.geometry.setCoordinates(this.coords);
      else {
        this.myPlacemark = this.createPlacemark(this.coords);
        this.myMap.geoObjects.add(this.myPlacemark);
      }
      this.myMap.setCenter(this.coords);
      this.getAddress(this.coords);
      this.onDrag();
    },
    searchOnMap(value) {
      ymaps
        .geocode(`${value}`, {
          results: 1,
        })
        .then((res) => {
          var firstGeoObject = res.geoObjects.get(0),
            coords = firstGeoObject.geometry.getCoordinates();
          this.coords = coords;
          this.getPlacemark();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-input,
.orange-btn {
  width: 100%;
  max-width: 400px;
}
.map {
  width: 100%;
  max-width: 438px;
}
@media screen and (max-width: 600px) {
  .my-input,
  .orange-btn {
    max-width: 100%;
    font-size: 17px;
    line-height: 22px;
    font-weight: 500;
  }
  .map {
    max-width: 100%;
  }
  .grey-color p {
    font-size: 13px !important;
    line-height: 16px !important;
  }
  .nav {
    h4 {
      margin: 0 auto;
      font-style: normal;
      font-weight: bold;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
    }
  }
}
</style>
