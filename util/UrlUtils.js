export const makeUrlWithHttp = (url) => {
  const httpRegex = /(https?:\/\/)((www\.))?[-가-힣a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-가-힣a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const regex = /((www\.))?[-가-힣a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b([-가-힣a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (url.match(httpRegex)) {
    return url;
  } else if (url.match(regex)) {
    return `http://${url}`;
  } else {
    return url;
  }
}