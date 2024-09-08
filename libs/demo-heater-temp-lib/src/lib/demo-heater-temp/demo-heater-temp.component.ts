import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsGauge from 'highcharts/modules/solid-gauge';
import { BehaviorSubject } from 'rxjs';

HighchartsMore(Highcharts);
HighchartsGauge(Highcharts);

@Component({
    selector: 'demo-heater-temp-demo-heater-temp',
    templateUrl: './demo-heater-temp.component.html',
    styleUrls: ['./demo-heater-temp.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DemoHeaterTempComponent implements OnInit {
    // region Input
    readonly minTemp$ = new BehaviorSubject<number>(0);
    readonly maxTemp$ = new BehaviorSubject<number>(30);
    readonly targetTemp$ = new BehaviorSubject<number>(22);
    readonly useSimpleAxis$ = new BehaviorSubject<boolean>(true);

    /**
     * Updates the component's minimum temperature.
     * <p> Also adjusts the component's target temperature, if necessary, and prevents minimum
     * temperature from becoming greater than or equal to maximum temperature.
     *
     * @param value New minimum temperature
     */
    @Input()
    set minTemp(value: number) {
        let newValue = value;
        const maxTemp = this.maxTemp$.getValue();
        if (value >= maxTemp) {
            newValue = maxTemp - this.minMaxDelta;
        }

        this.minTemp$.next(newValue);
        this.updateChartAxisData();

        if (newValue > this.targetTemp$.getValue()) {
            this.targetTemp = newValue;
        }
    }

    /**
     * Updates the component's maximum temperature.
     * <p> Also adjusts the component's target temperature, if necessary, and prevents maximum
     * temperature from becoming smaller than or equal to minimum temperature.
     *
     * @param value New maximum temperature
     */
    @Input()
    set maxTemp(value: number) {
        let newValue = value;
        const minTemp = this.minTemp$.getValue();
        if (value <= minTemp) {
            newValue = minTemp + this.minMaxDelta;
        }

        this.maxTemp$.next(newValue);
        this.updateChartAxisData();

        if (newValue < this.targetTemp$.getValue()) {
            this.targetTemp = newValue;
        }
    }

    /**
     * Updates the component's target temperature.
     * <p> The target temperature cannot be set to a value outside the component's
     * temperature bounds.
     *
     * @param value New target temperature
     */
    @Input()
    set targetTemp(value: number) {
        let newValue = value;
        if (value > this.maxTemp$.getValue()) {
            newValue = this.maxTemp$.getValue();
        } else if (value < this.minTemp$.getValue()) {
            newValue = this.minTemp$.getValue();
        }

        this.targetTemp$.next(newValue);
        this.chart?.series[0].setData([this.targetTemp$.getValue()]);
    }

    /**
     * Sets the axis type of the component's gauge chart.
     *
     * @param value Flag about whether a simple axis type should be set
     */
    @Input()
    set useSimpleAxis(value: boolean) {
        this.useSimpleAxis$.next(value);
        this.updateChartAxisType();
    }
    // endregion

    // region Highcharts
    /**
     * Chart used for visualising the component's minimum, target and maximum temperature.
     */
    chart?: Highcharts.Chart;
    private readonly highlightColor = '#00F';
    private readonly minMaxDelta = 1;
    // endregion

    // region Lifecycle
    ngOnInit() {
        this.createChart();
    }

    /**
     * Creates a gauge chart in the component's chart container.
     * <p>Options: https://api.highcharts.com/highcharts/
     */
    private createChart() {
        this.chart = Highcharts.chart('chart', {
            chart: {
                type: 'gauge',
            },

            title: {
                text: undefined,
            },

            accessibility: {
                enabled: false,
            },

            credits: {
                enabled: false,
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
            },

            yAxis: [this.getChartAxisOptions()],

            series: [
                {
                    data: [this.targetTemp$.getValue()],
                    dial: {
                        backgroundColor: this.highlightColor,
                    },
                    dataLabels: {
                        format: `<span>{y} °C</span><br/>`,
                        style: {
                            color: this.highlightColor,
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        },
                        borderWidth: 0,
                        y: 120,
                    },
                },
            ],
        } as any);
    }

    /**
     * Gets a chart axis configuration subject to flag {@link useSimpleAxis$}.
     * <p>Options: https://api.highcharts.com/highcharts/yAxis
     */
    private getChartAxisOptions(): Highcharts.AxisOptions {
        const axisOptionsCommon = {
            min: this.minTemp$.getValue(),
            max: this.maxTemp$.getValue(),
            lineWidth: 2,
            tickInterval: 1,
            tickLength: 10,
            tickColor: this.highlightColor,
            minorTicks: false,
            minorTickLength: 5,
            minorTicksPerMajor: 2,
            startOnTick: true,
            endOnTick: true,
        };
        let axisOptions;

        if (this.useSimpleAxis$.getValue()) {
            const position: Highcharts.OptionsTickPositionValue = 'outside';
            axisOptions = {
                ...axisOptionsCommon,
                offset: -25,
                labels: {
                    distance: 20,
                    enabled: true,
                },
                tickPosition: position,
                tickPositions: [this.minTemp$.getValue(), this.maxTemp$.getValue()],
            };
        } else {
            const position: Highcharts.OptionsTickPositionValue = 'inside';
            axisOptions = {
                ...axisOptionsCommon,
                offset: -10,
                labels: {
                    distance: -20,
                    enabled: true,
                },
                tickPosition: position,
                tickPositions: undefined,
            };
        }

        return axisOptions;
    }

    /**
     * Updates the axis type of {@link chart}.
     */
    private updateChartAxisType() {
        this.chart?.yAxis[0].update(this.getChartAxisOptions());
    }

    /**
     * Updates the axis data of {@link chart}.
     */
    private updateChartAxisData() {
        const yAxis = this.chart?.yAxis[0];
        yAxis?.setExtremes(this.minTemp$.getValue(), this.maxTemp$.getValue());
        yAxis?.update({
            tickPositions: this.useSimpleAxis$.getValue()
                ? [this.minTemp$.getValue(), this.maxTemp$.getValue()]
                : undefined,
        });
    }
    // endregion
}
