import { Component, OnInit } from "@angular/core";
import {
    SeriousGameService,
    Game,
    MultiChartData,
} from "src/app/clients/serious-game-client.service";
import { Observable, BehaviorSubject, combineLatest, merge, zip } from "rxjs";
import { Route } from "@angular/compiler/src/core";
import { Router, ActivatedRoute } from "@angular/router";
import { tap, switchMap, shareReplay, mergeAll, map } from "rxjs/operators";

@Component({
    selector: "app-overview",
    templateUrl: "./overview.component.html",
    styleUrls: ["./overview.component.scss"],
})
export class OverviewComponent implements OnInit {
    // API Data
    public allGames$: Observable<Game[]>;
    public gamePins$: Observable<number[]>;
    public game$: Observable<Game>;
    public averageScorePerCategory$: Observable<MultiChartData[]>;
    public playsPerDay$: Observable<LineChart[]>;

    // User input
    public reloadInSec$: BehaviorSubject<number>;
    public selectedGame$: BehaviorSubject<number>;
    public maxPlaysForAveragePlayerStat$ = new BehaviorSubject<number>(10);

    // Utils
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public interval: any;
    public timeLeft: number;
    public timerIsRunning: boolean;
    public reloadTrigger$: BehaviorSubject<number> = new BehaviorSubject(0);
    public alerts: Alert[] = [];

    // Test Data
    multiTestData = [
        {
            name: "Aantal Plays",
            series: [
                {
                    value: 110,
                    name: "2020-06-10",
                },
                {
                    value: 100,
                    name: "2020-06-11",
                },
                {
                    value: 20,
                    name: "2020-06-12",
                },
                {
                    value: 200,
                    name: "2020-06-13",
                },
                {
                    value: 2,
                    name: "2020-06-14",
                },
                {
                    value: 340,
                    name: "2020-06-15",
                },
            ],
        },
    ];

    constructor(
        private seriousGameService: SeriousGameService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // Don't want a subscription in the constructor, so fetch url params only once
        this.reloadInSec$ = new BehaviorSubject<number>(
            parseInt(this.route.snapshot.queryParamMap.get("autoReload")) || 0
        );

        this.selectedGame$ = new BehaviorSubject<number>(
            parseInt(this.route.snapshot.queryParamMap.get("gamePin")) || 111111
        );

        this.allGames$ = combineLatest([
            this.reloadInSec$,
            this.reloadTrigger$,
        ]).pipe(
            tap(([reloadInSec, reloadTrigger]) => {
                // Set query params
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: {
                        autoReload: reloadInSec ? reloadInSec : undefined,
                    },
                    replaceUrl: false,
                    queryParamsHandling: "merge",
                });

                if (reloadInSec && !this.timerIsRunning && reloadInSec != 0) {
                    this.startTimer();
                }
            }),
            switchMap(([reloadInSec, reloadTrigger]) => {
                return this.seriousGameService.getAllGames();
            }),
            shareReplay(1)
        );

        this.game$ = combineLatest([
            this.selectedGame$,
            this.reloadInSec$,
            this.reloadTrigger$,
        ]).pipe(
            tap(([selectedGame, reloadInSec, reloadTrigger]) => {
                this.router.navigate([], {
                    relativeTo: this.route,
                    queryParams: {
                        gamePin: selectedGame != 0 ? selectedGame : undefined,
                    },
                    replaceUrl: false,
                    queryParamsHandling: "merge",
                });
            }),
            switchMap(([selectedGame, reloadInSec, reloadTrigger]) => {
                return this.seriousGameService.getGameByPin(selectedGame);
            }),
            shareReplay(1)
        );

        this.playsPerDay$ = combineLatest([
            this.selectedGame$,
            this.reloadInSec$,
            this.reloadTrigger$,
        ]).pipe(
            switchMap(([selectedGame, x, y]) => {
                const resLineChartArray: LineChart[] = [];
                return this.seriousGameService
                    .getPlaysPerDay(selectedGame)
                    .pipe(
                        map((res) => {
                            const resLineChart: LineChart = {
                                name: "Gespeelde spellen",
                                series: res,
                            };
                            resLineChartArray.push(resLineChart);
                            return resLineChartArray;
                        })
                    );
            }),
            shareReplay(1)
        );

        this.averageScorePerCategory$ = combineLatest([
            this.selectedGame$,
            this.maxPlaysForAveragePlayerStat$,
            this.reloadInSec$,
            this.reloadTrigger$,
        ]).pipe(
            switchMap(
                ([selectedGame, maxPlays, reloadInSec, reloadTrigger]) => {
                    return zip(
                        this.seriousGameService.getAvgScorePerCat(),
                        this.seriousGameService.getAvgPlayer(maxPlays)
                    ).pipe(
                        map((res) => {
                            const result = [].concat(...res);
                            return result.sort();
                        })
                    );
                }
            ),
            shareReplay(1)
        );
    }

    async ngOnInit(): Promise<void> {
        // Burp
    }

    public startTimer(): void {
        this.timerIsRunning = true;
        console.log("Timer started");

        this.interval = setInterval(() => {
            if (this.reloadInSec$.getValue() === 0) {
                this.stopTimer();
            }
            if (this.timeLeft > 0) {
                console.log(this.timeLeft);

                this.timeLeft--;
            } else {
                // Time has passed.
                this.reloadTrigger$.next(this.reloadTrigger$.getValue() + 1);
                this.timeLeft = this.reloadInSec$.getValue();
            }
        }, 1000);
    }

    public stopTimer(): void {
        clearInterval(this.interval);
        this.timerIsRunning = false;
    }
}

export interface Alert {
    type: string;
    message: string;
}

interface LineChart {
    name: string;
    series?: {
        name: string;
        value: number;
    }[];
}
