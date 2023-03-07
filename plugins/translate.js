import CyrillicToTranslit from "cyrillic-to-translit-js";

export default ({ app }, inject) => {
  inject("translate", word => {
    if (!word) return "baital";
    const cyrillicToTranslit = new CyrillicToTranslit();
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~’»«]/g;
    word = word.replace(regex, "");
    word = word.replace(/\s+/g, " ").trim();
    return cyrillicToTranslit.transform(word, "-").toLowerCase();
  });
};
