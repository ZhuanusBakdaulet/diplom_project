<template>
  <div>
    <div class="nav d-flex align-center d-sm-none mb-5" @click="goBack">
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
      <h4 class="w100">Профиль</h4>
    </div>
    <div
      class="
        d-flex
        flex-column flex-sm-row
        justify-space-between
        w100
        align-start
        white-bg
        py-10
        px-4 px-sm-16
      "
    >
      <div class="avatar">
        <div class="avatar-image">
          <img
            v-if="user.avatar"
            width="100"
            height="100"
            :src="user.avatar"
            alt=""
          />
          <img v-else src="@/assets/image/photos/default.svg" alt="" />
          <v-file-input
            class="d-none"
            ref="avatar"
            v-model="avatar"
            accept="image/*"
            show-size
            truncate-length="15"
            @change="fileChanged"
          >
          </v-file-input>
        </div>
        <p @click="changeImage" class="mt-1 pointer text-center">Изменить</p>
      </div>
      <v-form class="w100" ref="changesForm" @submit.prevent="submitChages">
        <p class="grey-color">Имя</p>
        <v-text-field
          class="my-input mt-2"
          v-model="user.first_name"
          placeholder="Имя"
          solo
        ></v-text-field>

        <p class="grey-color mt-1">Фамилия</p>
        <v-text-field
          class="my-input mt-2"
          v-model="user.last_name"
          placeholder="Фамилия"
          solo
        ></v-text-field>

        <p class="grey-color mt-1">Email</p>
        <v-text-field
          class="my-input mt-2"
          v-model="user.email"
          placeholder="email@test.com"
          solo
          readonly
        >
          <template v-slot:append>
            <div type="button" @click="email_modal = true" class="changePass">
              Сменить email
            </div>
          </template>
        </v-text-field>

        <p class="grey-color mt-4">Страна</p>
        <v-select
          :items="countries"
          item-value="id"
          item-text="name"
          class="my-input mt-2"
          v-model="user.country"
          solo
          @input="fetchCities"
        ></v-select>

        <p class="grey-color mt-4">Город</p>
        <v-select
          :items="cities"
          item-value="id"
          item-text="name"
          class="my-input mt-2"
          v-model="user.city"
          solo
          :readonly="!user.country"
        ></v-select>

        <p class="grey-color mt-4">Адрес</p>
        <v-text-field
          class="my-input mt-2"
          v-model="user.address"
          solo
          readonly
        >
          <template v-slot:append>
            <nuxt-link to="/Profile/Address" type="button" class="changePass">
              Сменить адрес
            </nuxt-link>
          </template>
        </v-text-field>

        <p class="grey-color mt-4">Телефон</p>
        <v-text-field
          class="my-input mt-2"
          v-model="user.phone_number"
          :rules="[rules.required]"
          solo
          readonly
        >
          <template v-slot:append>
            <div type="button" @click="phone_modal = true" class="changePass">
              Сменить номер
            </div>
          </template>
        </v-text-field>

        <p class="grey-color mt-4">Пароль</p>
        <v-text-field
          class="my-input mt-2"
          placeholder="**********"
          solo
          readonly
        >
          <template v-slot:append>
            <div
              type="button"
              @click="password_modal = true"
              class="changePass"
            >
              Сменить пароль
            </div>
          </template>
        </v-text-field>

        <div class="btns d-flex align-center justify-space-between">
          <button type="submit" class="orange-btn mt-10 ml-2">Сохранить</button>
        </div>
      </v-form>

      <v-dialog
        v-model="phone_modal"
        width="427"
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <div class="my-modal pa-7">
            <h2 class="fw600 text-center">Сменить номер</h2>
            <img
              @click="phone_modal = false"
              class="close"
              src="@/assets/image/icons/close-orange.svg"
              alt=""
            />
            <v-form ref="phoneForm" @submit.prevent="submitPhoneNumber">
              <p class="s mt-7">Введите пароль</p>
              <v-text-field
                class="my-input mt-2"
                v-model="phone_number.current_password"
                placeholder="Введите пароль"
                solo
                :rules="[rules.required, rules.password]"
                :type="!showPass ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <svg
                    @click="showPass = !showPass"
                    v-if="showPass"
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

              <p class="s mt-3">Текущий номер</p>
              <v-text-field
                class="my-input mt-2"
                v-model="phone_number.old_phone_number"
                placeholder="+7"
                solo
                :rules="[rules.required]"
              >
              </v-text-field>

              <p class="s mt-7">Новый номер</p>
              <v-text-field
                class="my-input mt-2"
                v-model="phone_number.new_phone_number"
                placeholder="+7"
                solo
                :rules="[rules.required]"
              ></v-text-field>

              <button type="submit" class="orange-btn mt-7 mx-auto">
                Сменить номер
              </button>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="email_modal"
        width="427"
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <div class="my-modal pa-7">
            <h2 class="fw600 text-center">Сменить email</h2>
            <img
              @click="email_modal = false"
              class="close"
              src="@/assets/image/icons/close-orange.svg"
              alt=""
            />
            <v-form ref="emailForm" @submit.prevent="submitEmail">
              <p class="s mt-7">Введите новый email</p>
              <v-text-field
                class="my-input mt-2"
                v-model="emailForm.email"
                placeholder="Сменить email"
                solo
                :rules="[rules.required, rules.email]"
              >
              </v-text-field>

              <p class="s mt-3">Текущий пароль</p>
              <v-text-field
                class="my-input mt-2"
                v-model="emailForm.current_password"
                type="password"
                solo
                :rules="[rules.required]"
              >
              </v-text-field>

              <button type="submit" class="orange-btn mt-7 mx-auto">
                Сменить email
              </button>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="password_modal"
        width="427"
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <div class="my-modal pa-7">
            <h2 class="fw600 text-center">Сменить пароль</h2>
            <img
              @click="closeModal"
              class="close"
              src="@/assets/image/icons/close-orange.svg"
              alt=""
            />
            <v-form ref="passwordForm" @submit.prevent="submitPassword">
              <p class="s mt-7">Текущий пароль</p>
              <v-text-field
                class="my-input mt-2"
                v-model="password.current_password"
                placeholder="Текущий пароль"
                solo
                :rules="[rules.required, rules.password]"
                :type="!showPass ? 'password' : 'text'"
              ></v-text-field>
              <p class="s mt-3">Новый пароль</p>
              <v-text-field
                class="my-input mt-2"
                v-model="password.new_password"
                placeholder="Новый пароль"
                solo
                :rules="[
                  rules.required,
                  rules.password,
                  v => samePasswords || 'Пароли одинаковые'
                ]"
                :type="!showPass ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <svg
                    @click="showPass = !showPass"
                    v-if="showPass"
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

              <button type="submit" class="orange-btn mt-7 mx-auto">
                Сменить пароль
              </button>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
      <Success
        v-if="alert"
        :text="'Пароль изменен'"
        :dialog="alert"
        @close="alert = false"
      />
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
  layout: "profile",
  data: () => ({
    avatar: null,
    show2: false,
    countries: [],
    cities: [],
    alert: false,

    showPass: false,

    email_modal: false,
    emailForm: {},

    password_modal: false,
    phone_modal: false,
    phone_number: {},

    user: {},
    password: {},
    rules: {
      required: v => !!v || "Обязательное поле",
      email: v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || "Неверный email";
      },
      phone: v => (v && v.length == 16) || "Неверный телефон",
      password: v => (v && v.length >= 8) || "Минимум 8 символов"
    }
  }),
  computed: {
    samePasswords() {
      if (this.password?.current_password && this.password?.new_password) {
        if (this.password.current_password == this.password.new_password)
          return false;
      }
      return true;
    }
  },
  created() {
    this.$store.commit("changeProfileMenu", "personalInfo");
    this.fetchUser();
    this.fetchCountry();
  },
  methods: {
    async submitEmail() {
      if (!this.$refs.emailForm.validate()) return;
      await this.$axios
        .$post(`auth/users/set_email/`, this.emailForm)
        .then(res => {
          this.fetchUser();
          this.$notifier.showMessage({
            color: "success",
            text: "Ваш email изменен"
          });
          this.email_modal = false;
          this.emailForm = {};
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            color: "error",
            text: error
          });
        });
    },
    async fetchCountry() {
      await this.$axios.$get(`geo/countries/`).then(res => {
        this.countries = res.results;
      });
    },
    async fetchCities() {
      if (this.user.country) {
        let id = this.user.country;
        await this.$axios
          .$get(`geo/cities/`, {
            params: { country: [id] }
          })
          .then(res => {
            this.cities = res.results;
          })
          .catch(err => {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({
              color: "error",
              text: error
            });
          });
      }
    },
    changeImage() {
      if (this.$refs.avatar?.$refs?.input) {
        this.$refs.avatar.$refs.input.click();
      }
    },
    fileChanged(e) {
      let formData = new FormData();
      formData.append("avatar", this.avatar);
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      this.$axios
        .$patch(`auth/users/me/`, formData, { headers })
        .then(() => {
          this.fetchUser();
          this.$notifier.showMessage({
            color: "success",
            text: "Картинка сохранена"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            color: "error",
            text: error
          });
        });
    },
    async fetchUser() {
      await this.$auth.fetchUser();
      this.user.email = this.$auth.user.email;
      this.user.phone_number = this.$auth.user.phone_number;
      this.user.first_name = this.$auth.user.first_name;
      this.user.last_name = this.$auth.user.last_name;
      this.user.address = this.$auth.user.address;
      this.user.city = this.$auth.user?.city?.id;

      this.user.avatar = this.$auth.user?.avatar;

      // this.user = {...this.$auth.user}

      if (this.$auth.user.city)
        this.user.country = this.$auth.user.city.country.id;
      if (this.user.country) this.fetchCities();
    },

    async submitChages() {
      if (!this.$refs.changesForm.validate()) return;
      delete this.user.avatar;
      this.$axios
        .$patch(`auth/users/me/`, this.user)
        .then(() => {
          this.fetchUser();
          this.$notifier.showMessage({
            color: "success",
            text: "Данные сохранены"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            color: "error",
            text: error
          });
        });
    },
    async submitPassword() {
      if (!this.$refs.passwordForm.validate()) return;

      await this.$axios
        .$post(`auth/users/set_password/`, this.password)
        .then(() => {
          this.closeModal();
          this.password = {};
          this.alert = true;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            color: "error",
            text: error
          });
        });
    },
    async submitPhoneNumber() {
      if (!this.$refs.phoneForm.validate()) return;

      await this.$axios
        .$post("auth/users/set_phone_number/", this.phone_number)
        .then(() => {
          this.phone_modal = false;
          this.phone_number = {};
          this.$notifier.showMessage({
            color: "success",
            text: "Номер изменен"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({
            color: "error",
            text: error
          });
        });
    },
    closeModal() {
      this.password_modal = false;
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-input {
  max-width: 400px;
}
.green-btn-outline,
.orange-btn {
  max-width: 180px;
}
.orange-btn {
  color: #fff !important;
  &:hover {
    color: $orange-color !important;
  }
}
.btns {
  width: 100%;
  max-width: 400px;
}
.avatar {
  width: 100px;
  margin-right: 80px;

  &-image {
    width: 100px;
    height: 100px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: auto;
      object-fit: cover;
    }
  }
}
.changePass {
  font-size: 13px;
  line-height: 15px;
  color: #ff7a29;
  border: none;
  -webkit-appearance: none;
}
@media screen and (max-width: 600px) {
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
  p.s {
    font-size: 13px;
    line-height: 16px;
  }
  .orange-btn {
    font-size: 17px !important;
    line-height: 22px !important;
  }
  .avatar {
    margin: 0 auto 21px auto;
  }
  .my-input {
    max-width: 100% !important;
  }
  .btns {
    max-width: 100%;
    .orange-btn {
      max-width: 100%;
      font-size: 17px;
      line-height: 22px;
    }
  }
  .pointer {
    font-size: 15px;
    line-height: 19px;
  }
}
</style>
