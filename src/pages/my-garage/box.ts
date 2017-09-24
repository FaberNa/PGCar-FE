import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

import { NavController, NavParams,Platform } from 'ionic-angular';


import { ItemDetailsPage } from '../item-details/item-details';

@Component({
  selector: 'box',
  templateUrl: 'box.html'
})
export class BoxPage {
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  marca: string;
  tmpMarca: string;

  constructor(public plt: Platform,private nativeStorage: NativeStorage,public navCtrl: NavController, public navParams: NavParams) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }
  myChange(event){

    this.plt.ready();
    //console.log(this.marca);
    this.nativeStorage.setItem('myitem', {property: this.marca, anotherProperty: 'anotherValue'})
      .then(
        () => console.log('Stored item! '+ this.marca),
        error => console.error('Error storing item', error)
      );


  }


  open(event){
  let meData=this;
    this.nativeStorage.getItem('myitem')
      .then(
        function(data){meData.tmpMarca=JSON.stringify(data);
                                  console.log(JSON.stringify(data));
                                  console.log(meData.tmpMarca)},
        error => console.error(error)
      );
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
