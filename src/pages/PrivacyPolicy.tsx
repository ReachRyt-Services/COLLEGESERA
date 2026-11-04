import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/FAQ";

const PrivacyPolicy = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Content (8 Cols) */}
          <article className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
              <header className="mb-10 border-b border-slate-100 pb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Privacy Policy
                </h1>
                <p className="text-slate-500 font-medium">Last updated: November 21, 2025</p>
              </header>

              <div className="prose prose-slate prose-lg max-w-none hover:prose-a:text-orange-600 prose-a:transition-colors prose-headings:scroll-mt-28">
                <p>
                  Collegesera (College Sera) (“we”, “us”, “our”) operates <strong>https://www.collegesera.example</strong> (the “Site”) and related services.
                  This Privacy Policy explains what personal and non-personal information we collect, how we use it,
                  who we share it with, and the choices you have. By using the Site or our services you accept the practices described here.
                </p>

                <h2 id="scope">1. Scope & Applicability</h2>
                <p>
                  This Policy applies to information collected through our website, mobile sites, mobile apps, and any offline interactions with Collegesera
                  (for example, events or admissions assistance). It does not apply to other sites you may reach through links. Those sites will have their own privacy rules.
                </p>

                <h2 id="information-we-collect">2. Information We Collect</h2>

                <h3>a) Information you give us</h3>
                <ul>
                  <li>Contact details (name, email, mobile number).</li>
                  <li>Education and application details (school/college preferences, exam scores, course interest).</li>
                  <li>Account details (username, password) when you register.</li>
                  <li>Messages, feedback, chat transcripts, or content you submit (e.g., testimonials, reviews).</li>
                </ul>

                <h3>b) Information we collect automatically</h3>
                <p>
                  Technical data: IP address, device and browser type, operating system, pages visited, referrer, timestamps and click/usage data.
                  Cookies and similar technologies (see Cookies section).
                </p>

                <h3>c) Information from third parties</h3>
                <p>
                  Data from analytics and advertising partners (Google Analytics, ad networks), social logins, and education partners.
                  When you request college information, we may collect or receive additional data from partner institutions to process your request.
                </p>

                <h2 id="how-we-use">3. How We Use Your Information</h2>
                <p>We use information to:</p>
                <ul>
                  <li>Provide and personalize our services and recommendations.</li>
                  <li>Process applications, connect you with colleges, or pass leads to education partners when you request it.</li>
                  <li>Send transactional communications (confirmations, account notices) and marketing messages if you opt in.</li>
                  <li>Improve, analyse and secure the Site (fraud detection, analytics, debugging).</li>
                  <li>Comply with legal requirements and respond to lawful requests.</li>
                </ul>

                <h2 id="sharing">4. When and With Whom We Share Data</h2>
                <p>We may share your information with:</p>
                <ul>
                  <li>Colleges and education partners to fulfil your requests (e.g., enquiry or application forms). When you submit a request, you consent to that sharing.</li>
                  <li>Service providers who perform services on our behalf (hosting, email, payment processors, analytics, CRM).</li>
                  <li>Advertising partners and ad networks for targeted ads (subject to your cookie choices).</li>
                  <li>Legal and safety reasons: when required by law, to enforce our rights, or to protect safety.</li>
                  <li>Aggregated or de-identified information may be shared publicly or with partners (this cannot reasonably identify you).</li>
                </ul>
                <p><strong>We do not sell your personal information for money.</strong> If this changes, we will clearly notify you and provide opt-out choices.</p>

                <h2 id="cookies">5. Cookies & Tracking Technologies</h2>
                <p>
                  We use cookies, web beacons, pixels, local storage, and similar technologies to:
                </p>
                <ul>
                  <li>Remember your preferences, enable features, and keep you logged in.</li>
                  <li>Measure and analyze traffic and usage patterns.</li>
                  <li>Serve and measure targeted advertising.</li>
                </ul>
                <p>You can control cookies through your browser settings or our cookie banner; blocking some cookies may affect site functionality.</p>

                <h2 id="retention">6. Data Retention</h2>
                <p>
                  We keep your personal data only as long as necessary to provide services, for legitimate business purposes, legal compliance, or to resolve disputes.
                  Specific retention periods depend on the type of data and legal requirements. If you want data deleted, see “Your Rights” below.
                </p>

                <h2 id="security">7. Security</h2>
                <p>
                  We use reasonable organizational, technical, and administrative measures to protect your information (encryption in transit, access controls, secure servers).
                  No system is perfect—if we learn of a breach that creates a risk to you, we will follow applicable law and notify you as required.
                </p>

                <h2 id="children">8. Children’s Privacy</h2>
                <p>
                  Our Site is not intended for children under 13. We do not knowingly collect personal information from children under 13.
                  If we learn we have collected such data, we will delete it. If you believe your child provided us information, contact us.
                </p>

                <h2 id="rights">9. Your Rights & Choices</h2>
                <p>Depending on local law, you can:</p>
                <ul>
                  <li>Access, correct, update, or delete your personal data.</li>
                  <li>Opt out of marketing communications (use the unsubscribe link or email us).</li>
                  <li>Manage cookie preferences via our cookie banner or browser settings.</li>
                  <li>In some jurisdictions, request a copy of your data or object to certain processing.</li>
                </ul>
                <p>To exercise these rights, contact us at the address below. We may ask for verification before acting on sensitive requests.</p>

                <h2 id="transfers">10. International Transfers</h2>
                <p>
                  If you are located outside India, your information may be transferred to, stored, and processed in India or other countries where our service providers operate.
                  We take steps to ensure adequate protection when data is transferred cross-border.
                </p>

                <h2 id="thirdparty">11. Third-Party Links and Embedded Content</h2>
                <p>
                  Our Site may contain links, widgets, or embedded content from third parties. Those services have their own privacy notices and controls.
                  We are not responsible for their practices.
                </p>

                <h2 id="ads">12. Advertising & Analytics</h2>
                <p>
                  We work with third-party ad networks and analytics providers to understand usage and show relevant ads. These providers may collect data about your online activities over time and across sites.
                  To learn about and opt out of certain ad tracking, use the vendor opt-out tools (e.g., Google Ads Settings) or your browser settings.
                </p>

                <h2 id="changes">13. Changes to This Policy</h2>
                <p>
                  We may update this Policy to reflect changes in law, technology, or our services. We will post the revised Policy with a new “Last updated” date and, where required, obtain consent for significant changes.
                </p>

                <h2 id="contact">14. Contact / Data Protection Officer</h2>
                <p>
                  If you have questions, requests, or want to exercise your rights, contact us:
                </p>

                <div className="not-prose bg-slate-50 p-6 rounded-xl border border-slate-200 mt-4">
                  <strong className="block text-slate-900 mb-1">Collegesera Pvt Ltd</strong>
                  <span className="block text-slate-600 mb-2">Saravanampatti, Coimbatore</span>
                  <a className="text-orange-600 font-medium hover:underline" href="mailto:support@collegesera.com">support@collegesera.com</a>
                </div>

                <p className="mt-4 text-sm text-slate-500">We aim to respond to data requests within a reasonable time and in line with applicable law.</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">On this page</h3>
                  <nav className="flex flex-col gap-2.5 text-sm">
                    <a href="#information-we-collect" className="text-slate-600 hover:text-orange-600 transition-colors">2. Information We Collect</a>
                    <a href="#how-we-use" className="text-slate-600 hover:text-orange-600 transition-colors">3. How We Use</a>
                    <a href="#sharing" className="text-slate-600 hover:text-orange-600 transition-colors">4. When We Share</a>
                    <a href="#cookies" className="text-slate-600 hover:text-orange-600 transition-colors">5. Cookies</a>
                    <a href="#retention" className="text-slate-600 hover:text-orange-600 transition-colors">6. Data Retention</a>
                    <a href="#security" className="text-slate-600 hover:text-orange-600 transition-colors">7. Security</a>
                    <a href="#rights" className="text-slate-600 hover:text-orange-600 transition-colors">9. Your Rights</a>
                    <a href="#contact" className="text-slate-600 hover:text-orange-600 transition-colors">14. Contact</a>
                  </nav>
                </CardContent>
              </Card>

              <Card className="bg-blue-600 text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2">My Data Rights</h4>
                  <p className="text-white/90 text-sm mb-4">
                    Want to access, correct, or delete your data? You can submit an official request.
                  </p>
                  <a href="mailto:support@collegesera.com">
                    <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none font-semibold">
                      Submit Request
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      <FAQ items={[
        { question: "What data does Collegesera collect?", answer: "We collect your contact details, education history, and application preferences when you register or submit an enquiry. We also collect some technical data via cookies." },
        { question: "Do you sell my data?", answer: "No, we do not sell your personal data to third parties. We only share it with educational partners to fulfill your specific admission requests." },
        { question: "Can I delete my account?", answer: "Yes, you can request account deletion by emailing support@collegesera.com from your registered email address." },
        { question: "How is my payment information secured?", answer: "We use industry-standard encryption and trusted payment gateways. We do not store your raw credit card information on our servers." }
      ]} />

      <Footer />
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  );
};

export default PrivacyPolicy;
