import phoneMask from "@/plugins/phone_mask.js";
export default {
  data: () => ({
    selected_mask: "KZ",
    phone_masks: [],

    verify_modal: false,
    verifyForm: {},
    forgotForm: {},

    iscorrect: true,
    error_message: "",
    e_phone_number: true,
    em_phone_number: "",
    e_password: true,
    em_password: "",

    form: {
      user_type: "I"
    },
    sign: "in",
    login_modal: false,
    showPass: String,

    forgot_modal: false,
    verify_forgot_modal: false,

    cities: [],
    countries: [],
    country_code: false,
    rules: {
      required: v => !!v || "Обязательное поле",
      email: v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(v) || "Неверный email";
      },
      password: v => (v && v.length >= 8) || "Минимум 8 символов"
    }
  }),
  mounted() {
    this.initializeCountries();
  },
  computed: {
    selectedMask() {
      return phoneMask[`${this.selected_mask}`];
    },
    chooseCountry() {
      if (!this.country_code) return false;
      return true;
    },
    mask() {
      return phoneMask[`${this.country_code}`];
    }
  },
  created() {
    this.phone_masks = Object.keys(phoneMask);
  },
  methods: {
    handleInput(e) {
      function findCode(country) {
        return country.id === e;
      }
      let country = this.countries.find(findCode);
      if (country) this.country_code = country.code;
      else {
        this.country_code = "KZ";
      }
      this.initializeCities();
    },
    async initializeCities() {
      await this.$axios
        .$get(`geo/cities/`, { params: { country: [this.form.country] } })
        .then(res => {
          this.cities = res.results;
        })
        .catch(() => {
          this.$notifier.showMessage({
            color: "warning",
            text: "Не удалось загрузить данные"
          });
        });
    },
    async initializeCountries() {
      await this.$axios
        .$get(`geo/countries/`)
        .then(res => {
          this.countries = res.results;
        })
        .catch(() => {
          this.$notifier.showMessage({
            color: "warning",
            text: "Не удалось загрузить данные"
          });
        });
    },
    openSignIn() {
      if (this.$refs.signInForm) this.$refs.signInForm.resetValidation();
      if (this.$refs.signUpForm) this.$refs.signUpForm.resetValidation();

      this.form = {};
      this.login_modal = true;
      this.sign = "in";
    },
    openSignUp() {
      if (this.$refs.signInForm) this.$refs.signInForm.resetValidation();
      if (this.$refs.signUpForm) this.$refs.signUpForm.resetValidation();

      this.form = {
        user_type: "I"
      };
      this.login_modal = true;
      this.sign = "up";
    },
    clearPhoneNumber(number) {
      number = number.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      number = number.replace(" ", "");
      return number;
    },
    defaultErrors() {
      this.iscorrect = true;
      this.error_message = "";
      this.e_phone_number = true;
      this.em_phone_number = "";
      this.e_password = true;
      this.em_password = "";
    },
    async signIn() {
      // this.defaultErrors();
      if (!this.$refs.signInForm.validate()) return;

      this.form.phone_number = this.clearPhoneNumber(this.form.phone_number);

      await this.$auth
        .loginWith("local", { data: this.form })
        .then(res => {
          this.login_modal = false;
        })
        .catch(err => {
          this.form.password = "";
          this.iscorrect = false;
          if (
            err.response?.data?.detail ==
            "No active account found with the given credentials"
          )
            this.error_message = "Пароль или номер телефона не правильный";
          else {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          }
        });
    },
    async resendVerification() {
      this.$axios
        .$post(`auth/users/resend_activation/`, this.form)
        .then(res => {
          this.verifyForm = res.code;

          this.$notifier.showMessage({
            text: `Код отправлен`,
            color: "success"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async submitForgotVerifyPassword() {
      if (!this.$refs.forgotVerifyRef.validate()) return;
      this.$axios
        .$post(`auth/users/reset_password_confirm/`, this.forgotForm)
        .then(res => {
          this.verify_forgot_modal = false;
          this.forgotForm = {};
          this.$notifier.showMessage({
            color: "success",
            text: "Пароль успешно изменен"
          });
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async submitForgotPassword() {
      if (!this.$refs.forgotRef.validate()) return;
      this.$axios
        .$post(`auth/users/reset_password/`, this.forgotForm)
        .then(res => {
          this.forgotForm = {
            uid: res.code.uid
          };
          this.forgot_modal = false;
          this.verify_forgot_modal = true;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async phoneActivation() {
      if (!this.$refs.verifyRef.validate()) return;
      this.$axios
        .$post(`auth/users/activation/`, this.verifyForm)
        .then(res => {
          this.$notifier.showMessage({
            text: `Ваш телефон подтвержден`,
            color: "success"
          });
          this.verify_modal = false;
        })
        .catch(err => {
          let error = Object.values(err.response.data).join(", ");
          this.$notifier.showMessage({ color: "error", text: error });
        });
    },
    async signUp() {
      this.defaultErrors();
      if (!this.$refs.signUpForm.validate()) return;

      this.form.phone_number = this.clearPhoneNumber(this.form.phone_number);

      await this.$axios
        .$post(`auth/users/`, this.form)
        .then(res => {
          this.login_modal = false;
          this.verify_modal = true;
          this.verifyForm = res.code;

          this.$notifier.showMessage({
            text: `Мы отправили код на ваш номер`,
            color: "success"
          });
        })
        .catch(err => {
          if (err.response.data.phone_number) {
            this.e_phone_number = false;
            this.em_phone_number = err.response.data.phone_number[0];
            // this.login_modal = false;
            this.verify_modal = false;
            // this.resendVerification();
          } else if (err.response.data.password) {
            this.e_password = false;
            this.em_password = err.response.data.password[0];
            if (
              this.em_password ==
              "пользователь с таким Номер телефона уже существует."
            )
              this.em_password =
                "пользователь с таким номером телефона уже есть";
          } else {
            let error = Object.values(err.response.data).join(", ");
            this.$notifier.showMessage({ color: "error", text: error });
          }
        });
    }
  }
};
