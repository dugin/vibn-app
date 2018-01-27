import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MapsPage } from "./maps";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [MapsPage],
  imports: [IonicPageModule.forChild(MapsPage)]
})
export class MapsPageModule {}
