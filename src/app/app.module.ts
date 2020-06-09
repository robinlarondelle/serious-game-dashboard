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
import { QuestionNewComponent } from "./routes/management/question/question-overview/question-new/question-new.component";
import { FormsModule } from "@angular/forms";
import { SeriousGameService } from "./clients/serious-game-client.service";
import { HttpClientModule } from "@angular/common/http";
import { MomentModule } from "ngx-moment";
import { GameNewComponent } from "./routes/management/game/game-new/game-new.component";

@NgModule({
    declarations: [
        ...RouteComponents,
        SidebarComponent,
        VerticalBarChartComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        NgbModule,
        RouteDefinitions,
        NgxChartsModule,
        BrowserAnimationsModule,
        FormsModule,
        MomentModule,
    ],
    providers: [SeriousGameService],
    bootstrap: [BaseComponent],
    entryComponents: [GameNewComponent, QuestionNewComponent],
})
export class AppModule {}
