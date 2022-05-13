import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective implements OnInit {

  constructor(private elementRef: ElementRef) { 
  
    
  }
  ngOnInit(): void {
    console.log('estou aqqui');
    this.elementRef.nativeElement.style.backgroundColor = 'red'  
  }

}
