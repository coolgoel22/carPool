import { Component, OnInit } from '@angular/core';

import { Item } from '../../models/Item';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public items: Array<Item> =[{
    title: 'Vikram Goel',
    type: 'Offer',
    gender: 'Male',
    from: 'Sonipat',
    from_place: 'Kath Mandi',
    from_at: '06:30am',
    to: 'gurugram',
    to_place: 'Gawal Pahari',
    to_at: '05:00PM',
    price: 100,
    mobile: '8397071674',
    mail: 'goelvicky@gmail.com'
  }];
  constructor() { }

  ngOnInit() {
  }

}
