import { useAuth } from "@/hooks/use-auth";
import { SignUpSchema } from "@/schemas";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/input";
import zodToFormErrors from "@/utils/zod-to-form-errors";
import FormErrorAlert from "./form-error-alert";

const DEFAULT_ERRORS = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  global: "",
};

interface SignUpFormProps {
  onSuccess: () => void;
}

function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [errors, setErrors] = useState(DEFAULT_ERRORS);
  const { signUp } = useAuth();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    setErrors(DEFAULT_ERRORS);
    const zodValidation = SignUpSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
    });

    // schema validations
    if (!zodValidation.success) {
      const { error } = zodValidation;
      const mappedErrors = zodToFormErrors(error);
      return setErrors((prevErrors) => ({ ...prevErrors, ...mappedErrors }));
    }

    const signUpData = zodValidation.data;
    const validation = await signUp(signUpData);

    // backend results validations
    if (validation.error) {
      const { error } = validation;
      return setErrors((prevErrors) => ({ ...prevErrors, global: error }));
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4 mt-12">
      {errors.global && <FormErrorAlert error={errors.global} />}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          type="text"
          name="firstName"
          error={errors.firstName}
        />
        <Input
          label="Last name"
          type="text"
          name="lastName"
          error={errors.lastName}
        />
      </div>

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
        <button
          type="submit"
          className="flex justify-center px-6 py-2 font-bold text-white capitalize rounded bg-gradient-to-t from-blue-700 to-blue-500"
        >
          Sign up
        </button>
        <Link href="/account/log-in" className="py-2 text-sm underline">
          Already user? Log in
        </Link>
      </div>
    </form>
  );
}

export default SignUpForm;
