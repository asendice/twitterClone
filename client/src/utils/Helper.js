
// rounds number up to single digit excluding decimals 
const rounder = (num) => {
  if (num && num.toString().length > 2) {
    return Math.round(num * 1) / 1;
  } else return num;
};

// converts a number from miliseconds to seconds, minutes, hours, days by 
// returning a string rounded up to the nearst single digit excluding decimals and corresponding letter
const convertMili = (num) => {
  switch (num > 0) {
    case num >= 1000 && num < 60000:
      const seconds = num / 1000;
      return `${rounder(seconds)}s`;
    case num >= 60000 && num < 3600000:
      const minutes = num / 60000;
      return `${rounder(minutes)}m`;
    case num >= 3600000 && num < 86400000:
      const hours = num / 3600000;
      return `${rounder(hours)}h`;
    case num >= 86400000:
      const days = num / 86400000;
      return `${rounder(days)}d`;
    default:
      return `Now`;
  }
};




export { convertMili, rounder };
