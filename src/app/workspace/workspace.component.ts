import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Sprite } from '../models/sprite';
import { Block } from '../models/block';
import { Category } from '../models/category';
import { SpriteService } from '../services/sprite.service';
// Blocks
import { OnStart } from '../models/blocks/events/onStart';
import { Go } from '../models/blocks/motion/go';
import { TurnLeft } from '../models/blocks/motion/turnLeft';
import { TurnRight } from '../models/blocks/motion/turnRight';

import {} from '@angular/core';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  private liftedBlock: Block = null;
  public currentSprite: Sprite;
  public categories = Category;
  public currentCategory = Category.MOTION;

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

  /*public createNewBlock<T>(block: T): T {
    const newBlock = new T();
    Object.assign(newBlock, block);
    newBlock.hidden = true;
    newBlock.runScript = block.runScript;
    this.currentSprite.scripts.push(newBlock);
    return newBlock;
  }*/

  public removeBlock(block: Block) {
    if (block) {
      for (let i = this.currentSprite.scripts.length - 1; i >= 0; i--) {
        if (this.currentSprite.scripts[i] === block) {
           this.currentSprite.scripts.splice(i, 1);
        }
      }
      if (block.followed !== null) {
        block.followed.followedBy = null;
      }
      if (block.includedIn !== null) {
        block.includedIn.includes = null;
      }
    }
  }

  public onBlockScriptDrop($event, block) {
    block.posX = $event.clientX;
    block.posY = $event.clientY;
  }

  public onBlockToolboxDrop($event, block) {
    this.removeBlock(block);
  }

  public allowDrop($event) {
    $event.preventDefault();
  }

  public selectAppearance(index: number) {
    this.currentSprite.currentAppearance = index;
  }

  public updateBitmap() {
    // this.currentSprite.appearances[this.currentSprite.currentAppearance].bitmap = this.canvas.toDataURL();
  }
}
