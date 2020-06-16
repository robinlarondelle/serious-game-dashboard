import { Component, Input } from "@angular/core";

@Component({
    selector: "app-pie-chart",
    templateUrl: "./pie-chart.component.html",
    styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent {
    @Input() data: unknown[];
    @Input() footer: string;
    @Input() height: number;
    @Input() showLegend = false;
    @Input() legendOnBottom = false;
    @Input() noCard = false;
    @Input() showLabels = true;
    constructor() {
        //
    }
}
