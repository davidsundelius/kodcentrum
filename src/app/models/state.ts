import { Sprite } from './sprite';

export class State {
  public title = 'Inget namn';
  public currentSprite: Sprite;
  public sprites: Sprite[] = [];

  constructor(state: any) {
    Object.assign(this, state);
  }
}
