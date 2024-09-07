import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { DemoHeaterTempModule } from '@demo-heater-temp/demo-heater-temp-lib';
import { DemoHeaterTempComponent } from '../demo-heater-temp.component';
import { importProvidersFrom } from '@angular/core';
import { MockModule } from '../../testing';

export const config: Meta = {
    decorators: [
        applicationConfig({ providers: [importProvidersFrom(MockModule)] }),
        moduleMetadata({
            imports: [DemoHeaterTempModule],
            providers: [],
        }),
    ],
    component: DemoHeaterTempComponent,
    parameters: {},
};
