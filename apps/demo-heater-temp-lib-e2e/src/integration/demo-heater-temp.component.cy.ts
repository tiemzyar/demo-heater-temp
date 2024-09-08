import { ComponentIdentifier } from '../support/componentIdentifier';
import { ComponentSelector } from '../support/componentSelector';
import { QAIdentifier } from '../support/qaIdentifier';

const storyUrl = ComponentIdentifier.getURLForIdentifier(ComponentIdentifier.DEMO_HEATER_TEMP);

const expectedMinTemperature = '10';
const expectedMaxTemperature = '30';
const expectedTargetTemperature = '22 °C';

describe('Demo Heater Temp Component', () => {
    beforeEach(() => {
        cy.visit(storyUrl);
        cy.injectAxe();
    });

    it('should render component', () => {
        cy.get(ComponentSelector.DEMO_HEATER_TEMP).should('exist');
    });

    it('should render chart', () => {
        cy.getByQaName(QAIdentifier.DemoHeaterTemp.CHART_CONTAINER).should('exist');
        cy.getByQaName(QAIdentifier.DemoHeaterTemp.CHART_CONTAINER)
            .children()
            .should('not.be.empty');
    });

    it('should render target temperature', () => {
        cy.get('.highcharts-data-label').within(() => {
            cy.get('text').contains(expectedTargetTemperature);
        });
    });

    it('should render minimum and maximum temperature', () => {
        cy.get('.highcharts-yaxis-labels').within(() => {
            cy.get('text').contains(expectedMinTemperature);
            cy.get('text').contains(expectedMaxTemperature);
        });
    });
});
