import { config } from './stories.config';
import { Meta, StoryFn } from '@storybook/angular';

export default {
    title: 'Demo Heater Temperature',
    ...config,
} as Meta;

const Template: StoryFn = (args) => ({
    props: args,
});

export const DemoHeaterTemperature = {
    render: Template,
    args: {
        minTemp: 10,
        maxTemp: 30,
        targetTemp: 22,
        useSimpleAxis: true,
    },
    argTypes: {},
};
