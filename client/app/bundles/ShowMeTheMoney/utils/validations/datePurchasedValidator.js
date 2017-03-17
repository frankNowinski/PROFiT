import moment from 'moment';

export default function futureDate(date) {
  let now = moment();
  let purchasedDate = moment(date, 'hh:mm');

  return purchasedDate.isAfter(now) ? true : false;
}



