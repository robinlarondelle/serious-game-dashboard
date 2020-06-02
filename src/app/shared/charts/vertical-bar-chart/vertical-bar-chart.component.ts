/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from "@angular/core";

@Component({
    selector: "app-vertical-bar-chart",
    templateUrl: "./vertical-bar-chart.component.html",
    styleUrls: ["./vertical-bar-chart.component.css"],
})
export class VerticalBarChartComponent {
    @Input() data: any[];
    @Input() height: number;
    @Input() showLegend = false;
    @Input() legendOnBottom = false;
    @Input() noCard = false;
    @Input() gridLines = true;
    @Input() xAxis: string;
    @Input() yAxis: string;
    @Input() showXAxis = false;
    @Input() showYAxis = true;
    @Input() showXLabel = false;
    @Input() showYLabel = false;

    constructor() {
        // Stub
    }
}
