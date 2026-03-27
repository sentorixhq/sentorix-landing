import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { HowItWorks } from "@/components/how-it-works";
import { ValueProps } from "@/components/value-props";
import { SocialProof } from "@/components/social-proof";
import { ForDevelopers } from "@/components/for-developers";
import { DemoForm } from "@/components/demo-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <ValueProps />
        <SocialProof />
        <ForDevelopers />
        <DemoForm />
      </main>
      <Footer />
    </>
  );
}
