<template>
  <div class="">
    <h3 class="fw600">Спасоб оплаты</h3>
    <div class="mt-9">
      <v-radio-group v-model="payment_type">
        <v-radio class="mt-7" value="cash" color="warning">
          <template v-slot:label>
            <div class="d-flex align-center">
              <div class="image-size">
                <img src="@/assets/image/icons/cash.svg" alt="" />
              </div>
              <div class="name">Наличными</div>
            </div>
          </template>
        </v-radio>
        <v-radio class="mt-7" value="kaspigold" color="warning">
          <template v-slot:label>
            <div class="d-flex align-center">
              <div class="image-size">
                <img src="@/assets/image/icons/kaspigold.svg" alt="" />
              </div>
              <div class="name">Kaspi Gold</div>
            </div>
          </template>
        </v-radio>
        <v-radio class="mt-7" value="credit" color="warning">
          <template v-slot:label>
            <div class="credit-type d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <div class=" image-size credit">
                  <p>0&bull;0&bull;{{ credit }}</p>
                </div>
                <div class="name">В рассрочку</div>
              </div>
              <div class="types">
                <div
                  @click="credit = 3"
                  class="types-item p"
                  :class="{ 'types-item-active': credit == 3 }"
                >
                  3 мес
                </div>
                <div
                  @click="credit = 6"
                  class="types-item p"
                  :class="{ 'types-item-active': credit == 6 }"
                >
                  6 мес
                </div>
                <div
                  @click="credit = 12"
                  class="types-item p"
                  :class="{ 'types-item-active': credit == 12 }"
                >
                  12 мес
                </div>
                <div
                  @click="credit = 24"
                  class="types-item p"
                  :class="{ 'types-item-active': credit == 24 }"
                >
                  24 мес
                </div>
              </div>
            </div>
          </template>
        </v-radio>
      </v-radio-group>
      <button class="mt-16 orange-btn" @click="nextStep">
        Подтвердить заказ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    payment_type: "cash",
    credit: 12
  }),
  methods: {
    nextStep() {
      this.$emit("nextStep");
    }
  }
};
</script>

<style lang="scss" scoped>
.image-size {
  width: 60px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  margin-left: 30px;
  img {
    margin: auto;
  }
}
.credit-type {
  width: 100%;
  max-width: 482px;
}
.credit {
  background: #df5340;
  border-radius: 3px;
  p {
    color: #fff;
  }
}
.types {
  display: flex;

  &-item {
    padding: 0 13px;
    border: 1px solid #52b059;
    box-sizing: border-box;
    &:first-child {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    &-active {
      color: #fff;
      background: $green-color;
    }
  }
}
.orange-btn {
  max-width: 296px;
}
</style>
