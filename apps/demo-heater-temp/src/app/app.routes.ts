import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'heater-temp',
        loadChildren: () =>
            import('@demo-heater-temp/demo-heater-temp-lib').then((m) => m.DemoHeaterTempModule),
    },
];
