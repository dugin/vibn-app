 const Constants = {
  ACCURACY: 10,

  FIREBASE_COLLECTION_EVENTS: "events",
  FIREBASE_COLLECTION_USERS: "users",
  FIREBASE_COLLECTION_TAGS: "tags",

  FIREBASE_TAGS: {
    LOCATION_REGION: "locationRegion",
    MUSIC_STYLE: "musicStyle",
    PARTY_KIND: "partyKind"
  },

  FILTERS: {
    musicStyle: {
      value: "",
      array: null,
      kind: "name",
      name: "Músicas",
      multipleChoice: true
    },
    locationRegion: {
      value: "",
      array: null,
      kind: "riodejaneiro",
      name: "Locais",
      multipleChoice: true
    },
    partyKind: {
      value: "",
      array: null,
      kind: "name",
      name: "Extras",
      multipleChoice: false
    }
  }
};
 export default Constants;
