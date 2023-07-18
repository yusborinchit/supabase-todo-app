import { ZodError } from "zod";

function zodToFormErrors(zodError: ZodError) {
  const { errors } = zodError;

  const mappedErrors = Object.fromEntries(
    errors.map(({ path, message }) => [path[0], message])
  );

  return mappedErrors;
}

export default zodToFormErrors;
