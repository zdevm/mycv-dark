import { Component, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '@modules/header/classes/menu-item';
import { TopNavService } from '@services/top-nav/top-nav.service';
import { Subject, takeUntil } from 'rxjs';
import SwiperCore, { Mousewheel, Pagination, Swiper } from "swiper";

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  private swiper?: Swiper;
  private unsub$ = new Subject<void>();

  constructor(private readonly topNavService: TopNavService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly zone: NgZone) { }

  ngOnInit(): void {
    this.route.params
    .pipe(takeUntil(this.unsub$))
    .subscribe(params => {
      if (params['menuId']) {
        this.topNavService.setActive(params['menuId']);
        this.slideTo(params['menuId']);
      }
    })
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  onSwiper(swiper: Swiper) {
    this.swiper = swiper;
    const currentActiveMenuItem = this.topNavService.active;
    if (currentActiveMenuItem) {
      this.slideTo(currentActiveMenuItem);
    }
    this.prepareMenuItemsOnClick();
  }

  onNav(e: Swiper[]) {
    this.zone.run(() => {
      const swiper = e[0];
      const menuItem = this.topNavService.getMenuItems()?.[swiper.activeIndex];
      if (menuItem) {
        this.router.navigateByUrl(`/home/${menuItem.id}`)
      }      
    })
  }

  private slideTo(menuItemId: string): void
  private slideTo(menuItem: MenuItem): void
  private slideTo(menuItem: MenuItem | string): void {
    const menuItemId = typeof menuItem === "string" ? menuItem : (menuItem as MenuItem).id;
    const index = this.topNavService.getMenuItems().findIndex(i => i.id === menuItemId);
    if (index === -1) {
      return;
    }
    this.swiper?.slideTo(index);
  }

  private prepareMenuItemsOnClick() {
    setTimeout(() => {
      this.topNavService.getMenuItems().forEach((menuItem, index) => {
        if (menuItem.onClick) {
          const initialCb = menuItem.onClick;
          const newCbFn = () => {
            initialCb();
            this.swiper?.slideTo(index)
          }
          menuItem.onClick = newCbFn.bind(this);
        }
      })
    }, 50);

  }
}
