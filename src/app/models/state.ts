import { Sprite } from './sprite';

export class State {
  public title: string = 'Inget namn';
  public currentSprite: Sprite;
  public sprites: Sprite[] = [];

  constructor(state: any) {
    Object.assign(this, state);
  }
}
