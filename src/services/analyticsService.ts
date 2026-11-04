import { DatabaseSearchAnalytics, DatabasePageView, DatabaseAnalyticsDailyStats } from "@/types/database";

export async function trackSearch(searchData: {
  marks: number;
  category: string;
  preferred_district?: string;
  college_types?: string[];
  branches?: string[];
  results_count: number;
  user_id?: string;
  session_id?: string;
}): Promise<void> {
  return;
}

export async function trackPageView(pageData: {
  page_path: string;
  user_id?: string;
  session_id?: string;
  device_type?: string;
  referrer?: string;
}): Promise<void> {
  return;
}

export async function getSearchAnalytics(): Promise<DatabaseSearchAnalytics[]> {
  return [];
}

export async function getPageViews(): Promise<DatabasePageView[]> {
  return [];
}

export async function getDailyAnalytics(days: number = 30): Promise<DatabaseAnalyticsDailyStats[]> {
  return [];
}

export async function aggregateDailyAnalytics(date?: string): Promise<void> {
  return;
}

export async function getRealtimeAnalytics() {
  return {
    todayPageViews: 0,
    todayUniqueVisitors: 0,
    todaySearches: 0,
    totalAdClicks: 0,
    totalAdImpressions: 0,
    conversionRate: '0.00',
    monthlyTrends: []
  };
}
