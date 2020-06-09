import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { QuestionNewComponent } from "../question-new/question-new.component";

@Component({
    selector: "app-question-overview",
    templateUrl: "./question-overview.component.html",
    styleUrls: ["./question-overview.component.css"],
})
export class QuestionOverviewComponent implements OnInit {
    public reloadingQuestions = false;
    constructor(private modalService: NgbModal) {}

    ngOnInit() {}

    public newQuestion(): void {
        const modal: NgbModalRef = this.modalService.open(
            QuestionNewComponent,
            {
                size: "xl",
                centered: true,
                backdrop: "static",
                keyboard: false,
                scrollable: true,
            }
        );
        modal.componentInstance.modal = modal;
    }

    public reloadQuestions(): void {
        // Stub
    }
}
