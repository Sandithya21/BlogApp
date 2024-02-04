import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000/post';
  constructor(private http: HttpClient) {}

  //get all pst data
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  //get post data by id
  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(this.url + '/' +id);
  }

  //delete post by id
  deletePost(id: string): Observable<Post> {
    return this.http.delete<Post>(this.url + '/' +id);
  }

  //update data by id
  updatePost(post : Post): Observable<Post> {
    return this.http.put<Post>(this.url + '/' +post._id, post);
  }

  //post data
  createPost(post : Post) : Observable<Post>{
    return this.http.post<Post>(this.url, post);
  }

}
