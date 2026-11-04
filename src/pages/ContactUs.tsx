import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, MessageSquare, Clock } from "lucide-react";

const ContactUs = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header (fixed) */}
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />

      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Contact Us</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We’re here to help you with questions about colleges, courses, or admissions.
            Reach out anytime, and we'll guide you on your education journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Main Contact Form (8 cols) */}
          <div className="lg:col-span-8">
            <Card className="border-none shadow-xl bg-white overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Send Us a Message</h2>
                    <p className="text-slate-500 text-sm">Fill out the form below and we'll get back to you shortly.</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" placeholder="+91 98765 43210" className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Admissions help, feedback..." className="h-11 bg-slate-50 border-slate-200 focus:bg-white" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      className="min-h-[150px] bg-slate-50 border-slate-200 focus:bg-white resize-y"
                    />
                  </div>

                  <Button className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg h-auto shadow-md transition-all hover:shadow-lg">
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Contact Details Card */}
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-orange-50 transition-colors group">
                      <div className="mt-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-orange-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Phone</p>
                        <p className="text-slate-900 font-medium">+91 63747 15327</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-orange-50 transition-colors group">
                      <div className="mt-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-orange-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Email</p>
                        <p className="text-slate-900 font-medium">business@collegesera.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-orange-50 transition-colors group">
                      <div className="mt-1 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-orange-600 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">Location</p>
                        <p className="text-slate-900 font-medium leading-relaxed">
                          Saravanampatti, Coimbatore,<br />Tamil Nadu, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-slate-900 text-sm">Response Time</h4>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                        We usually respond within 24 hours. For urgent matters, please mark your subject line with [URGENT].
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links / Promo Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1">Medical Admissions</h3>
                  <p className="text-blue-100 text-sm mb-4">Expert NEET counseling support.</p>
                  <Button variant="secondary" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-blue-600 backdrop-blur-sm">Learn More</Button>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src="/logo-symbol.png" className="w-32 h-32 transform rotate-12" alt="" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-1">Engineering Seats</h3>
                  <p className="text-green-100 text-sm mb-4">Top colleges admission guidance.</p>
                  <Button variant="secondary" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-green-600 backdrop-blur-sm">Get Details</Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default ContactUs;
