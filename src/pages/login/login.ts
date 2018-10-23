import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { UserService } from '../../services/user';
import { User, Status } from '../../interfaces/user';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth';


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserService,
              private authService: AuthService,
              public toastCtrl: ToastController,
              private storage: Storage) {

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

  loginWithEmail(email: string, password: string){

    this.authService.loginWithEmail(this.loginForm.value.email, this.loginForm.value.password)
      .then((data)=>{
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  signupWithEmail(){

    if(this.loginForm.valid){
      if(this.loginForm.value.password === this.loginForm.value.secondPassword) {

        this.authService.signupWithEmail(this.loginForm.value.email, this.loginForm.value.password)
          .then((data)=>{
            console.log(data)
            this.myUser.nick = this.loginForm.value.nick;
            this.myUser.email = this.loginForm.value.email;
            this.myUser.password = this.loginForm.value.password;
            this.myUser.secondPassword = this.loginForm.value.secondPassword;
            this.myUser.status = this.loginForm.value.status;
            this.myUser.id = data.user.uid;

            this.userService.createUser(this.myUser)
              .then((data)=> {
                this.navCtrl.setRoot(HomePage);
              }, (error)=> {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        console.log("Passwords not equal");
      }
    } else {
      console.log('not valid');
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

  loginWithFacebook(){

    this.authService.facebookLogin()
      .then((data:any) => {
        console.log(data)

        if(data.additionalUserInfo.isNewUser){
          //registro

          const user: User = {

            nick: data.additionalUserInfo.profile.name,
            email: data.additionalUserInfo.profile.email,
            friend: true,
            id: data.user.uid,
            status: 'Online'
          }

          console.log(user);

          this.userService.createUser(user)
            .then(() => {

              let toast = this.toastCtrl.create({
                message: 'Bienvenido (registro con fb exitoso)',
                duration: 3000,
                position: 'bottom'
              })

              toast.present();
              this.navCtrl.setRoot(HomePage);

            })
            .catch((data) => {})
        } else {
            let toast = this.toastCtrl.create({
              message: 'Bienvenido',
              duration: 3000,
              position: 'bottom'
            })

            toast.present();
            this.navCtrl.setRoot(HomePage);
        }
      })
      .catch((error) => {
        console.log('Error catch: ')
        console.log(error)
      })
  }

}
