import { Block } from './block';

export class Sprite {
  public name: string;
  public appearance: string;
  public posX: number;
  public posY: number;
  public direction: number;
  public selected: boolean;
  public scale: number;
  public scripts: Block[];

  constructor(sprite: any) {
    Object.assign(this, sprite);
  }
}
