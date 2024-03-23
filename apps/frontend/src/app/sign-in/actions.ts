'use server';

import { LoginFormFields } from './form';

export async function handleMyFormSubmit(data: LoginFormFields) {
  console.log({
    email: data.email,
    password: data.password,
  });
}
