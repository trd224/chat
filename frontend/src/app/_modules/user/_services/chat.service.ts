import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(environment.serverIp, {
      transports: ['websocket'], // Ensure websocket transport is used
    });
    
  }

  getCurrentUser(){
    return this.http.get(`${environment.apiUrl}user/current`);
  }
  getUserById(id: any){
    return this.http.get(`${environment.apiUrl}user/${id}`);
  }
  getGroupById(id: any){
    return this.http.get(`${environment.apiUrl}chat/group/${id}`);
  }
  

   // Emit the "typing" event to the server
   typing(sender: string, receiver: string) {
    this.socket.emit('typing', { sender, receiver });
  }

  // Register the current user's email with the backend
  registerUser(userId: string) {
    this.socket.emit('register', userId);
  }

  getHistory(sender: string, receiver: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}chat/history/${sender}/${receiver}`);
  }

  getGroupHistory(groupId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}chat/groupHistory/${groupId}`);
  }

  // Emit a private message to the server
  sendMessage(sender: string, receiver: string, message: string) {
    this.socket.emit('private message', { sender, receiver, message });
  }

  joinRoom(groupId: string){
    this.socket.emit('joinRoom', groupId);
  }
  leaveRoom(groupId: string){
    this.socket.emit('leaveRoom', groupId);
  }

    // Emit a group message to the server
  sendGroupMessage(sender: string, groupId: string, message: string) {
    this.socket.emit('group message', { sender, groupId, message });
  }
  

  // Listen for chat messages
  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('private message', (msg) => { // Listen for the correct event
        observer.next(msg);
      });
    });
  }

  receiveGroupMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('group message', (msg) => { // Listen for the correct event
        observer.next(msg);
      });
    });
  }

   // Listen for uploaded file
   receiveUploadedFile(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('file upload', (msg) => { // Listen for the correct event
        observer.next(msg);
      });
    });
  }

   receiveUploadedFileFromGroup(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('file upload on group', (msg) => { // Listen for the correct event
        observer.next(msg);
      });
    });
  }

  

  

   // Emit the "file upload" event to the server
   sendFile(sender: string, receiver: string, fileName: string, fileUrl: string, fileType: string) {
      this.socket.emit('file upload', { sender, receiver, fileName, fileUrl, fileType });
  }
  sendFileOnGroup(sender: string, groupId: string, fileName: string, fileUrl: string, fileType: string){
    this.socket.emit('file upload on group', { sender, groupId, fileName, fileUrl, fileType });
  }

  // Upload file to server
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${environment.apiUrl}chat/upload`, formData);
  }


  downloadFile(fileUrl: string): Observable<any> {
    const payload = {
      filePath: fileUrl
    }
    
    return this.http.post(`${environment.apiUrl}chat/download`, payload, {
      responseType: 'blob', // Set response type to 'blob' to handle binary data
      observe: 'events',
      reportProgress: true
    });
  }

  // Listen for typing events
  receiveTyping(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
    });
  }



openFile(fileUrl: string): Observable<any>{
  const payload = {
    filePath: fileUrl
  }
  return this.http.post(`${environment.apiUrl}chat/openFile`, payload);
}


createGroup(payload: any){
  return this.http.post(`${environment.apiUrl}chat/createGroup`, payload);
}

exitGroup(groupId: any){
  const payload = {
    groupId: groupId
  }
  return this.http.post(`${environment.apiUrl}chat/exitGroup`, payload);
}

}
