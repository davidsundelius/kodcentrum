import { BlockType } from '../../blockType';
import { Category } from '../../category';
import { Block } from '../../block';
import { Sprite } from '../../sprite';

export class TurnRight extends Block {
  name = "Vänd höger 15 grader";
  type = BlockType.TRANSFORM;
  category = Category.MOTION;
  input = 15;

  public runScript(sprite: Sprite) {
    if(sprite.direction + this.input > 360) {
      sprite.direction = sprite.direction % this.input
    } else {
      sprite.direction += this.input
    }

  }
}
