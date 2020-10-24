/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  //You use the ElementRef in the directive's constructor to inject a reference to the host DOM element, the element to which you applied appHighlight.
  constructor(private el: ElementRef) {}

  @Input() defaultColor: string;

  //"appHighlight" ist ein Alias, damit [appHighlight] funktioniert bei app.component.html
  //Sonst müsste man @Input() appHighlight: string; machen, was aber BAD PRACTICE ist!
  //Ohne Alias, müsste man bei app.component.html:
  //<p appHighlight [highlightColor]="color">Highlighted with parent component's color</p> STATT
  //<p [appHighlight]="color">Highlight me!</p> -> Deswegen Alias!
  @Input("appHighlight") highlightColor: string;
  //appHighlight bezieht sich auf Directive selector [appHighlight]
  //Inside the directive the property is known as highlightColor. Outside the directive, where you bind to it, it's known as appHighlight.

  @Input() testHighlighter: string;

  @Input("irgendeinAlias") testAlias: string;

  //Beim Hovern (MouseEnter)
  //Methode hightlight() wird aufgerufen
  //Parameter: Entweder ausgewählte HighLightColor oder DefaultColor (violet) oder einfach nur rot
  @HostListener("mouseenter") onMouseEnter() {
    this.highlight(
      this.highlightColor || this.defaultColor || this.testHighlighter || this.testAlias || "red"
    );
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.highlight(null);
  }

  //Ändert Hintergrundfarbe vom Element
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
