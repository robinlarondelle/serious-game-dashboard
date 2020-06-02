import { Component } from "@angular/core";

@Component({
    selector: "app-department-overview",
    templateUrl: "./department-overview.component.html",
    styleUrls: ["./department-overview.component.css"],
})
export class DepartmentOverviewComponent {
    public reloadingDepartments = false;
    constructor() {
        // Stub
    }

    public newDepartment(): void {
        console.log("Click");
    }

    public reloadDepartments(): void {
        if (this.reloadingDepartments) {
            this.reloadingDepartments = false;
        } else {
            this.reloadingDepartments = true;
        }
    }
}
