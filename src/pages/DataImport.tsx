
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataImport = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [csvData, setCsvData] = useState("");
  const [importYear, setImportYear] = useState(2024);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Query to check import status
  const { data: importStats } = useQuery({
    queryKey: ['import-stats'],
    queryFn: async () => {
      // This is a placeholder implementation.
      // You should replace this with your actual data fetching logic.
      return Promise.resolve({ total: 0, processed: 0, pending: 0 });
    }
  });

  // Mutation to import CSV data
  const importMutation = useMutation({
    mutationFn: async (data: { csvData: string; year: number }) => {
      // This is a placeholder implementation.
      // You should replace this with your actual data fetching logic.
      console.log('importMutation', { data });
      return Promise.resolve(0);
    },
    onSuccess: (count) => {
      toast({
        title: "Data Imported Successfully",
        description: `${count} rows imported to temporary table. Ready for processing.`,
      });
      queryClient.invalidateQueries({ queryKey: ['import-stats'] });
      setCsvData("");
    },
    onError: (error) => {
      toast({
        title: "Import Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Mutation to process imported data
  const processMutation = useMutation({
    mutationFn: async (year: number) => {
      // This is a placeholder implementation.
      // You should replace this with your actual data fetching logic.
      console.log('processMutation', { year });
      return Promise.resolve(0);
    },
    onSuccess: (processedCount) => {
      toast({
        title: "Data Processed Successfully",
        description: `${processedCount} records processed and added to cutoff database.`,
      });
      queryClient.invalidateQueries({ queryKey: ['import-stats'] });
    },
    onError: (error) => {
      toast({
        title: "Processing Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleImport = () => {
    if (!csvData.trim()) {
      toast({
        title: "No Data",
        description: "Please paste your Excel data first.",
        variant: "destructive",
      });
      return;
    }
    importMutation.mutate({ csvData, year: importYear });
  };

  const handleProcess = () => {
    processMutation.mutate(importYear);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Cutoff Data Import
          </h1>
          <p className="text-gray-600">
            Import cutoff data from Excel sheets. Follow the two-step process: Import then Process.
          </p>
        </div>

        {/* Import Stats */}
        {importStats && importStats.total > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                Import Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{importStats.total}</div>
                  <div className="text-sm text-gray-600">Total Rows</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{importStats.processed}</div>
                  <div className="text-sm text-gray-600">Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{importStats.pending}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Import Data */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Step 1: Import Excel Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="year">Academic Year</Label>
              <Input
                id="year"
                type="number"
                value={importYear}
                onChange={(e) => setImportYear(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
            
            <div>
              <Label htmlFor="csvData">Excel Data (Copy and paste from Excel)</Label>
              <Textarea
                id="csvData"
                placeholder="Paste your Excel data here (College Name, Branch Code, Branch Name, OC, BC, BCM, MBC, MBCDNC, MBCV, SC, SCA, ST)..."
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">How to copy from Excel:</h4>
              <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
                <li>Select all your data in Excel (including headers)</li>
                <li>Copy (Ctrl+C)</li>
                <li>Paste here (Ctrl+V)</li>
                <li>Click "Import Data"</li>
              </ol>
            </div>
            
            <Button 
              onClick={handleImport}
              disabled={importMutation.isPending}
              className="w-full"
            >
              {importMutation.isPending ? "Importing..." : "Import Data"}
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Process Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download size={20} />
              Step 2: Process Imported Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-amber-600 mt-0.5" size={16} />
                <div className="text-sm text-amber-700">
                  <p className="font-semibold mb-1">Important:</p>
                  <p>Processing will convert your wide-format data into the database format and match colleges/branches. This step is irreversible.</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleProcess}
              disabled={processMutation.isPending || !importStats?.pending}
              variant={importStats?.pending ? "default" : "secondary"}
              className="w-full"
            >
              {processMutation.isPending ? "Processing..." : "Process Data"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default DataImport;
