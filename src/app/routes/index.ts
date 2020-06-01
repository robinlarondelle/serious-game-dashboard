import { RouterModule, Routes } from "@angular/router";
import { BaseComponent } from "./base/base.component";
import { OverviewComponent } from "./overview/overview.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { DepartmentOverviewComponent } from "./management/department/department-overview/department-overview.component";
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
                        path: "departments",
                        component: DepartmentOverviewComponent,
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
    DepartmentOverviewComponent,
];

export const RouteDefinitions = RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    paramsInheritanceStrategy: "always",
});
