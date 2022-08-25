import { Injectable } from '@angular/core';
import { MenuItem } from '@modules/header/classes/menu-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {
  private currentActiveId?: string;
  private menuItemsMap = new Map<string, MenuItem>; // original insertion order of the keys is retained
  private onActiveChange$ = new Subject<MenuItem>();

  constructor() { }

  get activeItemChanged() {
    return this.onActiveChange$.asObservable();
  }

  addMenuItem(item: MenuItem) {
    this.menuItemsMap.set(item.id, item);
  }

  removeMenuItem(id: string): void
  removeMenuItem(item: MenuItem): void
  removeMenuItem(item: MenuItem | string) {
    if (typeof item === 'string') {
      this.menuItemsMap.delete(item);
    } else if (item instanceof MenuItem) {
      this.menuItemsMap.delete(item.id);
    }
  }

  setActive(id: string): void
  setActive(item: MenuItem): void
  setActive(item: MenuItem | string) {
    const currentActive = this.currentActiveId ? this.menuItemsMap.get(this.currentActiveId) : undefined;
    if (currentActive) {
      currentActive.active = false;
    }
    let specifiedItem: MenuItem | undefined; 
    if (typeof item === 'string') {
      specifiedItem = this.menuItemsMap.get(item);
    } else if (item instanceof MenuItem) {
      specifiedItem = this.menuItemsMap.get(item.id);
    }
    if (specifiedItem) {
      this.currentActiveId = specifiedItem.id;
      specifiedItem.active = true;
      this.onActiveChange$.next(specifiedItem);
    }
  }

  get active(): MenuItem | undefined {
    if (!this.currentActiveId || !this.menuItemsMap.has(this.currentActiveId)) {
      return undefined;
    }
    return this.menuItemsMap.get(this.currentActiveId);
  }

  getMenuItems(): MenuItem[] {
    return Array.from(this.menuItemsMap.values());
  }

}
