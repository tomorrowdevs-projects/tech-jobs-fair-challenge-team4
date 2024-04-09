import { Injectable } from "@angular/core";

const HALF_HOUR = 60 * 60 * 1000;

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor(){}

  private get currentTime(): number {
    return new Date().getTime();
  }

  public set<T>(key: string, value: T, ttl: number = HALF_HOUR): void {
    localStorage.setItem(key, JSON.stringify({ value, ttl: this.currentTime + ttl }));
  }

  public get<T>(key: string, defaultValue?: T): T | undefined {
    return this.parse(key, localStorage.getItem(key) || "") || defaultValue;
  }

  public clean(key: string): void {
    if (key) return localStorage.removeItem(key);
  }

  private parse<T>(key: string, v?: string): T | undefined {
    if (!v) return;

    try {
      const { value, ttl } = JSON.parse(v);
      if (ttl > this.currentTime) return value;

      this.clean(key);
      return;
    } catch (e) {
      console.error('Error on parse value', { v, key });
      return;
    }
  }
}