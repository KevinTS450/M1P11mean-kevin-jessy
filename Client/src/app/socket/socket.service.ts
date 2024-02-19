import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5000"); // Change the URL to your server address
  }

  sendMessage(message: string): void {
    this.socket.emit("message", message);
  }

  getMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on("message", (data: string) => {
        observer.next(data);
      });
    });
  }
  on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Add the emit function to send custom events with data
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
