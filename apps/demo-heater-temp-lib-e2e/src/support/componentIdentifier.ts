/**
 * Container class for all component html element identifiers within demo-heater-temp-lib.
 */
export class ComponentIdentifier {
    /// Demo heater temperature component identifier
    static readonly DEMO_HEATER_TEMP = 'demo-heater-temperature--demo-heater-temperature';

    /**
     * Gets the url for e2e testing a specific component.
     *
     * @param identifier Identifier of component to test
     */
    static getURLForIdentifier(identifier: string): string {
        return 'iframe.html?id=' + identifier + '&viewMode=story';
    }
}
