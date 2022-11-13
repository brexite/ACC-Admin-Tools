import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-drag-over',
  templateUrl: './drag-over.component.html',
  styleUrls: ['./drag-over.component.scss']
})
export class DragOverComponent implements OnInit {

  @Output() fileEmitter: EventEmitter<File> = new EventEmitter<File>();
  drag: boolean = false;

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  dropHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    this.drag = false;

    const fileList = event.dataTransfer.files;
    if(fileList.length > 1) {
      return this.toastr.error('Error with the entrylist.json, please try again.');
    }

    const file: File = fileList[0];

    if(file.type == 'application/json')
      this.fileEmitter.emit(file);
    return this.toastr.error('Error with the entrylist.json, please try again.');
  }

  dragStartHandler(event) {
    event.stopPropagation();
    event.preventDefault();

    this.drag = true;
  }

  dragEndHandler(event) {
    event.stopPropagation();
    event.preventDefault();

    this.drag = false;
  }

}
