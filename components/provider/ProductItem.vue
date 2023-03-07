<template>
  <div v-if="item" class="d-flex align-center item w100 pa-7 pl-0">
    <div class="image mx-3">
      <img v-if="product.images[0]" :src="product.images[0].image" alt="" />
      <img v-else src="@/assets/image/photos/default.svg" alt="" />
    </div>
    <div class="name mr-6 w100">
      <p class="m">{{ product.name }}</p>

      <div class="d-flex w100 align-center justify-space-between">
        <p class="m">
          <span class="grey-color">{{ item.amount }}</span> *
          {{ $price(item.provider_product.price) }}
        </p>
        <h3>
          {{ $price(item.price) }}
        </h3>
      </div>
    </div>

    <div v-if="isEdit" class="editedit">
      <div class="ml-auto d-flex justify-space-between edit">
        <img
          class="ml-auto pointer"
          @click="removeItem"
          src="@/assets/image/icons/minus.svg"
          alt=""
        />
        <v-text-field
          v-model="amount"
          solo
          hide-details
          class="my-count h3 d-flex align-center justify-center"
          type="number"
        >
        </v-text-field>
        <img
          class=" pointer"
          @click="addItem"
          src="@/assets/image/icons/plus.svg"
          alt=""
        />
      </div>
      <v-checkbox
        class="ml-auto mt-0"
        v-model="is_not_available"
        label="Нет в наличии"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    is_not_available: false,
    amount: 0
  }),
  props: {
    item: [Object, Number],
    isEdit: { type: Boolean, default: false }
  },
  watch: {
    amount() {
      let order_items = {
        order_item: this.item.id,
        provider_amount: this.amount,
        is_not_available: this.is_not_available
      };
      this.$emit("changeArray", order_items);
    },
    is_not_available() {
      let order_items = {
        order_item: this.item.id,
        provider_amount: this.amount,
        is_not_available: this.is_not_available
      };
      this.$emit("changeArray", order_items);
    }
  },
  computed: {
    product() {
      if (this.item?.provider_product?.product)
        return this.item.provider_product.product;
      return {};
    }
  },
  created() {
    this.amount = this.item.amount;
  },
  methods: {
    addItem() {
      this.amount++;
    },
    removeItem() {
      if (this.amount == 0) return;
      this.amount--;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #e4e4e4;
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
.unset-maxwidth {
  max-width: unset;
}
.orange-btn-outline {
  width: unset;
  height: unset;
  padding: 4px;
}
.editedit {
  width: 100%;
  max-width: 150px;
  .edit {
    width: 110px;
  }
}
</style>
