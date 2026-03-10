import { Shield, Lock, Eye, Server, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const currentDate = "March 2026";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        <div className="container max-w-3xl py-12 md:py-16">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {currentDate}</p>
          </div>

          {/* Content */}
          <div className="space-y-10">
            {/* Introduction */}
            <section className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Husky Helper. We are committed to protecting your privacy and ensuring 
                that your personal information is handled in a safe and responsible manner. This Privacy 
                Policy explains how we collect, use, and safeguard your information when you use our website.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Information We Collect</h2>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground mb-4">
                  We collect minimal information to provide you with the best experience:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Account Information:</strong> Email address and profile information you provide when creating an account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Chat Conversations:</strong> Messages you send to our AI assistant are stored to provide context for your conversations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Usage Data:</strong> Anonymous analytics about how you interact with our features to improve our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>IP Address:</strong> For guest users, we track IP addresses to prevent abuse of our services</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <Server className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">How We Use Your Information</h2>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground mb-4">We use your information to:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Provide and maintain our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Save your chat history and preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Improve our AI assistant's responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Send you important updates about our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Prevent abuse and ensure security</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Data Security</h2>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information. Your data is stored securely using industry-standard encryption 
                  and access controls. Chat messages are associated with your account and protected by 
                  authentication requirements.
                </p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Third-Party Services</h2>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground leading-relaxed">
                  We use trusted third-party services to power our platform:
                </p>
                <ul className="space-y-3 text-muted-foreground mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Supabase (database and authentication)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Anthropic Claude API (AI responses)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Google OAuth (optional login)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Lovable Cloud (hosting)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <p className="text-xs text-muted-foreground/60 text-center mb-6">
                Husky Helper is a student project and is not an official University of Washington service.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Your Rights</h2>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Access your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Delete your account and associated data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Export your chat conversations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Opt-out of non-essential communications</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Contact Us</h2>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border/50">
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or how we handle your data, 
                  please contact us at{" "}
                  <a 
                    href="mailto:wxy95929@uw.edu" 
                    className="text-primary hover:underline"
                  >
                    wxy95929@uw.edu
                  </a>
                </p>
              </div>
            </section>

            {/* Back to Home */}
            <div className="pt-6 text-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;