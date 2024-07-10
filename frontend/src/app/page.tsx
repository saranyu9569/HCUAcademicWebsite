import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex max-h-screen items-center justify-center">
      <div>
        <div className="flex flex-col gap-10 pt-40 md:flex-row">
          <Link href="/Academic2">
            <button className="bg-orangered hover:bg-red-800 hover:ease-in duration-300 rounded-md p-4 md:w-40">
              <h1 className="text-2xl text-white text-center">สพว.2</h1>
            </button>
          </Link>

          <Link href="/Academic3">
            <button className="bg-orangered hover:bg-red-800 hover:ease-in duration-300 rounded-md p-4 md:w-40">
              <h1 className="text-2xl text-white text-center">สพว.3</h1>
            </button>
          </Link>
        </div>

        <div className="flex flex-col gap-10 pt-10 md:flex-row">
          <Link href="/Academic5">
            <button className="bg-orangered hover:bg-red-800 hover:ease-in duration-300 rounded-md p-4 md:w-40">
              <h1 className="text-2xl text-white text-center">สพว.5</h1>
            </button>
          </Link>

          <Link href="/Academic">
            <button className="bg-orangered hover:bg-red-800 hover:ease-in duration-300 rounded-md p-4 md:w-40">
              <h1 className="text-2xl text-white text-center">สพว.6</h1>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
