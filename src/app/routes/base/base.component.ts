import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-base",
    templateUrl: "./base.component.html",
    styleUrls: ["./base.component.css"],
})
export class BaseComponent implements OnInit {
    public readonly urlParts = window.location.href;

    constructor() {}

    ngOnInit() {}
}
