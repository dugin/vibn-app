import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltersModalPage } from './filters-modal';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {FilterProvider} from '../../providers/filter/filter';

@NgModule({
  declarations: [
    FiltersModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltersModalPage),
  ],
  providers: [
    FirebaseProvider,
    FilterProvider
  ]
})
export class FiltersModalPageModule {}
