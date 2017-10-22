export class EventModel {

  constructor(public   address?: string,
              public   attendingCount?: number,
              public   buyLink?: string,
              public   city?: string,
              public   coordinates?: any,
              public   coupon?: string,
              public   createdAt?: string,
              public   discount?: number,
              public   endDate?: string,
              public   endTime?: string,
              public   id?: string,
              public   img?: string,
              public   neighbohood?: number,
              public   place?: string,
              public   startTime?: string,
              public   startDate?: string,
              public   state?: string,
              public   subtitle?: string,
              public   tags?: { locationRegion: string[], musicStyle: string[], partyKind: string[] },
              public   title?: string,
              public   distance?: string,
              public   directLink?: boolean) {
  }

}
