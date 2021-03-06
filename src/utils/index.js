import { cloneDeep } from "lodash";

/** how to use getInitialData function:
 * const formatUser = getInitialData({
 *  name: null,
 *  birthday: null,
 *  sex: "male"
 * });
 *
 * const externalRawData = {
 *  name: "Dana",
 *  sex: "female",
 *  about: "Danila's ex-girlfriend"
 * };
 * const dana = formatUser(externalRawData);
 *
 * console.log(dana); // {name: 'Dana', birthday: null, sex: 'female'}
 */
export function getInitialData(initialObj = {}) {
  return valuesObj => {
    const mixed = { ...cloneDeep(initialObj), ...cloneDeep(valuesObj) };
    return Object.fromEntries(
      Object.keys(initialObj).map(key => [key, mixed[key]])
    );
  };
}
export function formatDate(datetime) {
  const date = new Date(datetime);
  const res = date.toLocaleString("ru").slice(0, -3);
  return res;
}

export function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString)
    .replace(/\/$/, "")
    .split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}
export function groupNumber(number, qnt = 3, char = " ") {
  return `${number}`
    .split("")
    .reverse()
    .join("")
    .replace(new RegExp(`(\\d{${qnt}})`, "g"), `$1${char}`)
    .split("")
    .reverse()
    .join("")
    .trim();
}

export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
