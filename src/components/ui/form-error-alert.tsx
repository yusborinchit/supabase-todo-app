import { useEffect, useState } from "react";
import ErrorIcon from "../icons/error-icon";

interface FormErrorAlertProps {
  error: string;
}

function FormErrorAlert({ error }: FormErrorAlertProps) {
  return (
    <div className="flex gap-2 p-4 text-red-700 border-red-500 rounded border-s-4 bg-red-50">
      <ErrorIcon />
      <div className="flex flex-col flex-1 gap-2">
        <p className="block font-bold leading-[100%]">
          Oops! Something went wrong
        </p>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
}

export default FormErrorAlert;
