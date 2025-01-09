import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ContentState } from '../../models/backend.model';
import { PhoneBookServiceService } from '../../services/phone-book-service.service';

@Component({
  selector: 'app-new-contact',
  imports: [
    MatToolbarModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
})
export class NewContactComponent {
  contactForm: FormGroup;
  pageState: ContentState = ContentState.NOT_INITIALIZED;
  readonly ContentState = ContentState;

  constructor(
    private fb: FormBuilder,
    private phoneBookService: PhoneBookServiceService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const contact: Contact = this.contactForm.value;
      this.pageState = ContentState.LOADING;
      this.phoneBookService.postContact(contact).subscribe({
        next: () => {
          this.pageState = ContentState.LOADED;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 700);
        },
        error: () => {
          this.pageState = ContentState.ERROR;
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
