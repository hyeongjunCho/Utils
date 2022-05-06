import { default as moment } from "moment";

export const blockedLimitRule = (logs, product) => {
  if (!logs || logs.length === 0) return {};
  const now = moment();
  let limitObj = {};
  let hourCount = 0;
  let dayCount = 0;
  let flag;
  for (let i = 0; i < logs.length; i += 1) {
    flag = false;
    if (
      product.serviceLimitPerMinute &&
      now.isBefore(
        moment(logs[i].regDate)
          .add(product.serviceLimitPerMinute, "minute")
          .add(moment().utcOffset(), "minute")
      ) &&
      !limitObj.minuteLimit
    ) {
      limitObj.minuteLimit = logs[i];
      flag = true;
    }
    if (now.isBefore(moment(logs[i].regDate).add(1, "hour").add(moment().utcOffset(), "minute"))) {
      hourCount++;
      flag = true;
      if (
        product.serviceLimitAnHour &&
        hourCount >= product.serviceLimitAnHour &&
        !limitObj.hourLimit
      ) {
        limitObj.hourLimit = logs[i];
      }
    }
    if (
      !moment(logs[i].regDate).isBefore(now, "day") &&
      !now.isBefore(moment(logs[i].regDate), "day")
    ) {
      dayCount++;
      flag = true;
      if (
        product.serviceLimitADay &&
        dayCount >= product.serviceLimitADay &&
        !limitObj.dayLimit
      ) {
        limitObj.dayLimit = logs[i];
      }
    }
    if (flag) {
      continue;
    }
    break;
  }
  return limitObj;
};

export const accessTime = (products, goodsIdx, data) => {
  const item = products.find((item) => item.goodsIdx === goodsIdx);
  const now = moment();
  let leftTimes = [];
  if (!data || data.length === 0) return 0;
  for (let i = 0; i < Object.keys(data).length; i += 1) {
    if (Object.keys(data)[i] === "minuteLimit") {
      const date = moment(data[Object.keys(data)[i]].regDate).add(moment().utcOffset(), "minute");
      leftTimes.push(date.add(item.serviceLimitPerMinute, "minute").diff(now));
    } else if (Object.keys(data)[i] === "hourLimit") {
      const date = moment(data[Object.keys(data)[i]].regDate).add(moment().utcOffset(), "minute");
      leftTimes.push(date.add(1, "hour").diff(now));
    } else if (Object.keys(data)[i] === "dayLimit") {
      const secondByMillisecond = 1000;
      const minuteByMillisecond = 1000 * 60;
      const hourByMillisecond = 1000 * 60 * 60;
      leftTimes.push(
        (60 - now.second()) * secondByMillisecond +
          (59 - now.minute()) * minuteByMillisecond +
          (23 - now.hour()) * hourByMillisecond
      );
    }
  }
  leftTimes.sort(function (a, b) {
    return b - a;
  });

  return leftTimes[0] ? now.add(leftTimes[0], "milliseconds").valueOf() : 0;
};
