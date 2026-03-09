import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, GraduationCap, CalendarDays, DollarSign, Save, ArrowLeft, Info } from "lucide-react";

const generateQuarterOptions = () => {
  const quarters = ["Winter", "Spring", "Summer", "Autumn"];
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  let startIdx = month <= 3 ? 1 : month <= 6 ? 2 : month <= 8 ? 3 : 0;
  let y = month >= 9 ? year + 1 : year;
  const opts: string[] = [];
  for (let i = 0; i < 8; i++) {
    opts.push(`${quarters[startIdx]} ${y}`);
    startIdx++;
    if (startIdx > 3) { startIdx = 0; y++; }
  }
  opts.push("Already enrolled");
  return opts;
};

const ProfileSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    country: "",
    program: "",
    start_quarter: "",
    budget_range: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, country, program, start_quarter, budget_range")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!error && data) {
        setFormData({
          full_name: data.full_name || "",
          country: data.country || "",
          program: data.program || "",
          start_quarter: data.start_quarter || "",
          budget_range: data.budget_range || "",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          country: formData.country.trim(),
          program: formData.program,
          start_quarter: formData.start_quarter,
          budget_range: formData.budget_range,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const quarterOptions = generateQuarterOptions();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container max-w-2xl py-16 text-center text-muted-foreground">Loading...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-2xl py-10 sm:py-16">
        <Button variant="ghost" size="sm" className="mb-6 gap-1.5 text-muted-foreground" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <Card className="border-primary/20 shadow-lg overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary to-accent" />
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Edit Profile</CardTitle>
            <CardDescription>Update your information to get better personalized recommendations from HuskyGuide.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-8">
            {/* Display name (read-only) */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-muted-foreground">
                Name
              </Label>
              <p className="text-sm text-foreground font-medium">{formData.full_name || "Not set"}</p>
            </div>

            {/* Country */}
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

            {/* Program */}
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

            {/* Start Quarter */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> Start Quarter
              </Label>
              <RadioGroup
                value={formData.start_quarter}
                onValueChange={(v) => handleChange("start_quarter", v)}
                className="grid grid-cols-2 gap-3"
              >
                {quarterOptions.map((q) => (
                  <Label
                    key={q}
                    htmlFor={`profile-${q}`}
                    className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                      formData.start_quarter === q ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <RadioGroupItem value={q} id={`profile-${q}`} />
                    <span className="text-sm">{q}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Budget Range */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" /> Monthly Budget Range
              </Label>
              <RadioGroup
                value={formData.budget_range}
                onValueChange={(v) => handleChange("budget_range", v)}
                className="space-y-2"
              >
                {["Under $1,000", "$1,000 – $1,500", "$1,500 – $2,000", "Over $2,000"].map((b) => (
                  <Label
                    key={b}
                    htmlFor={`profile-budget-${b}`}
                    className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                      formData.budget_range === b ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <RadioGroupItem value={b} id={`profile-budget-${b}`} />
                    <span className="text-sm">{b}</span>
                  </Label>
                ))}
              </RadioGroup>
              <p className="flex items-start gap-1.5 text-xs text-muted-foreground mt-2">
                <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                Update this anytime as your financial situation changes.
              </p>
            </div>

            <Button className="w-full gap-2" onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileSettings;
