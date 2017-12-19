import { Injectable } from '@angular/core';
import { State } from '../models/state';

@Injectable()
export class SaveService {

  constructor() { }



  public saveState(state: State): void {
    const stateJson = JSON.stringify(state);
    window.localStorage.setItem('MyProgram', stateJson);
  }

  public saveAsFile(state: State): void {
    const stateJson = JSON.stringify(state);
    const file = new Blob([stateJson], {type: 'code'});
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(file);
    elem.download = state.title + '.code';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }

  public loadState(): State {
    const stateJson = window.localStorage.getItem('MyProgram');
    return new State(JSON.parse(stateJson));
  }
}
