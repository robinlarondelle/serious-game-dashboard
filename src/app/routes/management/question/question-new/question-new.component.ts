import { Component, OnInit, Input } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-question-new",
    templateUrl: "./question-new.component.html",
    styleUrls: ["./question-new.component.scss"],
})
export class QuestionNewComponent implements OnInit {
    @Input() modal: NgbModalRef;
    public question: IRequestQuestion;
    public errorMessage: string = undefined;

    constructor() {
        this.question = { body: "" };
    }

    ngOnInit() {}

    public addQuestion(): void {
        // Stub
    }
}

export interface IRequestQuestion {
    body: string;
}
