import { Component } from "@angular/core";
import {
    Category,
    SeriousGameService,
} from "src/app/clients/serious-game-client.service";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { tap, switchMap, map, shareReplay } from "rxjs/operators";
import { GameNewComponent } from "../../game/game-new/game-new.component";
import { CategoryNewComponent } from "../category-new/category-new.component";
import { CategoryEditComponent } from "../category-edit/category-edit.component";

@Component({
    selector: "app-category-overview",
    templateUrl: "./category-overview.component.html",
    styleUrls: ["./category-overview.component.scss"],
})
export class CategoryOverviewComponent {
    // User input
    public reload$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public reloadingCategories = true;

    // API Data
    public categories$: Observable<Category[]>;

    constructor(
        private modalService: NgbModal,
        private seriousGameService: SeriousGameService
    ) {
        this.categories$ = combineLatest([this.reload$]).pipe(
            tap(() => {
                this.reloadingCategories = true;
            }),
            switchMap(([reload]) => {
                const resList: Category[] = [];
                return this.seriousGameService.getAllCategories().pipe(
                    map((res) => {
                        res.map((category) => {
                            resList.push(category);
                        });
                        return resList;
                    })
                );
            }),
            tap(() => {
                this.reloadingCategories = false;
            }),
            shareReplay(1)
        );
    }

    public newCategory(): void {
        const modal: NgbModalRef = this.modalService.open(
            CategoryNewComponent,
            {
                size: "lg",
                centered: true,
                backdrop: "static",
                keyboard: false,
            }
        );
        modal.componentInstance.modal = modal;
    }

    public reloadCategories(): void {
        this.reload$.next(this.reload$.getValue() + 1);
    }

    public editCategory(category: Category): void {
        console.log(category);

        const editModal: NgbModalRef = this.modalService.open(
            CategoryEditComponent,
            {
                size: "lg",
                centered: true,
                backdrop: "static",
                keyboard: false,
            }
        );
        editModal.componentInstance.category = category;
        editModal.componentInstance.modal = editModal;
    }
}
