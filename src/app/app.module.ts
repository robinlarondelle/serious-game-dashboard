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
import { QuestionNewComponent } from "./routes/management/question/question-new/question-new.component";
import { FormsModule } from "@angular/forms";
import { SeriousGameService } from "./clients/serious-game-client.service";
import { HttpClientModule } from "@angular/common/http";
import { MomentModule } from "ngx-moment";
import { GameNewComponent } from "./routes/management/game/game-new/game-new.component";
import { CategoryNewComponent } from "./routes/management/category/category-new/category-new.component";
import { CategoryEditComponent } from "./routes/management/category/category-edit/category-edit.component";
import { GameEditComponent } from "./routes/management/game/game-edit/game-edit.component";

@NgModule({
    declarations: [
        ...RouteComponents,
        SidebarComponent,
        VerticalBarChartComponent,
    ],
    imports: [
        FormsModule,
        HttpClientModule,
        BrowserModule,
        NgbModule,
        RouteDefinitions,
        NgxChartsModule,
        BrowserAnimationsModule,
        MomentModule,
    ],
    providers: [SeriousGameService],
    bootstrap: [BaseComponent],
    entryComponents: [
        GameNewComponent,
        GameEditComponent,
        QuestionNewComponent,
        CategoryNewComponent,
        CategoryEditComponent,
    ],
})
export class AppModule {}
