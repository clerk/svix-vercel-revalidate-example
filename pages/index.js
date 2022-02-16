import Head from "next/head";
import Image from "next/image";
import { ClerkLoaded, SignUpButton, SignedOut } from "@clerk/nextjs";
import clerk from "@clerk/clerk-sdk-node";
import Footer from "../components/footer";
import Avatar from "boring-avatars";

export async function getStaticProps(context) {
  const users = (
    await clerk.users.getUserList({
      orderBy: "-created_at",
      limit: 500,
    })
  ).map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    createdAt: u.createdAt,
  }));
  return {
    props: { users },
  };
}

export default function Home({ users }) {
  return (
    <>
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
            Recent sign ups
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            This static page is served directly from Vercel&apos;s Edge Network.
            It is automatically rebuilt with on-demand Incremental Static
            Regeneration every time a user signs up.
          </p>
          <div className="mt-5 flex justify-center space-x-4 h-[50px] md:h-[62px]">
            <ClerkLoaded>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.svix.com/blog/vercel-on-demand-isr-and-svix/?utm_source=vercel&utm_medium=partner&utm_campaign=vercel-campaign"
                className="rounded-md shadow px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                How it works
              </a>
              <SignedOut>
                <SignUpButton redirectUrl="/success">
                  <button className="rounded-md shadow px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Sign up
                  </button>
                </SignUpButton>
              </SignedOut>
            </ClerkLoaded>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:pt-16 pb-32">
          <ul
            role="list"
            className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
          >
            {users.map((u) => (
              <li key={u.id}>
                <div className="space-y-4">
                  <div className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24 avatar">
                    <Avatar
                      size={96}
                      className="test"
                      name={u.id}
                      variant="beam"
                      colors={[
                        "#D2FAE2",
                        "#E6F8B1",
                        "#F6D5AD",
                        "#F6B794",
                        "#E59DA0",
                      ]}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <h3 className="text-sm lg:text-base overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {u.firstName} {u.lastName}
                      </h3>
                      <p className="text-indigo-600">
                        {new Date(u.createdAt).toLocaleDateString() +
                          " " +
                          new Date(u.createdAt).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
