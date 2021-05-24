// rounds number up to single digit excluding decimals
const rounder = (num) => {
  if (num && num.toString().length > 2) {
    return Math.round(num * 1) / 1;
  } else return num;
};

// converts a number from miliseconds to seconds, minutes, hours, days by
// returning a templated string, with a number rounded up to the nearst digit excluding decimals and the corresponding letter
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

// Argument format needs to be "Wed May 12 2021 18:50:46 GMT-0700 (Pacific Daylight Time)"
const readableDate = (str) => {
  const date = str.slice(3, 15);
  const timeTwentyFour = str.slice(15, 24);
  const timeTwelve =
    Number(timeTwentyFour.slice(0, 3)) > 12
      ? `${timeTwentyFour.slice(0, 3) - 12 + `:` + timeTwentyFour.slice(4)}` +
        " " +
        `PM`
      : `${timeTwentyFour.slice(0, 3) + `:` + timeTwentyFour.slice(4)}` +
        " " +
        `AM`;

  return `${timeTwelve} - ${date}`;
};

// returns just the date from this format "Wed May 12 2021 18:50:46 GMT-0700 (Pacific Daylight Time)"
const justDate = (str) => {
  return str.slice(3, 15);
};

// takes in string and returns the string to the 60'th index and adds "..."
// made for searchClone.js to still display bios and prevent really long bios 120+ to take up too much space. 
// possible refactor to end at a space, to prevent a word from being cut off... tbd
const smallBio = (str) => {
  if (str && str.length > 60) {
    let slice = str.slice(0, 60);
    let smallBio = slice + "...";
    return smallBio;
  }else{
    return str;
  }
};

export { convertMili, rounder, readableDate, justDate, smallBio };
