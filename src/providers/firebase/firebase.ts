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

  events = 'events';

  constructor(public af: AngularFirestore, public auth: AngularFireAuth) {

    console.log('Hello FirebaseProvider Provider');

  }


  getAllEvents() {
    return this.af.collection(Constants.FIREBASE_COLLECTION_EVENTS, ref => ref.where('startDate', '>=', moment().toDate())
      .orderBy('startDate', 'asc')).valueChanges();
  }

}
