import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { OverviewComponent } from "./overview/overview.component";
import { NotFoundComponent } from "./not-found/not-found.component";
export { BaseComponent } from "./base/base.component";
const appRoutes: Routes = [
    {
        path: "app",
        component: BaseComponent,
        data: { title: "title" },
        children: [
            {
                path: "",
                redirectTo: "overview",
                pathMatch: "full"
            }, {
                path: "overview",
                component: OverviewComponent,
            },
        ]
    },
    {
        path: "**",
        redirectTo: "app/overview",
    }
];

export const RouteComponents = [
    BaseComponent,
    OverviewComponent,
    NotFoundComponent,
];

export const RouteDefinitions = RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    paramsInheritanceStrategy: "always"
});

