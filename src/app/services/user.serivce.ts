import { Injectable  } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';
import { User } from '../models/User';


import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService{
     private users: Subject<Array<User>> = new Subject<Array<User>>();

     // private clientsColl: CollectionReference;
     constructor(
          private afDB: AngularFireDatabase
     ){

          // this.clientsColl = this.afs.firestore.collection('clients');
     }

     getUsers(): Observable<Array<User>>{
          var query = 'Virkam_';
          this.afDB.database.ref('profiles')
          .orderByChild('fatherName')
          .startAt('/virkam_/i')
          .endAt('Virkam_'+ "\uf8ff")
          .on("value", function(snapshot){
               debugger;
               snapshot.forEach(data=> {
                    debugger;
                    console.log(data.val());
               });
          });

          
          // var ref = new Firebase("https://dinosaur-facts.firebaseio.com/dinosaurs");
          // ref.orderByKey().startAt("b").endAt("b\uf8ff").on("child_added", function(snapshot) {
          //   console.log(snapshot.key());
          // });
          return this.users.asObservable();
     }

     saveNewUser(user: User){
          this.afDB.database.ref('profiles/'+ user.mobile).set(user);
     }

}