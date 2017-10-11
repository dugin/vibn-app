import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';

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

}
