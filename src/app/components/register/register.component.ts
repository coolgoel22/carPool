import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { User } from '../../models/User';

import { Constants } from '../../app-constants';

import { AngularFireAuth } from 'angularfire2/auth';

// auth required for recaptcha verifier....
import { auth } from 'firebase';
// import * as firebaseUi from 'firebaseui';
// import * as firebase from 'firebase';


import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.serivce';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  @ViewChild("registerForm") form: any;
  
  states: Array<string>;
  cities: Array<string>;
  register: User= {
    address:{
      state: '0',
      city:'0'
    },
    gender: 'Male'
  };
  public getConfirmationCode: boolean = false;
  public recaptchaError: boolean = false;
  public inValidVC: boolean = false;

  private captchaVerifier: any;
  private confirmationResult: any;
  private captchaWidgetId: any;
  private isCaptchaVerified: boolean = false;
  private routerSubs: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private zone: NgZone,
    private afAuth: AngularFireAuth
  ) { 
    this.routerSubs = this.router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd){
        this.initPage();
      }
    });
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.routerSubs.unsubscribe();
  }
  initPage(){
    this.states = Constants.getStates();
    // this.global.recaptchaVerifier 
    this.captchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        if(response){
          console.log("Captcha verified successfully...");
          this.zone.run(()=>{
            this.recaptchaError = false;
          });
          this.isCaptchaVerified = true;
        }else{
          this.zone.run(()=>{
            this.recaptchaError = true;
          });
          this.isCaptchaVerified = false;
        }
      },
      'expired-callback': () => {
        this.isCaptchaVerified = false;
      }
    });

    this.captchaVerifier.render().then((widgetId)=>{
      console.log("Render recaptcha " + widgetId);
      this.captchaWidgetId = widgetId;
    });
  }
  onStateChange(selectedState: string){
    this.zone.run(()=>{
      this.cities = Constants.getCitiesOfAState(selectedState);
      this.register.address.city = '0';
    });
  }
  onSubmit({valid, value}: {valid: boolean, value: any}) {
    if(this.isCaptchaVerified){
      this.afAuth.auth.useDeviceLanguage();
      this.authService.register('+91'+value.mobile, this.captchaVerifier)
        .then(confirmationResult => {
          this.confirmationResult = confirmationResult;
          this.zone.run(()=>{
            this.getConfirmationCode = true;
          });
        })
        .catch(err => {
          console.log("Error while registration");
        });
    }else{
      this.recaptchaError = true;
      console.log("Please verify captcha");
    }
  }

  afterVerification(verificationCode: any){
    this.confirmationResult.confirm(verificationCode).then((result)=>{
        this.zone.run(()=>{
          this.inValidVC = false;
        });
        console.log(result.user);
        this.saveUserData();
        
    }).catch(()=>{
      this.zone.run(()=>{
        this.inValidVC = true;
      });
      console.log("Error while verfication of mobile no");
    });
  }

  saveUserData(){
    this.userService.saveNewUser(this.register);
    this.router.navigate(["/settings"]);
    console.log(this.register);
    localStorage.setItem('key', this.register.mobile);
  }
}
