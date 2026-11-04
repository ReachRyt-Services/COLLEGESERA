
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHomepageFeaturedColleges } from '@/services/collegeService';
import CollegeCard from '@/components/CollegeGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedColleges = () => {
    const { data: colleges, isLoading } = useQuery({
        queryKey: ['homepage-featured-colleges'],
        queryFn: getHomepageFeaturedColleges,
    });

    if (isLoading) {
        return (
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="h-8 w-64 bg-slate-200 rounded mb-8 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-slate-200 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!colleges || colleges.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
                            <Building2 className="w-5 h-5" />
                            <span>Top Rated Institutes</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Featured <span className="text-orange-600">Colleges</span>
                        </h2>
                        <p className="text-slate-600 mt-2 max-w-2xl">
                            Explore India's premier educational institutions, handpicked for their academic excellence and placement records.
                        </p>
                    </div>

                    <Link to="/colleges">
                        <Button variant="outline" className="gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800">
                            View All Colleges <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {colleges.map((college) => (
                        <div key={college.id} className="h-full">
                            <CollegeCard college={college} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedColleges;
