import moment from 'moment';

export default function futureDate(date) {
    if (moment().diff(date, 'days') < 0) {
      return true;
    } else {
      return false;
    }
}



