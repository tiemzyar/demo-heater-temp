import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoHeaterTempComponent } from './demo-heater-temp.component';

describe('DemoHeaterTempComponent', () => {
    let component: DemoHeaterTempComponent;
    let fixture: ComponentFixture<DemoHeaterTempComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DemoHeaterTempComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DemoHeaterTempComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
