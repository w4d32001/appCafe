import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-susti',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modal-susti.component.html',
  styleUrl: './modal-susti.component.css',
})
export class ModalSustiComponent {
    @Input() visible = false;
    @Input() isEdit = false;
    @Input() formData: any = { name: '' };
  
    @Output() save = new EventEmitter<any>();
    @Output() closeModal = new EventEmitter<void>();
  
    exaForm!: FormGroup;
  
    constructor(private fb: FormBuilder) {
      this.createForm();
    }
    private validateBirthDateNotInFuture(control: any) {
        const inputDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
      
        if (inputDate > today) {
          return { futureDate: true };
        }
        return null;
      }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['formData'] && this.formData) {
        const formattedData = {
          ...this.formData,
          birthDate: this.formatDateForInput(this.formData.birthDate),
        };
  
        this.exaForm.patchValue({
          dni: formattedData.dni || '',
          name: formattedData.name || '',
          surName: formattedData.surName || '',
          birthDate: formattedData.birthDate || '',
        });
      }
    }
  
    private formatDateForInput(date: string | Date): string {
      if (!date) return '';
  
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return '';
  
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
  
      return `${year}-${month}-${day}`;
    }
  
    createForm() {
      this.exaForm = this.fb.group({
        dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/),]],
        name: ['', [Validators.required]],
        surName: ['', [Validators.required]],
        birthDate: ['', [Validators.required, this.validateBirthDateNotInFuture.bind(this)],],
      });
    }
  
    get dniFb() {
      return this.exaForm.controls['dni'];
    }
  
    get nameFb() {
      return this.exaForm.controls['name'];
    }
  
    get surNameFb() {
      return this.exaForm.controls['surName'];
    }
  
    get birthDateFb() {
      return this.exaForm.controls['birthDate'];
    }
  
    submit() {
      if (this.exaForm.invalid) {
        this.exaForm.markAllAsTouched();
        return;
      }
      this.save.emit(this.exaForm.value);
      this.close();
    }
  
    close() {
      this.exaForm.reset();
      this.closeModal.emit();
    }
}
