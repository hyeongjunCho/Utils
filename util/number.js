const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];

export const abbreviateNumber = (number) => {
  // what tier? (determines SI symbol)
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return number;

  // get suffix and determine scale
  var suffix = SI_SYMBOL[tier];
  var scale = Math.pow(10, tier * 3);

  // scale the number
  var scaled = Math.floor((number / scale) * 100) / 100;

  // format number and add suffix
  return scaled.toFixed(2) + suffix;
};
