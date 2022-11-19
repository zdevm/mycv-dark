import {
    Component,
    HostBinding,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { TopNavService } from '@services/top-nav/top-nav.service';
import { Subject, takeUntil } from 'rxjs';
import {
    ProfileService,
    ProfileServiceToken,
} from '@services/profile/profile.service';
import { MenuItem } from './classes/menu-item';
import { ErrorResponse } from '@classes/error-response';
import { ToastType } from '@interfaces/toast';
import { ToastService } from '@services/toast/toast.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @ViewChild('sideMenuContent') sideMenuContent: any;

    readonly menutItemDomIdPrefix = 'header-menu-item';
    readonly separatorDomId = 'header-top-separator';
    readonly underlineDomId = 'active-menu-item-underline';

    showOpenToWork = false;
    menuItems = this.initMenuItems();
    sideMenuRef?: NgbOffcanvasRef;
    @HostBinding('class.scrolled') scrolled: boolean = false;
    private unsub$ = new Subject<void>();

    constructor(
        private readonly offCanvasService: NgbOffcanvas,
        private readonly topNavService: TopNavService,
        @Inject(ProfileServiceToken)
        private readonly profileService: ProfileService,
        private readonly toastService: ToastService
    ) {}

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e: Event) {
        this.scrolled = window.pageYOffset > 0;
    }

    ngOnInit(): void {
        this.topNavService.activeItemChanged
            .pipe(takeUntil(this.unsub$))
            .subscribe((activeMenuItem) => {
                this.underlineActiveMenuItem();
                if (this.sideMenuRef) {
                    this.sideMenuRef.close();
                }
            });
        this.fetchProfile();
    }

    ngOnDestroy(): void {
        this.unsub$.next();
        this.unsub$.complete();
    }

    onBurgerBtnClick() {
        const canvasRef = this.offCanvasService.open(this.sideMenuContent);
        this.sideMenuRef = canvasRef;
        const onCloseFn = () => (this.sideMenuRef = undefined);
        canvasRef.closed.subscribe(onCloseFn);
        canvasRef.dismissed.subscribe(onCloseFn);
    }

    get activeMenuItemId() {
        return this.topNavService.active?.id;
    }

    private fetchProfile() {
        return this.profileService.get().subscribe({
            next: (profile) => (this.showOpenToWork = !!profile?.openToWork),
            error: (err: ErrorResponse) => {
                this.toastService.show({
                    type: ToastType.Text,
                    body: err.message,
                    customClass: 'bg-danger',
                    autoHide: true,
                });
            },
        });
    }

    private initMenuItems() {
        return [
            new MenuItem($localize`About me`, { id: 'about_me' }),
            new MenuItem($localize`Work exp`, { id: 'work' }),
            new MenuItem($localize`Projects`, { id: 'projects' }),
            new MenuItem($localize`Contact`, { id: 'contact' }),
        ].map((menuItem, index) => {
            const m = menuItem;
            this.topNavService.addMenuItem(m);
            return m;
        });
    }

    private underlineActiveMenuItem() {
        //
        const activeMenutItemId = this.activeMenuItemId;
        if (!activeMenutItemId) {
            return;
        }
        // find menu item in dom
        const elem = document.getElementById(
            `${this.menutItemDomIdPrefix}-${activeMenutItemId}`
        );
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
        underline.style.left = `${elem.offsetLeft - 5}px`;
        underline.style.width = `${elem.clientWidth + 10}px`;
    }
}
