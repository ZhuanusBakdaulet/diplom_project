export default ({ app }, inject) => {
  inject("price", price => {
    let res = price ? parseInt(price).toLocaleString("ru-Ru") : 0;
    res = res + " ₸";
    return res;
  });
};
