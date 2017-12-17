import { Injectable } from '@angular/core';
import { State } from '../models/state';

@Injectable()
export class SaveService {

  constructor() { }

  public saveState(state: State): void {
    const stateJson = JSON.stringify(state);
    window.localStorage.setItem('MyProgram', stateJson);
  }

  public loadState(): State {
    const stateJson = window.localStorage.getItem('MyProgram');
    return new State(JSON.parse(stateJson));
  }
}
