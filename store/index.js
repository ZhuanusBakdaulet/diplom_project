export const state = () => ({
  profile_menu: "personalInfo",
  provider_menu: "Categories",
  admin_menu: "/",
  client_type: "S",
  basket: [],
  basketPrice: 0,
  liked: [],
  liked_providers: [],
  order_items_status: false,
  order_status: false,
  snack: {},
  notification_count: 0,
  all_cities: [],
  my_city: {}
});

export const mutations = {
  async setNotifications(state, payload) {
    state.notification_count = payload;
  },
  showSnack(state, payload) {
    state.snack = payload;
  },
  changeProfileMenu(state, payload) {
    state.profile_menu = payload;
  },
  changeProviderMenu(state, payload) {
    state.provider_menu = payload;
  },
  changeAdminMenu(state, payload) {
    state.admin_menu = payload;
  },
  setClientType(state, payload) {
    if (payload == "E") state.client_type = "P";
    else state.client_type = "S";
  },
  setBasket(state, payload) {
    state.basket = payload;
  },
  countPriceOfBasket(state, payload) {
    state.basketPrice = 0;
    payload.map(e => {
      if (parseInt(e.total_price)) state.basketPrice += parseInt(e.total_price);
      else state.basketPrice += 0;
    });
  },
  setLikedProviders(state, payload) {
    let arr = [];
    payload.map(e => {
      arr.push(e.id);
    });
    state.liked_providers = arr;
  },
  setLiked(state, payload) {
    let arr = [];
    payload.map(e => {
      arr.push(e.id);
    });
    state.liked = arr;
  },
  addToLiked(state, payload) {
    if (!state.liked.includes(payload)) state.liked.push(payload);
  },
  addToLikedProviders(state, payload) {
    if (!state.liked_providers.includes(payload))
      state.liked_providers.push(payload);
  },
  removeFromLiked(state, payload) {
    let index = state.liked.indexOf(payload);
    if (index > -1) state.liked.splice(index, 1);
  },
  removeFromLikedProviders(state, payload) {
    let index = state.liked_providers.indexOf(payload);
    if (index > -1) state.liked_providers.splice(index, 1);
  },
  orderStatus(state, payload) {
    state.order_status = payload;
  },
  setAllCities(state, payload) {
    state.all_cities = payload;
  },
  setMyCity(state, payload) {
    state.my_city = payload;
  }
};

export const actions = {
  findAlmaty({ commit }, payload) {
    let findCity = city => {
      return city.name == "Almaty"
        ? true
        : city.name == "Алматы"
        ? true
        : false;
    };

    let result = payload.find(findCity);
    if (!result && payload[0]) result = payload[0];

    commit("setMyCity", result);
  },
  async fetchAllCities({ commit, dispatch }) {
    await this.$axios
      .$get(`geo/cities/`)
      .then(res => {
        commit("setAllCities", res.results);
        dispatch("findAlmaty", res.results);
      })
      .catch(err => {
        console.log(err);
      });
  },
  async resetNotifications({ commit, state }) {
    if (state.auth.loggedIn) {
      let body = {
        user_notification: 0
      };
      try {
        await this.$axios.$patch(`auth/users/me/`, body);
        commit("setNotifications", 0);
      } catch (err) {
        console.log(err);
      }
    }
  },
  async fetchNotifications({ commit, state }) {
    commit("setNotifications", state.auth.user.user_notification);
  },
  async fetchFavoriteProducts({ commit, state }) {
    if (
      state.auth.user.user_type != "P" &&
      state.auth.user.user_type != "S" &&
      state.auth.user.user_type != "C"
    ) {
      const products = await this.$axios.$get(`favorites/products/`);
      commit("setLiked", products.results);
    } else commit("setLiked", []);
  },
  async fetchFavoriteProviders({ commit, state }) {
    if (
      state.auth.user.user_type != "P" &&
      state.auth.user.user_type != "S" &&
      state.auth.user.user_type != "C"
    ) {
      const providers = await this.$axios.$get(`favorites/providers/`);
      commit("setLikedProviders", providers.results);
    } else commit("setLikedProviders", []);
  },
  async fetchBasket({ commit, state }) {
    let user_type = "I";
    if (state.auth.loggedIn) user_type = state.auth.user.user_type;

    commit("setClientType", user_type);

    let params = {
      status: 1,
      user_type: state.client_type
    };
    if (process.client) {
      if (!localStorage.session_key) localStorage.setItem("session_key", "");
      params.session_key = localStorage.session_key;
    }
    if (
      state.auth.loggedIn &&
      (state.auth.user.is_superuser ||
        state.auth.user.is_staff ||
        state.auth.user.user_type == "P" ||
        state.auth.user.user_type == "S")
    ) {
      commit("countPriceOfBasket", []);
      return;
    }

    const basket = await this.$axios.$get(`order-items/`, { params });
    commit("setBasket", basket.results);

    const order = await this.$axios.$get(`orders/`, { params });
    commit("countPriceOfBasket", order.results);
  },

  async nuxtServerInit({ commit, dispatch }, { store }) {
    dispatch("fetchAllCities");

    if (store.state.auth.loggedIn) {
      dispatch("fetchNotifications");

      let user_type = store.state.auth.user.user_type;

      commit("setClientType", user_type);
      if (user_type == "E" || user_type == "I") {
        await dispatch("fetchBasket");
        await dispatch("fetchFavoriteProducts");
        await dispatch("fetchFavoriteProviders");
      }
    } else {
      commit("setBasket", []);
      commit("setClientType", "I");
    }
  }
};

export const getters = {
  getAllCities: state => {
    return state.all_cities;
  },
  getMyCity: state => {
    return state.my_city;
  }
};
