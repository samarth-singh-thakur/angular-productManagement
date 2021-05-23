import { Component, EventEmitter, Input, Output, OnChanges } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
    @Input()
    rating: number = 0;
    cropWidth: number = 75;
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();
    ngOnChanges(): void {
        this.cropWidth = this.rating * 75 / 5;
    }
    onClick(): void {
        console.log("clicked");
        this.ratingClicked.emit(`this is${this.rating}`)
    }
}