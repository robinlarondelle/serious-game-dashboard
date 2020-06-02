import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
    constructor() {
        // Stub
    }
    testData = [
        {
            name: "Germany",
            value: 40632,
            extra: {
                code: "de",
            },
        },
        {
            name: "United States",
            value: 50000,
            extra: {
                code: "us",
            },
        },
        {
            name: "France",
            value: 36745,
            extra: {
                code: "fr",
            },
        },
        {
            name: "United Kingdom",
            value: 36240,
            extra: {
                code: "uk",
            },
        },
        {
            name: "Spain",
            value: 33000,
            extra: {
                code: "es",
            },
        },
        {
            name: "Italy",
            value: 35800,
            extra: {
                code: "it",
            },
        },
    ];

    ngOnInit(): void {
        // Stub
    }
}
