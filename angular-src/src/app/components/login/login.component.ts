import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: String;
    password: String;

    constructor(private authService: AuthService,
        private http: Router,
        private flashMessage: FlashMessagesService) { }

    ngOnInit() {
    }

    onLoginSubmit() {
        const user = {
            username: this.username,
            password: this.password
        }

        this.authService.authenticateUser(user).subscribe((data) => {
            if(data.success){

            }else{
                
            }
        })
    }

}
