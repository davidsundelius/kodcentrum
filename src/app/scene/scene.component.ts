import { Component, OnInit } from '@angular/core';
import { Sprite } from '../models/sprite';
import { State } from '../models/state';
import { SpriteService } from '../services/sprite.service';
import { EventService } from '../services/event.service';
import { SaveService } from '../services/save.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  // State of program
  public title = 'Inget namn';
  public currentSprite: Sprite;
  public sprites: Sprite[] = [];
  // State of cursor
  public selectedTool = 'mouse-pointer';
  public cursorX = 0;
  public cursorY = 0;

  constructor(private spriteService: SpriteService, private eventService: EventService, private saveService: SaveService) { }

  ngOnInit() {
    this.addSprite();
  }

  public runProgram() {
    this.sprites.forEach((sprite) => {
      sprite.scripts.forEach((block) => {
        block.interpret(sprite);
      });
    });
  }

  public onMouseMove($event) {
    this.cursorX = $event.clientX;
    this.cursorY = $event.clientY;
  }

  public onSpriteDragStart($event, sprite) {
    this.selectSprite(sprite);
  }

  public onSpriteDrop($event) {
  }

  public onSpriteDrag($event) {
    this.currentSprite.posX = $event.clientX;
    this.currentSprite.posY = $event.clientY;
  }

  public applyTool(sprite) {
    switch (this.selectedTool) {
      case 'compress':
        sprite.zoom -= 10;
        break;
      case 'expand':
        sprite.zoom += 10;
        break;
      case 'cut':
        this.deleteSprite(sprite);
        this.selectedTool = 'mouse-pointer';
        break;
    }
  }

  public addSprite() {
    this.sprites.push(new Sprite({
      name: 'Sprite ' + (this.sprites.length + 1),
      appearance: 'assets/sprite1.png',
      posX: 0,
      posY: 80,
      direction: 0,
      zoom: 100,
      scripts: []
    }));
    this.selectSprite(this.sprites[this.sprites.length - 1]);
  }

  public deleteSprite(sprite: Sprite) {
    for (let i = this.sprites.length - 1; i >= 0; i--) {
      if (this.sprites[i] === sprite) {
         this.sprites.splice(i, 1);
      }
    }
  }

  public selectSprite(sprite: Sprite) {
    this.currentSprite = sprite;
    this.spriteService.setCurrentSprite(sprite);
    this.sprites.forEach((s) => {
      s.selected = false;
    });
    sprite.selected = true;
  }

  public saveProgram() {
    this.saveService.saveState(new State({
      title: this.title,
      currentSprite: this.currentSprite,
      sprites: this.sprites
    }));
  }

  public saveProgramAsFile() {
    this.saveService.saveAsFile(new State({
      title: this.title,
      currentSprite: this.currentSprite,
      sprites: this.sprites
    }));
  }

  public loadProgram() {
    const loadedState = this.saveService.loadState();
    this.title = loadedState.title;
    this.currentSprite = loadedState.currentSprite;
    this.sprites = loadedState.sprites;
  }
}
