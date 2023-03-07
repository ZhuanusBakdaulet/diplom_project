<template>
  <div v-if="item" class="">
    <div
      @click="showMore()"
      class="provider desktop_pointer pointer"
      :class="[checkStatus ? 'provider-green' : 'provider-red']"
    >
      <div class="d-flex align-center justify-center order h3">
        Заказ {{ index + 1 }}
      </div>
      <div
        @mouseover="hover_orange = index + 1"
        @mouseleave="hover_orange = 0"
        @click.stop="goToProvider(item.provider)"
        class="d-flex align-center justify-center p"
        :class="{ 'orange-color': hover_orange == index + 1 }"
      >
        {{ item.provider.individual_name }}
      </div>
      <div class="d-flex align-center justify-center">
        <div class="cart mr-2">
          <img src="@/assets/image/icons/cart.svg" alt="" />
        </div>
        <p class="grey-color">{{ deliveryDate(item.statuses) }}</p>
      </div>
      <div v-if="item.order_items" class="d-flex align-center justify-center">
        <h3>{{ $price(calculatePrice(item.order_items)) }}</h3>
      </div>
      <div class="d-flex align-center justify-center">
        <img
          class="arrow"
          @click.stop
          @click="showMore()"
          :class="{ 'arrow-active': showmore }"
          src="@/assets/image/icons/orange-arrow.svg"
          alt=""
        />
      </div>
    </div>
    <div @click="showMore()" class="mobile_pointer d-flex flex-column pointer">
      <div
        class="basket_name d-flex align-center justify-space-between w100"
        :class="[checkStatus ? 'basket_name-green' : 'basket_name-red']"
      >
        <div class="d-flex align-center justify-start order h3">
          Заказ {{ index + 1 }}
        </div>
        <div class="d-flex align-center justify-center">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow"
            @click.stop
            @click="showMore()"
            :class="{ 'arrow-active': showmore }"
          >
            <path
              d="M4.62204 5.56356C4.82142 5.7938 5.17858 5.7938 5.37796 5.56356L9.47967 0.827327C9.7601 0.503505 9.53008 0 9.1017 0H0.898298C0.469922 0 0.239896 0.503505 0.520334 0.827327L4.62204 5.56356Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div
        class="
          d-flex
          align-center
          justify-space-between
          w100
          basket_description
        "
        :class="[checkStatus ? 'basket_name-green' : 'basket_name-red']"
      >
        <div class="cart mr-2">
          <img src="@/assets/image/icons/cart.svg" alt="" />
        </div>
        <div class="date">
          <p class="grey-color">{{ deliveryDate(item.statuses) }}</p>
          <div
            @mouseover="hover_orange = index + 1"
            @mouseleave="hover_orange = 0"
            @click.stop="goToProvider(item.provider)"
            class="d-flex align-center justify-center p hhh"
            :class="{ 'orange-color': hover_orange == index + 1 }"
          >
            {{ item.provider.individual_name }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showmore && item.order_items" class="">
      <OrderItem
        v-for="order_item in item.order_items"
        :key="order_item.id"
        :item="order_item"
        @fetchOrders="$emit('fetchOrders')"
      />
    </div>
  </div>
</template>

<script>
import OrderItem from "@/components/basket/OrderItem";
export default {
  data: () => ({
    showmore: false,
    hover_orange: 0
  }),
  components: { OrderItem },
  props: {
    item: Object,
    index: Number
  },
  computed: {
    checkStatus() {
      let result = false;
      let results_arr = [];
      this.item.order_items.map(e => {
        if (e.provider_product.purchase == "C") {
          if (e.amount < e.provider_product.min_count) results_arr.push(false);
          results_arr.push(true);
        }
        if (e.provider_product.purchase == "M") {
          if (
            e.amount *
              (e.provider_product.price -
                (e.provider_product.price * e.provider_product.discount) /
                  100) <
            e.provider_product.min_price
          )
            results_arr.push(false);
          results_arr.push(true);
        }
      });
      if (results_arr.includes(false)) result = false;
      else result = true;
      this.$store.commit("orderStatus", result);
      return result;
    }
  },
  created() {
    this.$emit("checkStatus", this.checkStatus);
  },
  methods: {
    goToProvider(provider) {
      this.$router.push(`/Products?provider[]=${provider.id}`);
    },
    calculatePrice(order_items) {
      let result = 0;
      order_items.map(e => {
        result += parseInt(e.price);
      });
      return result;
    },
    deliveryDate(statuses) {
      return this.$moment
        .unix(statuses[statuses.length - 1].created_at)
        .format("LLL");
    },
    showMore() {
      this.showmore = !this.showmore;
      this.$emit("showMore", this.showmore);
    }
  }
};
</script>

<style lang="scss" scoped>
.desktop_pointer {
  display: grid;
}
.mobile_pointer {
  display: none !important;
}
.provider {
  width: 100%;
  height: 50px;
  background: #e2f9e4;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 20% 20% 1fr 16% 9%;
}
.order {
  width: 100%;
  height: 50px;
  background: #52b059;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  @media (max-width: 600px) {
    background: transparent;
  }
}
.cart {
  width: 34px;
  height: 34px;
  border: 2px solid #dcdcdc;
  border-radius: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrow {
  cursor: pointer;
  transition: 0.22s;
  &-active {
    transform: rotate(180deg);
  }
}
.provider-green {
  .cart {
    border-color: #52b059;
  }
}
.provider-red {
  background: #fff0f0;
  .cart {
    border-color: #df4041;
  }
  .order {
    background: $red-color;
  }
}
@media screen and (max-width: 600px) {
  .desktop_pointer {
    display: none !important;
  }
  .mobile_pointer {
    display: flex !important;
    background: #e2f9e4;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    .basket_name {
      padding: 6px 15px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;

      &-green {
        background: #52b059;
        .cart {
          border-color: #52b059;
        }
      }
      &-red {
        background: $red-color;
        .cart {
          border-color: #df4041;
        }
      }
    }
    .basket_description {
      padding: 10px 15px;
      height: auto;
      background: #ffffff;
      border-bottom: 1px solid rgba(228, 228, 228, 1);
    }
  }
  .basket_description {
    .p {
      font-size: 17px;
      line-height: 22px;
    }
    .date {
      display: flex;
      align-items: center;
      justify-content: space-between;

      max-width: 100%;
      width: 100%;
    }
  }
  .order {
    height: 34px;
    font-size: 17px;
    line-height: 22px;
  }
}
@media screen and (max-width: 340px) {
  .basket_description {
    align-items: flex-start !important;

    .date {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
