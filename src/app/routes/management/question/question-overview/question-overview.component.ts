import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-question-overview",
    templateUrl: "./question-overview.component.html",
    styleUrls: ["./question-overview.component.css"],
})
export class QuestionOverviewComponent implements OnInit {
    public reloadingQuestions = false;
    constructor() {}

    ngOnInit() {}

    public reloadQuestions(): void {
        // Stub
    }

    public newQuestion(): void {
        // Stub
    }
}
