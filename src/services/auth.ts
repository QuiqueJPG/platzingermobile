import { Injectable } from '@angular/core';
import { User, Status } from '../interfaces/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

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


  constructor(private afAuth: AngularFireAuth){

  }

  createUser(user){
    console.log(user)
  }

  loginWithEmail(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signupWithEmail(email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    // return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.afAuth.authState;
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();

    return this.afAuth.auth.signInWithPopup(provider);
  }


}
