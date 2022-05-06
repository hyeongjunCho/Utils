export function isEmpty(str) {
  if (str === undefined) {
    return true;
  }

  if (str === null) {
    return true;
  }

  if (str === "") {
    return true;
  }

  return false;
}

export function preProcessJsonString(jsonString) {
  if (isEmpty(jsonString)) return "";

  return jsonString
    .replace(/[\']/g, "\\'")
    .replace(/[\/]/g, "\\/")
    .replace(/[\f]/g, "\\f")
    .replace(/[\n]/g, "\\n")
    .replace(/[\r]/g, "\\r")
    .replace(/[\t]/g, "\\t")
}

export function reverseSlashProcessJsonString(jsonString) {
  if (isEmpty(jsonString)) return "";
    jsonString = jsonString.replace(/([\\]{1,1000})/g, "$1$1").replace();
    return jsonString;
}

export function encodeSpecialText(str) {
  if (isEmpty(str)) return "";

  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("'", "&apos;")
    .replaceAll('"', "&quot;");
}
export function decodeSpecialText(str) {
  if (isEmpty(str)) return "";

  return str
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&apos;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&");
}

export const makeTwoDigit = (num) => {
  let twoDigit = num.toString();
  while (twoDigit.length < 2) {
    twoDigit = "0" + twoDigit;
  }
  return twoDigit;
};