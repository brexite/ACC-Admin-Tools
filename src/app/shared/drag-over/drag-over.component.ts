import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drag-over',
  templateUrl: './drag-over.component.html',
  styleUrls: ['./drag-over.component.scss']
})
export class DragOverComponent implements OnInit {

  @Output() fileEmitter: EventEmitter<File> = new EventEmitter<File>();
  drag: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  dropHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    this.drag = false;

    const fileList = event.dataTransfer.files;
    if(fileList.length > 1) {
      return; //toastr
    }

    const file: File = fileList[0];

    if(file.type == 'application/json')
      this.fileEmitter.emit(file);
      return console.log("time to return");
    return; //toastr
  }

  dragStartHandler(event) {
    event.stopPropagation();
    event.preventDefault();

    this.drag = true;
    console.log(`drag start`);
  }

  dragEndHandler(event) {
    event.stopPropagation();
    event.preventDefault();

    this.drag = false;
    console.log(`drag end`);
  }

}
