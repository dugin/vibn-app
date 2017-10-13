import {EventModel} from '../models/Event';
import * as moment from 'moment';

export const sortByDate = (val: EventModel[]) => {
  return val.sort((a: EventModel, b) => setMomentObj(a.startDate, a.startTime).diff(setMomentObj(b.startDate, b.startTime)))
};

export const setMomentObj = (startDate: string, startTime: string): moment.Moment => {
  return moment(startDate + ' ' + startTime, 'DD/MM/YYY HH:mm');
};

export const setEventDate = (day) => {
  const d = moment(day, 'DD/MM/YYYY');
  const diff = Math.ceil(d.diff(moment(), 'd', true));

  switch (diff) {
    case 0 :
      return 'Hoje';
    case 1:
      return 'Amanhã';

    default:
      return d.format('DD/MM');
  }

};

