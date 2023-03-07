<template>
  <div class="bg-white menu" :class="[hide ? 'hide' : 'show']">
    <div
      @click="changeMenu('Products')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Products', 'pl-3': hide }"
    >
      <svg
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M7.78125 16.9219H19.3395C20.3092 16.9219 21.1507 16.2648 21.3852 15.327L23.9783 5.14228C24.0319 4.93195 23.9852 4.70864 23.8521 4.53727C23.7188 4.36589 23.5139 4.26562 23.2969 4.26562H4.78659L4.37091 2.93395C4.09444 2.0482 3.28523 1.45312 2.35739 1.45312H0.703125C0.314812 1.45312 0 1.76794 0 2.15625C0 2.54456 0.314766 2.85938 0.703125 2.85938H2.35739C2.66667 2.85938 2.93639 3.05775 3.02855 3.35297C3.23798 4.02389 6.66295 14.9957 6.88744 15.7149C6.17002 16.0521 5.67188 16.7813 5.67188 17.625C5.67188 18.7881 6.61814 19.7339 7.78125 19.7339H8.60531C8.52727 19.954 8.48438 20.191 8.48438 20.4375C8.48438 21.6006 9.43064 22.5469 10.5938 22.5469C11.7569 22.5469 12.7031 21.6006 12.7031 20.4375C12.7031 20.191 12.6602 19.9545 12.5822 19.7339H15.6366C15.5586 19.9545 15.5157 20.191 15.5157 20.4375C15.5157 21.6006 16.4619 22.5469 17.625 22.5469C18.7882 22.5469 19.7344 21.6006 19.7344 20.4375C19.7344 20.191 19.6915 19.9545 19.6135 19.7344H20.4375C20.8258 19.7344 21.1406 19.4196 21.1406 19.0312C21.1406 18.6429 20.8258 18.3281 20.4375 18.3281H7.78125C7.39355 18.3281 7.07812 18.0127 7.07812 17.625C7.07812 17.2373 7.39355 16.9219 7.78125 16.9219ZM11.2969 20.4375C11.2969 20.8252 10.9815 21.1406 10.5938 21.1406C10.206 21.1406 9.89062 20.8252 9.89062 20.4375C9.89062 20.0498 10.206 19.7344 10.5938 19.7344C10.9815 19.7344 11.2969 20.0498 11.2969 20.4375ZM18.3281 20.4375C18.3281 20.8252 18.0127 21.1406 17.625 21.1406C17.2373 21.1406 16.9219 20.8252 16.9219 20.4375C16.9219 20.0498 17.2373 19.7344 17.625 19.7344C18.0127 19.7344 18.3281 20.0498 18.3281 20.4375ZM16.1254 11.2969L15.598 15.5156H12.6207L12.0934 11.2969H16.1254ZM11.9176 9.89062L11.3903 5.67188H16.8285L16.3012 9.89062H11.9176ZM11.2035 15.5156H8.29833L6.98142 11.2969H10.6762L11.2035 15.5156ZM20.0217 14.983C19.9433 15.2966 19.6628 15.5156 19.3395 15.5156H17.0153L17.5426 11.2969H20.9602L20.0217 14.983ZM21.3182 9.89062H17.7183L18.2457 5.67188H22.3923L21.3182 9.89062ZM9.97303 5.67188L10.5004 9.89062H6.54244L5.22553 5.67188H9.97303Z"
            fill="#8FC7FF"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="24" fill="8FC7FF" />
          </clipPath>
        </defs>
      </svg>

      <p v-if="!hide">Продукты</p>
    </div>
    <div
      @click="changeMenu('Categories')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Categories', 'pl-3': hide }"
    >
      <svg
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7ZM4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12ZM4 17C4 16.4477 4.44772 16 5 16H19C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17Z"
          fill="#8FC7FF"
        />
      </svg>
      <p v-if="!hide">Категории</p>
    </div>
    <div
      @click="changeMenu('Users')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Users', 'pl-3': hide }"
    >
      <svg
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M4.5 19.125H6.5C6.84504 19.125 7.125 18.845 7.125 18.5C7.125 18.155 6.84504 17.875 6.5 17.875H4.5C4.15496 17.875 3.875 18.155 3.875 18.5C3.875 18.845 4.15496 19.125 4.5 19.125Z"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
          <path
            d="M13.6091 18.812L13.5117 18.8904C13.3927 18.7426 13.3477 18.5475 13.3902 18.3622C13.3902 18.3621 13.3902 18.3621 13.3902 18.362L15.2082 10.3623C15.2082 10.3623 15.2082 10.3623 15.2082 10.3623C15.2731 10.0764 15.5257 9.875 15.8181 9.875H19.5001C22.0501 9.875 24.1251 11.95 24.1251 14.5V14.5115L24.123 14.5228L23.364 18.6148L23.364 18.6148C23.3089 18.9111 23.0512 19.125 22.7501 19.125H21.5001C21.155 19.125 20.8751 18.845 20.8751 18.5C20.8751 18.155 21.155 17.875 21.5001 17.875H22.2313L22.884 14.3968C22.8687 12.6344 21.3589 11.125 19.5001 11.125H16.3168L14.7827 17.875H17.5001C17.8451 17.875 18.1251 18.155 18.1251 18.5C18.1251 18.845 17.8451 19.125 17.5001 19.125H14.0001C13.8102 19.125 13.6302 19.0388 13.5114 18.89L13.6091 18.812ZM13.6091 18.812C13.5141 18.694 13.4781 18.538 13.5121 18.39L13.6091 18.812Z"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
          <path
            d="M16.875 18.5C16.875 19.9481 18.053 21.125 19.5 21.125C20.947 21.125 22.125 19.9481 22.125 18.5C22.125 17.0519 20.947 15.875 19.5 15.875C18.053 15.875 16.875 17.0519 16.875 18.5ZM18.125 18.5C18.125 17.742 18.742 17.125 19.5 17.125C20.258 17.125 20.875 17.742 20.875 18.5C20.875 19.258 20.258 19.875 19.5 19.875C18.742 19.875 18.125 19.258 18.125 18.5Z"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
          <path
            d="M5.875 18.5C5.875 19.9481 7.053 21.125 8.5 21.125C9.947 21.125 11.125 19.9481 11.125 18.5C11.125 17.0519 9.947 15.875 8.5 15.875C7.053 15.875 5.875 17.0519 5.875 18.5ZM7.125 18.5C7.125 17.742 7.74204 17.125 8.5 17.125C9.25796 17.125 9.875 17.742 9.875 18.5C9.875 19.258 9.25796 19.875 8.5 19.875C7.74204 19.875 7.125 19.258 7.125 18.5Z"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
          <path
            d="M2.5 10.125H6.5C6.84504 10.125 7.125 9.84504 7.125 9.5C7.125 9.15496 6.84504 8.875 6.5 8.875H2.5C2.15496 8.875 1.875 9.15496 1.875 9.5C1.875 9.84504 2.15496 10.125 2.5 10.125Z"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
          <path
            d="M1.5 13.125H6.5C6.84504 13.125 7.125 12.845 7.125 12.5C7.125 12.155 6.84504 11.875 6.5 11.875H1.5C1.15496 11.875 0.875 12.155 0.875 12.5C0.875 12.845 1.15496 13.125 1.5 13.125Z"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
          <path
            d="M0.5 16.125H6.5C6.84504 16.125 7.125 15.845 7.125 15.5C7.125 15.155 6.84504 14.875 6.5 14.875H0.5C0.154964 14.875 -0.125 15.155 -0.125 15.5C-0.125 15.845 0.154964 16.125 0.5 16.125Z"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
          <path
            d="M14 19.125H10.5C10.155 19.125 9.875 18.845 9.875 18.5C9.875 18.155 10.155 17.875 10.5 17.875H13.5012L15.7164 8.125H4.5C4.15496 8.125 3.875 7.84503 3.875 7.5C3.875 7.15496 4.15496 6.875 4.5 6.875H16.5C16.6898 6.875 16.8697 6.9611 16.9885 7.10977M14 19.125L16.891 7.188M14 19.125C14.2912 19.125 14.5449 18.9237 14.6099 18.6377L14.488 18.61L14.6099 18.6377L17.1098 7.63799L14 19.125ZM16.9885 7.10977C16.9886 7.10985 16.9886 7.10993 16.9887 7.11001L16.891 7.188M16.9885 7.10977C16.9885 7.10972 16.9884 7.10966 16.9884 7.10961L16.891 7.188M16.9885 7.10977C17.1074 7.25753 17.1524 7.45261 17.1099 7.63786L17.1099 7.6377L16.988 7.61C17.022 7.462 16.986 7.306 16.891 7.188"
            fill="#8FC7FF"
            stroke="#8FC7FF"
            stroke-width="0.25"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p v-if="!hide">Пользователи</p>
    </div>
    <div
      @click="changeMenu('History')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'History', 'pl-3': hide }"
    >
      <svg
        id="history-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.2779 13.8891C17.9527 13.8891 18.519 14.446 18.4158 15.1123C17.8106 19.0323 14.4548 21.9428 10.4074 21.9428C5.92952 21.9428 2.30005 18.3134 2.30005 13.8365C2.30005 10.1481 5.10215 6.7123 8.25689 5.93546C8.93479 5.76809 9.62952 6.24493 9.62952 6.94283C9.62952 11.6712 9.78847 12.8944 10.6864 13.5597C11.5843 14.2249 12.64 13.8891 17.2779 13.8891Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.6926 9.9517C21.7463 6.9138 18.0147 2.01696 13.4674 2.10117C13.1137 2.10749 12.8305 2.40222 12.8147 2.75485C12.7 5.25275 12.8547 8.48959 12.9411 9.95696C12.9674 10.4138 13.3263 10.7727 13.7821 10.7991C15.2905 10.8854 18.6453 11.0033 21.1074 10.6306C21.4421 10.5801 21.6874 10.2896 21.6926 9.9517Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p v-if="!hide">История покупок</p>
    </div>
    <div
      v-if="$isAdmin()"
      @click="changeMenu('Managers')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Managers', 'pl-3': hide }"
    >
      <svg
        id="manager-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.8877 10.8967C19.2827 10.7007 20.3567 9.50473 20.3597 8.05573C20.3597 6.62773 19.3187 5.44373 17.9537 5.21973"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.7285 14.2505C21.0795 14.4525 22.0225 14.9255 22.0225 15.9005C22.0225 16.5715 21.5785 17.0075 20.8605 17.2815"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.8867 14.6641C8.67273 14.6641 5.92773 15.1511 5.92773 17.0961C5.92773 19.0401 8.65573 19.5411 11.8867 19.5411C15.1007 19.5411 17.8447 19.0591 17.8447 17.1131C17.8447 15.1671 15.1177 14.6641 11.8867 14.6641Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.8869 11.888C13.9959 11.888 15.7059 10.179 15.7059 8.069C15.7059 5.96 13.9959 4.25 11.8869 4.25C9.7779 4.25 8.0679 5.96 8.0679 8.069C8.0599 10.171 9.7569 11.881 11.8589 11.888H11.8869Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.88484 10.8967C4.48884 10.7007 3.41584 9.50473 3.41284 8.05573C3.41284 6.62773 4.45384 5.44373 5.81884 5.21973"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4.044 14.2505C2.693 14.4525 1.75 14.9255 1.75 15.9005C1.75 16.5715 2.194 17.0075 2.912 17.2815"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p v-if="!hide">Менеджеры</p>
    </div>
    <div
      @click="changeMenu('Reports')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Reports', 'pl-3': hide }"
    >
      <svg
        id="report-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.24487 14.7815L10.238 10.8914L13.6522 13.5733L16.5813 9.79297"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          cx="19.9954"
          cy="4.19954"
          r="1.9222"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.9245 3.11914H7.65679C4.64535 3.11914 2.77808 5.25186 2.77808 8.26331V16.3457C2.77808 19.3571 4.60874 21.4807 7.65679 21.4807H16.2609C19.2724 21.4807 21.1396 19.3571 21.1396 16.3457V9.30678"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <p v-if="!hide">Отчеты</p>
    </div>
    <div
      @click="changeMenu('Applications')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Applications', 'pl-3': hide }"
    >
      <svg
        id="application-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.7377 2.76175H8.08468C6.00468 2.75375 4.29968 4.41175 4.25068 6.49075V17.2037C4.20468 19.3167 5.87968 21.0677 7.99268 21.1147C8.02368 21.1147 8.05368 21.1157 8.08468 21.1147H16.0737C18.1677 21.0297 19.8177 19.2997 19.8027 17.2037V8.03775L14.7377 2.76175Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.4751 2.75V5.659C14.4751 7.079 15.6231 8.23 17.0431 8.234H19.7981"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.2879 15.3584H8.88794"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.243 11.606H8.88696"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p v-if="!hide">Заявки</p>
    </div>
    <div
      @click="changeMenu('Banners')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Banners', 'pl-3': hide }"
    >
      <svg
        id="banner-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.37145 10.2017V17.0618"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.0382 6.91895V17.0617"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.6285 13.8267V17.0617"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <p v-if="!hide">Реклама/Баннеры</p>
    </div>
    <div
      @click="changeMenu('Geo')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Geo', 'pl-3': hide }"
    >
      <svg
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9664 4.17286C18.1342 1.52114 15.2305 0 12.0003 0C8.77006 0 5.86629 1.52114 4.03409 4.17286C2.21089 6.81117 1.7899 10.1513 2.90571 13.1024C3.20417 13.9082 3.67859 14.6912 4.31243 15.4249L11.3614 23.7046C11.5208 23.892 11.7544 24 12.0003 24C12.2461 24 12.4797 23.892 12.6391 23.7046L19.6861 15.4271C20.3228 14.6892 20.7966 13.9071 21.0926 13.1077C22.2106 10.1513 21.7896 6.81117 19.9664 4.17286ZM19.5211 12.52C19.2929 13.1368 18.9203 13.7466 18.4143 14.3331C18.4129 14.3345 18.4114 14.3359 18.4103 14.3376L12.0003 21.8666L5.58626 14.3329C5.08053 13.7468 4.70792 13.1371 4.47743 12.5144C3.55465 10.0739 3.90486 7.31217 5.41451 5.12728C6.9289 2.93541 9.32947 1.67831 12.0003 1.67831C14.671 1.67831 17.0713 2.93536 18.5857 5.12728C20.0957 7.31217 20.4462 10.0739 19.5211 12.52Z"
          fill="#6bb4ff"
        />
        <path
          d="M12.0003 4.97852C9.40928 4.97852 7.30103 7.08648 7.30103 9.67783C7.30103 12.2692 9.40899 14.3771 12.0003 14.3771C14.5917 14.3771 16.6996 12.2692 16.6996 9.67783C16.6996 7.08677 14.5914 4.97852 12.0003 4.97852ZM12.0003 12.6988C10.3346 12.6988 8.97934 11.3435 8.97934 9.67778C8.97934 8.01203 10.3346 6.65678 12.0003 6.65678C13.6661 6.65678 15.0213 8.01203 15.0213 9.67778C15.0213 11.3435 13.6661 12.6988 12.0003 12.6988Z"
          fill="#6bb4ff"
        />
      </svg>

      <p v-if="!hide">Страны, Города</p>
    </div>
    <div
      @click="changeMenu('Brands')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Brands', 'pl-3': hide }"
    >
      <svg
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path
            d="M20.9835 1.40625H3.0165L0 10.0409V10.8633C0 12.0127 0.552797 13.0351 1.40625 13.6795V22.5938H22.5938V13.6795C23.4472 13.0351 24 12.0127 24 10.8633V10.0409L20.9835 1.40625ZM22.3065 9.45703H18.2394L17.0788 2.8125H19.9852L22.3065 9.45703ZM1.40625 10.8633H5.64844C5.64844 12.0329 4.69692 12.9844 3.52734 12.9844C2.35777 12.9844 1.40625 12.0329 1.40625 10.8633ZM11.2969 10.8633C11.2969 12.0329 10.3454 12.9844 9.17578 12.9844C8.0062 12.9844 7.05469 12.0329 7.05469 10.8633H11.2969ZM7.18814 9.45703L8.34877 2.8125H11.2969V9.45703H7.18814ZM12.7031 9.45703V2.8125H15.6512L16.8119 9.45703H12.7031ZM16.9453 10.8633C16.9453 12.0329 15.9938 12.9844 14.8242 12.9844C13.6546 12.9844 12.7031 12.0329 12.7031 10.8633H16.9453ZM4.01475 2.8125H6.92119L5.76056 9.45703H1.69355L4.01475 2.8125ZM21.1875 21.1875H2.8125V14.3177C3.04341 14.3655 3.28247 14.3906 3.52734 14.3906C4.68136 14.3906 5.70764 13.8336 6.35156 12.9742C6.99548 13.8336 8.02177 14.3906 9.17578 14.3906C10.3298 14.3906 11.3561 13.8336 12 12.9742C12.6439 13.8336 13.6702 14.3906 14.8242 14.3906C15.9782 14.3906 17.0045 13.8336 17.6484 12.9742C18.2924 13.8336 19.3186 14.3906 20.4727 14.3906C20.7175 14.3906 20.9566 14.3655 21.1875 14.3177V21.1875ZM20.4727 12.9844C19.3031 12.9844 18.3516 12.0329 18.3516 10.8633H22.5938C22.5938 12.0329 21.6422 12.9844 20.4727 12.9844Z"
            fill="#8FC7FF"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p v-if="!hide">Бренды</p>
    </div>
    <div
      @click="changeMenu('Promotions')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Promotions', 'pl-3': hide }"
    >
      <svg
        id="stocks-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.79501 7.05613C4.79501 5.80713 5.80701 4.79513 7.05601 4.79413H8.08501C8.68201 4.79413 9.25401 4.55713 9.67801 4.13713L10.397 3.41713C11.278 2.53113 12.71 2.52713 13.596 3.40813L13.597 3.40913L13.606 3.41713L14.326 4.13713C14.75 4.55813 15.322 4.79413 15.919 4.79413H16.947C18.196 4.79413 19.209 5.80613 19.209 7.05613V8.08313C19.209 8.68013 19.445 9.25313 19.866 9.67713L20.586 10.3971C21.472 11.2781 21.477 12.7101 20.596 13.5961L20.595 13.5971L20.586 13.6061L19.866 14.3261C19.445 14.7491 19.209 15.3211 19.209 15.9181V16.9471C19.209 18.1961 18.197 19.2081 16.948 19.2081H16.947H15.917C15.32 19.2081 14.747 19.4451 14.324 19.8661L13.604 20.5851C12.724 21.4711 11.293 21.4761 10.407 20.5971C10.406 20.5961 10.405 20.5951 10.404 20.5941L10.395 20.5851L9.67601 19.8661C9.25301 19.4451 8.68001 19.2091 8.08301 19.2081H7.05601C5.80701 19.2081 4.79501 18.1961 4.79501 16.9471V15.9161C4.79501 15.3191 4.55801 14.7471 4.13701 14.3241L3.41801 13.6041C2.53201 12.7241 2.52701 11.2931 3.40701 10.4071C3.40701 10.4061 3.40801 10.4051 3.40901 10.4041L3.41801 10.3951L4.13701 9.67513C4.55801 9.25113 4.79501 8.67913 4.79501 8.08113V7.05613"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.43164 14.5716L14.5716 9.43164"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.4955 14.5H14.5045"
          stroke="#8FC7FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.4955 9.5H9.5045"
          stroke="#8FC7FF"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <p v-if="!hide">Акции</p>
    </div>
    <div
      v-if="$isAdmin()"
      @click="changeMenu('Activities')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Activities', 'pl-3': hide }"
    >
      <svg
        id="activities-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.6389 14.3962H17.5906C16.1042 14.3953 14.8993 13.1914 14.8984 11.7049C14.8984 10.2185 16.1042 9.01458 17.5906 9.01367H21.6389"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.0485 11.6432H17.7369"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.03564 7.53772H12.4346"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p v-if="!hide">Журнал действий</p>
    </div>
    <div
      @click="changeMenu('Info')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'Info', 'pl-3': hide }"
    >
      <svg
        id="infos-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.7366 2.76175H8.08465C6.00465 2.75375 4.30065 4.41075 4.25065 6.49075V17.2277C4.20565 19.3297 5.87365 21.0697 7.97465 21.1147C8.01165 21.1147 8.04865 21.1157 8.08465 21.1147H16.0726C18.1626 21.0407 19.8146 19.3187 19.8026 17.2277V8.03775L14.7366 2.76175Z"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.4749 2.75V5.659C14.4749 7.079 15.6239 8.23 17.0439 8.234H19.7979"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.6409 9.9082V15.9492"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.9866 12.2652L11.6416 9.91016L9.29663 12.2652"
          stroke="#8FC7FF"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <p v-if="!hide">Полезная информация</p>
    </div>
    <div
      @click="changeMenu('FAQ')"
      class="menu-item"
      :class="{ 'menu-item-active': active == 'FAQ', 'pl-3': hide }"
    >
      <svg
        id="infos-svg"
        class="mr-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 18.9141C12.6472 18.9141 13.1719 18.3894 13.1719 17.7422C13.1719 17.095 12.6472 16.5703 12 16.5703C11.3528 16.5703 10.8281 17.095 10.8281 17.7422C10.8281 18.3894 11.3528 18.9141 12 18.9141Z"
          fill="#8FC7FF"
        />
        <path
          d="M12 0C5.36794 0 0 5.36705 0 12C0 18.6321 5.36705 24 12 24C18.6321 24 24 18.633 24 12C24 5.36794 18.633 0 12 0ZM12 22.125C6.4042 22.125 1.875 17.5965 1.875 12C1.875 6.4042 6.40345 1.875 12 1.875C17.5958 1.875 22.125 6.40345 22.125 12C22.125 17.5958 17.5965 22.125 12 22.125Z"
          fill="#8FC7FF"
        />
        <path
          d="M12 6.02344C9.93225 6.02344 8.25 7.70569 8.25 9.77344C8.25 10.2912 8.66972 10.7109 9.1875 10.7109C9.70528 10.7109 10.125 10.2912 10.125 9.77344C10.125 8.73956 10.9661 7.89844 12 7.89844C13.0339 7.89844 13.875 8.73956 13.875 9.77344C13.875 10.8073 13.0339 11.6484 12 11.6484C11.4822 11.6484 11.0625 12.0682 11.0625 12.5859V14.9297C11.0625 15.4475 11.4822 15.8672 12 15.8672C12.5178 15.8672 12.9375 15.4475 12.9375 14.9297V13.4048C14.5531 12.9875 15.75 11.5176 15.75 9.77344C15.75 7.70569 14.0677 6.02344 12 6.02344Z"
          fill="#8FC7FF"
        />
      </svg>

      <p v-if="!hide">FAQ</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: "/",
    hide: true
  }),
  created() {
    this.active = this.$store.state.admin_menu;
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    });
  },
  methods: {
    onResize() {
      if (window.innerWidth <= 1200) this.hide = true;
      else this.hide = false;
    },
    changeMenu(value) {
      this.active = value;
      this.$store.commit("changeAdminMenu", value);
      this.$router.push(`/admin/${value}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/admin.scss";
.hide {
  width: 50px;
}
.show {
  width: 273px;
}
.menu {
  &-item {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 22px;
    color: #313131;
    min-height: 60px;
    padding-left: 20px;

    display: flex;
    align-items: center;
    transition: 0.22s;
    cursor: pointer;
    &-active,
    &:hover {
      background: #6bb4ff;
      color: #ffffff;
      p {
        color: #fff;
      }
      svg {
        path {
          fill: #fff;
        }
      }
      #history-svg,
      #manager-svg,
      #report-svg,
      #application-svg,
      #banner-svg,
      #activities-svg,
      #stocks-svg,
      #infos-svg {
        path {
          fill: unset;
          stroke: #fff;
        }
      }
    }
  }
}
</style>
