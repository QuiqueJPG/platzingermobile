import { Injectable } from '@angular/core';
import { User, Status } from '../interfaces/user';
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable()
export class UserService {

  users: User[]

  myUser: User = {
    nick: 'luis',
    subnick: 'luis',
    age: 23,
    email: 'algo@algo.com',
    password: '',
    secondPassword: '',
    friend: false,
    id: 1,
    status: Status.Online

  }
  myUser2: User = {
    nick: 'Maria',
    subnick: 'maria',
    age: 23,
    email: 'algo@algo.com',
    password: '',
    secondPassword: '',
    friend: true,
    id: 2,
    status: Status.Offline

  }
  myUser3: User = {
    nick: 'Eduardo',
    subnick: 'eduardo',
    age: 23,
    email: 'algo@algo.com',
    password: '',
    secondPassword: '',
    friend: false,
    id: 3,
    status: Status.Away

  }
  myUser4: User = {
    nick: 'Jose',
    subnick: 'jose',
    age: 23,
    email: 'algo@algo.com',
    password: '',
    secondPassword: '',
    friend: true,
    id: 4,
    status: Status.Busy

  }
  myUser5: User = {
    nick: 'Raquel',
    subnick: 'raquel',
    age: 23,
    email: 'algo@algo.com',
    password: '',
    secondPassword: '',
    friend: true,
    id: 5,
    status: Status.AppearOffline

  }

  constructor(private afdb: AngularFireDatabase){
    this.users = [
      this.myUser,
      this.myUser2,
      this.myUser3,
      this.myUser4,
      this.myUser5,
    ]
  }

  getUsers(){
    // return this.users;
    return this.afdb.list('/users').valueChanges();
  }

  getUserById(id){
    return this.afdb.object(`users/${id}`)
  }

  createUser(user){
    console.log(user)
    return this.afdb.object(`users/${user.id}`).set(user);
  }

  editUser(user){
    return this.afdb.object(`users/${user.id}`).set(user);
  }

  add(user: User) {
    this.users.push(user);
  }
}
