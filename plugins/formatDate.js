import moment from "moment";

export default ({ app }, inject) => {
  inject("date", date => {
    let res = moment.unix(date).format("LL") || "дата";
    return res;
  });
};
