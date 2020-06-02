import { Component } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { DepartmentNewComponent } from "../department-new/department-new.component";

@Component({
    selector: "app-department-overview",
    templateUrl: "./department-overview.component.html",
    styleUrls: ["./department-overview.component.css"],
})
export class DepartmentOverviewComponent {
    public reloadingDepartments = false;
    constructor(private modalService: NgbModal) {
        // Stub
    }

    public newDepartment(): void {
        const modal: NgbModalRef = this.modalService.open(
            DepartmentNewComponent,
            { size: "lg", centered: true, backdrop: "static" }
        );
        modal.componentInstance.modal = modal;
    }

    public reloadDepartments(): void {
        if (this.reloadingDepartments) {
            this.reloadingDepartments = false;
        } else {
            this.reloadingDepartments = true;
        }
    }
}
