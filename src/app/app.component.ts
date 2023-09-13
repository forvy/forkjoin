import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';

interface User {
  id: number;
  email: string;
}

interface Post {
  id: number;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  USERS = 'https://jsonplaceholder.typicode.com/users/';
  POSTS = 'https://jsonplaceholder.typicode.com/posts/';
  data!: [User[], Post[]];

  constructor(http: HttpClient) {
    const users = http.get<User[]>(this.USERS);
    const posts = http.get<Post[]>(this.POSTS);

    forkJoin([users, posts])
      .subscribe(res => {
        this.data = res;
        console.log('User and Post', res);
      });
  }
}