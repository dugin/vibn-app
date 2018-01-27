import { Component, Input } from "@angular/core";
import { EventModel } from "../../models/Event";
import { setTime, setWeekDate } from "../../utils/dateHandler";

/**
 * Generated class for the EventCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: "event-card",
  templateUrl: "event-card.html"
})
export class EventCardComponent {
  @Input() event: EventModel;

  constructor() {}

  setTime(day) {
    return setTime(day);
  }
  setWeekDate(day) {
    return setWeekDate(day);
  }
}
