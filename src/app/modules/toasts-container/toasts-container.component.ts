import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Toast, ToastType } from '@interfaces/toast';
import { ToastService } from '@services/toast/toast.service';

@Component({
    selector: 'app-toasts-container',
    templateUrl: './toasts-container.component.html',
    styleUrls: ['./toasts-container.component.scss'],
})
export class ToastsContainerComponent implements OnDestroy {
    readonly ToastType = ToastType;
    toasts: Toast[] = [];

    private unsub$ = new Subject<void>();

    constructor(private readonly toastService: ToastService) {
        this.toastService
            .notifyAdded$(true)
            .pipe(takeUntil(this.unsub$))
            .subscribe((toast) => (this.toasts = [toast, ...this.toasts]));
    }

    ngOnDestroy(): void {
        this.unsub$.next();
        this.unsub$.complete();
    }

    onHidden(removed: Toast) {
        this.toasts = this.toasts.filter((toast) => toast.id !== removed.id);
    }
}
