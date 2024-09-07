import { RouterModule, Routes } from '@angular/router';
import { DemoHeaterTempComponent } from './demo-heater-temp/demo-heater-temp.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: DemoHeaterTempComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoHeaterTempRoutingModule {}
