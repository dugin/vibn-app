import {Component, Input, OnChanges} from '@angular/core';
import {EventModel} from '../../models/Event';
import * as dateHandler from '../../utils/dateHandler';

/**
 * Generated class for the EventCoverImageComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'event-cover-image',
  templateUrl: 'event-cover-image.html'
})
export class EventCoverImageComponent {

  @Input() event: EventModel;

  imgLoaded = false;

  constructor() {
    console.log('Hello EventCoverImageComponent Component');
  }


  setDate(day) {
    return dateHandler.setEventDate(day)
  }

}
