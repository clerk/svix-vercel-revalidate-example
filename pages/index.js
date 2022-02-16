import Head from "next/head";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import clerk from "@clerk/clerk-sdk-node";

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  // More people...
];

export async function getStaticProps(context) {
  const users = (
    await clerk.users.getUserList({
      orderBy: "-created_at",
      limit: 10,
    })
  ).map((u) => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    profileImageUrl: u.profileImageUrl,
    createdAt: u.createdAt,
  }));
  return {
    props: { users }, // will be passed to the page component as props
  };
}

export default function Home({ users }) {
  console.log(users);
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-indigo-700 sm:text-5xl md:text-6xl">
          Recent sign ups
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          This static page is served directly from Vercel&apos;s Edge Network.
          It is automatically rebuilt every time a user signs up or deletes
          their account.
        </p>
        <div className="mt-5 flex justify-center">
          <SignUpButton>
            <button className="rounded-md shadow px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              Sign up
            </button>
          </SignUpButton>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <ul
          role="list"
          className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
        >
          {users.map((u) => (
            <li key={u.id}>
              <div className="space-y-4">
                <img
                  className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"
                  src={u.profileImageUrl}
                  alt={`${u.firstName} ${u.lastName} profile image`}
                />
                <div className="space-y-2">
                  <div className="text-xs font-medium lg:text-sm">
                    <h3>
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
  );
}
