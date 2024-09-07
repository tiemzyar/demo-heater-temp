import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'demo-heater-temp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'demo-heater-temp';

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.router
            .navigate(['heater-temp'], {
                skipLocationChange: true,
                relativeTo: this.activatedRoute,
            })
            .catch((e) => console.log(e))
            .then();
    }
}
