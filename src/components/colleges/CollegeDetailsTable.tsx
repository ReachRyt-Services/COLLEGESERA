import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Mail, Phone, MapPin, Building, User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CollegeDetailsData {
  id: string;
  college_id: string;
  slug: string;
  name: string;
  principalName?: string;
  address?: string;
  email?: string;
  website?: string;
  phone?: string;
}

interface CollegeDetailsTableProps {
  colleges: CollegeDetailsData[];
}

const CollegeDetailsTable: React.FC<CollegeDetailsTableProps> = ({ colleges }) => {
  const handleWebsiteClick = (college: CollegeDetailsData) => {
    // Remove numeric identifier prefix to keep URLs clean
    const cleanedSlug = college.slug.replace(/^\d+-/, '');
    const url = `https://collegesera.com/college/${cleanedSlug}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  const handleEmailClick = (email: string) => {
    if (!email) return;
    if (typeof window !== "undefined") {
      window.open(`mailto:${email}`, "_blank");
    }
  };

  const handlePhoneClick = (phone: string) => {
    if (!phone) return;
    if (typeof window !== "undefined") {
      window.open(`tel:${phone}`, "_blank");
    }
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-white hover-lift">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg p-4 flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            <CardTitle className="text-xl font-bold font-poppins">
              College Details Directory
            </CardTitle>
          </div>
          <p className="text-blue-100 mt-1 text-sm">Comprehensive information about colleges.</p>
        </div>
        {/* TODO: Link this button to the database to download the brochure */}
        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
          <Download className="w-4 h-4 mr-2" />
          Download Brochure
        </Button>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-16 font-semibold text-gray-700">No.</TableHead>
                <TableHead className="min-w-[250px] font-semibold text-gray-700">College Name</TableHead>
                <TableHead className="min-w-[180px] font-semibold text-gray-700">Principal</TableHead>
                <TableHead className="min-w-[200px] font-semibold text-gray-700">Address</TableHead>
                <TableHead className="min-w-[200px] font-semibold text-gray-700">Email</TableHead>
                <TableHead className="min-w-[150px] font-semibold text-gray-700">Website</TableHead>
                <TableHead className="min-w-[140px] font-semibold text-gray-700">Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colleges.map((college, index) => (
                <TableRow 
                  key={college.id} 
                  className="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100"
                >
                  <TableCell className="font-medium text-gray-600 bg-gray-50">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm">
                      {index + 1}
                    </div>
                  </TableCell>
                  
                  <TableCell className="font-semibold text-gray-800">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{college.name}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-gray-700">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm">{college.principalName || "N/A"}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-gray-700">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} className="mt-1 text-orange-500 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{college.address || "N/A"}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {college.email ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEmailClick(college.email)}
                        className="p-2 h-auto text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <Mail size={14} className="mr-2" />
                        <span className="text-sm">{college.email}</span>
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">N/A</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {college.website ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWebsiteClick(college)}
                        className="p-2 h-auto text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        <span className="text-sm truncate max-w-[120px]">{college.website}</span>
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">N/A</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    {college.phone ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePhoneClick(college.phone)}
                        className="p-2 h-auto text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <Phone size={14} className="mr-2" />
                        <span className="text-sm">{college.phone}</span>
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {colleges.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No college data available</p>
            <p className="text-gray-400 text-sm">Please check back later for updates</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollegeDetailsTable;
