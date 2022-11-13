import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-reset-confirmation',
    templateUrl: './reset-confirmation.component.html',
    styleUrls: ['./reset-confirmation.component.scss']
})
export class ResetConfirmationComponent implements OnInit {

    modalTitle: string;
    modalSubtitle: string;

    constructor(
        private dialogRef: MatDialogRef<ResetConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) { }

    ngOnInit(): void {
        this.modalTitle = this.data.title;
        this.modalSubtitle = this.data.subtitle
    }

    cancel() {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close(true);
    }
}