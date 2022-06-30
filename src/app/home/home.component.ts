import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInOut } from "../shared/animations/animations";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  outputForm: FormGroup;
  loading: boolean = true;
  output: string;

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard
  ) {
    animations: [
      fadeInOut
    ]
  }

  ngOnInit(): void {
    this.loading = false;
  }
}
