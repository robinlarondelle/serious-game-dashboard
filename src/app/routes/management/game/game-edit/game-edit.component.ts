import { Component, Input } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
    Game,
    Category,
    SeriousGameService,
} from "src/app/clients/serious-game-client.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-game-edit",
    templateUrl: "./game-edit.component.html",
    styleUrls: ["./game-edit.component.scss"],
})
export class GameEditComponent {
    @Input() modal: NgbModalRef;
    @Input() game: Game;

    // API Data
    public categoryResponse$: Observable<Category[]>;

    constructor(private seriousGameService: SeriousGameService) {
        this.categoryResponse$ = this.seriousGameService.getAllCategories();
    }

    public async editGame(): Promise<void> {
        //TODO: Implement validation
        const result = await this.seriousGameService
            .editGame(this.game)
            .toPromise();
        // TODO: Do a better check if the response was as expected
        if (result) {
            this.modal.close();
        }
    }
}
