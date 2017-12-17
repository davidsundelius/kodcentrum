import { Component, OnInit } from '@angular/core';
import { Sprite } from '../models/sprite';
import { Block } from '../models/block';
import { SpriteService } from '../services/sprite.service';
//Blocks
import { OnStart } from "../models/blocks/events/onStart";
import { Go } from "../models/blocks/motion/go";
import { TurnLeft } from "../models/blocks/motion/turnLeft";
import { TurnRight } from "../models/blocks/motion/turnRight";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  private liftedBlock: Block = null;
  public currentSprite: Sprite;

  public availableBlocks: Block[] = [
    new OnStart(),
    new Go(),
    new TurnLeft(),
    new TurnRight()
  ];

  constructor(private spriteService: SpriteService) { }

  ngOnInit() {
    this.spriteService.getCurrentSprite().subscribe(sprite => {
      this.currentSprite = sprite;
    });
  }

  private createNewBlock(block: Block): Block {
    const newBlock = new Block();
    Object.assign(newBlock, block);
    newBlock.hidden = true;
    newBlock.runScript = block.runScript;
    this.currentSprite.scripts.push(newBlock);
    return newBlock;
  }

  private removeBlock(block: Block) {
    if(block) {
      for(var i = this.currentSprite.scripts.length - 1; i >= 0; i--) {
        if(this.currentSprite.scripts[i] === block) {
           this.currentSprite.scripts.splice(i, 1);
        }
      }
      if(block.followed !== null) {
        block.followed.followedBy = null;
      }
      if(block.includedIn !== null) {
        block.includedIn.includes = null;
      }
    }
  }

  public onBlockScriptDrop($event) {
    if(this.liftedBlock !== null) {
      this.liftedBlock.posX = $event.clientX;
      this.liftedBlock.posY = $event.clientY;
      this.completeBlockDrop();
    }
  }

  public onBlockToolboxDrop($event) {
    this.removeBlock(this.liftedBlock);
    this.completeBlockDrop();
  }

  public allowDrop($event) {
    $event.preventDefault();
  }

  public addDummyScript() {
    const rootBlock = this.createNewBlock(new Go());
    rootBlock.posX = 1154;
    rootBlock.posY = 250;
    rootBlock.hidden = false;
    const secondBlock = this.createNewBlock(new TurnLeft());
    const thirdBlock = this.createNewBlock(new Go());
    const forthBlock = this.createNewBlock(new TurnLeft());
    this.assignFollowingBlock(rootBlock, secondBlock);
    this.assignFollowingBlock(secondBlock, thirdBlock);
    this.assignFollowingBlock(thirdBlock, forthBlock);
  }
}
