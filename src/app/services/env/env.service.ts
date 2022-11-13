import { Inject, Injectable } from '@angular/core'
import { Env } from '@interfaces/env'
import { get } from 'lodash-es'
import { EnvInjectionToken } from 'src/app/app.module'

@Injectable({
    providedIn: 'root',
})
export class EnvService {
    constructor(@Inject(EnvInjectionToken) private env: Env) {}

    /**
     * @param key Nested properties are supported eg api.url
     * @param defaultValue If 'key' does not exist in env config, default value will be returned
     * @returns
     */
    get(key: string, defaultValue?: any) {
        return get(this.env, key) ?? defaultValue
    }

    /**
     * Same as get method. Will throw Error if it fails to find key.
     * @param key Nested properties are supported eg api.url
     * @returns
     */
    getOrThrow(key: string) {
        const value = this.get(key)
        if (!value) {
            throw new Error(`Failed to find ${key} in env configuration`)
        }
        return value
    }
}
