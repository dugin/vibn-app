import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EventDetailPage } from "./event-detail";
import { ComponentsModule } from "../../components/components.module";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Firebase } from "@ionic-native/firebase";

@NgModule({
  declarations: [EventDetailPage],
  imports: [IonicPageModule.forChild(EventDetailPage), ComponentsModule],
  providers: [InAppBrowser, Firebase]
})
export class EventDetailPageModule {}
