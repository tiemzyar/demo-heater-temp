import { DemoHeaterTempComponent } from './demo-heater-temp.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { DemoHeaterTempModule } from '../demo-heater-temp.module';
import { MockModule } from '../testing';

const imports = [DemoHeaterTempModule, MockModule];
const createComponent = createComponentFactory({
    component: DemoHeaterTempComponent,
    detectChanges: true,
    imports: imports,
    providers: [],
});

/**
 * Creates an array containing a range of numbers.
 *
 * @param start Lowest number in the array
 * @param end Highest number in the array
 * @param reverse Flag about whether to reverse the created range
 */
function getNumberRange(start: number, end: number, reverse = false): number[] {
    const range = Array.from(Array(end - start + 1).keys()).map((x) => x + start);
    if (reverse) {
        range.reverse();
    }

    return range;
}

describe('Demo Heater Temp Component', () => {
    let component: DemoHeaterTempComponent;
    let spectator: Spectator<DemoHeaterTempComponent>;

    let originalMinTemp: number;
    let originalMaxTemp: number;
    let originalTargetTemp: number;

    beforeEach(async () => {
        spectator = createComponent();
        component = spectator.component;

        originalMinTemp = component.minTemp$.getValue();
        originalMaxTemp = component.maxTemp$.getValue();
        originalTargetTemp = component.targetTemp$.getValue();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create chart', () => {
        expect(component.chart).toBeTruthy();
    });

    describe('Set minimum temperature', () => {
        it('should set minimum only, no minimum adjustment', () => {
            const testRange = getNumberRange(originalMinTemp + 1, originalTargetTemp);
            for (const temperature of testRange) {
                component.minTemp = temperature;

                expect(component.minTemp$.getValue()).toEqual(temperature);
                expect(component.targetTemp$.getValue()).toEqual(originalTargetTemp);
                expect(component.maxTemp$.getValue()).toEqual(originalMaxTemp);
            }
        });

        it('should set minimum and target, no minimum adjustment', () => {
            const testRange = getNumberRange(originalTargetTemp + 1, originalMaxTemp - 1);
            for (const temperature of testRange) {
                component.minTemp = temperature;

                expect(component.minTemp$.getValue()).toEqual(temperature);
                expect(component.targetTemp$.getValue()).toEqual(temperature);
                expect(component.maxTemp$.getValue()).toEqual(originalMaxTemp);
            }
        });

        it('should set minimum and target, with minimum adjustment', () => {
            const testRange = getNumberRange(originalMaxTemp, originalMaxTemp + 5);
            for (const temperature of testRange) {
                component.minTemp = temperature;

                const expectedTemperature = originalMaxTemp - 1;
                expect(component.minTemp$.getValue()).toEqual(expectedTemperature);
                expect(component.targetTemp$.getValue()).toEqual(expectedTemperature);
                expect(component.maxTemp$.getValue()).toEqual(originalMaxTemp);
            }
        });
    });

    describe('Set maximum temperature', () => {
        it('should set maximum only, no maximum adjustment', () => {
            const testRange = getNumberRange(originalTargetTemp, originalMaxTemp - 1, true);
            for (const temperature of testRange) {
                component.maxTemp = temperature;

                expect(component.maxTemp$.getValue()).toEqual(temperature);
                expect(component.targetTemp$.getValue()).toEqual(originalTargetTemp);
                expect(component.minTemp$.getValue()).toEqual(originalMinTemp);
            }
        });

        it('should set maximum and target, no maximum adjustment', () => {
            const testRange = getNumberRange(originalMinTemp + 1, originalTargetTemp - 1, true);
            for (const temperature of testRange) {
                component.maxTemp = temperature;

                expect(component.maxTemp$.getValue()).toEqual(temperature);
                expect(component.targetTemp$.getValue()).toEqual(temperature);
                expect(component.minTemp$.getValue()).toEqual(originalMinTemp);
            }
        });

        it('should set maximum and target, with maximum adjustment', () => {
            const testRange = getNumberRange(originalMinTemp - 5, originalMinTemp, true);
            for (const temperature of testRange) {
                component.maxTemp = temperature;

                const expectedTemperature = originalMinTemp + 1;
                expect(component.maxTemp$.getValue()).toEqual(expectedTemperature);
                expect(component.targetTemp$.getValue()).toEqual(expectedTemperature);
                expect(component.minTemp$.getValue()).toEqual(originalMinTemp);
            }
        });
    });

    describe('Set target temperature', () => {
        it('should set target only, no adjustment', () => {
            const testRange = getNumberRange(originalMinTemp, originalMaxTemp);
            for (const temperature of testRange) {
                component.targetTemp = temperature;

                expect(component.targetTemp$.getValue()).toEqual(temperature);
                expect(component.minTemp$.getValue()).toEqual(originalMinTemp);
                expect(component.maxTemp$.getValue()).toEqual(originalMaxTemp);
            }
        });

        it('should set target only, with adjustment to minimum', () => {
            const testRange = getNumberRange(originalMinTemp - 5, originalMinTemp - 1, true);
            for (const temperature of testRange) {
                component.targetTemp = temperature;

                expect(component.targetTemp$.getValue()).toEqual(originalMinTemp);
                expect(component.minTemp$.getValue()).toEqual(originalMinTemp);
                expect(component.maxTemp$.getValue()).toEqual(originalMaxTemp);
            }
        });

        it('should set target only, with adjustment to maximum', () => {
            const testRange = getNumberRange(originalMaxTemp + 1, originalMaxTemp + 5);
            for (const temperature of testRange) {
                component.targetTemp = temperature;

                expect(component.targetTemp$.getValue()).toEqual(originalMaxTemp);
                expect(component.minTemp$.getValue()).toEqual(originalMinTemp);
                expect(component.maxTemp$.getValue()).toEqual(originalMaxTemp);
            }
        });
    });
});
