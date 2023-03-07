<template>
  <div class="menu">
    <div
      v-if="$auth.loggedIn"
      @click="changeMenu('personalInfo')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'personalInfo' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8ZM8 18C6.34315 18 5 19.3431 5 21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21C3 18.2386 5.23858 16 8 16H16C18.7614 16 21 18.2386 21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 19.3431 17.6569 18 16 18H8Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Личный кабинет</p>
    </div>
    <div
      v-if="$auth.loggedIn && $isClient()"
      @click="changeMenu('orders')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'orders' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.1421 4.00014L6.00913 16.1358C6.02271 16.236 6.05113 16.3314 6.0921 16.4199C6.21543 16.6862 6.45246 16.8891 6.74088 16.9662C6.82899 16.9899 6.92133 17.0017 7.01578 17.0001H18C18.4416 17.0001 18.8309 16.7105 18.9578 16.2875L21.9578 6.28749C22.0487 5.98471 21.991 5.65682 21.8023 5.40321C21.6136 5.1496 21.3161 5.00014 21 5.00014H6.31948L5.99058 2.86233C5.97826 2.77295 5.95413 2.68733 5.91981 2.60712C5.85751 2.46104 5.76213 2.33451 5.64429 2.23533C5.53497 2.14314 5.40561 2.07396 5.26367 2.03526C5.17434 2.0108 5.0806 1.99855 4.9847 2.00014H3C2.44772 2.00014 2 2.44785 2 3.00014C2 3.55242 2.44772 4.00014 3 4.00014H4.1421ZM7.85794 15.0001L6.62717 7.00014H19.656L17.256 15.0001H7.85794Z"
            fill="#888583"
          />
          <path
            d="M10 20.0001C10 21.1047 9.10457 22.0001 8 22.0001C6.89543 22.0001 6 21.1047 6 20.0001C6 18.8956 6.89543 18.0001 8 18.0001C9.10457 18.0001 10 18.8956 10 20.0001Z"
            fill="#888583"
          />
          <path
            d="M19 20.0001C19 21.1047 18.1046 22.0001 17 22.0001C15.8954 22.0001 15 21.1047 15 20.0001C15 18.8956 15.8954 18.0001 17 18.0001C18.1046 18.0001 19 18.8956 19 20.0001Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Мои заказы</p>
    </div>
    <div
      v-if="$isClient()"
      @click="changeMenu('stared')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'stared' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.5C12.3788 2.5 12.7251 2.714 12.8945 3.05279L15.4734 8.2106L21.144 9.03541C21.5206 9.0902 21.8335 9.35402 21.9511 9.71599C22.0687 10.078 21.9706 10.4753 21.6981 10.741L17.571 14.7649L18.4994 20.4385C18.5608 20.8135 18.4043 21.1908 18.0957 21.4124C17.787 21.6339 17.3794 21.6614 17.0438 21.4834L12 18.8071L6.95624 21.4834C6.62062 21.6614 6.21306 21.6339 5.9044 21.4124C5.59573 21.1908 5.4393 20.8135 5.50065 20.4385L6.42906 14.7649L2.30193 10.741C2.02942 10.4753 1.93136 10.078 2.04897 9.71599C2.16658 9.35402 2.47946 9.0902 2.85609 9.03541L8.5267 8.2106L11.1056 3.05279C11.275 2.714 11.6213 2.5 12 2.5ZM12 5.73607L10.082 9.57221C9.93561 9.86491 9.65531 10.0675 9.33147 10.1146L5.14842 10.723L8.19813 13.6965C8.43182 13.9243 8.53961 14.2519 8.4869 14.574L7.80004 18.7715L11.5313 16.7917C11.8244 16.6361 12.1756 16.6361 12.4687 16.7917L16.2 18.7715L15.5132 14.574C15.4604 14.2519 15.5682 13.9243 15.8019 13.6965L18.8516 10.723L14.6686 10.1146C14.3448 10.0675 14.0645 9.86491 13.9181 9.57221L12 5.73607Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Избранное</p>
    </div>
    <div
      v-if="$auth.loggedIn && !$isAdmin() && !$isCallCenter()"
      @click="changeMenu('notification')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'notification' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1461 3.24812C10.4433 2.51616 11.1614 2 12 2C12.8386 2 13.5567 2.51616 13.8539 3.24812C16.8202 4.06072 19 6.77579 19 10V14.6972L20.8321 17.4453C21.0366 17.7522 21.0557 18.1467 20.8817 18.4719C20.7077 18.797 20.3688 19 20 19H15.4646C15.2219 20.6961 13.7632 22 12 22C10.2368 22 8.77806 20.6961 8.53545 19H4C3.63121 19 3.29235 18.797 3.11833 18.4719C2.94431 18.1467 2.96338 17.7522 3.16795 17.4453L5 14.6972V10C5 6.77579 7.17983 4.06072 10.1461 3.24812ZM10.5854 19C10.7913 19.5826 11.3469 20 12 20C12.6531 20 13.2087 19.5826 13.4146 19H10.5854ZM12 5C9.23858 5 7 7.23858 7 10V15C7 15.1974 6.94156 15.3904 6.83205 15.5547L5.86852 17H18.1315L17.168 15.5547C17.0584 15.3904 17 15.1974 17 15V10C17 7.23858 14.7614 5 12 5Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p class="relative">
        Уведомления
        <span v-if="$store.state.notification_count" class="count">
          {{ $store.state.notification_count }}
        </span>
      </p>
    </div>
    <div
      v-if="$auth.loggedIn && !$isAdmin() && !$isProvider() && !$isCallCenter()"
      @click="changeMenu('Promotions')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'Promotions' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
            fill="#888583"
          />
          <path
            d="M17 19C18.1046 19 19 18.1046 19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17C15 18.1046 15.8954 19 17 19Z"
            fill="#888583"
          />
          <path
            d="M7 9C8.10457 9 9 8.10457 9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p class="relative">Акции</p>
    </div>

    <div
      v-if="$auth.loggedIn && !$isAdmin() && !$isProvider() && !$isCallCenter()"
      @click="changeMenu('address')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'address' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C7.6 2 4 5.6 4 10C4 15.4 11 21.5 11.3 21.8C11.5 21.9 11.8 22 12 22C12.2 22 12.5 21.9 12.7 21.8C13 21.5 20 15.4 20 10C20 5.6 16.4 2 12 2ZM12 19.7C9.9 17.7 6 13.4 6 10C6 6.7 8.7 4 12 4C15.3 4 18 6.7 18 10C18 13.3 14.1 17.7 12 19.7ZM12 6C9.8 6 8 7.8 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 7.8 14.2 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Адрес доставки</p>
    </div>
    <!-- <div
      v-if="$isClient()"
      @click="changeMenu('taxes')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'taxes' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8L14 4.41421V8H17.5858ZM12 4L6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4ZM8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13ZM8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Налоги отчетности</p>
    </div> -->
    <div
      @click="changeMenu('helpfullinfo')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'helpfullinfo' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
            fill="#888583"
          />
          <path
            d="M12 10C12.5523 10 13 10.4477 13 11V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11C11 10.4477 11.4477 10 12 10Z"
            fill="#888583"
          />
          <path
            d="M13.5 7.5C13.5 8.32843 12.8284 9 12 9C11.1716 9 10.5 8.32843 10.5 7.5C10.5 6.67157 11.1716 6 12 6C12.8284 6 13.5 6.67157 13.5 7.5Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Полезная информация</p>
    </div>
    <div
      v-if="$auth.loggedIn"
      @click="changeMenu('chats')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'chats' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6ZM5.51859 6L12 11.6712L18.4814 6H5.51859ZM20 7.32877L12.6585 13.7526C12.2815 14.0825 11.7185 14.0825 11.3415 13.7526L4 7.32877V18H20V7.32877Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Чаты</p>
    </div>
    <div
      @click="changeMenu('faq')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'faq' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
            fill="#888583"
          />
          <path
            d="M12 14C11.4477 14 11 13.5523 11 13V12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V13C13 13.5523 12.5523 14 12 14Z"
            fill="#888583"
          />
          <path
            d="M10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5Z"
            fill="#888583"
          />
          <path
            d="M12.3899 7.81137C11.4329 7.7658 10.6304 8.3004 10.4864 9.1644C10.3956 9.70917 9.88037 10.0772 9.3356 9.9864C8.79083 9.8956 8.42281 9.38037 8.51361 8.8356C8.86961 6.69961 10.8171 5.73421 12.4851 5.81363C13.3395 5.85432 14.2176 6.16099 14.8937 6.79278C15.5866 7.44027 16 8.36777 16 9.5C16 10.7913 15.4919 11.7489 14.6172 12.3321C13.8141 12.8675 12.8295 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.6705 11 13.1859 10.8825 13.5078 10.668C13.7581 10.5011 14 10.2087 14 9.5C14 8.88224 13.7884 8.49723 13.5282 8.2541C13.2512 7.99526 12.848 7.83318 12.3899 7.81137Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Вопросы и ответы</p>
    </div>
    <div
      v-if="$isCallCenter()"
      @click="changeMenu('Consultation')"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'Consultation' }"
    >
      <div class="icon ml-3 mr-4">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19 6H18V5C18 3.34315 16.6569 2 15 2H5C3.34315 2 2 3.34315 2 5V12C2 13.6569 3.34315 15 5 15V17C5.00114 17.3766 5.21372 17.7206 5.55 17.89C5.688 17.9649 5.84302 18.0028 6 18C6.21637 18 6.4269 17.9298 6.6 17.8C7.16656 18.5554 8.05573 19 9 19H13.67L17.4 21.8C17.5731 21.9298 17.7836 22 18 22C18.157 22.0028 18.312 21.9649 18.45 21.89C18.7863 21.7205 18.9989 21.3766 19 21V19C20.6569 19 22 17.6569 22 16V9C22 7.34315 20.6569 6 19 6ZM7 15V14C7 13.4477 6.55228 13 6 13H5C4.44772 13 4 12.5523 4 12V5C4 4.44772 4.44772 4 5 4H15C15.5523 4 16 4.44772 16 5V12C16 12.5523 15.5523 13 15 13H10C9.78363 13 9.5731 13.0702 9.4 13.2L7 15ZM19 17C19.5523 17 20 16.5523 20 16V9C20 8.44772 19.5523 8 19 8H18V12C18 13.6569 16.6569 15 15 15H10.33L8.22003 16.59C8.40255 16.84 8.69058 16.9914 9.00003 17H14C14.2164 17 14.4269 17.0702 14.6 17.2L17 19V18C17 17.4477 17.4477 17 18 17H19Z"
            fill="#888583"
          />
        </svg>
      </div>
      <p>Консультация</p>
    </div>
    <div
      v-if="$auth.loggedIn"
      @click="logout"
      class="d-flex align-center menu-item"
      :class="{ 'menu-item-active': active == 'logout' }"
    >
      <div class="icon ml-3 mr-4"></div>
      <p class="grey-color">Выйти</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 1,
  }),
  props: {
    notifications: { default: 0, type: Number },
  },
  created() {
    this.active = this.$store.state.profile_menu;
  },
  watch: {
    "$store.state.profile_menu"() {
      this.active = this.$store.state.profile_menu;
    },
  },
  methods: {
    async logout() {
      this.$store.commit("changeProfileMenu", "personalInfo");
      await this.$auth.logout().then(() => {
        this.$router.push("/");
      });
    },
    changeMenu(menu) {
      let results = {
        orders: "/Profile/Order",
        helpfullinfo: "/Profile/Info",
        chats: "/Profile/Chats",
        faq: "/Profile/FaQ",
        notification: "/Profile/Notifications",
        address: "/Profile/Address",
        Promotions: "/Profile/Promotions",
        personalInfo: "/Profile/Person",
        stared: "/Profile/Likes",
        taxes: "/Profile/Taxes",
        Consultation: "/Profile/Consultation/",
      };

      if (!results[menu]) this.$router.push("/Profile");
      else this.$router.push(`${results[menu]}`);

      if (menu == "logout") {
        this.logout();
        return;
      }

      this.active = menu;
      this.$store.commit("changeProfileMenu", menu);
      this.$emit("changeMenu", menu);
    },
  },
};
</script>

<style lang="scss" scoped>
.count {
  position: absolute;
  right: -14px;
  top: -6px;
  width: 14px;
  height: 14px;
  background: #ff7a29;
  color: #fff;
  font-weight: 600;
  font-size: 8px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.menu {
  width: 100%;
  max-width: 310px;
  background: #ffffff;
  border-radius: 5px;
  &-item {
    width: 100%;
    height: 50px;
    border-left: 3px solid transparent;
    cursor: pointer;
    &:hover,
    &-active {
      border-color: $orange-color;
      svg {
        path {
          fill: $orange-color;
        }
      }
    }
  }
}
.icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 630px) {
  .menu {
    display: none;
  }
}
</style>
