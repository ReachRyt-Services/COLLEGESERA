import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, HeartHandshake, Compass, ShieldCheck } from "lucide-react";
import FAQ from "@/components/FAQ";

const AboutUs = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold mb-4">About Collegesera</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Collegesera (College Sera) was created to solve a simple but frustrating problem: students often don’t
                get a clear, reality-based picture of what a college truly offers until it’s too late. 
                We built a platform that removes the guesswork—replacing scattered information and glossy 
                brochures with genuine insights, verified data, and student-first guidance.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                The company is led by <strong>Hari Raam Sivakumar</strong> and built by a 
                tight-knit engineering team from <strong>NIT</strong>, <strong>PSG</strong>, 
                and <strong>KCT</strong>. With a shared passion for clarity and student empowerment, 
                the team has crafted a product that is technically strong, fast, and deeply empathetic 
                to the challenges students face when choosing their future.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-1">50K+ Students</h3>
                  <p className="text-gray-600 text-sm">Guided every year</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-1">6000+ Colleges</h3>
                  <p className="text-gray-600 text-sm">Mapped & analysed</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-1">95% Success</h3>
                  <p className="text-gray-600 text-sm">In admissions guidance</p>
                </CardContent>
              </Card>
            </div>

            {/* What We Do */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">What We Do</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Collegesera helps students explore colleges, understand real academic environments, 
                compare placement outcomes, evaluate eligibility, and access personalised admission 
                guidance. Our goal is to make the entire decision-making journey more transparent, 
                grounded, and stress-free.
              </p>
            </section>

            {/* Vision */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To build a platform where every student can discover their ideal college through 
                clear insights, genuine guidance, and tools that simplify decisions—without bias, 
                clutter, or confusion.
              </p>
            </section>

            {/* Mission */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Mission</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Highlight real academic quality—not just popularity</li>
                <li>Match students to the right institutions based on goals and strengths</li>
                <li>Present college data in simple, comparative, meaningful formats</li>
                <li>Support students beyond research with personalised admission assistance</li>
                <li>Fight misinformation with clarity and verified data</li>
              </ul>
            </section>

            {/* Core Values */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Core Values</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  ["Authenticity", "Every detail is verified and presented honestly."],
                  ["Clarity", "We simplify complicated academic and admission information."],
                  ["Impact-Driven", "Every feature must help students choose better and faster."],
                  ["Respect for Choice", "We never push institutions—we empower decisions."],
                  ["Accountability", "We stand by the accuracy of our information."],
                  ["Empathy", "We design with care for students and parents under pressure."],
                  ["Precision", "Every insight is accurate, timely, and contextually relevant."],
                ].map(([title, desc], idx) => (
                  <Card key={idx}>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg mb-2">{title}</h3>
                      <p className="text-gray-600 text-sm">{desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR ADS */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-6 rounded-xl text-center shadow-md">
                  <h3 className="font-bold text-xl mb-2">🎓 Explore Colleges</h3>
                  <p className="text-sm opacity-90 mb-4">Compare placements, fees, rankings & more</p>
                  <button className="bg-white text-indigo-700 px-4 py-2 rounded font-semibold text-sm shadow">
                    Start Now
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-rose-500 to-rose-700 text-white p-6 rounded-xl text-center shadow-md">
                  <h3 className="font-bold text-xl mb-2">📘 Admission Guidance</h3>
                  <p className="text-sm opacity-90 mb-4">Get personalised support from experts</p>
                  <button className="bg-white text-rose-600 px-4 py-2 rounded font-semibold text-sm shadow">
                    Book Session
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FAQ items={[
        { question: "How does Collegesera verify its college data?", answer: "We collect data directly from the institutions, government bodies, and alumni. Our dedicated research team cross-verifies this information to ensure its accuracy." },
        { question: "Is your admission guidance service free?", answer: "Yes, our basic discovery and college matching platform is entirely free for students. We also offer premium personalized counseling services." },
        { question: "Can I apply to multiple colleges through Collegesera?", answer: "Yes, once you shortlist your preferred institutions, our platform allows you to apply to multiple colleges seamlessly." },
        { question: "How are the college rankings determined?", answer: "Rankings are based on a combination of NIRF scores, placement records, faculty strength, student reviews, and infrastructure." }
      ]} />

      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};

export default AboutUs;
