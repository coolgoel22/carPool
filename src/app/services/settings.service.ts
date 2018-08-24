import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Settings } from '../models/Settings';
import { Subject } from 'rxjs/Subject';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class SettingsService {
  settings: Settings = {
    poolerType: 'offerer',
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  };

  private _settings: Subject<any> = new Subject<any>();

  constructor(
    private afDB: AngularFireDatabase
  ) {}

  getSettings(key): Observable<string> {
    window.setTimeout(()=>{
      this._getSettings(key);
    }, 1);
    return this._settings.asObservable();
  }

  private _getSettings(key){
    const settings = localStorage.getItem('settings');

    if(settings){
      this._settings.next(JSON.parse(settings));
    }else{
      this.afDB.database.ref('settings/'+ key).on('value', (snapshot)=>{
        this._settings.next(snapshot.val());
        console.log(snapshot.val());
      });
    } 
  }

  saveSettings(key: string, settings: Settings){
    localStorage.setItem('settings', JSON.stringify(settings));
    this.afDB.database.ref('settings/'+ key).set(settings).then(()=>{
      //TODO: show toast...
    });
  }
}
