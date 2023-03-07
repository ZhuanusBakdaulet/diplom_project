<template>
  <div class="">
    <Title title="Профиль" />
    <div class="profile-box pa-7 mt-7">
      <v-form ref="formm" @submit.prevent="submit">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex">
            <div class="image mr-9">
              <!-- <v-file-input
                class="d-none"
                :ref="`avatar`"
                v-model="avatar"
                accept="image/*"
                @change="fileChanged"
              >
              </v-file-input> -->
              <!-- <img class="avatar" :src="avatar" alt="" /> -->
              <div class="avatar">
                <h2>
                  {{
                    $auth.user
                      ? $auth.user.first_name.charAt(0) +
                        $auth.user.last_name.charAt(0)
                      : "UU"
                  }}
                </h2>
              </div>
            </div>
            <div class="pt-4">
              <h2>
                {{
                  $auth.user
                    ? $auth.user.first_name + " " + $auth.user.last_name
                    : "user"
                }}
              </h2>
              <h4 class="mt-4">
                {{ $auth.user.city ? $auth.user.city.name : "Almaty" }},
                {{
                  $auth.user.city && $auth.user.city.country
                    ? $auth.user.city.country.name
                    : "Каскелен"
                }}
              </h4>
            </div>
          </div>
          <button
            v-if="!edit"
            type="button"
            @click.prevent="edit = true"
            class="orange-btn-outline "
          >
            <svg
              class="mr-2"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1831 1.43306C10.4271 1.18898 10.8229 1.18898 11.0669 1.43306L13.5669 3.93306C13.811 4.17714 13.811 4.57286 13.5669 4.81694L5.44194 12.9419C5.32473 13.0592 5.16576 13.125 5 13.125H2.5C2.15482 13.125 1.875 12.8452 1.875 12.5V10C1.875 9.83424 1.94085 9.67527 2.05806 9.55806L8.30793 3.30819L10.1831 1.43306ZM8.75 4.63388L3.125 10.2589V11.875H4.74112L10.3661 6.25L8.75 4.63388ZM11.25 5.36612L12.2411 4.375L10.625 2.75888L9.63388 3.75L11.25 5.36612Z"
                fill="#FF7A29"
              />
            </svg>

            Редактировать
          </button>
          <button @click="submit" v-if="edit" type="submit" class="orange-btn">
            Сохранить
          </button>
        </div>
        <div @click="checkIsEdit" class="mt-7 d-flex row ma-0">
          <div class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Имя</h3>
            <v-text-field
              :readonly="!edit"
              placeholder="Имя"
              class="mt-3 my-input"
              v-model="form.first_name"
              solo
              :rules="[rules.required]"
            >
            </v-text-field>
          </div>
          <div class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Фамилия</h3>
            <v-text-field
              :readonly="!edit"
              placeholder="Фамилия"
              class="mt-3 my-input"
              v-model="form.last_name"
              solo
              :rules="[rules.required]"
            >
            </v-text-field>
          </div>

          <div v-if="$isProvider()" class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Название</h3>
            <v-text-field
              :readonly="!edit"
              placeholder="Название"
              class="mt-3 my-input"
              v-model="form.individual_name"
              solo
              :rules="[rules.required]"
            >
            </v-text-field>
          </div>
          <div class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Email</h3>
            <v-text-field
              readonly
              placeholder="aisaule@gmail.com"
              class="mt-3 my-input"
              v-model="form.email"
              :rules="[rules.email, rules.required]"
              solo
            >
              <template v-slot:append>
                <div
                  v-if="edit"
                  type="button"
                  @click="email_modal = true"
                  class="changePass"
                >
                  Сменить email
                </div>
              </template>
            </v-text-field>
          </div>

          <div class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Телефон</h3>
            <v-text-field
              placeholder="+7 ___ ___ __ __"
              class="mt-3 my-input"
              v-model="form.phone_number"
              v-mask="mask"
              readonly
              solo
              :rules="[rules.required]"
            >
              <template v-slot:append>
                <div
                  v-if="edit"
                  type="button"
                  @click="phone_modal = true"
                  class="changePass"
                >
                  Сменить номер
                </div>
              </template>
            </v-text-field>
          </div>

          <div class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Страна</h3>
            <v-select
              :items="countries"
              item-text="name"
              item-value="id"
              :readonly="!edit"
              class="mt-3 my-input"
              v-model="form.country"
              solo
              no-data-text="Ничего не найдено"
              @input="handleInput"
              :rules="[rules.required]"
            >
            </v-select>
          </div>
          <div class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Город</h3>
            <v-select
              :items="cities"
              item-text="name"
              item-value="id"
              class="mt-3 my-input"
              v-model="form.city"
              :readonly="!edit"
              no-data-text="Ничего не найдено"
              solo
              :rules="[rules.required]"
            >
            </v-select>
          </div>
          <div class="inputs col-12 col-md-6 px-3">
            <p class="grey-color">Пароль</p>
            <v-text-field
              class="my-input mt-3"
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
          </div>

          <div v-if="$isProvider()" class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Способы оплаты</h3>
            <v-select
              :items="payment_types"
              class="mt-3 my-input"
              v-model="form.payment_methods"
              :readonly="!edit"
              :rules="[rules.required]"
              no-data-text="Ничего не найдено"
              solo
              multiple
            >
            </v-select>
          </div>
          <div v-if="$isProvider()" class="inputs col-12 col-md-6 px-3"></div>

          <div v-if="$isProvider()" class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Дни доставки</h3>
            <v-select
              :items="weekdays"
              class="mt-3 my-input"
              v-model="form.delivery_times"
              :readonly="!edit"
              :rules="[rules.required]"
              no-data-text="Ничего не найдено"
              solo
              multiple
            >
            </v-select>
          </div>
          <div v-if="$isProvider()" class="inputs col-12 col-md-6 px-3"></div>

          <div v-if="$isProvider()" class="inputs col-12 col-md-6 px-3">
            <h3 class="grey-color">Регионы доставки</h3>
            <v-select
              :items="cities"
              item-text="name"
              item-value="id"
              multiple
              class="mt-3 my-input"
              :rules="[rules.required]"
              v-model="form.cities"
              :readonly="!edit"
              no-data-text="Ничего не найдено"
              solo
            >
            </v-select>
          </div>
          <div class="inputs col-12 col-md-6 px-3"></div>
        </div>
      </v-form>
    </div>
    <v-dialog v-model="password_modal" width="427">
      <v-card>
        <div class="my-modal pa-7">
          <h2 class="fw600 text-center">Сменить пароль</h2>
          <img
            @click="password_modal = false"
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
    <v-dialog v-model="email_modal" width="427">
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

    <v-dialog v-model="phone_modal" width="427">
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
  </div>
</template>

<script>
import phoneMask from "@/plugins/phone_mask.js";
import Title from "@/components/provider/Title";
export default {
  layout: "provider",
  middleware: ["courier"],
  components: { Title },
  data: () => ({
    // Phone number change
    phone_modal: false,
    phone_number: {},

    // email Change
    email_modal: false,
    emailForm: {},

    password_modal: false,
    password: {},

    showPass: false,
    country_code: false,
    cities: [],
    countries: [],
    form: {},
    edit: false,
    weekdays: [
      { text: "Понидельник", value: 1 },
      { text: "Вторник", value: 2 },
      { text: "Среда", value: 3 },
      { text: "Четверг", value: 4 },
      { text: "Пятница", value: 5 },
      { text: "Суббота", value: 6 },
      { text: "Воскресение", value: 7 }
    ],
    payment_types: [
      { text: "Наличными", value: 1 },
      { text: "Банковская карта", value: 2 },
      { text: "Кредит в банке", value: 3 },
      { text: "Расрочка у поставщика", value: 4 }
    ],
    rules: {
      email: v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || "Неверный email";
      },
      phone: v => (v && v.length == 16) || "Неверный телефон",
      required: v => !!v || "Обязательное поле",
      password: v => (v && v.length >= 8) || "Минимум 8 символов"
    }
  }),
  created() {
    this.$store.commit("changeProviderMenu", "Profile");
    this.fetchCountries();
    this.userinfo();
  },
  computed: {
    samePasswords() {
      if (this.password?.current_password && this.password?.new_password) {
        if (this.password.current_password == this.password.new_password)
          return false;
      }
      return true;
    },
    chooseCountry() {
      if (!this.country_code) return false;
      return true;
    },
    mask() {
      return phoneMask[`${this.country_code}`];
    }
  },
  methods: {
    async submitPassword() {
      if (!this.$refs.passwordForm.validate()) return;

      await this.$axios
        .$post(`auth/users/set_password/`, this.password)
        .then(response => {
          this.password_modal = false;
          this.$notifier.showMessage({
            color: "success",
            text: "Пароль изменен"
          });
        })
        .catch(err => {
          this.$notifier.showMessage({ color: "error", text: "Не удалось" });
        });
    },
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
          this.$notifier.showMessage({
            color: "error",
            text: "Не удалось изменить"
          });
        });
    },
    async submitPhoneNumber() {
      if (!this.$refs.phoneForm.validate()) return;
      await this.$axios
        .$post(`auth/users/set_phone_number/`, this.phone_number)
        .then(() => {
          this.phone_modal = false;
          this.$notifier.showMessage({
            color: "success",
            text: "Ваш Номер изменен"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    checkIsEdit() {
      if (!this.edit) {
        window.scrollTo(0, 0);
        return this.$notifier.showMessage({
          color: "warning",
          text: "Что бы изменить, нажмите кнопку редактрования"
        });
      }
    },
    userinfo() {
      this.form.first_name = this.$auth.user.first_name;
      this.form.last_name = this.$auth.user.last_name;
      this.form.email = this.$auth.user.email;
      this.form.phone_number = this.$auth.user.phone_number;

      if (this.$isProvider()) {
        this.form.individual_name = this.$auth.user.individual_name;
        this.form.delivery_times = this.$auth.user.delivery_times;
        this.form.payment_methods = this.$auth.user.payment_methods;
      }

      if (this.$auth.user.city?.country) {
        this.form.country = this.$auth.user.city.country.id;
        this.fetchCities();
        this.form.city = this.$auth.user.city.id;
      }
    },
    handleInput(e) {
      function findCode(country) {
        return country.id === e;
      }
      this.country_code = this.countries.find(findCode).code;
      this.fetchCities();
    },
    async fetchCities() {
      await this.$axios
        .$get(`geo/cities/`, { params: { country: [this.form.country] } })
        .then(res => {
          this.cities = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async fetchCountries() {
      await this.$axios
        .$get(`geo/countries/`)
        .then(res => {
          this.countries = res.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async submit() {
      if (!this.$refs.formm.validate()) return;
      if (this.form.payment_methods?.length < 1)
        delete this.form.payment_methods;

      await this.$axios
        .$patch(`auth/users/me/`, this.form)
        .then(res => {
          this.$auth.fetchUser();
          this.edit = false;
          this.$notifier.showMessage({
            color: "success",
            text: "Ваши изменения сохранены"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
      this.edit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/provider.scss";
.profile-box {
  width: 100%;
  max-width: 800px;
  background: #ffffff;
  border-radius: 4px;
}
.image {
  position: relative;
}
.avatar,
.hover {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #52b059;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    color: #ffffff;
  }
}
.hover {
  cursor: pointer;
  position: absolute;
  background: rgba(55, 55, 55, 0.55);
  border: none;
  top: 0;
  left: 0;
}
.orange-btn-outline,
.orange-btn {
  height: 35px;
  width: 156px;
  font-size: 16px;
  line-height: 19px;
  color: $orange-color;
  &:hover {
    color: #ffffff;
    svg {
      path {
        fill: #fff;
      }
    }
  }
}
.inputs {
  max-width: 345px;
}
.changePass {
  font-size: 13px;
  line-height: 15px;
  color: #ff7a29;
  border: none;
}
</style>
