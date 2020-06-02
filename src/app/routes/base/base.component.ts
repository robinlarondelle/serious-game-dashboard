import { Component } from "@angular/core";

@Component({
    selector: "app-base",
    templateUrl: "./base.component.html",
    styleUrls: ["./base.component.css"],
})
export class BaseComponent {
    public readonly urlParts = window.location.href;

    constructor() {
        // Stub
    }
}
