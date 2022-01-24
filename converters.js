const converters = {
  timeTransform : function (timeUnix){
    let time = timeUnix*1000;

const hours = new Date(time).getHours();
const minutes = new Date(time).getMinutes();

return (`${hours}:${minutes}`);
  },
  dateTransform : function (unixTime){
  const date = new Date(unixTime * 1000);
  const month = date.toLocaleString('en-US', {month: "short"});
  const day = new Date(date).getDate();

return (`${day} ${month}`);
  }
}

export const timeTransform = converters.timeTransform;
export const dateTransform = converters.dateTransform;