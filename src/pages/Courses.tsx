
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

const Courses = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedCourseGroups, setSelectedCourseGroups] = useState<string[]>([]);

  const courses = [
    {
      id: 1,
      name: "B.Des. in Textile Design",
      type: "B.Des",
      level: "Degree",
      collegesAvailable: "18+",
      mode: "Full Time"
    },
    {
      id: 2,
      name: "M.Sc. in Neuroscience",
      type: "M.Sc.",
      level: "Degree",
      collegesAvailable: "3+",
      mode: "Full Time"
    },
    {
      id: 3,
      name: "MD in Psychiatry",
      type: "MD",
      level: "Degree",
      collegesAvailable: "122+",
      mode: "Full Time"
    },
    {
      id: 4,
      name: "Ph.D. in Neuroscience",
      type: "Ph.D.",
      level: "Degree",
      collegesAvailable: "1+",
      mode: "Full Time"
    },
    {
      id: 5,
      name: "Master of Management Studies (MMS)",
      type: "MMS",
      level: "Degree",
      collegesAvailable: "21+",
      mode: "Full Time"
    },
    {
      id: 6,
      name: "BAMS - Bachelor of Ayurvedic Medicine and Surgery",
      type: "B.A.M.S.",
      level: "Degree",
      collegesAvailable: "33+",
      mode: "Full Time"
    },
    {
      id: 7,
      name: "B.Des. in Product Design",
      type: "B.Des",
      level: "Degree",
      collegesAvailable: "49+",
      mode: "Full Time"
    }
  ];

  const streams = [
    { name: "Animation", count: 6 },
    { name: "Architecture", count: 2 },
    { name: "Arts", count: 10 },
    { name: "Aviation", count: 1 },
    { name: "Beauty & Fitness", count: 5 },
    { name: "Commerce", count: 32 }
  ];

  const courseGroups = [
    { name: "After 10th Diploma", count: 23 },
    { name: "B.A.", count: 26 },
    { name: "B.A. LL.B.", count: 1 },
    { name: "B.A. LL.B. (Hons)", count: 1 },
    { name: "B.A.M.S.", count: 2 }
  ];

  const handleStreamChange = (streamName: string) => {
    setSelectedStreams(prev => 
      prev.includes(streamName) 
        ? prev.filter(s => s !== streamName)
        : [...prev, streamName]
    );
  };

  const handleCourseGroupChange = (groupName: string) => {
    setSelectedCourseGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(g => g !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm text-gray-600">
            Home / Courses
          </div>
        </div>
      </div>

      {/* CV Builder Banner */}
      <div className="bg-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Easily build your own CV</h3>
                <p className="text-gray-600">Create professional resumes in minutes</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Open</Button>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-orange-50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            Top Courses - Admission, Courses and Fees
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Total Courses (604 results)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filter</h3>
                  <button className="text-orange-500 text-sm">Reset</button>
                </div>

                {/* Streams Filter */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Streams</h4>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <Input 
                    placeholder="Search" 
                    className="mb-3"
                  />
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {streams.map((stream) => (
                      <label key={stream.name} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStreams.includes(stream.name)}
                          onChange={() => handleStreamChange(stream.name)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{stream.name} ({stream.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Course Groups Filter */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Course Groups</h4>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <Input 
                    placeholder="Search" 
                    className="mb-3"
                  />
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {courseGroups.map((group) => (
                      <label key={group.name} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCourseGroups.includes(group.name)}
                          onChange={() => handleCourseGroupChange(group.name)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{group.name} ({group.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses List */}
          <div className="lg:col-span-3 space-y-4">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>{course.type} | {course.level}</span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div>
                          <span className="text-gray-600">Colleges Available: </span>
                          <span className="font-semibold text-blue-600">{course.collegesAvailable}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Mode: </span>
                          <span className="font-semibold">{course.mode}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="border-blue-600 text-blue-600">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

export default Courses;
