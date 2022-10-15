import { Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header', 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) { 
    this.matIconRegistry.addSvgIcon(
      "aat",
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/AAT - White.svg')
    );
  }

  ngOnInit(): void {
  }

}
