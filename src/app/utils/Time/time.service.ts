import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TimeService {
  constructor() {}

  calculateTimeElapsed(startTime: string, endTime: string): string {
    const startDate = new Date("1970-01-01T" + startTime);
    const endDate = new Date("1970-01-01T" + endTime);

    let timeDifference = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    timeDifference -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(timeDifference / (1000 * 60));

    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  private padZero(num: number): string {
    return num < 10 ? "0" + num : "" + num;
  }
}
