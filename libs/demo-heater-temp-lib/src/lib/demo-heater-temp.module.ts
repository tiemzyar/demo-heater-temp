import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoHeaterTempComponent } from './demo-heater-temp/demo-heater-temp.component';
import { DemoHeaterTempRoutingModule } from './demo-heater-temp-routing.module';

@NgModule({
    declarations: [DemoHeaterTempComponent],
    exports: [DemoHeaterTempComponent],
    imports: [CommonModule, DemoHeaterTempRoutingModule],
})
export class DemoHeaterTempModule {}
