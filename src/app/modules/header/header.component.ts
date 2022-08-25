import { Component, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { TopNavService } from '@services/top-nav/top-nav.service';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem } from './classes/menu-item';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('sideMenuContent') sideMenuContent: any;

  readonly menutItemDomIdPrefix = 'header-menu-item';
  readonly separatorDomId = 'header-top-separator';
  readonly underlineDomId = 'active-menu-item-underline';

  showOpenToWork = true;
  menuItems = this.initMenuItems();
  sideMenuRef?: NgbOffcanvasRef
  @HostBinding('class.scrolled') scrolled: boolean = false;
  private unsub$ = new Subject<void>();

  constructor(private readonly offCanvasService: NgbOffcanvas,
              private topNavService: TopNavService) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    this.scrolled = window.pageYOffset > 0;
  }
  
  ngOnInit(): void {
    this.topNavService.activeItemChanged
    .pipe(takeUntil(this.unsub$))
    .subscribe(activeMenuItem => {
      this.underlineActiveMenuItem();
      if (this.sideMenuRef) {
        this.sideMenuRef.close();
      }
    })
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  onBurgerBtnClick() {
    const canvasRef = this.offCanvasService.open(this.sideMenuContent)
    canvasRef.closed.subscribe(() => this.sideMenuRef = undefined);
    this.sideMenuRef = canvasRef;
  }

  get activeMenuItemId() {
    return this.topNavService.active?.id;
  }

  private initMenuItems() {
    return [
      new MenuItem($localize`About me`, { id: 'about_me' }),
      new MenuItem($localize`Work exp`, { id: 'work' }),
      new MenuItem($localize`Projects`, { id: 'projects' }),
      new MenuItem($localize`Contact`,  { id: 'contact' }),
    ].map((menuItem, index) => {
      const m = menuItem;
      this.topNavService.addMenuItem(m);
      return m;
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
