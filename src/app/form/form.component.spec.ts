import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { ReactiveFormsModule} from "@angular/forms";


describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let emailControl: HTMLElement;
  let passControl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    emailControl = screen.getByRole('textbox', { name: /Email Input/i });
    passControl = screen.getByTestId('password-input', { });
  });

  afterEach(() => {
    userEvent.clear(emailControl);
    userEvent.clear(passControl);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('fields must be required', async () => {
    expect(emailControl).toBeRequired();
    expect(passControl).toBeRequired();
  });

  test('fields must be invalids', async () => {
    userEvent.type(emailControl, 'testtest.com');
    fireEvent.blur(emailControl);
    expect(emailControl).toBeInvalid();

    userEvent.type(passControl, '1234');
    fireEvent.blur(passControl);
    expect(emailControl).toBeInvalid();
  });

  test('fields must be valid', async () => {
    userEvent.type(emailControl, 'test@test.com');
    fireEvent.blur(emailControl);
    expect(emailControl).toBeValid();

    userEvent.type(passControl, '123456');
    fireEvent.blur(passControl);
    expect(emailControl).toBeValid();
  });

  test('form must have parameters', async () => {
    userEvent.type(emailControl, 'test@test.com');
    userEvent.type(passControl, '123456');

    const form = screen.getByTestId('form-login', {});
    expect(form).toHaveFormValues({
      email: 'test@test.com',
      password: '123456'
    });
  });
});
