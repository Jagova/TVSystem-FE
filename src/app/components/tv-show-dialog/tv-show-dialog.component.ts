import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tv-show-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tv-show-dialog.component.html',
  styleUrls: ['./tv-show-dialog.component.css']
})
export class TvShowDialogComponent implements OnChanges {
  @Input() title: string = '';
  @Input() action: string = '';
  @Input() tvShow: any;
  @Output() save = new EventEmitter<any>();

  tvShowForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tvShowForm = this.fb.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      episodes: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.tvShow) {
      this.tvShowForm.patchValue(this.tvShow);
    }
  }

  onSubmit(): void {
    if (this.tvShowForm.valid) {
      this.save.emit(this.tvShowForm.value);
      this.closeModal();
    }
  }

  closeModal(): void {
    const modal = document.getElementById('tvShowModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
