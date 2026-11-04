const StatsSection = () => {
  const stats = [
    {
      icon: "🏛️",
      label: "6000+ Institutions",
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    {
      icon: "📝",
      label: "200+ Exams",
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      icon: "📚",
      label: "1000+ Courses",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      icon: "💻",
      label: "200+ Online Courses",
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="bg-white py-10 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {stats.map((item, index) => (
            <div
              key={index}
              className="
                flex flex-col items-center justify-center 
                p-6 rounded-xl border border-orange-100 
                bg-white shadow-sm hover:shadow-md transition-all
                hover:-translate-y-1
              "
            >
              <div
                className={`w-14 h-14 ${item.bg} ${item.text}
                rounded-full flex items-center justify-center text-2xl mb-3`}
              >
                {item.icon}
              </div>

              <p className="text-gray-800 font-semibold text-sm md:text-base">
                {item.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default StatsSection;
