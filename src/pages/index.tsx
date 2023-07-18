import Logo from "@/components/ui/logo";
import TodosList from "@/components/ui/todos-list";
import { useAuth } from "@/hooks/use-auth";
import {
  createPagesServerClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

interface HomeProps {
  session?: Session;
}

function Home({ session }: HomeProps) {
  const { logOut } = useAuth();

  return (
    <>
      <Head>
        <title>YusborinTodo | Home</title>
      </Head>

      <header className="flex items-center max-w-lg p-4 mx-auto">
        <Logo />
        {!!session ? (
          <button
            onClick={() => logOut()}
            className="flex px-6 py-2 ml-auto text-sm font-bold text-white capitalize rounded bg-gradient-to-t from-blue-700 to-blue-500"
          >
            Log Out
          </button>
        ) : (
          <Link
            href="account/log-in"
            className="flex px-6 py-2 ml-auto text-sm font-bold text-white capitalize rounded bg-gradient-to-t from-blue-700 to-blue-500"
          >
            Log in
          </Link>
        )}
      </header>
      <main>
        <TodosList />
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabaseClient = createPagesServerClient(context);

  const { data } = await supabaseClient.auth.getSession();
  const { session } = data;

  return {
    props: {
      session: session,
    },
  };
}

export default Home;
