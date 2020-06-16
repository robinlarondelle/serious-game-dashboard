import { Component, OnInit, Input } from "@angular/core";
import * as shapes from "d3-shape";

@Component({
    selector: "app-polar-chart",
    templateUrl: "./polar-chart.component.html",
    styleUrls: ["./polar-chart.component.css"],
})
export class PolarChartComponent implements OnInit {
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
    public curve: unknown = shapes.curveLinearClosed;
    constructor() {
        // Foo
    }

    public formatAsDumbString(input: unknown): string {
        return input.toString();
    }

    ngOnInit() {}
}
