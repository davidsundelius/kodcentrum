export class Appearance {
  public name: string;
  public bitmap: string;

  constructor(appearance: any) {
    Object.assign(this, appearance);
  }
}
