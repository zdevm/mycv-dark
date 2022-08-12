type voidCbFn = () => void;

export interface MenutItemOptions {
  id?: string;
  onClick?: voidCbFn;
}

export class MenutItem {
  public id: string;
  public onClick?: voidCbFn;

  constructor(public label: string, options: MenutItemOptions) {
    this.id = options?.id || ((Math.random() * 100000) + 200).toString(); // TODO better way to generate id
    this.onClick = options?.onClick;
  }

}