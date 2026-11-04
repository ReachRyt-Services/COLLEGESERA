
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ExamsSection = () => {
  const exams = [
    {
      id: 1,
      name: "Integral University Entrance Tes... (IUET)",
      description: "Conducted by Integral University for UG and PG admissions across various disciplines.",
      level: "National Wise",
      applicationDate: "-",
      examDate: "-",
      duration: "90 min",
      logo: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=60&h=60&fit=crop",
      type: "Online"
    },
    {
      id: 2,
      name: "Andhra University Common Entranc... (AUCET PG 2025)",
      description: "Andhra University's exam for PG admissions in science, arts, and commerce.",
      level: "National Wise",
      applicationDate: "-",
      examDate: "-",
      duration: "105 min",
      logo: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=60&h=60&fit=crop",
      type: "Online"
    },
    {
      id: 3,
      name: "Post Graduate Institute of Medic... (PGIMER 2025)",
      description: "Entrance exam for PG medical courses like MD, MS, and allied health programs.",
      level: "National Wise",
      applicationDate: "-",
      examDate: "Jul 25, 2025",
      duration: "180 min",
      logo: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=60&h=60&fit=crop",
      type: "Online"
    },
    {
      id: 4,
      name: "National Eligibility cum Entranc... (Neet PG 2025)",
      description: "National exam for admissions to MD, MS, and PG Diploma courses in medical institutions.",
      level: "National Wise",
      applicationDate: "-",
      examDate: "Jun 15, 2025",
      duration: "210 min",
      logo: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=60&h=60&fit=crop",
      type: "Computer-based test"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Upcoming <span className="text-orange-500">Exams</span>
          </h2>
          <Button variant="ghost" className="text-orange-500 hover:text-orange-600">
            View more
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    exam.type === "Online" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }`}>
                    • {exam.type}
                  </span>
                </div>
                
                <div className="flex items-start space-x-3 mb-4">
                  <img
                    src={exam.logo}
                    alt={exam.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg leading-tight mb-2">
                      {exam.name}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {exam.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Level</span>
                    <span className="font-medium">{exam.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Date</span>
                    <span className="font-medium">{exam.applicationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Date</span>
                    <span className="font-medium">{exam.examDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exam Duration</span>
                    <span className="font-medium">{exam.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamsSection;
