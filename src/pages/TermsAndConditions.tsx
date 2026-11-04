import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";

const TermsAndConditions = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content (8 cols) */}
          <article className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
              <header className="mb-10 border-b border-slate-100 pb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Terms & Conditions
                </h1>
                <p className="text-slate-500 font-medium">Last updated: November 21, 2025</p>
              </header>

              <div className="prose prose-slate prose-lg max-w-none hover:prose-a:text-orange-600 prose-a:transition-colors prose-headings:scroll-mt-28">
                <h2 id="acceptance">1. Acceptance of Terms</h2>
                <p>
                  By using the Collegesera website (“Site”) or any of our services, you agree to these Terms & Conditions. If you don’t agree, please stop using the Site.
                </p>

                <h2 id="about-service">2. About Our Service</h2>
                <p>
                  Collegesera provides information about colleges, courses, exams, admissions, career paths, counselling support, and related services. We do our best to keep information accurate, but colleges and institutions may update details without notifying us. Always verify directly with the institution before making decisions.
                </p>

                <h2 id="user-responsibilities">3. User Responsibilities</h2>
                <p>When you use our Site, you agree to:</p>
                <ul>
                  <li>Provide accurate information when creating an account or filling enquiry forms.</li>
                  <li>Not misuse the Site (no scraping, hacking, copying content, spamming, or interfering with the platform).</li>
                  <li>Use our services only for personal, non-commercial education-related purposes.</li>
                  <li>Not impersonate anyone or provide false documents/information.</li>
                </ul>
                <p>If you violate these rules, we may suspend or delete your account.</p>

                <h2 id="account-security">4. Account & Security</h2>
                <ul>
                  <li>Keep login details private.</li>
                  <li>You’re responsible for activity under your account.</li>
                  <li>Inform us immediately if you suspect unauthorized access.</li>
                  <li>We aren’t liable for losses caused by someone using your account without your knowledge.</li>
                </ul>

                <h2 id="information-submitted">5. Information You Submit</h2>
                <p>
                  You may submit information through enquiry forms, reviews, comments, or profile details. By submitting anything on Collegesera:
                </p>
                <ul>
                  <li>You grant us permission to use it for providing services (connecting you with colleges, processing requests, showing reviews, etc.).</li>
                  <li>You confirm the information is yours and accurate.</li>
                  <li>You confirm that sharing it does not violate any law or third-party rights.</li>
                  <li>We may edit or remove content if it violates these Terms.</li>
                </ul>

                <h2 id="communication-consent">6. Communication & Consent</h2>
                <p>
                  By using our Site and providing contact information, you consent to receive communications related to your requests and (if you opt-in) marketing and promotional messages. You can opt out of marketing communications at any time using the unsubscribe link or by contacting support.
                </p>

                <h2 id="third-party-links">7. Third-Party Institutions & Links</h2>
                <p>
                  Our Site links to colleges, partner institutions, and external websites. We are not responsible for:
                </p>
                <ul>
                  <li>Admission decisions or selection processes carried out by third parties.</li>
                  <li>Policies, fees, or updates made by colleges.</li>
                  <li>Any information, service, or action taken by third-party websites.</li>
                </ul>
                <p>Always read the policies of third-party sites you visit.</p>

                <h2 id="intellectual-property">8. Intellectual Property</h2>
                <p>
                  Everything on the Site — text, graphics, photos, videos, code, and branding — belongs to Collegesera or our licensors. You agree not to:
                </p>
                <ul>
                  <li>Copy or reproduce content without permission.</li>
                  <li>Use data mining, bots, or automated tools to extract information.</li>
                  <li>Sell or commercially use our content.</li>
                </ul>
                <p>You may use the Site for personal, educational research only.</p>

                <h2 id="lead-sharing">9. Lead Sharing & Partner Interaction</h2>
                <p>
                  When you request information or fill an enquiry form, your details may be shared with partner colleges, universities, counsellors, and education service providers. They may contact you to help with admissions or course details. We are not responsible for the outcome of your interactions with them — this is part of how our platform functions.
                </p>

                <h2 id="disclaimer">10. Disclaimer</h2>
                <p>
                  We provide information and tools on an “as is” basis. Collegesera does not guarantee:
                </p>
                <ul>
                  <li>Accuracy or completeness of college/course details.</li>
                  <li>Admissions, placements, scholarships, or outcomes.</li>
                  <li>That the Site will always be available or error-free.</li>
                </ul>
                <p>Use the information as guidance, not as a guaranteed source.</p>

                <h2 id="liability">11. Limitation of Liability</h2>
                <p>
                  Collegesera is not liable for loss of data, revenue, or opportunities, errors or delays in information, actions taken by colleges or third-party partners, or technical issues, downtime, or site errors. Your use of the Site is at your own discretion.
                </p>

                <h2 id="payments">12. Payments (If Applicable)</h2>
                <p>
                  If the Site later includes paid services, all payments will follow the pricing and refund rules listed at purchase. Fees paid to colleges or external platforms are not controlled by us and we are not responsible for refunds related to external institutions.
                </p>

                <h2 id="termination">13. Termination</h2>
                <p>
                  We may suspend or terminate your access if you violate these Terms, we detect fraudulent or harmful behaviour, or you misuse the platform or harm other users. You may also delete your account anytime by contacting us.
                </p>

                <h2 id="changes">14. Changes to These Terms</h2>
                <p>
                  We may update these Terms occasionally. If we make major changes, we’ll update the date above or notify users when required. Continuing to use the Site after updates means you accept the revised Terms.
                </p>

                <h2 id="governing-law">15. Governing Law</h2>
                <p>
                  These Terms are governed by the laws of India. Any disputes will fall under the jurisdiction of courts in Coimbatore, India.
                </p>

                <h2 id="contact">16. Contact Us</h2>
                <p>
                  For questions or concerns, reach us at:
                </p>
                <div className="not-prose bg-slate-50 p-6 rounded-xl border border-slate-200 mt-4">
                  <strong className="block text-slate-900 mb-1">Collegesera Pvt Ltd</strong>
                  <span className="block text-slate-600 mb-2">Saravanampatti, Coimbatore</span>
                  <a className="text-orange-600 font-medium hover:underline" href="mailto:support@collegesera.com">support@collegesera.com</a>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">On this page</h3>
                  <nav className="flex flex-col gap-2.5 text-sm">
                    <a href="#acceptance" className="text-slate-600 hover:text-orange-600 transition-colors">1. Acceptance of Terms</a>
                    <a href="#about-service" className="text-slate-600 hover:text-orange-600 transition-colors">2. About Our Service</a>
                    <a href="#user-responsibilities" className="text-slate-600 hover:text-orange-600 transition-colors">3. User Responsibilities</a>
                    <a href="#information-submitted" className="text-slate-600 hover:text-orange-600 transition-colors">5. Information You Submit</a>
                    <a href="#third-party-links" className="text-slate-600 hover:text-orange-600 transition-colors">7. Third-Party Links</a>
                    <a href="#lead-sharing" className="text-slate-600 hover:text-orange-600 transition-colors">9. Lead Sharing</a>
                    <a href="#contact" className="text-slate-600 hover:text-orange-600 transition-colors">16. Contact</a>
                  </nav>
                </CardContent>
              </Card>

              <Card className="bg-orange-600 text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                  <p className="text-white/90 text-sm mb-4">
                    If you have questions about these terms or your privacy, our team is here to assist you.
                  </p>
                  <a href="mailto:support@collegesera.com">
                    <Button variant="secondary" className="w-full bg-white text-orange-600 hover:bg-orange-50 border-none font-semibold">
                      Contact Support
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <FAQ items={[
        { question: "Is Collegesera an official admission portal?", answer: "No, we are an independent discovery platform. Admission decisions are solely made by the respective institutions." },
        { question: "Are all colleges listed on Collegesera partnered with you?", answer: "No, we list both partnered and non-partnered colleges to provide a comprehensive database for students. Partnered colleges simply allow for easier application routing." },
        { question: "What happens if a college rejects my application?", answer: "Collegesera is not responsible for admission rejections. We recommend checking specific college eligibility criteria carefully before applying." }
      ]} />

      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
};

export default TermsAndConditions;
