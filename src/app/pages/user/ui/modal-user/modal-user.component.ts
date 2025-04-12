import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../data-access/user.service';

@Component({
  selector: 'app-modal-user',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export class ModalUserComponent {
  @Input() visible = false;
  @Input() isEdit = false;
  @Input() formData: any = { name: '' };

  @Output() save = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();


  productForm!: FormGroup;
  categories: any[] = []
  data = {}

  constructor(private fb: FormBuilder) {
    this.createForm();
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && this.formData) {
      this.productForm.patchValue({
        id: this.formData.id || null,
        username: this.formData.username || '',
        password: this.formData.password || '',
        email: this.formData.email || '',
        phone: this.formData.phone || ''
      });
    }
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [null],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  get usernameFb() {
    return this.productForm.controls['username'];
  }

  get passwordFb() {
    return this.productForm.controls['password'];
  }

  get emailFb() {
    return this.productForm.controls['email'];
  }

  get phoneFb() {
    return this.productForm.controls['phone'];
  }

  get idFb(){
    return this.productForm.controls['id'];
  }

  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); 
      return;
    }

    this.data = {
      id: this.idFb.value,
      username: this.usernameFb.value,
      password: this.passwordFb.value,
      email: this.emailFb.value,
      phone: this.phoneFb.value
    }
    console.log(this.data)
  
    this.save.emit(this.data);
    this.close();
  }
  close() {
    this.productForm.reset();
    this.closeModal.emit();
  }
}
