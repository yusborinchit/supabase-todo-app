import LogInForm from "@/components/ui/log-in-form";
import Logo from "@/components/ui/logo";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

function LogIn() {
  const router = useRouter();

  const handleSuccess = () => {
    return router.push("/");
  };

  return (
    <>
      <Head>
        <title>Supabase Todo App | Log In</title>
      </Head>

      <div className="flex flex-col justify-center h-screen max-w-sm mx-auto">
        <header className="flex flex-col mx-auto">
          <div className="mx-auto">
            <Logo />
          </div>
          <p className="text-3xl font-black">
            Welcome back<span className="text-blue-500">!</span>
          </p>
        </header>
        <main>
          <LogInForm onSuccess={handleSuccess} />
        </main>
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

export default LogIn;
