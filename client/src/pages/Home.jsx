import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
// import Pricing from "../components/home/Pricing";
import FAQ from "../components/home/FAQ";
import Footer from "../components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex flex-col font-sans antialiased text-primary selection:bg-accent/30 selection:text-primary">
      {/* Navigation Header */}
      <Navbar />
      
      {/* Main SaaS Sections */}
      <main className="flex-grow">
        <Hero />
        <Features />
        {/* <Pricing /> */}
        <FAQ />
      </main>
      
      {/* Page Footer */}
      <Footer />
    </div>
  );
}

