import { Component, OnInit, Input } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
    Game,
    Category,
    SeriousGameService,
} from "src/app/clients/serious-game-client.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-game-new",
    templateUrl: "./game-new.component.html",
    styleUrls: ["./game-new.component.scss"],
})
export class GameNewComponent {
    @Input() modal: NgbModalRef;
    public game: GameRequest;
    public errorMessage: string = undefined;

    // Validation
    public amountOfQuestions = 15;
    public amountOfQuestionsPerLevel = 5;
    public amountOfAnswersPerQuestion = 4;
    public gameDescriptionLength = 5;
    public minDeltaScore = -100;
    public maxDeltaScore = 100;

    public validRequest: boolean;

    // API Response
    public apiResponse: Game;
    public categoryResponse$: Observable<Category[]>;

    constructor(protected seriousGameService: SeriousGameService) {
        this.game = { description: "", questions: [] };
        this.addQuestion();
        this.categoryResponse$ = this.seriousGameService.getAllCategories();
    }

    public addQuestion(): void {
        if (this.game.questions.length < this.amountOfQuestions) {
            console.log(this.game.questions.length);

            // Place a question in a level based on its index.
            if (
                this.game.questions.length + 1 <=
                this.amountOfQuestionsPerLevel
            ) {
                this.game.questions.push({
                    level: 1,
                    answers: [{}, {}, {}, {}],
                });
            } else if (
                this.game.questions.length + 1 >
                    this.amountOfQuestionsPerLevel &&
                this.game.questions.length + 1 <=
                    this.amountOfQuestionsPerLevel * 2
            ) {
                this.game.questions.push({
                    level: 2,
                    answers: [{}, {}, {}, {}],
                });
            } else {
                this.game.questions.push({
                    level: 3,
                    answers: [{}, {}, {}, {}],
                });
            }
        }
    }

    private validateRequest(): boolean {
        // // Check if game contains description
        // if (this.game.description.length >= this.gameDescriptionLength) {
        //     // Check if there are enough game questions
        //     if (this.game.questions.length == this.amountOfQuestions) {
        //         this.game.questions.forEach((question) => {
        //             if (
        //                 question.answers.length ==
        //                 this.amountOfAnswersPerQuestion
        //             ) {
        //                 // Check if category & level exist
        //                 if (question.category && question.level) {
        //                     question.answers.forEach((answer) => {
        //                         // Check if delta scores are okay
        //                         if (
        //                             answer.answer &&
        //                             answer.deltaScore >= this.minDeltaScore &&
        //                             answer.deltaScore <= this.maxDeltaScore
        //                         ) {
        //                             this.validRequest = true;
        //                             return true;
        //                         } else {
        //                             this.validRequest = false;
        //                             return false;
        //                         }
        //                     });
        //                 } else {
        //                     this.validRequest = false;
        //                     return false;
        //                 }
        //             } else {
        //                 this.validRequest = false;
        //                 return false;
        //             }
        //         });
        //     } else {
        //         this.validRequest = false;
        //         return false;
        //     }
        // } else {
        //     this.validRequest = false;
        //     return false;
        // }

        return true;
    }

    public async postGame(): Promise<void> {
        this.game.description = this.game.description.trim();
        console.log(this.validateRequest());
        if (this.validateRequest()) {
            this.errorMessage = undefined;

            this.apiResponse = await this.seriousGameService
                .postGame(this.game)
                .toPromise();

            if (this.apiResponse) {
                this.modal.close();
            }
        } else {
            this.errorMessage = `Game description is not valid. Description must be longer or same length as ${this.gameDescriptionLength}. Found ${this.game.description.length} `;
        }
    }
}

export interface GameRequest {
    description?: string;
    questions?: QuestionRequest[];
}

export interface QuestionRequest {
    question?: string;
    answers?: AnswerRequest[];
    category?: string;
    level?: number;
}

export interface AnswerRequest {
    answer?: string;
    deltaScore?: number;
}
