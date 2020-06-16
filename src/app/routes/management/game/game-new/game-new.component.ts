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

    // Validation
    public amountOfQuestions = 15;
    public amountOfQuestionsPerLevel = 5;
    public amountOfAnswersPerQuestion = 4;
    public gameDescriptionLength = 5;
    public minDeltaScore = -100;
    public maxDeltaScore = 100;
    public alerts: Alert[] = [];

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
        this.alerts = [];
        // Check if game contains description
        if (this.game.description.length >= this.gameDescriptionLength) {
            // Check if there are enough game questions
            if (this.game.questions.length === this.amountOfQuestions) {
                return true;
            } else {
                this.alerts.push({
                    type: "danger",
                    message: `Er zijn slechts ${this.game.questions.length} vragen ingevuld, terwijl er minimaal ${this.amountOfQuestions} verplicht zijn.`,
                });
                return false;
            }
        } else {
            this.alerts.push({
                type: "danger",
                message: "De beschrijving is niet lang genoeg.",
            });
            return false;
        }
    }

    public async postGame(): Promise<void> {
        this.game.description = this.game.description.trim();
        if (this.validateRequest()) {
            this.apiResponse = await this.seriousGameService
                .postGame(this.game)
                .toPromise();

            if (this.apiResponse) {
                this.modal.close();
            }
        } else {
            this.alerts.push({
                type: "danger",
                message:
                    "Er zijn errors opgetreden waardoor u niet verder kan. Controleer uw invoer.",
            });
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

interface Alert {
    type: string;
    message: string;
}
