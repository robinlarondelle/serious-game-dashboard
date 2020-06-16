import { Component, Input } from "@angular/core";

@Component({
    selector: "app-grouped-vertical-bar-chart",
    templateUrl: "./grouped-vertical-bar-chart.component.html",
    styleUrls: ["./grouped-vertical-bar-chart.component.css"],
})
export class GroupedVerticalBarChartComponent {
    @Input() data: unknown[];
    @Input() footer: string;
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
        // Foo
    }

    public formatAsDumbString(input: number): string {
        return input.toString();
    }
}
