import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLeadForm } from "@/services/crmService";

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserForm = ({ isOpen, onClose }: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    course: "",
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      onClose();
      setFormData({
        name: "",
        phone_number: "",
        email: "",
        course: "",
        city: "",
      });
      setIsAgreed(false);
    } catch (err) {
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          sm:max-w-xl 
          bg-white 
          p-0 
          rounded-2xl 
          shadow-2xl 
          border border-orange-100
        "
      >
        {/* HEADER */}
        <div className="bg-orange-50 px-8 py-6 border-b border-orange-100">
          <DialogHeader className="text-center">
            <img
              src="/CollegeseraLogo.png"
              className="h-14 mx-auto mb-2"
              alt="CollegeSera Logo"
            />
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Get Expert Guidance
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              Fill the form and our admission expert will contact you shortly.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* FORM BODY */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  placeholder="9876543210"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Input
                  id="course"
                  placeholder="B.Tech, MBA, Nursing..."
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Coimbatore, Chennai, Bangalore..."
                value={formData.city}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="terms"
                checked={isAgreed}
                onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                className="mt-1 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
              />
              <Label htmlFor="terms" className="text-xs text-slate-500 leading-tight cursor-pointer">
                By submitting this form, you accept and agree to our <span className="text-orange-600 font-medium">Terms and Conditions</span> and <span className="text-orange-600 font-medium">Privacy Policy</span>.
              </Label>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <DialogFooter>
              <Button
                type="submit"
                className="
                  w-full 
                  h-11 
                  bg-orange-500 
                  hover:bg-orange-600 
                  text-white 
                  font-semibold
                  rounded-lg
                "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Now"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
