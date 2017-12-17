import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { HeaderComponent } from './header/header.component';
import { SceneComponent } from './scene/scene.component';
import { SpriteService } from './services/sprite.service';
import { EventService } from './services/event.service';
import { SaveService } from './services/save.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockComponent } from './workspace/block/block.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    HeaderComponent,
    SceneComponent,
    BlockComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    SpriteService,
    EventService,
    SaveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
