<template>
  <div class="">
    <v-container class="mt-7">
      <div class="d-flex btns mx-auto">
        <button
          class="green-btn-outline"
          @click="openSignUp"
          :class="{ 'green-btn-outline-active': sign == 'up' }"
        >
          Зарегистрироваться
        </button>
        <button
          class="green-btn-outline"
          @click="openSignIn"
          :class="{ 'green-btn-outline-active': sign == 'in' }"
        >
          Войти
        </button>
      </div>
      <div v-if="sign == 'in'" class="">
        <h2 class="fw400 mt-9">Войти</h2>
        <h3 class="grey-color fw400">
          Добро пожаловать в сервис покупок
        </h3>

        <v-form ref="signInForm" @submit.prevent="signIn" class="mt-7">
          <p class="fw500 mt-3">Номер телефона</p>
          <div class="d-flex">
            <div class="masks my-input-prepend mr-2">
              <v-select
                :items="phone_masks"
                v-model="selected_mask"
                class="my-input mt-2"
                solo
                hide-details
              >
              </v-select>
            </div>
            <v-text-field
              class="my-input mt-2"
              v-model="form.phone_number"
              solo
              :placeholder="selectedMask"
              v-mask="selectedMask"
              :rules="[rules.required]"
            >
            </v-text-field>
          </div>

          <p class="fw500 mt-3">Пароль</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.password"
            placeholder="Пароль"
            solo
            :rules="[
              rules.required,
              rules.password,
              iscorrect || error_message
            ]"
            @input="defaultErrors"
            :type="showPass ? 'password' : 'text'"
          >
            <template v-slot:append>
              <svg
                @click="showPass = !showPass"
                v-if="!showPass"
                class="ml-2 pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M18.9402 13.2995C17.7137 11.0787 15.0442 9.0625 12.0005 9.0625C8.9354 9.0625 6.27371 11.1033 5.06074 13.2995C4.9804 13.445 4.9804 13.6175 5.06074 13.763C6.2873 15.9838 8.95676 18 12.0005 18C15.4469 18 17.9873 15.4883 18.9402 13.763C19.0205 13.6175 19.0205 13.445 18.9402 13.2995ZM12.0005 16.9844C9.51832 16.9844 7.43478 15.4531 6.17746 13.5312C7.42086 11.6306 9.49776 10.0781 12.0005 10.0781C14.4925 10.0781 16.5732 11.6202 17.8235 13.5312C16.5604 15.4619 14.4685 16.9844 12.0005 16.9844ZM5.17282 7.82273C5.37489 7.61429 5.72071 7.59749 5.94517 7.78515L7.16317 8.80349C7.38761 8.99118 7.40574 9.31224 7.20364 9.52067C7.00154 9.72913 6.65573 9.74589 6.43129 9.55825L5.21329 8.53989C4.98885 8.35225 4.97072 8.03116 5.17282 7.82273ZM11.4536 7.53906V5.50781C11.4536 5.22737 11.6984 5 12.0005 5C12.3025 5 12.5473 5.22737 12.5473 5.50781V7.53906C12.5473 7.8195 12.3025 8.04688 12.0005 8.04688C11.6984 8.04688 11.4536 7.8195 11.4536 7.53906ZM7.98641 6.40804C7.86356 6.15182 7.98764 5.85165 8.26357 5.73757C8.53952 5.62349 8.86275 5.73871 8.98561 5.99493L9.82197 7.73927C9.94483 7.99546 9.82074 8.29565 9.54481 8.40973C9.26968 8.52346 8.94604 8.40938 8.82278 8.15237L7.98641 6.40804ZM16.7973 9.52067C16.5952 9.31227 16.6133 8.99118 16.8378 8.80349L18.0558 7.78515C18.2802 7.59749 18.626 7.61429 18.8281 7.82273C19.0302 8.03113 19.0121 8.35222 18.7877 8.53989L17.5697 9.55825C17.3451 9.74594 16.9994 9.72905 16.7973 9.52067ZM14.179 7.73927L15.0153 5.99493C15.1382 5.73871 15.4614 5.62349 15.7374 5.73757C16.0133 5.85165 16.1374 6.15182 16.0145 6.40804L15.1781 8.15235C15.0547 8.40973 14.7308 8.52328 14.4561 8.40973C14.1802 8.29565 14.0561 7.99548 14.179 7.73927ZM12.0005 11.0366C10.5191 11.0366 9.31395 12.1557 9.31395 13.5312C9.31395 14.9068 10.5191 16.0259 12.0005 16.0259C13.4818 16.0259 14.687 14.9068 14.687 13.5312C14.687 12.1557 13.4818 11.0366 12.0005 11.0366ZM12.0005 15.0103C11.1222 15.0103 10.4077 14.3468 10.4077 13.5312C10.4077 12.7157 11.1222 12.0522 12.0005 12.0522C12.8787 12.0522 13.5932 12.7157 13.5932 13.5312C13.5932 14.3468 12.8787 15.0103 12.0005 15.0103Z"
                    fill="#313131"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="14"
                      height="13"
                      fill="white"
                      transform="translate(5 5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                @click="showPass = !showPass"
                v-else
                class="ml-2 pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <mask
                    id="mask0"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="5"
                    y="9"
                    width="14"
                    height="10"
                  >
                    <path d="M5 19H19V9.8125H5V19Z" fill="#C4C4C4" />
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M18.9402 10.062C17.7136 12.4537 15.0442 14.625 12.0005 14.625C8.9354 14.625 6.27371 12.4272 5.06074 10.062C4.9804 9.90539 4.9804 9.71961 5.06074 9.56293C6.2873 7.17134 8.95676 5 12.0005 5C15.4469 5 17.9873 7.7049 18.9402 9.56296C19.0205 9.71961 19.0205 9.90539 18.9402 10.062ZM12.0005 6.09375C9.51832 6.09375 7.43478 7.74277 6.17746 9.8125C7.42086 11.8593 9.49776 13.5312 12.0005 13.5312C14.4925 13.5312 16.5732 11.8705 17.8235 9.8125C16.5604 7.73334 14.4685 6.09375 12.0005 6.09375ZM5.17282 15.9601C5.37489 16.1846 5.72071 16.2027 5.94517 16.0006L7.16317 14.9039C7.38761 14.7018 7.40574 14.356 7.20364 14.1316C7.00154 13.9071 6.65573 13.889 6.43129 14.0911L5.21329 15.1878C4.98885 15.3899 4.97072 15.7357 5.17282 15.9601ZM11.4536 16.2656V18.4531C11.4536 18.7551 11.6984 19 12.0005 19C12.3025 19 12.5473 18.7551 12.5473 18.4531V16.2656C12.5473 15.9636 12.3025 15.7188 12.0005 15.7188C11.6984 15.7188 11.4536 15.9636 11.4536 16.2656ZM7.98641 17.4837C7.86356 17.7596 7.98764 18.0828 8.26357 18.2057C8.53952 18.3285 8.86275 18.2045 8.98561 17.9285L9.82197 16.05C9.94483 15.7741 9.82074 15.4508 9.54481 15.328C9.26968 15.2055 8.94604 15.3284 8.82278 15.6051L7.98641 17.4837ZM16.7973 14.1316C16.5952 14.356 16.6133 14.7018 16.8378 14.9039L18.0558 16.0006C18.2802 16.2027 18.626 16.1846 18.8281 15.9601C19.0302 15.7357 19.0121 15.3899 18.7877 15.1878L17.5697 14.0911C17.3451 13.889 16.9994 13.9072 16.7973 14.1316ZM14.179 16.05L15.0153 17.9285C15.1382 18.2045 15.4614 18.3285 15.7374 18.2057C16.0133 18.0828 16.1374 17.7596 16.0145 17.4837L15.1781 15.6052C15.0547 15.328 14.7308 15.2057 14.4561 15.328C14.1802 15.4508 14.0561 15.7741 14.179 16.05Z"
                      fill="#313131"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="matrix(1 0 0 -1 5 19)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </template>
          </v-text-field>
          <p @click="forgot_modal = true" class="forgot-pass">
            Забыли пароль?
          </p>
          <button type="submit" class="green-btn submit mx-auto mt-12">
            Войти
          </button>
        </v-form>
      </div>
      <div v-else class="">
        <h2 class="fw400 mt-9">Регистрация</h2>
        <h3 class="grey-color fw400">Добро пожаловать в сервис покупок</h3>

        <v-form ref="signUpForm" @submit.prevent="signUp" class="mt-7">
          <p class="fw500 mt-3">Страна</p>
          <v-select
            class="my-input mt-2"
            :items="countries"
            item-text="name"
            item-value="id"
            v-model="form.country"
            placeholder="Выбирете страну"
            solo
            :rules="[rules.required]"
            no-data-text="Ничего не найдено"
            @input="handleInput"
          ></v-select>

          <p class="fw500 mt-3">Город</p>
          <v-select
            class="my-input mt-2"
            :items="cities"
            item-text="name"
            item-value="id"
            v-model="form.city"
            placeholder="Выбирете город"
            solo
            :rules="[chooseCountry || 'Выберите страну', rules.required]"
            :readonly="form.country ? false : true"
            no-data-text="Ничего не найдено"
          ></v-select>

          <p class="fw500 mt-3">Номер телефона</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.phone_number"
            placeholder="+7 7"
            solo
            v-mask="mask"
            :rules="[
              chooseCountry || 'Выберите страну',
              rules.required,
              e_phone_number || em_phone_number
            ]"
            :readonly="form.country ? false : true"
          ></v-text-field>

          <p class="fw500 mt-3">Пароль</p>
          <v-text-field
            class="my-input mt-2"
            v-model="form.password"
            placeholder="Пароль"
            solo
            :rules="[rules.required, rules.password, e_password || em_password]"
            :type="showPass ? 'password' : 'text'"
          >
            <template v-slot:append>
              <svg
                @click="showPass = !showPass"
                v-if="!showPass"
                class="ml-2 pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M18.9402 13.2995C17.7137 11.0787 15.0442 9.0625 12.0005 9.0625C8.9354 9.0625 6.27371 11.1033 5.06074 13.2995C4.9804 13.445 4.9804 13.6175 5.06074 13.763C6.2873 15.9838 8.95676 18 12.0005 18C15.4469 18 17.9873 15.4883 18.9402 13.763C19.0205 13.6175 19.0205 13.445 18.9402 13.2995ZM12.0005 16.9844C9.51832 16.9844 7.43478 15.4531 6.17746 13.5312C7.42086 11.6306 9.49776 10.0781 12.0005 10.0781C14.4925 10.0781 16.5732 11.6202 17.8235 13.5312C16.5604 15.4619 14.4685 16.9844 12.0005 16.9844ZM5.17282 7.82273C5.37489 7.61429 5.72071 7.59749 5.94517 7.78515L7.16317 8.80349C7.38761 8.99118 7.40574 9.31224 7.20364 9.52067C7.00154 9.72913 6.65573 9.74589 6.43129 9.55825L5.21329 8.53989C4.98885 8.35225 4.97072 8.03116 5.17282 7.82273ZM11.4536 7.53906V5.50781C11.4536 5.22737 11.6984 5 12.0005 5C12.3025 5 12.5473 5.22737 12.5473 5.50781V7.53906C12.5473 7.8195 12.3025 8.04688 12.0005 8.04688C11.6984 8.04688 11.4536 7.8195 11.4536 7.53906ZM7.98641 6.40804C7.86356 6.15182 7.98764 5.85165 8.26357 5.73757C8.53952 5.62349 8.86275 5.73871 8.98561 5.99493L9.82197 7.73927C9.94483 7.99546 9.82074 8.29565 9.54481 8.40973C9.26968 8.52346 8.94604 8.40938 8.82278 8.15237L7.98641 6.40804ZM16.7973 9.52067C16.5952 9.31227 16.6133 8.99118 16.8378 8.80349L18.0558 7.78515C18.2802 7.59749 18.626 7.61429 18.8281 7.82273C19.0302 8.03113 19.0121 8.35222 18.7877 8.53989L17.5697 9.55825C17.3451 9.74594 16.9994 9.72905 16.7973 9.52067ZM14.179 7.73927L15.0153 5.99493C15.1382 5.73871 15.4614 5.62349 15.7374 5.73757C16.0133 5.85165 16.1374 6.15182 16.0145 6.40804L15.1781 8.15235C15.0547 8.40973 14.7308 8.52328 14.4561 8.40973C14.1802 8.29565 14.0561 7.99548 14.179 7.73927ZM12.0005 11.0366C10.5191 11.0366 9.31395 12.1557 9.31395 13.5312C9.31395 14.9068 10.5191 16.0259 12.0005 16.0259C13.4818 16.0259 14.687 14.9068 14.687 13.5312C14.687 12.1557 13.4818 11.0366 12.0005 11.0366ZM12.0005 15.0103C11.1222 15.0103 10.4077 14.3468 10.4077 13.5312C10.4077 12.7157 11.1222 12.0522 12.0005 12.0522C12.8787 12.0522 13.5932 12.7157 13.5932 13.5312C13.5932 14.3468 12.8787 15.0103 12.0005 15.0103Z"
                    fill="#313131"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="14"
                      height="13"
                      fill="white"
                      transform="translate(5 5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                @click="showPass = !showPass"
                v-else
                class="ml-2 pointer"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <mask
                    id="mask0"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="5"
                    y="9"
                    width="14"
                    height="10"
                  >
                    <path d="M5 19H19V9.8125H5V19Z" fill="#C4C4C4" />
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M18.9402 10.062C17.7136 12.4537 15.0442 14.625 12.0005 14.625C8.9354 14.625 6.27371 12.4272 5.06074 10.062C4.9804 9.90539 4.9804 9.71961 5.06074 9.56293C6.2873 7.17134 8.95676 5 12.0005 5C15.4469 5 17.9873 7.7049 18.9402 9.56296C19.0205 9.71961 19.0205 9.90539 18.9402 10.062ZM12.0005 6.09375C9.51832 6.09375 7.43478 7.74277 6.17746 9.8125C7.42086 11.8593 9.49776 13.5312 12.0005 13.5312C14.4925 13.5312 16.5732 11.8705 17.8235 9.8125C16.5604 7.73334 14.4685 6.09375 12.0005 6.09375ZM5.17282 15.9601C5.37489 16.1846 5.72071 16.2027 5.94517 16.0006L7.16317 14.9039C7.38761 14.7018 7.40574 14.356 7.20364 14.1316C7.00154 13.9071 6.65573 13.889 6.43129 14.0911L5.21329 15.1878C4.98885 15.3899 4.97072 15.7357 5.17282 15.9601ZM11.4536 16.2656V18.4531C11.4536 18.7551 11.6984 19 12.0005 19C12.3025 19 12.5473 18.7551 12.5473 18.4531V16.2656C12.5473 15.9636 12.3025 15.7188 12.0005 15.7188C11.6984 15.7188 11.4536 15.9636 11.4536 16.2656ZM7.98641 17.4837C7.86356 17.7596 7.98764 18.0828 8.26357 18.2057C8.53952 18.3285 8.86275 18.2045 8.98561 17.9285L9.82197 16.05C9.94483 15.7741 9.82074 15.4508 9.54481 15.328C9.26968 15.2055 8.94604 15.3284 8.82278 15.6051L7.98641 17.4837ZM16.7973 14.1316C16.5952 14.356 16.6133 14.7018 16.8378 14.9039L18.0558 16.0006C18.2802 16.2027 18.626 16.1846 18.8281 15.9601C19.0302 15.7357 19.0121 15.3899 18.7877 15.1878L17.5697 14.0911C17.3451 13.889 16.9994 13.9072 16.7973 14.1316ZM14.179 16.05L15.0153 17.9285C15.1382 18.2045 15.4614 18.3285 15.7374 18.2057C16.0133 18.0828 16.1374 17.7596 16.0145 17.4837L15.1781 15.6052C15.0547 15.328 14.7308 15.2057 14.4561 15.328C14.1802 15.4508 14.0561 15.7741 14.179 16.05Z"
                      fill="#313131"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="14"
                      height="14"
                      fill="white"
                      transform="matrix(1 0 0 -1 5 19)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </template>
          </v-text-field>

          <div class="mt-3 d-flex mx-auto type-user">
            <button
              type="button"
              @click="form.user_type = 'E'"
              class="mortal"
              :class="{ 'mortal-active': form.user_type == 'E' }"
            >
              Я предприниматель
            </button>
            <button
              type="button"
              @click="form.user_type = 'I'"
              class="mortal"
              :class="{ 'mortal-active': form.user_type == 'I' }"
            >
              Я частное лицо
            </button>
          </div>
          <button type="submit" class="green-btn submit mx-auto mt-12">
            Зарегистрироваться
          </button>
        </v-form>
      </div>
      <div class="d-flex justify-center align-center mt-4">
        <nuxt-link to="/provider/Login" class="h3 grey-color text-center mt-4">
          Войти как поставщик
        </nuxt-link>
      </div>
    </v-container>
    <v-dialog
      v-model="verify_modal"
      persistent
      width="427"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card class="pa-7 text-center">
        <h2>Сменить номер</h2>

        <h3 class="fw400 mt-4">
          Код отправлен на номер <br />
          {{ this.form.phone_number }}, введите код!
        </h3>
        <v-form @submit.prevent="phoneActivation" ref="verifyRef" class="mt-5">
          <p class="fw500 mt-3 text-left">Введите код</p>
          <v-text-field
            class="my-input mt-2"
            v-model="verifyForm.secret_code"
            solo
            type="number"
            placeholder="Введите код"
            :rules="[rules.required]"
            hide-details
          ></v-text-field>

          <p
            @click="resendVerification"
            type="button"
            class="s orange-color text-right pointer"
          >
            переотправить
          </p>

          <button type="submit" class="orange-btn mx-auto mt-7">
            Отправить
          </button>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="forgot_modal"
      width="427"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card class="pa-7 text-center relative">
        <svg
          class="pointer close"
          @click="forgot_modal = false"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5ZM2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15ZM9.74112 9.74112C10.2293 9.25296 11.0207 9.25296 11.5089 9.74112L15 13.2322L18.4911 9.74112C18.9793 9.25296 19.7707 9.25296 20.2589 9.74112C20.747 10.2293 20.747 11.0207 20.2589 11.5089L16.7678 15L20.2589 18.4911C20.747 18.9793 20.747 19.7707 20.2589 20.2589C19.7707 20.747 18.9793 20.747 18.4911 20.2589L15 16.7678L11.5089 20.2589C11.0207 20.747 10.2293 20.747 9.74112 20.2589C9.25296 19.7707 9.25296 18.9793 9.74112 18.4911L13.2322 15L9.74112 11.5089C9.25296 11.0207 9.25296 10.2293 9.74112 9.74112Z"
            fill="#FF7A29"
          />
        </svg>

        <h2>Забыли пароль?</h2>

        <v-form
          @submit.prevent="submitForgotPassword"
          ref="forgotRef"
          class="mt-5 text-left"
        >
          <p class="fw600">Введите номер</p>
          <p class="small grey-color">
            Новый пароль придет к вам в виде сообщения
          </p>
          <v-text-field
            class="my-input mt-3"
            v-model="forgotForm.phone_number"
            solo
            placeholder="Текущий номер"
            :rules="[rules.required]"
            hide-details
          ></v-text-field>

          <button type="submit" class="orange-btn mx-auto mt-7">
            Отправить
          </button>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="verify_forgot_modal"
      width="427"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card class="pa-7 text-center relative">
        <svg
          class="pointer close"
          @click="verify_forgot_modal = false"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25C20.5228 25 25 20.5228 25 15C25 9.47715 20.5228 5 15 5ZM2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5C8.09644 27.5 2.5 21.9036 2.5 15ZM9.74112 9.74112C10.2293 9.25296 11.0207 9.25296 11.5089 9.74112L15 13.2322L18.4911 9.74112C18.9793 9.25296 19.7707 9.25296 20.2589 9.74112C20.747 10.2293 20.747 11.0207 20.2589 11.5089L16.7678 15L20.2589 18.4911C20.747 18.9793 20.747 19.7707 20.2589 20.2589C19.7707 20.747 18.9793 20.747 18.4911 20.2589L15 16.7678L11.5089 20.2589C11.0207 20.747 10.2293 20.747 9.74112 20.2589C9.25296 19.7707 9.25296 18.9793 9.74112 18.4911L13.2322 15L9.74112 11.5089C9.25296 11.0207 9.25296 10.2293 9.74112 9.74112Z"
            fill="#FF7A29"
          />
        </svg>

        <v-form
          @submit.prevent="submitForgotVerifyPassword"
          ref="forgotVerifyRef"
          class="mt-5 text-left"
        >
          <p class="fw600">Введите Код</p>

          <v-text-field
            class="my-input mt-3"
            v-model="forgotForm.secret_code"
            solo
            placeholder="Код"
            :rules="[rules.required]"
            type="number"
            hide-details
          ></v-text-field>

          <p class="fw600">Новый пароль</p>
          <v-text-field
            class="my-input mt-3"
            v-model="forgotForm.new_password"
            solo
            placeholder="новый пароль"
            type="password"
            :rules="[rules.required, rules.password]"
            hide-details
          ></v-text-field>

          <button type="submit" class="orange-btn mx-auto mt-7">
            Отправить
          </button>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import login from "@/mixins/login";
export default {
  mixins: [login]
};
</script>

<style lang="scss" scoped>
.btns {
  width: 100%;
  max-width: 345px;
  border: 1px solid $green-color;
  border-radius: 5px;
  button {
    height: 35px;
    &:first-child {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    &:last-child {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  .green-btn-outline {
    border: none;

    color: $black-color;
    &:hover {
      background: $green-color;
      color: #fff;
    }
    &-active {
      color: #fff;
      background: $green-color;
    }
  }
}
.grey-color {
  color: $grey-color;
}
.orange-color {
  color: $orange-color;
}
.masks {
  width: 70px;
}
.type {
  transition: 0.22s;
  color: white;
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    padding: 0 18px;
    border: 1px solid #ff7a29;
    box-sizing: border-box;
    border-radius: 3px;

    cursor: pointer;
    &-left {
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &-right {
      border-left: none;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &-active {
    background: #ff7a29;
    color: white;

    &-left {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    &-right {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
}
.type-user {
  width: 100%;
  max-width: 345px;
  height: 35px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-sizing: border-box;
  border-radius: 5px;

  .mortal {
    width: 100%;
    font-size: 13px;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #252626;
    background: #ffffff;
    transition: 0.22s;

    &-active {
      background: #ff7a29;
      color: #fff;
      &:first-child {
        border-right: 1px solid $orange-color;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &:last-child {
        border-left: 1px solid $orange-color;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
  }
}
.forgot-pass {
  margin-left: auto;
  font-size: 13px;
  line-height: 16px;
  color: #ff7a29;
  cursor: pointer;
  text-align: right;
}
</style>
