import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {UserModel} from './userModel';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  usersRef: AngularFireList<any>;
  restaurantsRef: AngularFireList<any>;
  categoriesRef: AngularFireList<any>;
  offersRef: AngularFireList<any>;

  usersObservable: Observable<UserModel[]>;
  // restaurantsObservable: Observable<Restaurant[]>;
  // categoriesObservable: Observable<string[]>;
  // offersObservable: Observable<Offer[]>;

  categoriesList: string[];
  // restaurantList: Restaurant[];

  categories: Observable<any[]>;

  constructor(private af: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.usersRef = this.af.list('users');
    this.usersObservable = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
      )
    );



    // this.restaurantsRef = this.af.list('restaurants');
    // this.restaurantsObservable = this.restaurantsRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    //   )
    // );

    // this.categoriesRef = this.af.list('categories');
    // this.categoriesObservable = this.categoriesRef.snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    //   )
    // );


    this.categories = af.list('categories').valueChanges();

    this.categories.subscribe( categories => {
      this.categoriesList = categories as string[];
    });

    // this.restaurantsObservable.subscribe( restaurants => {
    //   this.restaurantList = restaurants as Restaurant[];
    // });
  }

  getUsersByMail(mail: string) {
    return this.usersRef = this.af.list('/users', ref => ref.equalTo(mail));
  }

  updateUserProfile(user: UserModel) {
    this.af.object('users/' + user.uid)
      .update(user);

  }

  // updateRestaurantProfile(restaurant: Restaurant) {
  //   this.af.object('restaurants/' + restaurant.uid)
  //     .update(restaurant);
  //
  // }

  getObservableUsers() {
    return this.usersObservable;
  }
  // getObservableRestaurants() {
  //   return this.restaurantsObservable;
  // }

  getCategoriesList() {
    return this.categoriesList;
  }

  // getRestaurantList() {
  //   return this.restaurantList;
  // }

  // getRestaurantObservableByUid(uid: string): Observable<Restaurant>{
  //
  //   return this.af.object('restaurants/'  + uid).valueChanges() as Observable<Restaurant>;
  //
  // }

  // getRestaurantOffers() {
  //   let restaurantUid = this.getCurrentUser().uid;
  //
  //   return this.af.object('restaurants/' + restaurantUid + '/offers').valueChanges() as Observable<Offer>;
  //
  //
  // }

  // addFavoriteRestaurant(restaurant: Restaurant) {
  //   let userUid = this.getCurrentUser().uid;
  //
  //
  //   firebase.database().ref().child('users/' + userUid + '/favRestaurants').child(restaurant.uid).set({
  //     uid: restaurant.uid,
  //     mail: restaurant.mail,
  //     password: restaurant.password,
  //     name: restaurant.name,
  //     phone: restaurant.phone,
  //     country: restaurant.country,
  //     location: restaurant.location,
  //     shedule: restaurant.shedule,
  //     rating: restaurant.rating,
  //     pic: restaurant.pic
  //   });
  //
  //   firebase.database().ref().child('restaurants/' + restaurant.uid + '/favedUsers').child(userUid).set(true);
  //
  // }

  // removeFavoriteRestaurant(restaurant: Restaurant) {
  //   let userUid = this.getCurrentUser().uid;
  //
  //   firebase.database().ref().child('users/' + userUid + '/favRestaurants').child(restaurant.uid).remove();
  //   firebase.database().ref().child('restaurants/' + restaurant.uid + '/favedUsers').child(userUid).remove();
  //
  // }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

}
