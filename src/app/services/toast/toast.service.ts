import { Injectable } from '@angular/core';
import { Toast, ToastDTO } from '@interfaces/toast';
import { isEqual, omit, uniqueId, uniqWith } from 'lodash-es';
import { bufferTime, filter, map, mergeMap, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private history: Toast[] = [];
    private addedSubject$ = new Subject<Toast>();
    private readonly DEFAULT_OPTIONS: Record<
        keyof Pick<Toast, 'delay' | 'autoHide' | 'dismissible'>,
        any
    > = {
        delay: 12000, // ms
        autoHide: true,
        dismissible: false,
    };

    constructor() {}

    notifyAdded$(removeDuplicates: boolean = true): Observable<Toast> {
        if (removeDuplicates) {
            return this.addedSubject$.asObservable().pipe(
                bufferTime(200),
                map((toasts) => {
                    return uniqWith(toasts, (a, b) => {
                        return isEqual(omit(a, 'id'), omit(b, 'id'));
                    });
                }),
                filter((toasts) => !!toasts.length),
                mergeMap((toast) => toast)
            );
        } else {
            return this.addedSubject$.asObservable();
        }
    }

    show(dto: ToastDTO) {
        const toast: Toast = {
            ...dto,
            type: dto.type as any,
            id: uniqueId('toast'),
            delay: dto.delay || this.DEFAULT_OPTIONS.delay,
            autoHide: dto.autoHide ?? this.DEFAULT_OPTIONS.autoHide,
            customClass: dto.customClass || '',
            dismissible: dto.dismissible ?? this.DEFAULT_OPTIONS.dismissible,
        };
        this.history.push(toast);
        this.addedSubject$.next(toast);
    }
}
