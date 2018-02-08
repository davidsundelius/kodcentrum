import { Block } from './block';
import { Appearance } from './appearance';

export class Sprite {
  public name: string;
  public appearances: Appearance[];
  public currentAppearance: number;
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
