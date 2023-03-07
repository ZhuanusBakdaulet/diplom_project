<template>
  <div class="d-flex align-center justify-space-between">
    <div v-if="!linktitle" class="title text-uppercase">{{ title }}</div>
    <nuxt-link to="/provider/Orders" v-else class="title text-uppercase">
      <svg
        class="mr-3"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.70711 0.292893C8.09763 0.683418 8.09763 1.31658 7.70711 1.70711L2.41421 7L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976318 7.31658 -0.0976317 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976312 7.31658 -0.0976311 7.70711 0.292893Z"
          fill="#7B8794"
        />
      </svg>
      {{ title }}
    </nuxt-link>
    <nuxt-link to="/provider/Profile" class="d-flex align-center">
      <p>
        {{
          $auth.user
            ? $auth.user.first_name + " " + $auth.user.last_name
            : "user"
        }}
      </p>
      <div class="ml-5 user">
        {{
          $auth.user
            ? $auth.user.first_name.charAt(0) + $auth.user.last_name.charAt(0)
            : "UU"
        }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: "provider",
  props: { title: String, linktitle: { type: Boolean, default: false } }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";
.title {
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.3px;
  color: #7b8794;
}
p {
  letter-spacing: 0.2px;
}
.user {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #52b059;
  border: 2px solid #ffffff;
  color: #fff;
  border-radius: 50%;
}
a {
  text-decoration: none;
}
</style>
