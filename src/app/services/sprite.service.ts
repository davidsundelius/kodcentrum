import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sprite } from '../models/sprite';

@Injectable()
export class SpriteService {

  private currentSprite: BehaviorSubject<Sprite> = new BehaviorSubject<Sprite>(null);

  constructor() { }

  public setCurrentSprite(sprite: Sprite) {
    this.currentSprite.next(sprite)
  }

  public getCurrentSprite() : Observable<Sprite> {
    return this.currentSprite;
  }
}
