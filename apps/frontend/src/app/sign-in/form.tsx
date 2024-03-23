'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nest-interview/ui';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { handleMyFormSubmit } from './actions';

const schema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  })
  .required();

export type LoginFormFields = z.infer<typeof schema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormFields) => {
    await handleMyFormSubmit(data);
  };

  return (
    <form
      noValidate
      className="flex flex-col items-end gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="w-full text-center">Sign In</h1>
      <Input
        required
        fulWidth
        label="Email"
        placeholder="example@domain.com"
        error={!!errors?.email}
        helperText={errors?.email?.message}
        {...register('email')}
      />
      <Input
        required
        fulWidth
        label="Password"
        type="password"
        placeholder="example@domain.com"
        error={!!errors?.password}
        helperText={errors?.password?.message}
        {...register('password')}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
