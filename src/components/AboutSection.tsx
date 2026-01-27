import { Users, Heart, MessageCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-purple-light">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-responsive-lg font-bold mb-4">
              Made by Huskies, for Huskies
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              We know how overwhelming it can be to start fresh in a new country. 
              That's why we created this guide.
            </p>
          </div>

          {/* Stats/Values */}
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-12">
            <div className="text-center p-5 sm:p-6 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">By Students</h3>
              <p className="text-sm text-muted-foreground">
                Created by international students who've been through it all
              </p>
            </div>
            <div className="text-center p-5 sm:p-6 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light mx-auto mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Recommendations based on real experiences and feedback
              </p>
            </div>
            <div className="text-center p-5 sm:p-6 bg-card rounded-2xl shadow-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Always Updated</h3>
              <p className="text-sm text-muted-foreground">
                Fresh tips and information added regularly
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-card shadow-card border border-border/50">
            <p className="text-muted-foreground mb-4">
              Have tips to share or suggestions for improvement?
            </p>
            <a 
              href="mailto:uwsurvivalguide@uw.edu" 
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              Get in touch with us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
