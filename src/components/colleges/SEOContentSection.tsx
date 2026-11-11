import React, { useState } from 'react';
import { DatabaseCollege } from '@/types/database';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SEOContentSectionProps {
    location?: string;
    category?: string;
    subjectName?: string;
    h2Title?: string;
    colleges: DatabaseCollege[];
}

interface CategoryInfo {
    programDescription: string;
    eligibility: string;
    entranceExams: string;
    topRecruiters: string;
}

const getCategoryInfo = (subjectName?: string, category?: string, h2Title?: string): CategoryInfo => {
    const rawKey = `${subjectName || ''} ${category || ''} ${h2Title || ''}`.toLowerCase();
    // Sanitize to prevent city names like "coimbatore" from falsely matching "mba"
    const sanitizedKey = rawKey.replace(/coimbatore/gi, ' ').replace(/-/g, ' ');

    // 1. Occupational Therapy
    if (
        sanitizedKey.includes('occupational therapy') ||
        sanitizedKey.includes('occupational') ||
        /\bbot\b/i.test(sanitizedKey) ||
        /\bmot\b/i.test(sanitizedKey)
    ) {
        return {
            programDescription: 'These colleges offer Bachelor of Occupational Therapy (BOT) and Master of Occupational Therapy (MOT) programs. Admissions are conducted through Tamil Nadu Paramedical Counselling and institutional merit quotas.',
            eligibility: '10+2 with minimum 50% aggregate in Physics, Chemistry & Biology (PCB)',
            entranceExams: 'TN Paramedical Counselling, Merit-Based',
            topRecruiters: 'KMCH, Ganga Hospital, Apollo Hospitals, Manipal Hospitals, Rehabilitation Centers'
        };
    }

    // 2. Paramedical / Nursing / Physiotherapy / Allied Health
    if (
        sanitizedKey.includes('paramedical') ||
        sanitizedKey.includes('nursing') ||
        sanitizedKey.includes('physiotherapy') ||
        /\bbpt\b/i.test(sanitizedKey) ||
        sanitizedKey.includes('allied health')
    ) {
        return {
            programDescription: 'These colleges offer B.Sc Nursing, Bachelor of Physiotherapy (BPT), B.Sc Allied Health Sciences, and specialized paramedical diploma courses. Admissions are conducted through Tamil Nadu Paramedical Counselling and merit-based selection.',
            eligibility: '10+2 with minimum 45-50% aggregate in Physics, Chemistry & Biology (PCB)',
            entranceExams: 'TN Paramedical Counselling, AIIMS Paramedical, Merit-Based',
            topRecruiters: 'Apollo Hospitals, KMCH, Ganga Hospital, Manipal Hospitals, Fortis Healthcare'
        };
    }

    // 3. Autonomous Colleges / Autonomous Engineering
    if (sanitizedKey.includes('autonomous')) {
        return {
            programDescription: 'These autonomous engineering and technology institutions have academic freedom to design industry-aligned curricula, conduct independent examinations, and introduce cutting-edge B.E. / B.Tech degree programs. Admissions are primarily conducted through TNEA counselling and JEE Main.',
            eligibility: '10+2 with minimum 45% aggregate in Physics, Chemistry & Mathematics (PCM) (40% for reserved categories)',
            entranceExams: 'TNEA, JEE Main',
            topRecruiters: 'TCS, Infosys, Cognizant, Wipro, Zoho, HCL, Amazon, Bosch, Microsoft, L&T'
        };
    }

    // 4. NIRF Ranked Colleges / NIRF Ranked Engineering
    if (sanitizedKey.includes('nirf')) {
        return {
            programDescription: 'These top NIRF-ranked institutions are recognized by the Ministry of Education, Government of India, for academic excellence, research output, and top-tier placements. Admissions to technical programs are conducted through TNEA counselling and JEE Main.',
            eligibility: '10+2 with minimum 45-50% aggregate in Physics, Chemistry & Mathematics (PCM)',
            entranceExams: 'TNEA, JEE Main',
            topRecruiters: 'Google, Microsoft, Amazon, TCS, Infosys, Cognizant, L&T, Zoho, Deloitte'
        };
    }

    // 5. Engineering / Technology / B.E / B.Tech
    if (
        sanitizedKey.includes('engineering') ||
        sanitizedKey.includes('technology') ||
        sanitizedKey.includes('b.tech') ||
        sanitizedKey.includes('btech') ||
        sanitizedKey.includes('b.e') ||
        /\bbe\b/i.test(sanitizedKey)
    ) {
        return {
            programDescription: 'These colleges offer B.E. / B.Tech, M.E. / M.Tech, and specialized technical degree programs. Admissions to these colleges are primarily conducted through TNEA counseling and JEE Main.',
            eligibility: '10+2 with minimum 45% aggregate in Physics, Chemistry & Mathematics (PCM) (40% for reserved categories)',
            entranceExams: 'TNEA, JEE Main',
            topRecruiters: 'TCS, Infosys, Cognizant, Wipro, Zoho, HCL, Amazon, Bosch'
        };
    }

    // 6. Medical / Dental / MBBS / BDS
    if (
        sanitizedKey.includes('medical') ||
        sanitizedKey.includes('dental') ||
        /\bmbbs\b/i.test(sanitizedKey) ||
        /\bbds\b/i.test(sanitizedKey)
    ) {
        return {
            programDescription: 'These premier institutions offer MBBS, BDS, and postgraduate medical degree programs approved by NMC and DCI. Admissions are strictly conducted through national entrance examinations and state quota counselling.',
            eligibility: '10+2 with minimum 50% aggregate in PCB and English + Valid NEET Score',
            entranceExams: 'NEET UG, NEET PG',
            topRecruiters: 'Apollo Hospitals, Fortis Healthcare, Christian Medical College, AIIMS, Government Medical Services'
        };
    }

    // 7. Pharmacy
    if (sanitizedKey.includes('pharmacy') || sanitizedKey.includes('pharm')) {
        return {
            programDescription: 'These colleges offer B.Pharm, M.Pharm, and Pharm.D degree programs approved by the Pharmacy Council of India (PCI). Admissions are primarily conducted through TN Paramedical Counselling and merit.',
            eligibility: '10+2 with minimum 50% aggregate in Physics, Chemistry & Biology/Mathematics (PCB/PCM)',
            entranceExams: 'TN Paramedical Counselling, GPAT, Merit-Based',
            topRecruiters: "Sun Pharma, Cipla, Dr. Reddy's Laboratories, Biocon, Pfizer, Apollo Pharmacy"
        };
    }

    // 8. Architecture
    if (sanitizedKey.includes('architecture') || sanitizedKey.includes('b.arch') || sanitizedKey.includes('barch')) {
        return {
            programDescription: 'These institutions offer Bachelor of Architecture (B.Arch) and M.Arch programs approved by the Council of Architecture (COA). Admissions are conducted through national aptitude tests and centralized state counselling.',
            eligibility: '10+2 with minimum 50% in PCM or 10+3 Diploma with Mathematics + Valid NATA Score',
            entranceExams: 'NATA, JEE Main Paper 2, TNEA Architecture Counselling',
            topRecruiters: 'L&T Construction, Hafeez Contractor, Urban Development Authorities, Architectural Design Studios'
        };
    }

    // 9. Law
    if (sanitizedKey.includes('law') || /\bllb\b/i.test(sanitizedKey) || /\bllm\b/i.test(sanitizedKey)) {
        return {
            programDescription: 'These law colleges offer 5-Year Integrated Law (BA LLB, BBA LLB), 3-Year LLB, and LLM programs approved by the Bar Council of India (BCI). Admissions are conducted through national law entrance exams and TNDALU counselling.',
            eligibility: '10+2 with minimum 45% aggregate for 5-Year Integrated LLB; Graduation for 3-Year LLB',
            entranceExams: 'CLAT, AILET, LSAT India, TNDALU Counselling, Merit-Based',
            topRecruiters: 'Corporate Legal Teams, Top Law Firms, Judicial Services, Legal Consultancies'
        };
    }

    // 10. MBA / Management / PGDM
    if (
        /\bmba\b/i.test(sanitizedKey) ||
        sanitizedKey.includes('management') ||
        sanitizedKey.includes('pgdm') ||
        /\bbusiness\b/i.test(sanitizedKey)
    ) {
        return {
            programDescription: 'These colleges offer Master of Business Administration (MBA), PGDM, and executive management programs. Admissions to these colleges are primarily conducted through entrance exams such as TANCET, MAT, CAT, CMAT, and XAT.',
            eligibility: 'Graduation with minimum 50% aggregate (45% for reserved categories)',
            entranceExams: 'TANCET, MAT, CAT, CMAT, XAT',
            topRecruiters: 'Amazon, Cognizant, TCS, Wipro, Infosys, Deloitte, HDFC Bank, Zoho'
        };
    }

    // 11. Polytechnic / Diploma
    if (sanitizedKey.includes('polytechnic') || sanitizedKey.includes('diploma')) {
        return {
            programDescription: 'These polytechnic institutes offer technical diploma programs across engineering and vocational fields. Admissions are conducted through DOTE Tamil Nadu counselling and merit basis.',
            eligibility: '10th Standard (SSLC) pass with minimum 35% marks; 10+2/ITI for lateral entry',
            entranceExams: 'Merit-Based / DOTE Tamil Nadu Counselling',
            topRecruiters: 'L&T, Ashok Leyland, TVS Motors, Hyundai, Tata Motors, Bosch'
        };
    }

    // 12. Arts & Science / Commerce
    if (
        sanitizedKey.includes('art') ||
        sanitizedKey.includes('science') ||
        sanitizedKey.includes('commerce') ||
        /\bbba\b/i.test(sanitizedKey) ||
        /\bbca\b/i.test(sanitizedKey)
    ) {
        return {
            programDescription: 'These colleges offer undergraduate and postgraduate programs in Arts, Science, Commerce, Management, and Computer Applications. Admissions are primarily based on 10+2 merit marks and university-level admission criteria.',
            eligibility: '10+2 in relevant stream with minimum 50% aggregate from a recognized board',
            entranceExams: 'Merit-Based / University Level Entrance Test',
            topRecruiters: 'TCS, Infosys, Cognizant, Wipro, Amazon, Deloitte, Zoho, EY'
        };
    }

    // 13. Default / Multidisciplinary
    return {
        programDescription: 'These colleges offer a diverse range of undergraduate and postgraduate degree programs. Admissions are conducted through respective state counselling systems, national entrance exams, and institutional merit quotas.',
        eligibility: "10+2 for UG programs; Bachelor's Degree with minimum 50% for PG programs",
        entranceExams: 'TNEA, TANCET, NEET, Merit-Based',
        topRecruiters: 'TCS, Infosys, Cognizant, Wipro, Amazon, HCL, Zoho'
    };
};

const SEOContentSection: React.FC<SEOContentSectionProps> = ({ location, category, subjectName, h2Title, colleges }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // If no location is selected, we might want to show generic text or nothing
    if (!location) return null;

    const city = location.charAt(0).toUpperCase() + location.slice(1);
    const currentYear = new Date().getFullYear();
    const count = colleges.length;

    // Dynamic Data Calculation
    const governmentColleges = colleges.filter(c => c.type === 'Government');
    const privateColleges = colleges.filter(c => c.type === 'Private');

    // Helper to get numeric rank
    const getRank = (college: DatabaseCollege) => {
        if (!college.rankings || college.rankings.length === 0) return 999;
        // Try to find NIRF rank first
        const nirf = college.rankings.find(r => (r?.agency || '').toLowerCase().includes('nirf'));
        if (nirf) return parseInt(nirf.rank || '') || 999;
        // Fallback to first available rank
        return parseInt(college.rankings[0]?.rank || '') || 999;
    };

    const topRanked = [...colleges]
        .sort((a, b) => getRank(a) - getRank(b))
        .slice(0, 5);

    const govNames = governmentColleges.slice(0, 3).map(c => c.name).join(", ");
    const pvtNames = privateColleges.slice(0, 3).map(c => c.name).join(", ");

    const subjectDisplayName = subjectName || (category
        ? (category === 'arts' ? 'Arts & Science' : category.toUpperCase() === 'MBA' ? 'MBA' : category.charAt(0).toUpperCase() + category.slice(1))
        : '');

    const defaultH2 = subjectDisplayName
        ? `Best ${subjectDisplayName} Colleges in ${city} - Rankings, Fees & Placements ${currentYear}`
        : `Best Colleges in ${city} - Rankings, Fees & Placements ${currentYear}`;

    const displayH2 = h2Title 
        ? (h2Title.includes(String(currentYear)) ? h2Title : `${h2Title} ${currentYear}`)
        : defaultH2;

    const categoryInfo = getCategoryInfo(subjectDisplayName, category, h2Title);

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mt-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {displayH2}
            </h2>

            <div className={`prose prose-slate max-w-none text-slate-600 relative transition-all duration-300 ${!isExpanded ? 'max-h-36 overflow-hidden' : ''}`}>
                <p>
                    Looking for the top {subjectDisplayName ? `${subjectDisplayName} ` : ''}colleges in {city} in {currentYear}?
                    {govNames && ` Top government institutes include ${govNames}, and`}
                    {pvtNames && ` leading private universities are ${pvtNames}.`}
                    {(!govNames && !pvtNames) && ` Explore premier institutions offering recognized academic programs, experienced faculty, and strong career placement support.`}
                    {' '}{categoryInfo.programDescription}
                </p>

                <p className="mt-4">
                    When selecting the best {subjectDisplayName ? `${subjectDisplayName} ` : ''}colleges in {city}, students should consider factors such as NIRF rankings,
                    placement records, return on investment (ROI), location, faculty, and specializations.
                    This guide highlights the top-ranked {subjectDisplayName ? `${subjectDisplayName} ` : ''}colleges in {city} {currentYear} providing all key details on fees,
                    courses, placements, eligibility, and entrance exams to help students make an informed choice.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                    Top {subjectDisplayName ? `${subjectDisplayName} ` : ''}Colleges in {city} {currentYear}: Key Highlights
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border border-slate-200 rounded-lg">
                        <tbody className="divide-y divide-slate-200">
                            <tr className="bg-slate-50">
                                <td className="p-3 font-medium">Total {subjectDisplayName ? `${subjectDisplayName} ` : ''}Colleges in {city}</td>
                                <td className="p-3">{count}+</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Ownership</td>
                                <td className="p-3">
                                    ~{Math.round((privateColleges.length / Math.max(count, 1)) * 100)}% Private,
                                    ~{Math.round((governmentColleges.length / Math.max(count, 1)) * 100)}% Government
                                </td>
                            </tr>
                            <tr className="bg-slate-50">
                                <td className="p-3 font-medium">Admission &amp; Eligibility</td>
                                <td className="p-3">{categoryInfo.eligibility}</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Entrance Exams Accepted</td>
                                <td className="p-3">{categoryInfo.entranceExams}</td>
                            </tr>
                            <tr className="bg-slate-50">
                                <td className="p-3 font-medium">Top Recruiters</td>
                                <td className="p-3">{categoryInfo.topRecruiters}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                    Top {subjectDisplayName ? `${subjectDisplayName} ` : ''}Colleges in {city} by Rankings {currentYear}
                </h3>
                <p>
                    The NIRF {currentYear} is the most trusted ranking for colleges in India.
                    Below are the top {subjectDisplayName ? `${subjectDisplayName} ` : ''}colleges in {city} as per available rankings.
                </p>

                <ul className="list-disc pl-5 mt-2 space-y-1">
                    {topRanked.map(college => {
                        const rank = getRank(college);
                        return (
                            <li key={college.id}>
                                <span className="font-medium">{college.name}</span>
                                {rank !== 999 ? ` - Rank #${rank}` : ''}
                            </li>
                        );
                    })}
                </ul>

                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>

            <Button
                variant="ghost"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto font-medium flex items-center gap-1"
            >
                {isExpanded ? (
                    <>Show Less <ChevronUp size={16} /></>
                ) : (
                    <>Read More <ChevronDown size={16} /></>
                )}
            </Button>
        </div>
    );
};

export default SEOContentSection;
