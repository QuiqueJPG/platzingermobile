import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { User, Status } from '../../interfaces/user';
import { HomePage } from '../home/home';


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
  loginForm: FormGroup;
  myUser: User = {
    nick: '',
    email: '',
    password: '',
    secondPassword: '',
    friend: false,
    id: '',
    status: ''

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {

    this.loginForm = new FormGroup ({
      nick: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      secondPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
      status: new FormControl('', [Validators.required]),
    })

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

    //this.userService.createUser(this.myUser);

    if(this.loginForm.valid){
      if(this.loginForm.value.password === this.loginForm.value.secondPassword) {
        console.log("Equal passwords")
        console.log(this.loginForm.value);

        this.myUser.nick = this.loginForm.value.nick;
        this.myUser.email = this.loginForm.value.email;
        this.myUser.password = this.loginForm.value.password;
        this.myUser.secondPassword = this.loginForm.value.secondPassword;
        this.myUser.status = this.loginForm.value.status;

        this.userService.createUser(this.myUser);
      } else {
        console.log("Passwords not equal")
      }
    } else {
      console.log('not valid')
    }

  }

  signup() {


    if(this.loginForm.valid){
      if(this.loginForm.value.password === this.loginForm.value.secondPassword) {

        this.myUser.nick = this.loginForm.value.nick;
        this.myUser.email = this.loginForm.value.email;
        this.myUser.password = this.loginForm.value.password;
        this.myUser.secondPassword = this.loginForm.value.secondPassword;
        this.myUser.status = this.loginForm.value.status;
        this.myUser.id = Date.now();

        this.userService.createUser(this.myUser)
          .then((data)=> {
            this.navCtrl.setRoot(HomePage);
          }, (error)=> {
            console.log(error);
          });
      } else {
        console.log("Passwords not equal");
      }
    } else {
      console.log('not valid');
    }

  }

}
