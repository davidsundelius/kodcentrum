import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Block } from '../../models/block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() block: Block;
  @Input() isTemplate: boolean;
  @Output() removeBlock = new EventEmitter();
  @Output() createCopy = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  private assignFollowingBlock(targetBlock: Block, block: Block) {
    targetBlock.isRunning = false;
    if (block.getIsRootBlock()) {
      this.removeBlock.emit(block);
    }
    targetBlock.followedBy = block;
    block.followed = targetBlock;
  }

  public onBlockDragStart($event, block, isTemplate) {

  }

  public onBlockInsideBlockDrop($event) {

  }

  public onBlockAfterBlockDrop($event, block) {
    this.assignFollowingBlock(block, this.block);
  }

  public onHoverEnterBlock($event, block) {
    block.isRunning = true;
  }

  public onHoverLeaveBlock($event, block) {
    block.isRunning = false;
  }

  public allowDrop($event, block) {
    $event.preventDefault();
  }
}
