import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/sonner";
import { User, GraduationCap, MapPin, CalendarDays, DollarSign, ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";

const OnboardingForm = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    country: "",
    program: "",
    start_quarter: "",
    budget_range: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = step === 1
    ? formData.full_name.trim() && formData.country.trim() && formData.program
    : formData.start_quarter && formData.budget_range;

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name.trim(),
          country: formData.country.trim(),
          program: formData.program,
          start_quarter: formData.start_quarter,
          budget_range: formData.budget_range,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      setCompleted(true);
      toast.success("Profile saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (completed) {
    return (
      <section className="py-12 sm:py-16">
        <div className="container max-w-2xl">
          <Card className="border-primary/20 shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-primary to-accent" />
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">My Husky Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4 pb-8">
              <p className="text-lg text-foreground">
                Welcome <span className="font-bold text-primary">{formData.full_name}</span>! 🎉
              </p>
              <p className="text-muted-foreground text-base">
                We are preparing your tailored guide for{" "}
                <span className="font-semibold text-foreground">{formData.program}</span> in{" "}
                <span className="font-semibold text-foreground">{formData.start_quarter}</span>...
              </p>
              <div className="pt-4 flex justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.15s" }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container max-w-lg">
        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-accent" />
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Step {step} of 2</span>
              <span className="text-sm font-medium text-primary">{step === 1 ? "50%" : "100%"}</span>
            </div>
            <Progress value={step === 1 ? 50 : 100} className="h-2" />
            <CardTitle className="text-xl sm:text-2xl mt-4">
              {step === 1 ? "Tell us about you" : "Logistics"}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? "Help us personalize your Husky experience"
                : "A few more details to tailor your guide"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pb-8">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> Full Name
                  </Label>
                  <Input
                    id="full_name"
                    placeholder="e.g. Alex Kim"
                    value={formData.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="e.g. South Korea"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" /> Program
                  </Label>
                  <Select value={formData.program} onValueChange={(v) => handleChange("program", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate (Masters)">Graduate (Masters)</SelectItem>
                      <SelectItem value="Graduate (PhD)">Graduate (PhD)</SelectItem>
                      <SelectItem value="Exchange Student">Exchange Student</SelectItem>
                      <SelectItem value="English Language Program">English Language Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" /> Start Quarter
                  </Label>
                  <RadioGroup value={formData.start_quarter} onValueChange={(v) => handleChange("start_quarter", v)} className="grid grid-cols-2 gap-3">
                    {["Autumn 2026", "Winter 2027", "Spring 2027", "Summer 2027"].map((q) => (
                      <Label
                        key={q}
                        htmlFor={q}
                        className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                          formData.start_quarter === q ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem value={q} id={q} />
                        <span className="text-sm">{q}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" /> Monthly Budget Range
                  </Label>
                  <RadioGroup value={formData.budget_range} onValueChange={(v) => handleChange("budget_range", v)} className="space-y-2">
                    {["Under $1,000", "$1,000 – $1,500", "$1,500 – $2,000", "Over $2,000"].map((b) => (
                      <Label
                        key={b}
                        htmlFor={b}
                        className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                          formData.budget_range === b ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem value={b} id={b} />
                        <span className="text-sm">{b}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-2">
              {step === 2 && (
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              )}
              {step === 1 ? (
                <Button className="flex-1" disabled={!canProceed} onClick={() => setStep(2)}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="flex-1" disabled={!canProceed || submitting} onClick={handleSubmit}>
                  {submitting ? "Saving..." : <>Complete <Check className="h-4 w-4 ml-1" /></>}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OnboardingForm;
