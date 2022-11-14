import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fadeInOut } from '../shared/animations/animations';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import { TextareaModalComponent } from '../shared/modals/textarea-modal/textarea-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-race-results-tool',
  templateUrl: './race-results-tool.component.html',
  styleUrls: ['./race-results-tool.component.scss'],
})
export class RaceResultsToolComponent implements OnInit {
  form: FormGroup;
  outputForm: FormGroup;
  loading: boolean = true;
  output: string;

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    animations: [fadeInOut];
  }

  ngOnInit(): void {
    this.initForm();
    this.loading = false;
  }

  initForm() {
    this.form = this.fb.group({
      entrylist: ['', [Validators.required]],
      results: ['', [Validators.required]],
      reverse: 0,
      forceEL: true,
    });

    this.outputForm = this.fb.group({
      output: this.output,
    });
  }

  copy() {
    this.clipboard.copy(this.output);
    this.toastr.success('Copied New Entrylist');
  }

  dl() {
    var data =
      'data:text/json;charset=utf-8,' + encodeURIComponent(this.output);
    var downloader = document.createElement('a');

    downloader.setAttribute('href', data);
    downloader.setAttribute('download', 'entrylist.json');
    downloader.click();
  }

  viewJson() {
    const dialogRef = this.dialog.open(TextareaModalComponent, {
      autoFocus: true,
      data: { json: JSON.parse(this.output) },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.dl();
    });
  }

  run() {
    // MAPPING FROM sessionResult.leaderBoardLines[i].car.raceNumber
    // TO entries[i].raceNumber -> entries[i].defaultGridPosition
    // Ignores Drivers who did not partake in the previous session

    let entrylistJSON = JSON.parse(this.form.get('entrylist').value);
    let resultsJSON = JSON.parse(this.form.get('results').value);
    let forceEntryList = this.form.get('forceEL').value;
    let reverseGrid = this.form.get('reverse').value;

    // Remove existing positions
    entrylistJSON.entries.forEach(driver => {
      driver.defaultGridPosition = -1
    });

    if (resultsJSON.sessionResult.leaderBoardLines.length < reverseGrid) {
      reverseGrid = resultsJSON.sessionResult.leaderBoardLines.length;
    }

    for (
      let i = 0;
      i < resultsJSON.sessionResult.leaderBoardLines.length;
      i++
    ) {
      let carNo = resultsJSON.sessionResult.leaderBoardLines[i].car.raceNumber;
      let position = i + 1;

      // console.log(`Car #${carNo} finished in P${position}`);

      reverseGrid - i > 0
        ? (position = reverseGrid - i)
        : (position = position);

      // console.log(`Car #${carNo} will start in P${position}\n`);

      for (let key in entrylistJSON.entries) {
        if (entrylistJSON.entries[key].raceNumber == carNo) {
          entrylistJSON.entries[key].defaultGridPosition = position;
        }
      }
    }

    entrylistJSON.forceEntryList = forceEntryList ? 1 : 0;

    this.output = JSON.stringify(entrylistJSON, null, '\t');
    this.outputForm.patchValue({
      output: this.output,
    });
  }

  parseFile(file:File, encoding: string, key: number) {
    const fileReader = new FileReader();
    fileReader.readAsText(file, encoding); // Used for testing the file

    if (key == 0) {
        fileReader.onload = () => {
          try {
            JSON.stringify(JSON.parse(<string>fileReader.result), null, '\t');
          } catch (error) {
            this.toastr.error(
              'Error with the entrylist.json, please try again.'
            );
          }
          this.form.patchValue({
            entrylist: JSON.stringify(
              JSON.parse(<string>fileReader.result),
              null,
              '\t'
            ),
          });
        };
        fileReader.onerror = (error) => {
          console.log(error);
        };
      } else {
        // console.log("test - results")
        fileReader.onload = () => {
          try {
            JSON.stringify(JSON.parse((<string>fileReader.result).replace(`(?>\\S)(\\s)(?>\")`, "")), null, '\t');
          } catch (error) {
            this.toastr.error('Error with the results.json, please try again.');
          }
          this.form.patchValue({
            results: JSON.stringify(
              JSON.parse(<string>fileReader.result),
              null,
              '\t'
            ),
          });
        };
        fileReader.onerror = (error) => {
          console.log(error);
        };
      }
  }

  onFileSelected(event: any, key: number) {
    const file: File = event.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, 'UTF-8'); // Used for testing the file
      
      // Files created by users are in UTF-8
      // Files created by the game are output in UTF-16

      fileReader.onload = () => {
        try{
          if(JSON.parse(<string>fileReader.result) !== null){
            this.parseFile(file, 'UTF-8', key);
          }
          else {
            this.parseFile(file, 'UTF-16', key);
          }
        } catch {
          this.parseFile(file, 'UTF-16', key);
        }
      }
    }
  }
}
