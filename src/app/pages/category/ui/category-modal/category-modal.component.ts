import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
@Component({
  selector: 'app-category-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() formData: any = { name: '' };

  @Output() save = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.categoryForm.patchValue(this.formData);
    }
  }

  createForm() {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  get nameFb() {
    return this.categoryForm.controls['name'];
  }

  submit() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched(); 
      return;
    }
  
    this.save.emit(this.categoryForm.value);
    this.close();
  }
  close() {
    this.categoryForm.reset();
    this.closeModal.emit();
  }
}
