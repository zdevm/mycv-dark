import { TemplateRef } from '@angular/core';

export enum ToastType {
    Text = 'text',
    Template = 'template',
}

export interface ToastDTO {
    type: ToastType;
    body: any;
    delay?: number;
    autoHide?: boolean;
    customClass?: string;
    dismissible?: boolean;
}

export interface ToastBase {
    id: string;
    type: ToastType;
    body: any;
    delay: number;
    autoHide: boolean;
    customClass: string;
    dismissible: boolean;
}

export interface TextToast extends ToastBase {
    type: ToastType.Text;
    body: string;
}

export interface TemplateToast extends ToastBase {
    type: ToastType.Template;
    body: TemplateRef<any>;
}

export type Toast = TextToast | TemplateToast;
