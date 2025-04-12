import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../category/data-access/category.service';

@Component({
  selector: 'app-product-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() formData: any = { name: '' };

  @Output() save = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  categoryService = inject(CategoryService)

  productForm!: FormGroup;
  categories: any[] = []
  data = {}

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response
      },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.productForm.patchValue({
        id: this.formData.id || null,
        name: this.formData.name || '',
        description: this.formData.description || '',
        price: this.formData.price || '',
        category: this.formData.category?.id || ''
      });
    }
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  get nameFb() {
    return this.productForm.controls['name'];
  }

  get descriptionFb() {
    return this.productForm.controls['description'];
  }

  get priceFb() {
    return this.productForm.controls['price'];
  }

  get categoryFb() {
    return this.productForm.controls['category'];
  }

  get idFb(){
    return this.productForm.controls['id'];
  }

  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); 
      return;
    }

    console.log(this.categoryFb.value)
    this.data = {
      id: this.idFb.value,
      name: this.nameFb.value,
      price: this.priceFb.value,
      description: this.descriptionFb.value,
      category: {
        id: this.categoryFb.value
      }
    }
    console.log(this.data)
  
    this.save.emit(this.data);
    this.close();
  }
  close() {
    this.productForm.reset();
    this.closeModal.emit();
  }
  autoGrow(textArea: HTMLTextAreaElement) {
    textArea.style.height = 'auto'; 
    textArea.style.height = textArea.scrollHeight + 'px'; 
  }
  
}
