import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})

// There's currently a CVA bug in Angular v12.0.2, where BsDatePicker objects can't be read
// BsDatePicker doesn't read it's own values
//  and it is returning a default, '' value, which was specified inside the form fb builder
// I've tried different workarounds for ~5 hrs in a local branch
//  and just decided it will be easier to manually write the date picker for now
export class DateInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: any;
  @Input() type = 'text';
  @Input() label = 'string';
  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    isAnimated: true,
    dateInputFormat: 'YYYY-MM-DD',
  };

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control!.validator ? [control!.validator] : [];
    const asyncValidators = control!.asyncValidator
      ? [control!.asyncValidator]
      : [];

    control!.setValidators(validators);
    control!.setAsyncValidators(asyncValidators);
    control!.updateValueAndValidity();
  }

  onChange(event: any) {
    return event.target.value;
  }

  onTouched() {}

  writeValue(obj: Date): void {
    this.input.nativeElement.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn.target.value;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn.target.value;
  }
}
