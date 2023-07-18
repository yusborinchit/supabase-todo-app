import FormErrorAlert from "@/components/ui/form-error-alert";
import Input from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { LogInSchema } from "@/schemas";
import zodToFormErrors from "@/utils/zod-to-form-errors";
import Link from "next/link";
import { type FormEvent, useState } from "react";

const DEFAULT_ERRORS = {
  email: "",
  password: "",
  global: "",
};

interface LogInFormProps {
  onSuccess: () => void;
}

function LogInForm({ onSuccess }: LogInFormProps) {
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const { logIn } = useAuth();

  const handleLogIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    setErrors(DEFAULT_ERRORS);
    const zodValidation = LogInSchema.safeParse({
      email,
      password,
    });

    // schema validations
    if (!zodValidation.success) {
      const { error } = zodValidation;
      const mappedErrors = zodToFormErrors(error);
      return setErrors((prevErrors) => ({ ...prevErrors, ...mappedErrors }));
    }

    const logInData = zodValidation.data;
    const validation = await logIn(logInData);

    // backend results validations
    if (validation.error) {
      const { error } = validation;
      return setErrors((prevErrors) => ({ ...prevErrors, global: error }));
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleLogIn} className="flex flex-col gap-4 mt-12">
      {errors.global && <FormErrorAlert error={errors.global} />}

      <div className="flex flex-col gap-4">
        <Input label="Email" type="text" name="email" error={errors.email} />
        <Input
          label="Password"
          type="password"
          name="password"
          error={errors.password}
        />
      </div>

      <div className="flex flex-col mt-8">
        <button className="flex justify-center px-6 py-2 font-bold text-white capitalize rounded bg-gradient-to-t from-blue-700 to-blue-500">
          Log In
        </button>
        <Link href="/account/sign-up" className="py-2 text-sm underline">
          No account? Sign up
        </Link>
      </div>
    </form>
  );
}

export default LogInForm;
