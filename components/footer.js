export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0">
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 mt-12">
          <div className="text-center grayscale grid grid-cols-3 gap-y-4 sm:flex sm:space-x-12 justify-center items-center">
            <p className="col-span-3 text-sm font-semibold uppercase text-gray-500 tracking-wide">
              Powered by
            </p>
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noreferrer"
              className="opacity-50"
            >
              <img
                className="mx-auto h-4 sm:h-6"
                src="/vercel.svg"
                alt="Tuple"
              />
            </a>
            <a
              href="https://www.svix.com?utm_source=vercel&amp;utm_medium=partner&amp;utm_campaign=vercel-campaign"
              target="_blank"
              rel="noreferrer"
              className="grayscale opacity-60"
            >
              <img
                className="mx-auto h-5 sm:h-7"
                src="/svix.svg"
                alt="Mirage"
              />
            </a>
            <a
              href="https://clerk.dev?utm_source=vercel&amp;utm_medium=partner&amp;utm_campaign=odisr"
              target="_blank"
              rel="noreferrer"
              className="grayscale opacity-75"
            >
              <img
                className="mx-auto h-5 sm:h-7"
                src="/clerk.svg"
                alt="StaticKit"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
