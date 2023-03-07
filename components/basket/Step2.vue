<template>
  <v-form ref="orderRef" @submit.prevent="submit">
    <div class="d-flex flex-column flex-sm-row">
      <div class="col-6">
        <h3 class="fw600">Адрес доставки</h3>
        <p class="mt-5 grey-color">Выберите адрес для доставки</p>
        <v-text-field
          class="mt-3 my-input"
          placeholder="г. Алматы, ул. Масанчи 98В"
          v-model="finaladdress"
          solo
          @input="handleInput"
          :rules="[rules.required]"
        >
        </v-text-field>

        <div class="map mt-5">
          <div
            ref="mymap"
            id="map"
            style="width: 100%; height: 214px"
            class=""
          ></div>
        </div>
      </div>
      <div class="col-6">
        <div class="" v-for="(item, index) in orders" :key="index">
          <h3 class="fw600 mb-5" :class="{ 'mt-3': index != 0 }">
            {{ item.provider.individual_name }}
          </h3>
          <p class="fw600">Дата доставки</p>

          <v-menu
            v-model="order[index]"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="my-input mt-3"
                v-model="dates[index]"
                label=""
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                solo
                :rules="[rules.required]"
                @click="delivery_times = item.provider.delivery_times"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates[index]"
              @input="menu = false"
              no-title
              scrollable
              class="datepicker"
              :min="date"
              :rules="[rules.required]"
              :allowed-dates="allowedDates"
              :first-day-of-week="1"
            ></v-date-picker>
          </v-menu>
          <p class="fw600">Способ оплаты</p>
          <v-select
            class="my-input mt-2"
            v-model="payments[index]"
            :items="paymentMethods(item)"
            item-value="value"
            item-text="text"
            label=""
            solo
            :rules="[rules.required]"
          ></v-select>

          <p v-if="error" class="ps fw400 red-color">
            {{ error }}
          </p>
        </div>

        <button type="submit" class="mt-5">Продолжить оформление заказа</button>
      </div>
    </div>

    <v-dialog
      width="345"
      v-model="profile_modal"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card class="px-5 py-7">
        <h3 class="text-center orange-color fw500">
          Пожалуйста заполните ваши данные в профиле
        </h3>

        <nuxt-link to="/Profile" class="green-btn-outline mt-7" type="button">
          В профиль
        </nuxt-link>
      </v-card>
    </v-dialog>
  </v-form>
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
  data: () => ({
    profile_modal: false,
    delivery_times: [],
    error: false,
    myMap: null,
    myPlacemark: null,
    finaladdress: null,
    form: {},
    date: new Date().toISOString().substr(0, 10),
    coords: [43.238293, 76.945465],
    zoom: 10,
    timer: null,
    rules: {
      required: (v) => !!v || "Обязательное поле",
    },
    order: [],
    dates: [],
    payments: [],
    payment: [
      {
        text: "Наличными",
        value: 1,
      },
      {
        text: "Банковская карта",
        value: 2,
      },
      {
        text: "Кредит в банке",
        value: 3,
      },
      {
        text: "Расрочка у поставщика",
        value: 4,
      },
    ],
  }),
  props: { orders: Array },
  async mounted() {
    await loadYmap({ ...settings, debug: true });

    if (
      this.$auth.user.longitude &&
      this.$auth.user.latitude &&
      this.$auth.user.address
    ) {
      this.coords = [this.$auth.user.latitude, this.$auth.user.longitude];
      this.finaladdress = this.$auth.user.address;
      this.form.address = this.$auth.user.address;
    }

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
  },
  methods: {
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
      ymaps.geocode(coords).then((res) => {
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
      if (this.myPlacemark) {
        this.myPlacemark.geometry.setCoordinates(this.coords);
      } else {
        this.myPlacemark = this.createPlacemark(this.coords);
        this.myMap.geoObjects.add(this.myPlacemark);
      }
      this.getAddress(this.coords);
      this.onDrag();
      this.myMap.setCenter(this.coords);
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
        });
    },
    allowedDates(val) {
      val = this.$moment(val).day();
      let day = val;
      let findDate = (days) => {
        let weekdays = {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 0,
        };
        return weekdays[parseInt(days)] === day;
      };
      return this.delivery_times.find(findDate);
    },
    paymentMethods(item) {
      let payment = {
        1: "Наличными",
        2: "Банковская карта",
        3: "Кредит в банке",
        4: "Расрочка у поставщика",
      };

      let result = [];
      if (item.provider?.payment_methods) {
        item.provider.payment_methods.map((e) => {
          let ob = {
            value: e,
            text: payment[`${e}`],
          };
          result.push(ob);
        });
      }
      if (result.length == 0) result = [{ text: "Наличными", value: 1 }];
      return result;
    },
    async submit() {
      if (!this.$refs.orderRef.validate()) return;

      this.form.latitude = this.coords[0];
      this.form.longitude = this.coords[1];
      if (this.finaladdress) this.form.address = this.finaladdress;

      let body = [];
      for (let i = 0; i < this.order.length; i++) {
        let ob = {
          ...this.form,
          arrival_time: new Date(this.dates[i]).getTime() / 1000,
          payment_method: this.payments[i],
        };
        body.push(ob);
      }
      let iserr = false;

      for (let i in this.orders) {
        await this.$axios
          .$put(`orders/${this.orders[i].id}/`, body[i])
          .then((res) => {
            this.$notifier.showMessage({
              color: "success",
              text: `Заказ ${res.id} успешно оформлен`,
            });
          })
          .catch((err) => {
            iserr = true;
            this.error = err.response.data;
            this.error = Object.values(this.error).join(", ");
            if (!this.profile_modal) {
              this.profile_modal = true;
            }
          });
      }
      if (!iserr) {
        this.nextStep();
        this.$store.dispatch("fetchBasket");
      }
    },
    handleInput() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.searchOnMap(this.finaladdress);
      }, 1000);
    },
    nextStep() {
      this.$emit("nextStep");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  color: white;
  width: 100%;
  height: 50px;
  background: #ff7a29;
  border-radius: 5px;
  &:hover {
    color: $orange-color;
    background: #fff;
    border: 1px solid $orange-color;
  }
}
.map {
  width: 100%;
  height: 214px;
  background: $grey-color;
}
.green-btn-outline {
  color: $green-color;

  &:hover {
    color: #fff;
  }
}
#description {
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
}

#infowindow-content .title {
  font-weight: bold;
}

#infowindow-content {
  display: none;
}

#map #infowindow-content {
  display: inline;
}

.pac-card {
  margin: 10px 10px 0 0;
  border-radius: 2px 0 0 2px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  font-family: Roboto;
}

#pac-container {
  padding-bottom: 12px;
  margin-right: 12px;
}

.pac-controls {
  display: inline-block;
  padding: 5px 11px;
}

.pac-controls label {
  font-family: Roboto;
  font-size: 13px;
  font-weight: 300;
}

#pac-input {
  background-color: #fff;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 300;
  margin-left: 12px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  width: 400px;
}

#pac-input:focus {
  border-color: #4d90fe;
}

#title {
  color: #fff;
  background-color: #4d90fe;
  font-size: 25px;
  font-weight: 500;
  padding: 6px 12px;
}

#target {
  width: 345px;
}
.datepicker {
  margin-right: auto;
}
@media screen and (max-width: 600px) {
  .col-6 {
    max-width: 100% !important;
  }
  .v-menu__content {
    left: 24px !important;
    max-width: 90% !important;
  }
}
</style>
