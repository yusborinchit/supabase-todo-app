import Logo from "@/components/ui/logo";
import SignUpForm from "@/components/ui/sign-up-form";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

function SignIn() {
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSuccess = () => {
    setIsSuccessful(true);
  };

  return (
    <>
      <Head>
        <title>Supabase Todo App | Sign Up</title>
      </Head>

      <div className="flex flex-col items-center justify-center h-screen max-w-sm mx-auto">
        {!isSuccessful ? (
          <>
            <header className="flex flex-col mx-auto">
              <div className="mx-auto">
                <Logo />
              </div>
              <p className="text-3xl font-black">
                Join us today<span className="text-blue-500">!</span>
              </p>
            </header>
            <main>
              <SignUpForm onSuccess={handleSuccess} />
            </main>
          </>
        ) : (
          <>
            <main className="flex flex-col items-center gap-12">
              <header className="flex flex-col items-center">
                <h1 className="text-3xl font-black">
                  Verification sent<span className="text-blue-500">!</span>
                </h1>
                <p className="text-sm text-zinc-500">
                  Please check your inbox for the verification email
                </p>
              </header>
              <Image
                src="/mail-sent.svg"
                width={250}
                height={250}
                alt="An illustration of a mailbox"
                className="object-contain"
              />
            </main>
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabaseClient = createPagesServerClient(context);

  const { data } = await supabaseClient.auth.getSession();
  const { session } = data;

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return { props: {} };
}

export default SignIn;
