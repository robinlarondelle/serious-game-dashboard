import { Component, OnInit, Input } from "@angular/core";
import {
    Category,
    SeriousGameService,
} from "src/app/clients/serious-game-client.service";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-category-edit",
    templateUrl: "./category-edit.component.html",
    styleUrls: ["./category-edit.component.scss"],
})
export class CategoryEditComponent {
    @Input() category: Category;
    @Input() modal: NgbModalRef;
    minCategoryName = 5;
    constructor(private seriousGameService: SeriousGameService) {
        console.log(this.category);
    }

    public async putCategory(): Promise<void> {
        // Check if categoryName is valid
        this.category.name.trim();
        if (this.category.name.length >= this.minCategoryName) {
            const result = await this.seriousGameService
                .editCategory(this.category)
                .toPromise();
            // TODO: Do a better check if the response was as expected
            if (result) {
                this.modal.close();
            }
        }
    }
}
