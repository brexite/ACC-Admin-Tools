import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from "ngx-toastr";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'app-textarea-modal',
    templateUrl: './textarea-modal.component.html',
    styleUrls: ['./textarea-modal.component.scss']
})
export class TextareaModalComponent {

    output: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<TextareaModalComponent>,
        private clipboard: Clipboard,
        private toastr: ToastrService,
    ) 
    { 
        console.log(data)
        this.output = JSON.stringify(data.json, null, "\t")
    }

    close() {
        this.dialogRef.close();
    }

    dl() {
        this.dialogRef.close(true);
    }

    copy() {
        this.clipboard.copy(JSON.stringify(this.data.json, null, "\t"));
        this.toastr.success("Copied New Entrylist")
      }
}