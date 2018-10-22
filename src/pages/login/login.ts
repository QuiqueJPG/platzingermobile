import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user';
import { User } from '../../interfaces/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  nick:string;
  email:string;
  password:string;
  secondPassword:string;
  status:string;

  myUser: User = {
    nick: '',
    subnick: '',
    age: 23,
    email: '',
    friend: false,
    id: '',
    status: ''

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  login() {


    this.myUser.nick = this.nick;
    this.myUser.email = this.email;
    this.myUser.password = this.password;
    this.myUser.secondPassword = this.secondPassword;
    this.myUser.status = this.status;

    this.userService.createUser(this.myUser);
  }

}
