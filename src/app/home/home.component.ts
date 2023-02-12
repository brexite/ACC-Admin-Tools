import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInOut } from "../shared/animations/animations";
import { Clipboard } from '@angular/cdk/clipboard';
import packageJson  from '../../../package.json';

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
  version: string = packageJson.version;

  bg = [
    './assets/bg0.png',
    './assets/bg1.png',
    './assets/bg2.png',
    './assets/bg3.png',
  ]

  currentBg: string = null;

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard
  ) {
    animations: [
      fadeInOut
    ]
  }

  ngOnInit(): void {
    this.currentBg = this.bg[Math.floor(Math.random() * 4)]
    this.loading = false;
  }
}
