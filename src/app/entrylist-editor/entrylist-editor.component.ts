import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInOut } from '../shared/animations/animations';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastrService } from 'ngx-toastr';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DriverCategory } from '../models/driver-fields';
import { CarGroup, CarTypeCategory } from '../models/car-fields';
import { ResetConfirmationComponent } from '../shared/modals/reset-confirmation/reset-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { TextareaModalComponent } from '../shared/modals/textarea-modal/textarea-modal.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-entrylist-editor',
  templateUrl: './entrylist-editor.component.html',
  styleUrls: ['./entrylist-editor.component.scss'],
})
export class EntrylistEditorComponent implements OnInit {
  loading: boolean = true;
  json: any = null;
  form: FormGroup;
  advancedForm: FormGroup;
  driverIndex: number = 0;
  driverLength: number = 0;

  showOrdered = false;

  driverColours: any = [['#ff5a31'], ['#999999'], ['#bba14f'], ['#69bdba']];

  driverNationality: any = [
    { key: 'No Nationality', value: 0 },
    { key: 'Andorra', value: 49 },
    { key: 'Argentina', value: 14 },
    { key: 'Armenia', value: 28 },
    { key: 'Australia', value: 41 },
    { key: 'Austria', value: 9 },
    { key: 'Azerbaijan', value: 50 },
    { key: 'Bahrain', value: 79 },
    { key: 'Belgium', value: 7 },
    { key: 'Bosnia and Herzegovina', value: 87 },
    { key: 'Brazil', value: 17 },
    { key: 'Bulgaria', value: 51 },
    { key: 'Canada', value: 34 },
    { key: 'Chile', value: 82 },
    { key: 'China', value: 35 },
    { key: 'Chinese Taipei', value: 81 },
    { key: 'Colombia', value: 47 },
    { key: 'Croatia', value: 33 },
    { key: 'Cuba', value: 52 },
    { key: 'Czech Republic', value: 53 },
    { key: 'Denmark', value: 32 },
    { key: 'England', value: 86 },
    { key: 'Estonia', value: 54 },
    { key: 'Finland', value: 31 },
    { key: 'France', value: 3 },
    { key: 'Georgia', value: 55 },
    { key: 'Germany', value: 2 },
    { key: 'Great Britain', value: 5 },
    { key: 'Greece', value: 22 },
    { key: 'Hong Kong', value: 46 },
    { key: 'Hungary', value: 6 },
    { key: 'India', value: 56 },
    { key: 'Indonesia', value: 38 },
    { key: 'Iran', value: 78 },
    { key: 'Ireland', value: 16 },
    { key: 'Israel', value: 57 },
    { key: 'Italy', value: 1 },
    { key: 'Jamaica', value: 58 },
    { key: 'Japan', value: 48 },
    { key: 'Kuwait', value: 45 },
    { key: 'Latvia', value: 59 },
    { key: 'Lebanon', value: 27 },
    { key: 'Lithuania', value: 60 },
    { key: 'Luxembourg', value: 44 },
    { key: 'Macao', value: 61 },
    { key: 'Madagascar', value: 84 },
    { key: 'Malaysia', value: 62 },
    { key: 'Malta', value: 85 },
    { key: 'Mexico', value: 29 },
    { key: 'Monaco', value: 15 },
    { key: 'Nepal', value: 63 },
    { key: 'Netherlands', value: 12 },
    { key: 'New Caledonia', value: 64 },
    { key: 'New Zealand', value: 40 },
    { key: 'Nigeria', value: 65 },
    { key: 'Northern Ireland', value: 66 },
    { key: 'Norway', value: 24 },
    { key: 'Oman', value: 21 },
    { key: 'Papua New Guinea', value: 67 },
    { key: 'Philippines', value: 68 },
    { key: 'Poland', value: 13 },
    { key: 'Portugal', value: 36 },
    { key: 'Puerto Rico', value: 19 },
    { key: 'Qatar', value: 69 },
    { key: 'Romania', value: 70 },
    { key: 'Russia', value: 10 },
    { key: 'San Marino', value: 42 },
    { key: 'Saudi Arabia', value: 23 },
    { key: 'Scotland', value: 71 },
    { key: 'Serbia', value: 72 },
    { key: 'Singapore', value: 37 },
    { key: 'Slovakia', value: 20 },
    { key: 'Slovenia', value: 73 },
    { key: 'South Africa', value: 18 },
    { key: 'South Korea', value: 26 },
    { key: 'Spain', value: 4 },
    { key: 'Sweden', value: 30 },
    { key: 'Switzerland', value: 8 },
    { key: 'Taiwan', value: 74 },
    { key: 'Thailand', value: 11 },
    { key: 'Turkey', value: 25 },
    { key: 'Ukraine', value: 75 },
    { key: 'United Arab Emirates', value: 43 },
    { key: 'Uruguay', value: 83 },
    { key: 'USA', value: 39 },
    { key: 'Venezuela', value: 76 },
    { key: 'Wales', value: 77 },
    { key: 'Zimbabwe', value: 80 },
  ];

  carNames: CarGroup[] = [
    {
      category: 'GT3',
      cars: [
        { key: 'AMR V12 Vantage GT3', value: 12 },
        { key: 'AMR V8 Vantage', value: 20 },
        { key: 'Audi R8 LMS Evo', value: 19 },
        { key: 'Audi R8 LMS GT3 Evo 2', value: 31 },
        { key: 'Audi R8 LMS', value: 3 },
        { key: 'BMW M4 GT3', value: 30 },
        { key: 'BMW M6 GT3', value: 7 },
        { key: 'Bentley Continental GT3 2015', value: 11 },
        { key: 'Bentley Continental GT3 2018', value: 8 },
        { key: 'Emil Frey Jaguar G3', value: 14 },
        { key: 'Ferrari 488 GT3 Evo', value: 24 },
        { key: 'Ferrari 488 GT3', value: 2 },
        { key: 'Honda NSX GT3 Evo', value: 21 },
        { key: 'Honda NSX GT3', value: 17 },
        { key: 'Lamborghini Huracan GT3 Evo', value: 16 },
        { key: 'Lamborghini Huracán GT3', value: 4 },
        { key: 'Lexus RC F GT3', value: 15 },
        { key: 'McLaren 650S GT3', value: 5 },
        { key: 'McLaren 720S GT3', value: 22 },
        { key: 'Mercedes-AMG GT3', value: 1 },
        { key: 'Mercedes-AMG GT3 Evo', value: 25 },
        { key: 'Nissan GT-R Nismo GT3 2015', value: 10 },
        { key: 'Nissan GT-R Nismo GT3 2018', value: 6 },
        { key: 'Porsche 991 GT3 R', value: 0 },
        { key: 'Porsche 991 II GT3 R', value: 23 },
        { key: 'Reiter Engineering R-EX GT3', value: 13 },
      ],
    },
    {
      category: 'GT4',
      cars: [
        { key: 'Alpine A110 GT4', value: 50 },
        { key: 'Aston Martin Vantage GT4', value: 51 },
        { key: 'Audi R8 LMS GT4', value: 52 },
        { key: 'BMW M4 GT4', value: 53 },
        { key: 'Chevrolet Camaro GT4', value: 55 },
        { key: 'Ginetta G55 GT4', value: 56 },
        { key: 'KTM X-Bow GT4', value: 57 },
        { key: 'Maserati MC GT4', value: 58 },
        { key: 'McLaren 570S GT4', value: 59 },
        { key: 'Mercedes AMG GT4', value: 60 },
        { key: 'Porsche 718 Cayman GT4 Clubsport', value: 61 },
      ],
    },

    {
      category: 'CUP',
      cars: [
        { key: 'Ferrari 488 Challenge Evo', value: 26 },
        { key: 'Lamborghini Huracan SuperTrofeo', value: 18 },
        { key: 'Lamborghini Huracán SuperTrofeo EVO2', value: 29 },
        { key: 'Porsche 991 II GT3 Cup', value: 9 },
        { key: 'Porsche 992 GT3 Cup', value: 28 },
      ],
    },
    {
      category: 'TCX',
      cars: [{ key: 'BMW M2 Club Sport Racing', value: 27 }],
    },
  ];

  driverCategories: any = [
    { key: 'Bronze', value: DriverCategory.Bronze },
    { key: 'Silver', value: DriverCategory.Silver },
    { key: 'Gold', value: DriverCategory.Gold },
    { key: 'Platinum', value: DriverCategory.Platinum },
  ];

  advancedDriverOptions = [
    { key: 'Unchanged', value: 0 },
    { key: 'Disabled', value: 1 },
    { key: 'Enabled', value: 2 },
  ];

  advancedCarOptions = [
    { key: 'Unchanged', value: 0 },
    { key: 'Disabled', value: 1 },
    { key: 'Enabled', value: 2 },
  ];

  orderedDrivers: number[] = [];
  unorderedDrivers: number[] = [];

  output: string;

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    animations: [fadeInOut];
  }

  ngOnInit(): void {
    this.initForm();
    this.advancedInit();
    this.loading = false;
  }

  initForm() {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      nickname: '',
      shortName: [''],
      driverCategory: [null],
      steamId: [''],
      customCarName: '',
      teamName: '',
      raceNumber: [''],
      nationality: [0],
      carChoice: null,
      overrideDriverInfo: true,
      isAdmin: false,
      overrideCar: false,
      forceEntryList: true,

      output: '',
    });
  }

  patchForm(key: number) {
    let json = this.json;
    let entry = json.entries[key];
    let driver = entry.drivers[0];

    this.form.patchValue({
      firstName: driver.firstName,
      lastName: driver.lastName,
      nickname: driver.nickname,
      shortName: driver.shortName,
      driverCategory: driver.driverCategory,
      steamId: driver.playerID.substring(1),
      customCarName: entry.customCar,
      teamName: entry.teamName,
      raceNumber: entry.raceNumber,
      nationality: driver.nationality,
      carChoice: entry.forcedCarModel,
      overrideDriverInfo: entry.overrideDriverInfo,
      isAdmin: entry.isServerAdmin,
      overrideCar:
        entry?.overrideCarModelForCustomCar != null
          ? entry.overrideCarModelForCustomCar
          : true,
      forceEntryList: json.forceEntryList,
    });

    this.loading = false;
  }

  copy() {
    this.saveData();
    this.clipboard.copy(JSON.stringify(this.json));
    this.toastr.success('Copied New Entrylist');
  }

  dl() {
    this.saveData();
    var data =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.json, null, '\t'));
    var downloader = document.createElement('a');

    downloader.setAttribute('href', data);
    downloader.setAttribute('download', 'entrylist.json');
    downloader.click();
  }

  newJson() {
    this.saveData();
    const dialogRef = this.dialog.open(ResetConfirmationComponent, {
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.json = null;
    });
  }

  viewJson() {
    this.saveData();
    const dialogRef = this.dialog.open(TextareaModalComponent, {
      autoFocus: true,
      data: { json: this.json },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.dl();
    });
  }

  navigateDriver(driverNo: number) {
    try {
      this.saveData();
    } catch (error) {
      console.error(error);
      this.toastr.error('There was an error with saving.');
      return;
    }

    this.patchByIndex(driverNo);
  }

  getDriverOrders() {
    let tempJSON = this.json;

    this.unorderedDrivers = tempJSON.entries.map((entry, index) => {
      if (<number>entry.defaultGridPosition == -1) return index;
    });

    this.unorderedDrivers.sort(function (a, b) {
      return tempJSON.entries[a].raceNumber - tempJSON.entries[b].raceNumber;
    });

    this.unorderedDrivers = this.unorderedDrivers.filter(function (element) {
      return element !== undefined;
    });

    try {
      this.orderedDrivers = tempJSON.entries
        .map((entry, index) => {
          return {
            defaultGridPosition: parseInt(entry.defaultGridPosition),
            index: parseInt(index),
          };
        })
        .sort((a, b) => {
          return a.defaultGridPosition - b.defaultGridPosition;
        })
        .filter(function (element) {
          return element.defaultGridPosition !== -1;
        })
        .map((a) => a.index);
      this.showOrdered = this.orderedDrivers.length !== 0;
        
    } catch (error) {
      console.error(error);
    }
  }

  gridOrderToggle() {
    let tempJSON = this.json;

    this.showOrdered = !this.showOrdered
    if(!this.showOrdered) {
      this.unorderedDrivers = this.unorderedDrivers.concat(this.orderedDrivers);
      this.orderedDrivers = [];

      this.unorderedDrivers = this.unorderedDrivers.sort(function (a, b) {
        return tempJSON.entries[a].raceNumber - tempJSON.entries[b].raceNumber;
      });
      
      this.updateGridPosition();
    }
  }

  updateGridPosition() {
    for (let i = 0; i < this.orderedDrivers.length; i++) {
      this.json.entries[this.orderedDrivers[i]].defaultGridPosition = i + 1;
    }

    for (let i = 0; i < this.unorderedDrivers.length; i++) {
      this.json.entries[this.unorderedDrivers[i]].defaultGridPosition = -1;
    }
  }

  onFileSelected(event: any, key: number) {
    const file: File = event.target.files[0];

    if (file) {
      this.loading = true;

      const fileReader = new FileReader();
      fileReader.readAsText(file, 'UTF-8');
      fileReader.onload = () => {
        try {
          this.loading = true;
          JSON.stringify(JSON.parse(<string>fileReader.result), null, '\t');
          this.json = JSON.parse(<string>fileReader.result);

          this.output = JSON.stringify(this.json, null, '\t');
          this.form.patchValue({
            output: this.output,
          });

          this.driverLength = this.json.entries.length;
          this.getDriverOrders();
          this.patchForm(0);
        } catch (error) {
          this.loading = false;
          this.json = null;
          this.toastr.error('Error with the entrylist.json, please try again.');
        }
      };
      fileReader.onerror = (error) => {
        this.loading = false;
        this.json = null;
        console.error(error);
      };
    }
  }

  newFile() {
    this.loading = true;
    this.json = JSON.parse('{"entries": [],"forceEntryList": 1}');
    this.createDriver();
    this.output = JSON.stringify(this.json, null, '\t');
    this.form.patchValue({
      output: this.output,
    });

    this.driverLength = this.json.entries.length;
    this.patchForm(0);
    this.loading = false;
  }

  createDriver() {
    this.json.entries.push({
      drivers: [
        {
          firstName: '',
          lastName: '',
          shortName: '',
          driverCategory: null,
          nationality: null,
          playerID: '',
        },
      ],
      raceNumber: null,
      forcedCarModel: -1,
      overrideDriverInfo: 1,
      defaultGridPosition: -1,
      isServerAdmin: 0,
    });
    
    this.getDriverOrders();
    this.navigateDriver(this.json.entries.length - 1);
  }

  deleteDriver() {

    let deleteIndex = this.driverIndex

    if(this.json.entries.length === 1)
      return this.toastr.error("Cannot delete the last driver in an entrylist!")

    this.json.entries.splice(deleteIndex, 1)
    this.unorderedDrivers.map(x => {
      if(x < deleteIndex){
        //do nothing
      }
      else if(x == deleteIndex) {
        this.unorderedDrivers.splice(this.unorderedDrivers.indexOf(x), 1)
      }
      else {
        x -= 1;
      }
    })

    this.orderedDrivers.map(x => {
      if(x < deleteIndex){
        //do nothing
      }
      else if(x == deleteIndex) {
        this.orderedDrivers.splice(this.unorderedDrivers.indexOf(x), 1)
      }
      else {
        x -= 1;
      }
    })
    console.table(this.json.entries[deleteIndex])
    console.log(this.json.entries.length)
    this.patchByIndex(this.unorderedDrivers[0] ?? this.orderedDrivers[0])
    this.getDriverOrders()
    //remove currently selected driver
    //if last driver in json, do createDriver() or not allow deletion of last driver
    // this.saveData();
    return null;
  }

  getDriverCategory(index: number) {
    return this.driverColours[
      this.json.entries[index].drivers[0].driverCategory
    ];
  }

  getDriverByIndex(index: number) {
    return this.json.entries[index];
  }

  patchByIndex(index: number) {
    this.driverIndex = index;

    this.patchForm(this.driverIndex);
  }

  saveData() {

    this.json.entries[this.driverIndex].drivers[0].firstName =
      this.form.get('firstName').value;
    this.json.entries[this.driverIndex].drivers[0].lastName =
      this.form.get('lastName').value;
    this.json.entries[this.driverIndex].drivers[0].nickname =
      this.form.get('nickname').value;
    this.json.entries[this.driverIndex].drivers[0].shortName =
      this.form.get('shortName').value;
    this.json.entries[this.driverIndex].drivers[0].driverCategory =
      this.form.get('driverCategory').value;
    this.json.entries[this.driverIndex].drivers[0].playerID =
      'S' + this.form.get('steamId').value;
    this.json.entries[this.driverIndex].customCar =
      this.form.get('customCarName').value;
    this.json.entries[this.driverIndex].teamName = 
      this.form.get('teamName').value;
    this.json.entries[this.driverIndex].raceNumber =
      this.form.get('raceNumber').value;
    this.json.entries[this.driverIndex].drivers[0].nationality =
      this.form.get('nationality').value;
    this.json.entries[this.driverIndex].forcedCarModel =
      this.form.get('carChoice').value;
    this.json.entries[this.driverIndex].overrideDriverInfo = this.form.get(
      'overrideDriverInfo'
    ).value
      ? 1
      : 0;
    this.json.entries[this.driverIndex].isServerAdmin = this.form.get('isAdmin')
      .value
      ? 1
      : 0;
    this.json.entries[this.driverIndex].overrideCarModelForCustomCar =
      this.form.get('overrideCar').value ? 1 : 0;
    this.json.forceEntryList = this.form.get('forceEntryList').value ? 1 : 0;

    this.output = JSON.stringify(this.json, null, '\t');
    this.form.patchValue({
      output: this.output,
    });
  }

  //id: cdk-drop-list-0 = ordered
  //id: cdk-drop-list-1 = unordered
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateGridPosition();
  }

  sideBarAction() {
    this.advancedInit();
  }

  advancedInit() {
    this.advancedForm = this.fb.group({
      categoryOverride: -1,
      driverOverride: 0,
      carOverride: 0,
    });
  }

  advancedUpdate(event: any, key: number) {
    if (key == 0) {
      this.advancedForm.patchValue({
        driverOverride: event.value,
      });
    } else {
      this.advancedForm.patchValue({
        carOverride: event.value,
      });
    }
  }

  advancedSave() {
    this.saveData();

    let cat = this.advancedForm.get('categoryOverride').value;
    let drive = this.advancedForm.get('driverOverride').value;
    let car = this.advancedForm.get('carOverride').value;

    if (cat > -1) {
      this.json.entries.forEach((entry) => {
        entry.drivers[0].driverCategory = cat;
      });
    }

    if (drive > 0) {
      let bool = drive == 2 ? true : false;
      this.json.entries.forEach((entry) => {
        entry.overrideDriverInfo = bool ? 1 : 0;
      });
    }

    if (car > 0) {
      let bool = car == 2 ? true : false;
      this.json.entries.forEach((entry) => {
        entry.overrideCarModelForCustomCar = bool ? 1 : 0;
      });
    }

    this.advancedInit();
    this.patchForm(this.driverIndex);
  }
}
