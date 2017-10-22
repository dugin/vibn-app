import {Component, Input} from '@angular/core';
import {EventModel} from '../../models/Event';
import * as moment from 'moment';
import 'moment/locale/pt-br';

/**
 * Generated class for the EventCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent {

  @Input() event: EventModel;

  constructor() {
    console.log('Hello EventCardComponent Component');

  }

  setTime(day){
    return moment(day).format('HH:mm');

  }
  setWeekDate(day) {
    return moment(day).format('ddd');
  }
}
