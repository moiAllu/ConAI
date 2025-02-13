import HeroPage from "@/components/home";
import Footer from "@/components/home/footer";
import { Navbar } from "@/components/navbar/NavBar";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="w-full h-full">
      <Navbar />
      <div className="w-full h-full lg:mx-auto lg:container">
        <div className="justify-center items-center flex">
          <Suspense fallback={<Image src="/loading.gif" alt="loading" />}>
            <HeroPage />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
}
