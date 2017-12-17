import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Block } from '../../models/block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() block: Block;
  @Output() removeBlock = new EventEmitter();
  @Output() createCopy = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  private completeBlockDrop() {
    this.liftedBlock.hidden = false;
    this.liftedBlock = null;
  }

  private assignFollowingBlock(targetBlock: Block, block: Block) {
    targetBlock.isRunning = false;
    if(block.getIsRootBlock()) {
      this.removeBlock.emit(block);
    }
    targetBlock.followedBy = block;
    block.followed = targetBlock;
  }

  public onBlockDragStart($event, block, isTemplate) {
    if(isTemplate) {
      this.liftedBlock = this.createNewBlock(block);
    } else {
      this.liftedBlock = block;
    }
  }

  public onBlockInsideBlockDrop($event) {

  }

  public onBlockAfterBlockDrop($event, block) {
    this.assignFollowingBlock(block, this.liftedBlock);
    this.completeBlockDrop();
  }

  public onHoverEnterBlock($event, block) {
    if(this.liftedBlock !== null) {
      block.isRunning = true;
    }
  }

  public onHoverLeaveBlock($event, block) {
    block.isRunning = false;
  }

  public allowDrop($event, block) {
    return block === this.liftedBlock;
  }
}
