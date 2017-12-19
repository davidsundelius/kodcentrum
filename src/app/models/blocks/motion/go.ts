import { BlockType } from '../../blockType';
import { Category } from '../../category';
import { Block } from '../../block';
import { Sprite } from '../../sprite';

export class Go extends Block {
  name = 'Gå 10 steg';
  type = BlockType.TRANSFORM;
  category = Category.MOTION;
  input = 10;

  public runScript(sprite: Sprite) {
    sprite.posX += Math.round(Math.cos(sprite.direction * 180 / Math.PI) * this.input);
    sprite.posY += Math.round(Math.sin(sprite.direction * 180 / Math.PI) * this.input);
  }
}
