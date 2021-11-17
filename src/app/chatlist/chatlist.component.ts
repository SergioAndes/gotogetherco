import {Component, OnInit, Injectable, Input, SimpleChanges, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Swal from "sweetalert2";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ChatlistComponent implements OnInit, OnChanges {
  @Input() users: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };

  title = 'angular-chat';
  channel: boolean = true;

  messages = [];
  newMessage = '';
  channelList = []// = ["pedro", "pablo", "camila"]; //mockData

  currentUser: string = JSON.parse(localStorage.getItem("user")).username;
  userFrom: string = JSON.parse(localStorage.getItem("user")).first_name;
  userToChat: string;
  room = "room1";

  getMessagesPath = "https://chat-nodejs-backend.herokuapp.com/messages?me=" + this.currentUser + "&" + "someone=";
  public userid: any;
  private username: any;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  //const user = { id, username, room, connected: true }; Example
  //const message = {username, text, createdAt}

  constructor(private authService: UserService, private socket: Socket, private http: HttpClient) {


  }
  ngOnDestroy(){
    this.closeAddExpenseModal.nativeElement.click();
  }

  ngOnInit(): void {

    this.joinChat();
    this.getUsers();
    this.getMessagesFromServer();
    this.receieveMessages();
    console.log("funiocinoxd", this.users)

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("value changed", this.users);
  }

  joinChat() {
    this.socket.emit('join', {username: this.currentUser, room: this.room}, (error) => {
      if (error) {
        alert(error)
        location.href = '/'
      }
    })


  }


  getUsers() {
    this.socket.on('roomData', ({room, users}) => {
      this.channelList = users;
      this.channelList = this.channelList.filter(u => u.username !== this.currentUser)
      this.channelList.sort((u1, u2) => u1.username < u2.username ? -1 : 1);
    })

  }

  receieveMessages() {
    this.socket.on('privateMessage', (msg) => {
      if (msg.username == this.userToChat) {
        this.messages.push(msg);
      }
    })
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    try {
      let msg = {text: this.newMessage, to: this.userToChat, from: this.currentUser}
      this.socket.emit('privateMessage', msg, (error) => {
        if (error)
          console.log(error);
      });
      this.newMessage = '';
      this.messages.push(msg);
      this.authService.getUserById(this.userid).subscribe(dataz => {
        console.log("tokenizer",dataz[0].notificationToken)
        if (dataz[0].notificationToken != null) {
          console.log("mensaje de",this.userFrom)
          const body = msg
          const title = "Nuevo mensaje de "+this.userFrom
          this.authService.sendPushnotification(dataz[0].notificationToken, body.text, title).subscribe(dataz => {
            console.log("respiesta", dataz)

          }, error => {
            Swal.fire('Oops...', 'error en datos ingresados', 'error');
            console.log('datadssd', error);
          });
        }
      }, error => {
        Swal.fire('Oops...', 'error en datos ingresados', 'error');
        console.log('datadssd', error);
      });

    } catch (err) {
      console.log(err);
    }
  }

  onSelect(channel) {
    //console.log(channel)
    //Load chats

    this.messages = [] //TODO: Load messages from that user
    this.messages = [] //TODO: Load messages from that user
    this.userToChat = channel.user.username;
    this.userid = channel.user.id
    this.username =channel.user.first_name
    this.getMessagesFromServer();

  }

  getMessagesFromServer() {
    let route = this.getMessagesPath + this.userToChat;
    this.http.get(route, this.httpOptions).subscribe(msgs => {
      this.messages = Object.keys(msgs).map(key => (msgs[key]));
      console.log(this.messages);
    });
  }

}
