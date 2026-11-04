-- Enable RLS on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_process ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CutoffData" ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE userdata ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies (Allow anyone to view)

-- Colleges
CREATE POLICY "Enable read access for all users" ON colleges
FOR SELECT USING (true);

-- Courses
CREATE POLICY "Enable read access for all users" ON courses
FOR SELECT USING (true);

-- Branches
CREATE POLICY "Enable read access for all users" ON branches
FOR SELECT USING (true);

-- Placements
CREATE POLICY "Enable read access for all users" ON placements
FOR SELECT USING (true);

-- Rankings
CREATE POLICY "Enable read access for all users" ON rankings
FOR SELECT USING (true);

-- Admission Process
CREATE POLICY "Enable read access for all users" ON admission_process
FOR SELECT USING (true);

-- Fee Structures
CREATE POLICY "Enable read access for all users" ON fee_structures
FOR SELECT USING (true);

-- Fee Components
CREATE POLICY "Enable read access for all users" ON fee_components
FOR SELECT USING (true);

-- CutoffData (Note: Case sensitive table name if created that way)
CREATE POLICY "Enable read access for all users" ON "CutoffData"
FOR SELECT USING (true);

-- Advertisements
CREATE POLICY "Enable read access for all users" ON advertisements
FOR SELECT USING (true);

-- Articles
CREATE POLICY "Enable read access for all users" ON articles
FOR SELECT USING (true);

-- Homepage Content
CREATE POLICY "Enable read access for all users" ON homepage_content
FOR SELECT USING (true);

-- Public Write Access Policies (Allow anyone to submit forms)

-- Userdata (Lead Capture)
CREATE POLICY "Enable insert access for all users" ON userdata
FOR INSERT WITH CHECK (true);

-- Optional: Allow users to view their own data (if you implement auth later)
-- CREATE POLICY "Enable read access for own data" ON userdata
-- FOR SELECT USING (auth.uid() = user_id);
