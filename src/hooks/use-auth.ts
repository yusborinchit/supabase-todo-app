import type { LogInData, SignUpData } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export function useAuth() {
  const router = useRouter();
  const { supabaseClient, session } = useSessionContext();

  const logIn = async (logInData: LogInData) => {
    const { email, password } = logInData;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };

    return { data };
  };

  const signUp = async (signUpData: SignUpData) => {
    const { firstName, lastName, email, password } = signUpData;

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
      },
    });

    if (error) return { error: error.message };

    return { data };
  };

  const logOut = async () => {
    if (!session) return;
    await supabaseClient.auth.signOut();
    router.reload();
  };

  return { session, logIn, signUp, logOut };
}
