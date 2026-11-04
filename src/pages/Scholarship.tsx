import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitLeadForm } from "@/services/crmService";
import { BookOpen, MapPin, GraduationCap, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Scholarship = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        course: "",
        city: "",
        courseType: "regular", // online or regular
        notes: ""
    });
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAgreed) {
            toast({
                title: "Terms Required",
                description: "Please accept the terms and conditions to proceed.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await submitLeadForm({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                course: `${formData.course} (${formData.courseType})`,
                source: 'scholarship_page',
                notes: formData.notes
            });

            toast({
                title: "Application Submitted",
                description: "Our scholarship team will contact you shortly.",
            });

            setFormData({ name: "", email: "", phone: "", course: "", city: "", courseType: "regular", notes: "" });
            setIsAgreed(false);
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <SEO
                title="Scholarship Application | CollegeSera"
                description="Apply for scholarships at top colleges in India. Get financial aid guidance and support."
            />
            <Header />

            <div className="pt-28 pb-20 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-50 to-transparent -z-10" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                                <GraduationCap className="w-4 h-4" /> Scholarship Program
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                                Unlock Your Future with <span className="text-orange-600">Financial Aid</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                                Don't let financial constraints hold you back. Apply for exclusive scholarships at India's top-rated universities and secure your dream career.
                            </p>

                            <div className="space-y-4 pt-4">
                                {[
                                    "Up to 100% tuition waiver for meritorious students",
                                    "Easy application process with expert guidance",
                                    "Available for Engineering, Management, and Medical courses"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="bg-white p-1 rounded-full shadow-sm text-green-500 mt-0.5">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Form Card */}
                        <div className="w-full max-w-md mx-auto lg:ml-auto animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
                            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative group hover:shadow-2xl transition-all duration-300">
                                {/* Decorative top gradient */}
                                <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

                                <div className="p-8">
                                    <div className="text-center mb-8">
                                        <div className="inline-block p-3 rounded-xl bg-orange-50 mb-3 group-hover:bg-orange-100 transition-colors">
                                            <img src="/CollegeseraLogo.png" alt="CollegeSera" className="h-8 md:h-10 mx-auto" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900">Scholarship Application</h2>
                                        <p className="text-slate-500 text-sm mt-1">Fill in your details to check eligibility</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="s-name" className="text-xs font-semibold uppercase text-slate-500">Full Name <span className="text-red-500">*</span></Label>
                                            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-11" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="s-email" className="text-xs font-semibold uppercase text-slate-500">Email ID <span className="text-red-500">*</span></Label>
                                            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-11" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="s-phone" className="text-xs font-semibold uppercase text-slate-500">Contact Number <span className="text-red-500">*</span></Label>
                                            <div className="flex">
                                                <div className="h-11 px-3 bg-slate-100 border border-slate-200 border-r-0 rounded-l-md flex items-center text-sm font-medium text-slate-600">IN (+91)</div>
                                                <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="bg-slate-50 border-slate-200 focus:bg-white transition-all h-11 rounded-l-none" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-semibold uppercase text-slate-500">Course <span className="text-red-500">*</span></Label>
                                                <Select onValueChange={(val) => handleSelectChange('course', val)}>
                                                    <SelectTrigger className="h-11 bg-slate-50 border-slate-200">
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white z-50">
                                                        <SelectItem value="B.E/B.Tech">B.E/B.Tech</SelectItem>
                                                        <SelectItem value="Arts">Arts</SelectItem>
                                                        <SelectItem value="MBBS">MBBS</SelectItem>
                                                        <SelectItem value="Paramedical">Paramedical</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs font-semibold uppercase text-slate-500">City <span className="text-red-500">*</span></Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                                    <Input id="city" value={formData.city} onChange={handleChange} placeholder="City" required className="pl-9 h-11 bg-slate-50 border-slate-200" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="notes" className="text-xs font-semibold uppercase text-slate-500">Additional Notes</Label>
                                            <Textarea
                                                id="notes"
                                                value={formData.notes}
                                                onChange={handleChange}
                                                placeholder="Any specific requirements or questions?"
                                                className="bg-slate-50 border-slate-200 focus:bg-white transition-all min-h-[80px]"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-semibold uppercase text-slate-500">Course Type <span className="text-red-500">*</span></Label>
                                            <div className="flex bg-slate-100 p-1 rounded-lg">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, courseType: 'regular' }))}
                                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.courseType === 'regular' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                                >
                                                    Regular
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, courseType: 'online' }))}
                                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${formData.courseType === 'online' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                                >
                                                    Online
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 pt-2">
                                            <Checkbox
                                                id="s-terms"
                                                checked={isAgreed}
                                                onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                                                className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                            />
                                            <Label htmlFor="s-terms" className="text-xs text-slate-500 leading-snug cursor-pointer">
                                                By submitting this form, you accept and agree to our <span className="text-orange-600 hover:underline">Terms and Conditions</span> and <span className="text-orange-600 hover:underline">Privacy Policy</span>.
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold h-12 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            {isSubmitting ? "Submitting Application..." : "Check Eligibility Now"}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Scholarship;
