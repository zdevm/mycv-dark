import { NgcCookieConsentConfig } from 'ngx-cookieconsent';

export interface Site {
    showCookieConsentPrompt?: boolean;
    termsOfUsePageUrl?: string;
    privacyPolicyPageUrl?: string;
    cookieConsentSettings?: NgcCookieConsentConfig;
}
