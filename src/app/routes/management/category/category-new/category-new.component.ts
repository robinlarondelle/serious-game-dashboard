import { Component, OnInit, Input } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
    SeriousGameService,
    Category,
} from "src/app/clients/serious-game-client.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-category-new",
    templateUrl: "./category-new.component.html",
    styleUrls: ["./category-new.component.scss"],
})
export class CategoryNewComponent {
    @Input() modal: NgbModalRef;
    public category: CategoryRequest;

    // Validity
    public minCategoryName = 5;

    constructor(private seriousGameService: SeriousGameService) {
        this.category = { name: "" };
    }

    public async postCategory(): Promise<void> {
        // Check if categoryName is valid
        this.category.name.trim();
        if (this.category.name.length >= this.minCategoryName) {
            const result = await this.seriousGameService
                .postCategory(this.category)
                .toPromise();
            // TODO: Do a better check if the response was as expected
            if (result) {
                this.modal.close();
            }
        }
    }
}

export interface CategoryRequest {
    name?: string;
}
