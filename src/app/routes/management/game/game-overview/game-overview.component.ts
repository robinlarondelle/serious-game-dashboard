import { Component } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { GameNewComponent } from "../game-new/game-new.component";
import {
    SeriousGameService,
    Game,
} from "src/app/clients/serious-game-client.service";
import { Observable, BehaviorSubject, combineLatest } from "rxjs";
import { tap, switchMap, map, shareReplay } from "rxjs/operators";
import { GameEditComponent } from "../game-edit/game-edit.component";

@Component({
    selector: "app-game-overview",
    templateUrl: "./game-overview.component.html",
    styleUrls: ["./game-overview.component.css"],
})
export class GameOverviewComponent {
    // User input
    public reload$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public reloadingGames = true;

    // API Data
    public games$: Observable<Game[]>;

    // Utils
    public alerts: Alert[] = [];

    constructor(
        private modalService: NgbModal,
        private seriousGameService: SeriousGameService
    ) {
        this.games$ = combineLatest([this.reload$]).pipe(
            tap(() => {
                this.reloadingGames = true;
            }),
            switchMap(([reload]) => {
                const resList: Game[] = [];
                return this.seriousGameService.getAllGames().pipe(
                    map((res) => {
                        res.map((game) => {
                            resList.push(game);
                        });
                        return resList;
                    })
                );
            }),
            tap(() => {
                this.reloadingGames = false;
            }),
            shareReplay(1)
        );
    }

    public newGame(): void {
        const modal: NgbModalRef = this.modalService.open(GameNewComponent, {
            size: "xl",
            centered: true,
            backdrop: "static",
            keyboard: false,
        });
        modal.componentInstance.modal = modal;
    }

    public editGame(game: Game): void {
        const editModal: NgbModalRef = this.modalService.open(
            GameEditComponent,
            {
                size: "xl",
                centered: true,
                backdrop: "static",
                keyboard: false,
            }
        );
        editModal.componentInstance.modal = editModal;
        editModal.componentInstance.game = game;
    }

    public reloadGames(): void {
        this.reload$.next(this.reload$.getValue() + 1);
    }

    public async deleteGame(game: Game): Promise<void> {
        const result = await this.seriousGameService
            .deleteGame(game)
            .toPromise();

        if (result) {
            this.alerts.push({
                type: "success",
                message: "Game succesvol verwijderd.",
            });
            this.reloadGames();
        }
    }
}

interface Alert {
    type: string;
    message: string;
}
