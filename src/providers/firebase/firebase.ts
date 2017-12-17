import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as moment from 'moment';
import {Constants} from '../../utils/constants';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public af: AngularFirestore, public auth: AngularFireAuth) {
    console.log('Hello FirebaseProvider Provider');
  }

  getAllEvents() {
    return this.af.collection(Constants.FIREBASE_COLLECTION_EVENTS,
      ref => ref
        .where('endDate', '>=', moment().toDate())
        .orderBy('endDate', 'asc'))
      .valueChanges();
  }

  postNewUser(id, user) {
    return this.af.collection(Constants.FIREBASE_COLLECTION_USERS)
      .doc(id)
      .ref
      .set({...user, createdAt: moment().toDate()}, {merge: true})
  }

  getTags(id) {
    return this.af.collection(Constants.FIREBASE_COLLECTION_TAGS)
      .doc(id)
      .valueChanges()
  }


}
