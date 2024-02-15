import { Button, Input } from '@nest-interview/ui';

export default async function SignIn() {
  return (
    <form className="flex flex-col gap-4">
      <h1>Sign In</h1>
      <Input
        label="Email"
        name="email"
        placeholder="example@domain.com"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="example@domain.com"
        required
      />
      <Button>Submit</Button>
    </form>
  );
}
