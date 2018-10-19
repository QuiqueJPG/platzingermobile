import { Injectable } from '@angular/core';
import { User, Status } from '../interfaces/user';

@Injectable()
export class UserService {

  users: User[]

  myUser: User = {
    nick: 'luis',
    subnick: 'luis',
    age: 23,
    email: 'algo@algo.com',
    friend: false,
    id: 1,
    status: Status.Online

  }
  myUser2: User = {
    nick: 'Maria',
    subnick: 'maria',
    age: 23,
    email: 'algo@algo.com',
    friend: true,
    id: 2,
    status: Status.Offline

  }
  myUser3: User = {
    nick: 'Eduardo',
    subnick: 'eduardo',
    age: 23,
    email: 'algo@algo.com',
    friend: false,
    id: 3,
    status: Status.Away

  }
  myUser4: User = {
    nick: 'Jose',
    subnick: 'jose',
    age: 23,
    email: 'algo@algo.com',
    friend: true,
    id: 4,
    status: Status.Busy

  }
  myUser5: User = {
    nick: 'Raquel',
    subnick: 'raquel',
    age: 23,
    email: 'algo@algo.com',
    friend: true,
    id: 5,
    status: Status.AppearOffline

  }

  constructor(){
    this.users = [
      this.myUser,
      this.myUser2,
      this.myUser3,
      this.myUser4,
      this.myUser5,
    ]
  }

  getUsers(){
    return this.users;
  }

  add(user: User) {
    this.users.push(user);
  }
}
