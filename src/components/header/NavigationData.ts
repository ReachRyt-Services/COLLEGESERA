// src/header/NavigationData.ts
export const navItems = [
  // 1. All Programs
  { name: "All Programs", key: "all_programs", path: "/programs", hasDropdown: false },

  // 2. All Courses
  { name: "Courses", key: "all_courses", path: "/courses", hasDropdown: false },

  // 3. Engineering
  {
    name: "Engineering",
    key: "engineering",
    path: "/colleges/engineering",
    hasDropdown: true,
    dropdownItems: [
      { name: "Computer Science", path: "/colleges/engineering/computer-science" },
      { name: "Mechanical", path: "/colleges/engineering/mechanical" },
      { name: "Electronics", path: "/colleges/engineering/electronics" },
      { name: "Civil", path: "/colleges/engineering/civil" },
    ],
  },

  // 4. Arts
  {
    name: "Arts",
    key: "arts",
    path: "/colleges/arts",
    hasDropdown: true,
    dropdownItems: [
      { name: "Fashion Design", path: "/colleges/arts/fashion-design" },
      { name: "Interior Design", path: "/colleges/arts/interior-design" },
      { name: "Graphic Design", path: "/colleges/arts/graphic-design" },
    ],
  },

  // 5. MBA
  {
    name: "MBA",
    key: "mba",
    path: "/colleges/mba",
    hasDropdown: true,
    dropdownItems: [
      { name: "Finance", path: "/colleges/mba/finance" },
      { name: "Marketing", path: "/colleges/mba/marketing" },
      { name: "Human Resources", path: "/colleges/mba/human-resources" },
      { name: "IT & Systems", path: "/colleges/mba/it-systems" },
    ],
  },

  // 6. Medicine
  {
    name: "Medicine",
    key: "medicine",
    path: "/colleges/medical",
    hasDropdown: true,
    dropdownItems: [
      { name: "MBBS", path: "/colleges/medical/mbbs" },
      { name: "BDS", path: "/colleges/dental" },
      { name: "Nursing", path: "/colleges/nursing" },
      { name: "Pharmacy", path: "/colleges/pharmacy" },
    ],
  },

  // 7. Paramedical
  {
    name: "Paramedical",
    key: "paramedical",
    path: "/colleges/paramedical",
    hasDropdown: true,
    dropdownItems: [
      { name: "DMLT", path: "/colleges/paramedical/dmlt" },
      { name: "Diploma in X-Ray Technology", path: "/colleges/paramedical/xray-tech" },
      { name: "B.Sc. Nursing", path: "/colleges/paramedical/bsc-nursing" },
      { name: "BPT (Physiotherapy)", path: "/colleges/paramedical/bpt" },
      { name: "MPT", path: "/colleges/paramedical/mpt" },
      { name: "MPH", path: "/colleges/paramedical/mph" },
    ],
  },

  // Remaining items from the original file, placed at the end.
  {
    name: "More",
    key: "more",
    path: "/colleges",
    hasDropdown: true,
    dropdownItems: [
      { name: "Law", path: "/colleges/law" },
      { name: "Commerce", path: "/colleges/commerce" },
      { name: "Science", path: "/colleges/science" },
    ],
  },
  { name: "Online", key: "online", path: "/colleges/online", hasDropdown: false, isHighlighted: true },
  { name: "Exams", key: "exams", path: "/exams", hasDropdown: false },
  { name: "Articles", key: "articles", path: "/articles", hasDropdown: false },
];

export type NavigationItem = typeof navItems[0];
