import { NotificationManager } from "react-notifications";
import { Store } from "react-notifications-component";

export const createNotification = (type, title, context, time = 60000, position = "bottom-right") => {
  // switch (type) {
  //   case "info":
  //     NotificationManager?.info(context, "", time);
  //     break;
  //   case "success":
  //     NotificationManager?.success(context, title, time);
  //     break;
  //   case "warning":
  //     NotificationManager?.warning(context, title, time);
  //     break;
  //   case "error":
  //     NotificationManager?.error(context, title, time);
  //     break;
  // }
  Store.addNotification({
    title,
    message: context,
    type: type === "error" ? "danger" : type,
    insert: "bottom",
    container: position,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: time,
      onScreen: true,
    },
  });
};

export const getDefaultValue = (key, parsedDefaultValue, lang = "EN") => {
  const getDefaultValueHelper = (key, parsedDefaultValue, lang) => {
    if (!parsedDefaultValue || !parsedDefaultValue[0]) {
      return "";
    }
    if (parsedDefaultValue?.length < 2) return parsedDefaultValue[0][key] ?? "";
    return parsedDefaultValue?.find((item) => item?.lang === lang)[key] ?? "";
  };
  let returnValue = getDefaultValueHelper(
    key,
    parsedDefaultValue,
    lang
  )
  returnValue = typeof returnValue === "object" ? JSON.stringify(returnValue) : returnValue?.toString();
  if (!returnValue) return "";
  return returnValue;
};

export const camelize = (str) => {
  return str?.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr?.toUpperCase());
};

const makeColumns = (obj, level, returnValue, prefix = "", maxLevel = Infinity) => {
  if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean" || !obj) {
    returnValue?.push({ key: prefix, value: obj });
    return;
  }
  if (!obj) {
    returnValue?.push({ key: prefix, value: obj });
    return;
  }
  if (level === maxLevel) {
    returnValue?.push({ key: prefix, value: obj });
    return;
  }
  if (Array?.isArray(obj)) {
    if (level === 1) {
      return obj?.map((item) => {
        makeColumns(item, level + 1, returnValue, "", maxLevel);
      });
    }
  }
  return Object?.keys(obj).map((item) => {
    makeColumns(obj[item], level + 1, returnValue, prefix + " " + item, maxLevel);
  });
};

export const makeDataPretty = (data, setParsedDefaultValue, maxLevel=Infinity) => {
  if (!data) return;
  const value = data?.map((item) => {
    const columns = [];
    makeColumns(item, 1, columns, "", maxLevel);
    const obj = {};
    for (let i = 0; i < columns?.length; i++) {
      obj[camelize(columns[i].key?.slice(1))] = columns[i].value;
    }
    return obj;
  });
  setParsedDefaultValue(value);
};

export const makeDataClear = (data, setParsedDefaultValue) => {
  setParsedDefaultValue([]);
};

export const findLi = (target) => {
  let currentTarget = target;
  while (currentTarget.tagName !== "LI") {
    console.log(currentTarget.tagName);
    currentTarget = currentTarget.parentNode;
  }
  return currentTarget;
};

export const SHA256 = (s) => {
  var chrsz = 8;
  var hexcase = 0;

  function safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function S(X, n) {
    return (X >>> n) | (X << (32 - n));
  }
  function R(X, n) {
    return X >>> n;
  }
  function Ch(x, y, z) {
    return (x & y) ^ (~x & z);
  }
  function Maj(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
  }
  function Sigma0256(x) {
    return S(x, 2) ^ S(x, 13) ^ S(x, 22);
  }
  function Sigma1256(x) {
    return S(x, 6) ^ S(x, 11) ^ S(x, 25);
  }
  function Gamma0256(x) {
    return S(x, 7) ^ S(x, 18) ^ R(x, 3);
  }
  function Gamma1256(x) {
    return S(x, 17) ^ S(x, 19) ^ R(x, 10);
  }

  function core_sha256(m, l) {
    var K = new Array(
      0x428a2f98,
      0x71374491,
      0xb5c0fbcf,
      0xe9b5dba5,
      0x3956c25b,
      0x59f111f1,
      0x923f82a4,
      0xab1c5ed5,
      0xd807aa98,
      0x12835b01,
      0x243185be,
      0x550c7dc3,
      0x72be5d74,
      0x80deb1fe,
      0x9bdc06a7,
      0xc19bf174,
      0xe49b69c1,
      0xefbe4786,
      0xfc19dc6,
      0x240ca1cc,
      0x2de92c6f,
      0x4a7484aa,
      0x5cb0a9dc,
      0x76f988da,
      0x983e5152,
      0xa831c66d,
      0xb00327c8,
      0xbf597fc7,
      0xc6e00bf3,
      0xd5a79147,
      0x6ca6351,
      0x14292967,
      0x27b70a85,
      0x2e1b2138,
      0x4d2c6dfc,
      0x53380d13,
      0x650a7354,
      0x766a0abb,
      0x81c2c92e,
      0x92722c85,
      0xa2bfe8a1,
      0xa81a664b,
      0xc24b8b70,
      0xc76c51a3,
      0xd192e819,
      0xd6990624,
      0xf40e3585,
      0x106aa070,
      0x19a4c116,
      0x1e376c08,
      0x2748774c,
      0x34b0bcb5,
      0x391c0cb3,
      0x4ed8aa4a,
      0x5b9cca4f,
      0x682e6ff3,
      0x748f82ee,
      0x78a5636f,
      0x84c87814,
      0x8cc70208,
      0x90befffa,
      0xa4506ceb,
      0xbef9a3f7,
      0xc67178f2
    );

    var HASH = new Array(
      0x6a09e667,
      0xbb67ae85,
      0x3c6ef372,
      0xa54ff53a,
      0x510e527f,
      0x9b05688c,
      0x1f83d9ab,
      0x5be0cd19
    );

    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;

    m[l >> 5] |= 0x80 << (24 - (l % 32));
    m[(((l + 64) >> 9) << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];

      for (var j = 0; j < 64; j++) {
        if (j < 16) W[j] = m[j + i];
        else
          W[j] = safe_add(
            safe_add(
              safe_add(Gamma1256(W[j - 2]), W[j - 7]),
              Gamma0256(W[j - 15])
            ),
            W[j - 16]
          );

        T1 = safe_add(
          safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]),
          W[j]
        );
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));

        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }

      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }

  function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - (i % 32));
    }
    return bin;
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  }

  function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str +=
        hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
        hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf);
    }
    return str;
  }

  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
};

export const randomInt = (min, max, ...range) => {
  if (!range || range.length === 0)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  const index = Math.floor(Math.random() * range.length);
  return Math.floor(Math.random() * (range[index].max - range[index].min + 1)) + range[index].min;
};

export const randomIntUniform = (min, max, ...range) => {
  if (!range || range.length === 0)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  const rangeArr = [];
  range.forEach((item) => {
    if (rangeArr.length === 0) {
      rangeArr.push(item.max - item.min);
    } else {
      rangeArr.push(rangeArr[rangeArr.length - 1] + item.max - item.min);
    }
  });
  const index = Math.max(rangeArr.findIndex((item) => item > Math.floor(Math.random() * (rangeArr[rangeArr.length - 1] + 1))), 0);
  return Math.floor(Math.random() * (range[index].max - range[index].min + 1)) + range[index].min;
};

export const randomColor = () => {
  const h = randomIntUniform(null, null, {min: 10, max: 30}, {min: 150, max: 300});
  const s = randomIntUniform(42, 70);
  const l = randomIntUniform(40, 70);

  return `hsl(${h},${s}%,${l}%)`;
}

export const isFulfilled = (data, requiredObject) => {
  console.log(data, requiredObject, typeof requiredObject, Object.keys(requiredObject).length, !!data);
  if (!data) return !requiredObject || Object.keys(requiredObject).length === 0 || data;
  if (typeof requiredObject !== "object") return !!data;
  if (!requiredObject) return true;
  if (Object.keys(requiredObject).length === 0) return true;
  return Object.keys(requiredObject).reduce((acc, cur) => {
    return acc && isFulfilled(data[cur], requiredObject[cur]);
  }, true);
}

export const objectRemoveKeysWithNullValue = (obj) => {
  console.log(obj);
  if (obj === "") return null;
  if (!obj && typeof obj !== "boolean") return null;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    if (obj.length === 0) return null;
    return obj.map((item) => {
      return objectRemoveKeysWithNullValue(item);
    })
  }
  const reduced = Object.keys(obj).reduce((acc, cur) => {
    const value = objectRemoveKeysWithNullValue(obj[cur]);
    if (value || typeof value === "boolean") {
      acc[cur] = value;
    }
    return acc;
  }, {});
  console.log(reduced);
  if (Object.keys(reduced).length === 0) return null;
  return reduced;
}

export const changeValueUsingKeyListStringAndValue = (dict, keyListString, value) => {
  try {
    while (keyListString.startsWith(".")) {
      keyListString = keyListString.slice(1);
    }
    const dotIndex = keyListString.indexOf(".");
    if (dotIndex > -1) {
      const innerDict = dict[keyListString.slice(0, dotIndex)];
      const key = keyListString.slice(0, dotIndex);
      return {
        ...dict,
        [key]: changeValueUsingKeyListStringAndValue(
          innerDict,
          keyListString.slice(dotIndex + 1),
          value
        ),
      };
    } else {
      return { ...dict, [keyListString]: value };
    }
  } catch {
    return dict;
  }
};