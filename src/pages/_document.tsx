import { Head, Html, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="en" className="antialiased scroll-smooth">
      <Head />
      <body className="text-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
