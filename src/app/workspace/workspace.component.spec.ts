import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Sprite } from '../models/sprite';
import { SpriteService } from '../services/sprite.service';
import { BlockComponent } from './block/block.component';
import { WorkspaceComponent } from './workspace.component';

describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule.forRoot() ],
      declarations: [ WorkspaceComponent, BlockComponent ],
      providers: [ SpriteService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceComponent);
    const service = TestBed.get(SpriteService);
    component = fixture.componentInstance;
    spyOn(service, 'getCurrentSprite').and.returnValue(Observable.of(new Sprite({})));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
