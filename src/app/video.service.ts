import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Video } from './video';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  Url = "/api/videos";
  putUrl = "api/video/";
  deleteUrl = "/api/video/";

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //get videos
  getVideos() : Observable<Video[]>{
    return this.http.get<Video[]>(this.Url);
  }

  //post video
  addVideos(video:Video){
    return this.http.post<any>(this.Url, video);
  }

  //update video
  updateVideo(video: Video) {
    return this.http.put(this.putUrl + video._id, JSON.stringify(video), this.httpOptions);
  }

  //delete video
  deleteVideo(video:Video){
    return this.http.delete(this.deleteUrl + video._id, this.httpOptions);
  }

}
