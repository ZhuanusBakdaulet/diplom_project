<template>
  <div class="item">
    <div class="d-flex align-start">
      <div class="image ml-3 py-3">
        <img v-if="product.images[0]" :src="product.images[0].image" alt="" />
        <img v-else src="@/assets/image/photos/default.svg" alt="" />
      </div>
      <div
        class="name mx-5"
        :class="{ 'unset-maxwidth pr-7': isProviderOrders }"
      >
        <nuxt-link :to="`/Products/${product.id}`">
          <p class="m">{{ product.name }}</p>
        </nuxt-link>
        <div
          v-if="!isProviderOrders"
          class="
            d-flex
            flex-column flex-sm-row
            w100
            align-start align-sm-center
            justify-space-between
          "
        >
          <p style="font-size: 12px" class="grey-color mr-3 my-clamp">
            {{ product.description }}
          </p>

          <p
            v-if="
              item.provider_amount === null ||
                item.provider_amount === item.amount
            "
            class="m piece"
          >
            x {{ item.amount }} шт
          </p>
          <p v-else class="m piece piece-active">
            <span> {{ `x ${item.amount} шт ` }}</span>
            <span>
              {{
                item.provider_amount && item.provider_amount == 0
                  ? "нет в наличии"
                  : `x ${item.provider_amount} шт `
              }}
            </span>
          </p>
        </div>
        <div
          v-else
          class="
            d-flex
            flex-column flex-sm-row
            w100
            align-center
            justify-space-between
            py-4
          "
        >
          <p class="m">
            <span class="grey-color"> {{ item.amount }} </span> *
            {{ $price(calculateDiscount(item.provider_product)) }}
          </p>
          <h3>
            {{ $price(item.price) }}
          </h3>
        </div>
        <button
          v-if="isDone && !item.rating"
          class="mt-4 orange-btn-outline p"
          @click="dialog = true"
        >
          Оценить товар
        </button>
      </div>
      <div
        v-if="!isCheck && !isProviderOrders"
        class="asd ml-auto py-5 pr-12 text-right"
      >
        <h3
          v-if="
            item.provider_amount === null ||
              item.provider_amount === item.amount
          "
        >
          {{ $price(item.price) }}
        </h3>
        <div v-else class="changed-price">
          <h4>{{ $price(item.price) }}</h4>
          <h3 :class="{ 'grey-color': item.provider_amount == 0 }">
            {{ calculateChangedPrice() }}
          </h3>
        </div>
        <p class="grey-color mt-7">
          {{ $price(calculateDiscount(item.provider_product)) }}/шт
        </p>
      </div>
      <div
        v-else-if="!isProviderOrders && isCheck && !(item.missing_amount > 0)"
        class="ml-auto py-3 py-sm-5 pr-4 pr-sm-12 d-flex flex-column align-end"
      >
        <button
          v-if="showCheck"
          @click="notFull = !notFull"
          class="p mt-2 orange-btn-outline px-5 py-1"
        >
          Не полный
        </button>
      </div>
    </div>
    <div v-if="notFull && showCheck" class="d-flex align-start pt-3 pl-4 pr-12">
      Введите количество не хватающих
      <v-form ref="checkForm" class="missing-input ml-auto">
        <v-text-field
          class="my-input"
          v-model="missing_amount"
          solo
          color="success"
          type="number"
          @input="handleInput"
          :rules="[
            v =>
              (!!v && v <= item.amount) || 'Не должно быть больше заказанного'
          ]"
        >
        </v-text-field>
      </v-form>
    </div>

    <v-dialog
      v-model="dialog"
      width="422"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card class="px-11 py-10 pb-13 text-center">
        <v-form ref="ratingForm" @submit.prevent="submitRate">
          <svg
            @click="closeModal()"
            class="close"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5ZM2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15ZM9.74112 9.74112C10.2293 9.25296 11.0207 9.25296 11.5089 9.74112L15 13.2322L18.4911 9.74112C18.9793 9.25296 19.7707 9.25296 20.2589 9.74112C20.747 10.2293 20.747 11.0207 20.2589 11.5089L16.7678 15L20.2589 18.4911C20.747 18.9793 20.747 19.7707 20.2589 20.2589C19.7707 20.747 18.9793 20.747 18.4911 20.2589L15 16.7678L11.5089 20.2589C11.0207 20.747 10.2293 20.747 9.74112 20.2589C9.25296 19.7707 9.25296 18.9793 9.74112 18.4911L13.2322 15L9.74112 11.5089C9.25296 11.0207 9.25296 10.2293 9.74112 9.74112Z"
              fill="#888583"
            />
          </svg>
          <p class="text-center">Пожалуйста, оставьте свой отзыв</p>
          <div class="product-rating mt-4">
            <v-rating
              hover
              length="5"
              size="30"
              :value="0"
              background-color="warning"
              color="warning"
              v-model="form.rating"
            ></v-rating>
          </div>
          <p class="mt-4">Оставить Комментарий</p>
          <v-textarea
            v-model="form.review"
            class="my-input mt-1"
            placeholder="Введите описание"
            solo
            no-resize
            height="226"
            :rules="[rules.required]"
          >
          </v-textarea>
          <button type="submit" class="green-btn mx-auto">Подтвердить</button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    notFull: false,
    check: false,
    dialog: false,
    modelarea: "",
    form: {},
    missing_amount: null,
    timer: null,
    rules: {
      required: tima => !!tima || "Обязательное поле"
    }
  }),
  props: {
    item: [Object, Number],
    isDone: { type: Boolean, default: false },
    isCheck: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    isProviderOrders: { type: Boolean, default: false },
    showCheck: Boolean
  },
  computed: {
    product() {
      if (this.item.provider_product?.product)
        return this.item.provider_product?.product;
    }
  },
  methods: {
    async handleInput(value) {
      if (!this.$refs.checkForm.validate()) return;
      let ob = {
        id: this.item.id,
        missing_amount: value
      };
      this.$emit("addMissingItems", ob);
    },
    // async checkOrderAmount() {
    //   await this.$axios
    //     .$patch(`order-items/${this.item.id}/check/`, this.checkForm)
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    //   console.log(this.checkForm);
    //   console.log(this.item);
    // },
    calculateChangedPrice() {
      let result =
        parseInt(this.item.provider_amount) *
        this.calculateDiscount(this.item.provider_product);
      return this.$price(result);
    },
    async submitRate() {
      if (!this.$refs.ratingForm.validate()) return;

      this.form.session_key = localStorage.session_key;
      let params = {
        user_type: this.$store.state.client_type
      };

      await this.$axios
        .$patch(`order-items/${this.item.id}/rating/`, this.form, { params })
        .then(res => {
          this.$notifier.showMessage({
            text: "Ваш отзыв принят",
            color: "success"
          });
          this.closeModal();
          this.$emit("refresh");
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            text: `${error}`,
            color: "error"
          });
          this.closeModal();
          this.$emit("refresh");
        });
    },
    calculateDiscount(provider_product) {
      let price = parseInt(provider_product.price),
        discount = parseInt(provider_product.discount),
        result = price - (price * discount) / 100;
      return result;
    },
    closeModal() {
      this.form = {};
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #e4e4e4;
}
.missing-input {
  width: 120px;
}
.image {
  width: 110px;
  height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
.name {
  width: 100%;
  max-width: 300px;
  padding: 20px 0;
}
.unset-maxwidth {
  max-width: unset;
}
.orange-btn-outline {
  width: unset;
  height: unset;
  padding: 4px;
}
.asd {
  width: 200px;
}

.dialog_heading {
  font-family: "Gilroy";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}
.dialog_div p {
  margin-top: 15px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}
.green-btn {
  max-width: 180px;
  color: #e4e4e4;
}
.piece {
  white-space: nowrap;

  &-active {
    span {
      color: #a8a8a8;
      text-decoration: line-through;
      &:last-child {
        margin-left: 10px;
        text-decoration: none;
        color: #ff7a29;
      }
    }
  }
}
.changed-price {
  h4 {
    font-size: 11px;
    line-height: 18px;
    text-align: right;
    color: #a3a3a3;
    text-decoration: line-through;
  }
}
@media screen and (max-width: 600px) {
  .my-clamp {
    margin: 10px 0;
    font-size: 13px !important;
    line-height: 16px;
  }
  .m {
    font-size: 13px !important;
    line-height: 16px;
  }
  .name {
    padding: 10px 0;
  }
}
</style>
