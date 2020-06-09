import { Component, OnInit, Input } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Game } from "src/app/clients/serious-game-client.service";

@Component({
    selector: "app-game-new",
    templateUrl: "./game-new.component.html",
    styleUrls: ["./game-new.component.css"],
})
export class GameNewComponent implements OnInit {
    @Input() modal: NgbModalRef;
    public game: Game;
    public errorMessage: string = undefined;

    // Validation
    public gameDescriptionLength = 5;

    constructor() {
        this.game = { description: "" };
    }

    public addDepartment(): void {
        this.game.description = this.game.description.trim();
        if (this.game.description.length >= this.gameDescriptionLength) {
            this.errorMessage = undefined;
            // TODO: Send to api, wait for response
        } else {
            this.errorMessage = `Game description is not valid. Description must be longer or same length as ${this.gameDescriptionLength}. Found ${this.game.description.length} `;
        }
    }
    ngOnInit() {}
}
