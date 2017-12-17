import { BlockType } from '../../blockType';
import { Category } from '../../category';
import { Block } from '../../block';
import { Sprite } from '../../sprite';

export class OnStart extends Block {
  name = "När start klickas på";
  type = BlockType.EVENT;
  category = Category.EVENTS;

  public runScript(sprite: Sprite) {
  }
}
