import { NgModule } from '@angular/core';
import { FacebookLoginComponent } from './facebook-login/facebook-login';
import {FirebaseProvider} from '../providers/firebase/firebase';
import {Facebook} from "@ionic-native/facebook";
import {IonicModule} from 'ionic-angular';

@NgModule({
	declarations: [FacebookLoginComponent],
	imports: [IonicModule.forRoot(ComponentsModule)],
  providers: [FirebaseProvider, Facebook],
	exports: [FacebookLoginComponent]
})
export class ComponentsModule {}
