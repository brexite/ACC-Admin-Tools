import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-reset-confirmation',
    templateUrl: './reset-confirmation.component.html',
    styleUrls: ['./reset-confirmation.component.scss']
})
export class ResetConfirmationComponent implements OnInit {

    constructor(
        private dialogRef: MatDialogRef<ResetConfirmationComponent>
    ) { }

    ngOnInit(): void {
        
    }

    cancel() {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close(true);
    }
}