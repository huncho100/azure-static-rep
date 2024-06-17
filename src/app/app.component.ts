import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <label for="name">Enter your name:</label>
      <input id="name" [(ngModel)]="name" placeholder="Name">
      <button (click)="sendMessage()">Send</button>
    </div>
    <div>{{message}}</div>
  `,
})
export class AppComponent {
  name: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.name.trim()) {
      const params = new HttpParams().set('name', this.name);
      this.http.get<any>('/api/message', { params })
        .subscribe(
          (resp: any) => {
            this.message = resp.message; // Assuming the response now contains 'message' field
          },
          (error) => {
            console.error('Error:', error);
            this.message = 'Failed to retrieve message.';
          }
        );
    }
  }
}
