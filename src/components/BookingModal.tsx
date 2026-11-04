import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLeadForm } from "@/services/crmService";
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If children are provided, render them, otherwise render default form
  children?: React.ReactNode;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, children }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    course: "",
    city: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      setError("Please agree to the Terms and Conditions to proceed.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      await submitLeadForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone_number,
        city: formData.city,
        course: formData.course
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({ name: "", phone_number: "", email: "", course: "", city: "" });
        setIsAgreed(false);
      }, 2000);
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10 p-1 bg-white/50 rounded-full"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {children ? (
          <div className="p-6">
            {children}
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-50 to-white px-8 py-6 border-b border-slate-100 text-center">
              <img src="/CollegeseraLogo.png" alt="CollegeSera" className="h-10 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-900">Book Your Seat Now!</h3>
              <p className="text-sm text-slate-500 mt-1">Free counseling from our experts</p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              {success ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Success!</h4>
                  <p className="text-slate-500">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium text-slate-600 uppercase tracking-wide">Full Name</Label>
                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="h-10 border-slate-200 focus:ring-orange-500" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone_number" className="text-xs font-medium text-slate-600 uppercase tracking-wide">Mobile Number</Label>
                    <Input id="phone_number" placeholder="+91 98765 43210" value={formData.phone_number} onChange={handleChange} required className="h-10 border-slate-200 focus:ring-orange-500" />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium text-slate-600 uppercase tracking-wide">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required className="h-10 border-slate-200 focus:ring-orange-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="course" className="text-xs font-medium text-slate-600 uppercase tracking-wide">Course</Label>
                      <Input id="course" placeholder="e.g. MBA" value={formData.course} onChange={handleChange} required className="h-10 border-slate-200 focus:ring-orange-500" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs font-medium text-slate-600 uppercase tracking-wide">City</Label>
                      <Input id="city" placeholder="e.g. Chennai" value={formData.city} onChange={handleChange} required className="h-10 border-slate-200 focus:ring-orange-500" />
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <Checkbox
                      id="terms"
                      checked={isAgreed}
                      onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                      className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                    />
                    <Label htmlFor="terms" className="text-xs text-slate-500 leading-tight cursor-pointer">
                      By submitting this form, I agree to the <span className="text-orange-600 font-medium">Terms and Conditions</span> and <span className="text-orange-600 font-medium">Privacy Policy</span>.
                    </Label>
                  </div>

                  {error && <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded">{error}</p>}

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 mt-2 rounded-xl shadow-lg shadow-orange-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Book Counselling Slot"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
