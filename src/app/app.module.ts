import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
    RouteComponents,
    BaseComponent,
    RouteDefinitions,
} from "./routes/index";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { VerticalBarChartComponent } from "./shared/charts/vertical-bar-chart/vertical-bar-chart.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@NgModule({
    declarations: [
        ...RouteComponents,
        SidebarComponent,
        VerticalBarChartComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        RouteDefinitions,
        NgxChartsModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [BaseComponent],
})
export class AppModule {}
