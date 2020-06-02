import { Component, OnInit, Input } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-department-new",
    templateUrl: "./department-new.component.html",
    styleUrls: ["./department-new.component.css"],
})
export class DepartmentNewComponent implements OnInit {
    @Input() modal: NgbModalRef;
    public department: IRequestDepartment;
    public errorMessage: string = undefined;

    // Validation
    public departmentNameLength = 5;

    constructor() {
        this.department = { name: "" };
    }

    public addDepartment(): void {
        this.department.name = this.department.name.trim();
        if (this.department.name.length >= this.departmentNameLength) {
            this.errorMessage = undefined;
            // TODO: Send to api, wait for response
        } else {
            this.errorMessage = `Department name is not valid. Name must be longer or same length as ${this.departmentNameLength}. Found ${this.department.name.length} `;
        }
    }
    ngOnInit() {}
}

export interface IRequestDepartment {
    name: string;
}
