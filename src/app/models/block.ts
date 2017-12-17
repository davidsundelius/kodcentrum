import { BlockType } from './blockType';
import { Category } from './category';
import { Sprite } from './sprite';

export class Block {
  name: string;
  type: BlockType;
  category: Category;

  posX: number;
  posY: number;
  hidden: boolean = false;
  isRunning: boolean = false;

  followed: Block = null;
  followedBy: Block = null;
  includedIn: Block = null;
  includes: Block = null;

  constructor() {}

  runScript(sprite: Sprite) {

  }

  interpret(sprite: Sprite) {
    this.isRunning = true;
    this.runScript(sprite);
    this.isRunning = false;
    if(this.followedBy !== null) {
      this.followedBy.interpret(sprite);
    }
  };

  getFollowingBlockList(): Block[] {
    if(this.followedBy !== null) {
      return [this.followedBy].concat(this.followedBy.getFollowingBlockList());
    } else {
      return [];
    }
  }

  getIsRootBlock(): boolean {
    return (this.followed === null && includedIn === null);
  }
}
