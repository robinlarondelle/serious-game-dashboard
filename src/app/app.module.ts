import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
    RouteComponents,
    BaseComponent,
    RouteDefinitions,
} from "./routes/index";

@NgModule({
    declarations: [...RouteComponents],
    imports: [BrowserModule, NgbModule, RouteDefinitions],
    providers: [],
    bootstrap: [BaseComponent],
})
export class AppModule {}
