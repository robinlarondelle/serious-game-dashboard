import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-vertical-bar-chart",
    templateUrl: "./vertical-bar-chart.component.html",
    styleUrls: ["./vertical-bar-chart.component.css"],
})
export class VerticalBarChartComponent implements OnInit {
    @Input() data: any[];
    @Input() height: number;
    @Input() showLegend = false;
    @Input() legendOnBottom = false;
    @Input() noCard = false;
    constructor() {}
    ngOnInit() {}
}
