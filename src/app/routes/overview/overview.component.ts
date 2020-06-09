import { Component, OnInit } from "@angular/core";
import {
    SeriousGameService,
    Game,
} from "src/app/clients/serious-game-client.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
    public games$: Observable<Game[]>;
    constructor(private seriousGameService: SeriousGameService) {
        this.games$ = this.seriousGameService.getAllGames();
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
