import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User = null;
  loading: boolean = true;
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authService: AuthService,
              private userService: UserService,
              public loadingCtrl: LoadingController) {

    this.loginForm = new FormGroup ({
      nick: new FormControl('', [Validators.required]),
      subnick: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    })

    const loader = loadingCtrl.create({
      content: "Cargando info...",
    });
    loader.present();

    this.authService.getStatus()
      .subscribe(
        (data) => {
          console.log(data);
          if(data){
            this.userService.getUserById(data.uid)
              .subscribe(
                (userData: any) => {
                  console.log(userData);
                  this.user = userData;
                  this.loading = false;

                  this.loginForm.patchValue({
                    nick: this.user.nick,
                    subnick: this.user.subnick ? this.user.subnick : '',
                    email: this.user.email,
                    status: this.user.status
                  })

                  loader.dismiss();
                },
                (error) => {console.log(error);}
              )
          } else {
            console.log('No data');
            loader.dismiss();
            this.navCtrl.setRoot(LoginPage);
          }
        },
        (error) => { console.log(error);}
      )

    // this.authService.getStatus()
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //       if(data) {
    //         console.log(data)
    //         console.log(this)
    //         this.userService.getUserById(data.uid)
    //           .subscribe(
    //             (retrievedUser: User) => {
    //               this.user = retrievedUser;
    //               console.log(this.user);
    //
    //               this.loginForm.patchValue({
    //                 nick: this.user.nick,
    //                 email: this.user.email,
    //                 status: this.user.status
    //               })
    //
    //               loader.dismiss();
    //               this.loading = false;
    //             }, (error) => {
    //               console.log(error);
    //             }
    //           )
    //         } else {
    //           console.log('No data')
    //         }
    //
    //     },
    //     (error)=> {
    //       console.log(error);
    //     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  saveUser() {
    if(this.loginForm.valid){

      const editedUser: User = {

        nick: this.loginForm.value.nick,
        subnick: this.loginForm.value.subnick,
        email: this.loginForm.value.email,
        friend: false,
        id: this.user.id,
        status: this.loginForm.value.status
      }

      this.userService.createUser(editedUser)
        .then((data)=> {
          this.navCtrl.setRoot(HomePage);
        }, (error)=> {
          console.log(error);
        });
    } else {
      console.log('not valid');
    }
  }

}
