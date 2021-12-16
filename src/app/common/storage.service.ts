import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public add(key: string, value: any): void {
    if (!value) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    let value: any = localStorage.getItem(key);
    return !!value ? JSON.parse(value) : null;
  }
  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
