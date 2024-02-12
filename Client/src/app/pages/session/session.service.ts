import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  constructor() {}

  public setToken(token: string) {
    return localStorage.setItem("accesstoken", token);
  }

  public getToken() {
    return localStorage.getItem("accessToken");
  }
  public removeToken() {
    return localStorage.removeItem("accessToken");
  }
}
