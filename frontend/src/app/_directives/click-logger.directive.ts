import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickLogger]'
})
export class ClickLoggerDirective {

  constructor() { }

  @HostListener("click", ["$event"]) onClick(event: Event){
    //console.log("Element clicked: ", event);
  }

}
