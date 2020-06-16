import { Component, Input } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { SeriousGameService } from "src/app/clients/serious-game-client.service";

@Component({
    selector: "app-category-new",
    templateUrl: "./category-new.component.html",
    styleUrls: ["./category-new.component.scss"],
})
export class CategoryNewComponent {
    @Input() modal: NgbModalRef;
    public category: CategoryRequest;
    public alerts: Alert[] = [];

    // Validity
    public minCategoryName = 5;

    constructor(private seriousGameService: SeriousGameService) {
        this.category = { name: "" };
    }

    public async postCategory(): Promise<void> {
        // Check if categoryName is valid
        this.alerts = [];
        this.category.name.trim();
        if (this.category.name.length >= this.minCategoryName) {
            const result = await this.seriousGameService
                .postCategory(this.category)
                .toPromise();
            // TODO: Do a better check if the response was as expected
            if (result) {
                this.modal.close();
            }
        } else {
            this.alerts.push({
                type: "danger",
                message: `Categorienaam moet minimaal ${this.minCategoryName} zijn. Gevonden: ${this.category.name.length}`,
            });
        }
    }
}

export interface CategoryRequest {
    name?: string;
}

interface Alert {
    type: string;
    message: string;
}
