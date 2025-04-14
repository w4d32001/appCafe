import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
export const expirationAfterProductionValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const productionDate = formGroup.get('productionDate')?.value;
  const expirationDate = formGroup.get('expirationDate')?.value;

  if (!productionDate || !expirationDate) return null;

  const prodDate = new Date(productionDate);
  const expDate = new Date(expirationDate);

  return expDate > prodDate ? null : { expirationBeforeProduction: true };
};

@Component({
  selector: 'app-modal-examen',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal-examen.component.html',
  styleUrl: './modal-examen.component.css'
})
export class ModalExamenComponent {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() formData: any = { name: '' };

  @Output() save = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  exaForm!: FormGroup;
  categories: any[] = []
  data = {}

  constructor(private fb: FormBuilder) {
    this.createForm();
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      const formattedData = {
        ...this.formData,
        expirationDate: this.formatDateForInput(this.formData.expirationDate),
        productionDate: this.formatDateForInput(this.formData.productionDate),
      };
  
      this.exaForm.patchValue({
        id: formattedData.id || null,
        brand: formattedData.brand || '',
        description: formattedData.description || '',
        expirationDate: formattedData.expirationDate || '',
        productionDate: formattedData.productionDate || '',
        country: formattedData.country || '',
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
      id: [null],
      brand: ['', [Validators.required]],
      description: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      productionDate: ['', [Validators.required]],
      country: ['', [Validators.required]]
    }, { validators: expirationAfterProductionValidator });
  }

  get brandFb() {
    return this.exaForm.controls['brand'];
  }

  get descriptionFb() {
    return this.exaForm.controls['description'];
  }

  get expirationDateFb() {
    return this.exaForm.controls['expirationDate'];
  }

  get productionDateFb() {
    return this.exaForm.controls['productionDate'];
  }

  get countryFb(){
    return this.exaForm.controls['country']
  }

  get idFb(){
    return this.exaForm.controls['id'];
  }

  submit() {
    if (this.exaForm.invalid) {
      this.exaForm.markAllAsTouched(); 
      return;
    }
    console.log(this.exaForm.value)
    this.save.emit(this.exaForm.value);
    this.close();
  }
  close() {
    this.exaForm.reset();
    this.closeModal.emit();
  }
  autoGrow(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto'; 
    textArea.style.height = textArea.scrollHeight + 'px'; 
  }
}
