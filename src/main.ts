import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { SeriousGameService } from "./app/clients/serious-game-client.service";

if (environment.production) {
    enableProdMode();
}

SeriousGameService.Url = environment.API_URL;

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
