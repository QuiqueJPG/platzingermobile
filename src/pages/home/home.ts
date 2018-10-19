import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';
import { LoginPage } from '../login/login';
import { User, Status } from '../../interfaces/user';
import { UserService } from '../../services/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  friends: User[];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public userService: UserService) {

    this.friends = userService.getUsers();
  }

  goToConversation(user){
    this.navCtrl.push(ConversationPage, {user});
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  onInput(ev: any){

    console.log(ev.target.value);
    console.log('trigger');

    // this.friends = this.userService.getUsers()
    //
    // // set val to the value of the searchbar
    // this.searchQuery = ev.target.value;
    //
    // // if the value is an empty string don't filter the items
    // if (this.searchQuery && this.searchQuery.trim() != '') {
    //   this.friends = this.friends.filter((user) => {
    //     return (user.nick.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
    //   })
    // }
  }

  getIconByStatus (status) {

    console.log(status)

    let icon = ''

    switch (status) {
      case Status.Online:
        icon = 'logo_live_online.png'
        break
      case Status.Offline:
        icon = 'logo_live_offline.png'
        break
      case Status.Busy:
        icon = 'logo_live_busy.png'
        break
      case Status.Away:
        icon = 'logo_live_away.png'
        break
      case Status.AppearOffline:
        icon = 'logo_live_appear_offline.png'
        break
    }

    return icon
  }

}
