import Head from "next/head";
import Link from "next/link";
import Confetti from "react-confetti";
import Footer from "../components/footer";

export default function Home({ users }) {
  return (
    <>
      {typeof window !== "undefined" && (
        <Confetti recycle={false} gravity={0.2} numberOfPieces={1000} />
      )}
      <main>
        <Head>
          <title>On-demand ISR Demo</title>
          <meta
            name="description"
            content="A demo of on-demand incremental static regeneration with Vercel, Svix, and Clerk"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pt-16 mx-auto max-w-7xl px-4 sm:pt-16 text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-indigo-700 sm:text-5xl md:text-6xl">
            Success!
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Svix just sent a webhook to rebuild the list of recent sign ups.
          </p>
          <div className="mt-5 flex justify-center space-x-4">
            <a
              href="/"
              className="rounded-md shadow px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              See recent sign ups
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
