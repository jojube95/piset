import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss']
})
export class EditInputComponent implements OnInit {
  @Input() data: string;
  @Output() focusOut: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("input", {static: false}) inputField: ElementRef;
  editMode = false;
  constructor() { }

  ngOnInit() {
  }

  onFocusOut() {
    console.log('focusOut');
    this.focusOut.emit(this.data);
  }

  doubleClick(){
    this.editMode = true;

    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.inputField.nativeElement.focus();
    },0);

  }

}
