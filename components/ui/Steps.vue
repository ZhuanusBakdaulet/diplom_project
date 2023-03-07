<template>
  <div class="d-flex align-center steps">
    <div
      class="d-flex align-center step"
      :class="[
        activeStep == 1 ? 'step-active' : '',
        activeStep > 1 ? 'step-done' : '',
      ]"
    >
      <div class="number mr-4 d-flex align-center justify-center grey-color">
        1
      </div>
      <div class="check mr-4 align-center justify-center">
        <img src="@/assets/image/icons/check.svg" alt="" />
      </div>
      <p class="grey-color">Список товаров</p>
      <div class="line"><div class="sub-line"></div></div>
    </div>
    <div
      class="d-flex align-center step"
      :class="[
        activeStep == 2 ? 'step-active' : '',
        activeStep > 2 ? 'step-done' : '',
      ]"
    >
      <div class="number mr-4 d-flex align-center justify-center grey-color">
        2
      </div>
      <div class="check mr-4 align-center justify-center">
        <img src="@/assets/image/icons/check.svg" alt="" />
      </div>
      <p class="grey-color">Детали заказа</p>
      <div class="line"><div class="sub-line"></div></div>
    </div>
    <!-- <div
      class="d-flex align-center step"
      :class="[
        activeStep == 3 ? 'step-active' : '',
        activeStep > 3 ? 'step-done' : ''
      ]"
    >
      <div class="number mr-4 d-flex align-center justify-center grey-color">
        3
      </div>
      <div class="check mr-4 align-center justify-center">
        <img src="@/assets/image/icons/check.svg" alt="" />
      </div>
      <p class="grey-color">
        Оплата
      </p>
      <div class="line"><div class="sub-line"></div></div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: { activeStep: Number },
};
</script>

<style lang="scss" scoped>
.grey-color {
  color: #e4e4e4;
}
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.step {
  position: relative;
  width: 100%;
  padding-bottom: 22px;
}
.line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: #e4e4e4;
  .sub-line {
    position: absolute;
    width: 80%;
    height: 4px;
    left: 0;
    top: 0;
    background: #e4e4e4;
  }
  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
.check {
  display: none;
}
.number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1.5px solid #e4e4e4;
  box-sizing: border-box;
}
.step-active {
  .line .sub-line {
    background: #52b059;
    border-radius: 5px;
  }
  .number {
    border-color: $black-color;
  }
  .grey-color {
    color: $black-color;
  }
}
.step-done {
  .number {
    display: none !important;
  }
  .grey-color {
    color: $orange-color;
  }
  .check {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: $orange-color;
    border-color: $orange-color;
  }
}
@media screen and (max-width: 600px) {
  .steps {
    display: none !important;
  }
}
</style>
