import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from '@services/loading-screen/loading-screen.service';

@Component({
    selector: 'loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent implements OnInit {
    constructor(public readonly loadingScreenService: LoadingScreenService) {}

    ngOnInit(): void {}
}
