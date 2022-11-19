import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainerComponent } from './toasts-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [ToastsContainerComponent],
    imports: [CommonModule, NgbToastModule],
    exports: [ToastsContainerComponent],
})
export class ToastsContainerModule {}
