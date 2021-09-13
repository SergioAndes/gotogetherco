import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "splash-screen",
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  windowWidth: string;
  splashTransition: string;
  opacityChange: number = 1;
  showSplash = true;
  animate=1;

  @Input() animationDuration: number = 0.5;
  @Input() duration: number = 3;

  ngOnInit(): void {
    setTimeout(() => {
      let transitionStyle = "";
      switch (this.animate) {
        case this.animate = 1:
          transitionStyle = 'opacity ' + this.animationDuration + "s";
          this.opacityChange = 0;
      }

      this.splashTransition = transitionStyle;

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }
}
