import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
    selector: 'demo-heater-temp-demo-heater-temp',
    templateUrl: './demo-heater-temp.component.html',
    styleUrls: ['./demo-heater-temp.component.scss'],
})
@UntilDestroy()
export class DemoHeaterTempComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
