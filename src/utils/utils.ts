import isEmpty from "lodash/isEmpty";

export const toLatLng = (lat, lng) => {
  return { latitude: lat, longitude: lng };
};

export const filterEvents = (events, filters, filteredEvents) => {
  let shouldShow = true;

  console.log(events);
  console.log(filters);

  if (!isEmpty(filters)) {
    return events.filter(e => {
      for (const key of Object.keys(e.tags)) {
        let tags = filters[key];
        shouldShow = !tags || e.tags[key].some(t => tags.includes(t));
        if (!shouldShow) break;
      }

      return shouldShow;
    });
  } else if (typeof filters !== "undefined") {
    return events;
  }
  return filteredEvents;
};
