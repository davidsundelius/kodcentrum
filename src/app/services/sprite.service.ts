import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Sprite } from '../models/sprite';

@Injectable()
export class SpriteService {

  private currentSprite: BehaviorSubject<Sprite> = new BehaviorSubject<Sprite>(null);

  constructor() { }

  public setCurrentSprite(sprite: Sprite) {
    this.currentSprite.next(sprite);
  }

  public getCurrentSprite(): Observable<Sprite> {
    return this.currentSprite;
  }
}
