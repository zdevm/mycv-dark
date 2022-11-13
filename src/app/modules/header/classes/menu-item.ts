type voidCbFn = () => void

export interface MenuItemOptions {
    id: string
    onClick?: voidCbFn
}

export class MenuItem {
    public id: string
    public onClick?: voidCbFn
    public active = false

    constructor(public label: string, options: MenuItemOptions) {
        this.id = options.id
        this.onClick = options?.onClick
    }
}
