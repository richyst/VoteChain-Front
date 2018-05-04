import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VotosService } from '../../services/votos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private votosService: VotosService) { }

  ngOnInit() {
  }
  onSubmit(myForm: NgForm) {
    const user = {
      'username': myForm.value.Username,
      'password': myForm.value.Password
    };
    console.log(user);
    this.votosService.login(user).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('access_token' , data.access_token);
        localStorage.setItem('userName' , data.userName);
        this.router.navigate(['/Votar']);
      },
      error => {
        console.log(error);
      }
    );
    // this.router.navigate(['/Votos/Votar']);
  }

}
