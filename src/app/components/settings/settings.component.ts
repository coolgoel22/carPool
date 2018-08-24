import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

import { Constants } from '../../app-constants';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {
  public settings: any = {
    poolerType: 'offerer',
    frequency: 'montofri'
  };
  private key: string;
  public places: Array<string>;

  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { 
    this.places = Constants.getPlaces();
    this.key = localStorage.getItem('key');
  }
 
  ngOnInit() {
    this.settingsService.getSettings(this.key).subscribe((settings: string)=>{
      if(settings){
        this.settings = settings;
      }
    });
  }
  onSubmit({valid, value}: {valid: boolean, value: Settings}) {
    if(valid){
      this.settingsService.saveSettings(this.key, value);
      this.router.navigate(['/dashboard']);
    }
  }
}