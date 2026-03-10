import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container max-w-2xl py-12 md:py-16">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            ← Back to Husky Helper
          </Link>

          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy — Husky Helper</h1>
          <p className="text-muted-foreground mb-10">Last updated: March 2026</p>

          {/* Content */}
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-2">What We Collect</h2>
              <p className="text-muted-foreground">
                Email address and profile preferences (name, country, program, budget, enrollment quarter) 
                to personalize your experience. Chat history for logged-in users only. IP address is 
                automatically recorded by our hosting infrastructure for security purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">What We Do NOT Collect</h2>
              <p className="text-muted-foreground">
                SSN, passport numbers, payment information, location data, or UW academic records.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">How We Use Your Data</h2>
              <p className="text-muted-foreground">
                To personalize AI responses and save your chat history. Nothing else.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">We Never Sell Your Data</h2>
              <p className="text-muted-foreground">
                Your information is never sold, rented, or shared with third parties for commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Data Security</h2>
              <p className="text-muted-foreground">
                Your data is stored securely using industry-standard encryption. Chat history is protected 
                by authentication and only accessible to you.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Third-Party Services</h2>
              <p className="text-muted-foreground">
                Supabase (database and authentication), Anthropic Claude API (AI responses), Google OAuth (optional login), Lovable Cloud (hosting).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Delete Your Data</h2>
              <p className="text-muted-foreground">
                Contact <a href="mailto:wxy95929@uw.edu" className="text-primary hover:underline">wxy95929@uw.edu</a> to request deletion of your account and all associated data.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> Husky Helper is a student project and is not an official UW service.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;