import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { OverviewComponent } from "./overview/overview.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { QuestionOverviewComponent } from "./management/question/question-overview/question-overview.component";
import { QuestionNewComponent } from "./management/question/question-new/question-new.component";
import { GameOverviewComponent } from "./management/game/game-overview/game-overview.component";
import { GameNewComponent } from "./management/game/game-new/game-new.component";
import { CategoryOverviewComponent } from "./management/category/category-overview/category-overview.component";
import { CategoryNewComponent } from "./management/category/category-new/category-new.component";
export { BaseComponent } from "./base/base.component";
const appRoutes: Routes = [
    {
        path: "app",
        data: { title: "title" },
        children: [
            {
                path: "",
                redirectTo: "overview",
                pathMatch: "full",
            },
            {
                path: "overview",
                component: OverviewComponent,
            },
            {
                path: "management",
                children: [
                    {
                        path: "games",
                        component: GameOverviewComponent,
                    },
                    {
                        path: "questions",
                        component: QuestionOverviewComponent,
                    },
                    {
                        path: "categories",
                        component: CategoryOverviewComponent,
                    },
                ],
            },
        ],
    },
    {
        path: "**",
        redirectTo: "app/overview",
    },
];

export const RouteComponents = [
    BaseComponent,
    OverviewComponent,
    NotFoundComponent,
    GameOverviewComponent,
    GameNewComponent,
    QuestionOverviewComponent,
    QuestionNewComponent,
    CategoryOverviewComponent,
    CategoryNewComponent,
];

export const RouteDefinitions = RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    paramsInheritanceStrategy: "always",
});
