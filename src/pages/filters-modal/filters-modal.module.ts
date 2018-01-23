import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { FiltersModalPage } from "./filters-modal";

@NgModule({
  declarations: [FiltersModalPage],
  imports: [IonicPageModule.forChild(FiltersModalPage)]
})
export class FiltersModalPageModule {}
