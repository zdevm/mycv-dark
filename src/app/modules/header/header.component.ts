import { Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { MenutItem } from './classes/menu-item';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('sideMenuContent') sideMenuContent: any;

  readonly menutItemDomIdPrefix = 'header-menu-item';
  readonly separatorDomId = 'header-top-separator';
  readonly underlineDomId = 'active-menu-item-underline';

  showOpenToWork = true;
  activeMenuItemId?: string;
  menuItems = this.initMenuItems();
  sideMenuRef?: NgbOffcanvasRef
  @HostBinding('class.scrolled') scrolled: boolean = false;

  constructor(private readonly offCanvasService: NgbOffcanvas, private readonly elemRef: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.scrolled = window.pageYOffset > 0;
  }

  onBurgerBtnClick() {
    const canvasRef = this.offCanvasService.open(this.sideMenuContent)
    canvasRef.closed.subscribe(() => this.sideMenuRef = undefined);
  }

  onMenuItemClick(item: MenutItem) {
    this.activeMenuItemId = item.id;
    this.underlineActiveMenuItem();
  }

  private initMenuItems() {
    return [
      new MenutItem($localize`About me`, { id: 'about_me' }),
      new MenutItem($localize`Work exp`, { id: 'work' }),
      new MenutItem($localize`Projects`, { id: 'projects' }),
      new MenutItem($localize`Contact`,  { id: 'contact' }),
    ].map(menuItem => {
      menuItem.onClick = this.onMenuItemClick.bind(this, menuItem);
      return menuItem
    })
  }

  private underlineActiveMenuItem() {
    //
    const activeMenutItemId = this.activeMenuItemId;
    if (!activeMenutItemId) {
      return;
    }
    // find menu item in dom
    const elem = document.getElementById(`${this.menutItemDomIdPrefix}-${activeMenutItemId}`);
    if (!elem) {
      return;
    }
    // find separator
    const separator = document.getElementById(this.separatorDomId);
    if (!separator) {
      return;
    }
    // find underline separator
    const underline = document.getElementById(this.underlineDomId);
    if (!underline) {
      return;
    }
    // move separator under the active item
    underline.style.top = `${separator.offsetTop}px`;
    underline.style.height = `${separator.offsetHeight}px`;
    underline.style.left = `${(elem.offsetLeft - 5)}px`;
    underline.style.width = `${(elem.clientWidth + 10)}px`;
  }

}
