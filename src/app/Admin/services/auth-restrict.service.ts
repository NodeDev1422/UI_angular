import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
  import { AuthServiceService } from './auth-service.service';
  import jwt_decode from 'jwt-decode';
  import Swal from 'sweetalert2/dist/sweetalert2.js';
@Injectable({
  providedIn: 'root'
})
export class AuthRestrictService implements CanActivate{

  constructor(public authService: AuthServiceService,private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   if (this.authService.isLoggedIn() === true) {
      var getToekn = localStorage.getItem('access_token');
     // this.router.navigate(['dashboard']);
     
      let tokenInfo = this.getDecodedAccessToken(getToekn); // decode token
      let expireDate = tokenInfo.exp; // get token expiration dateTime
      let currentTimeStammp = new Date().getTime()/1000;

      if(currentTimeStammp >= expireDate)
      {
       // Swal.fire('', `SessionExpired`, 'danger');
       // window.alert("SessionExpired!");
       // this.router.navigate(['login'])
       return true;
        console.log('Expired');
      }else{
        this.router.navigate(['dashboard']);
        return false;
      }
     // console.log('EXPPXP',tokenInfo,'----',currentTimeStammp); // show decoded token object in console
    }else{
      return true;
    }
    //return true;
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
