
import { Link } from "react-router-dom";

const NavigationSection = () => {
  const categories = [
    {
      name: "Engineering",
      path: "/colleges/engineering",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      description: "Top Engineering Colleges"
    },
    {
      name: "Medical",
      path: "/colleges/medical",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      description: "Premier Medical Institutions"
    },
    {
      name: "MBA",
      path: "/colleges/mba",
      image: "/MBA logo.png",
      description: "Business Schools"
    },
    {
      name: "Law",
      path: "/colleges/law",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
      description: "Law Colleges"
    },
    {
      name: "Arts",
      path: "/colleges/arts",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=250&fit=crop",
      description: "Arts & Humanities"
    },
    {
      name: "Commerce",
      path: "/colleges/commerce",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=250&fit=crop",
      description: "Commerce & Finance"
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore by Category</h2>
          <p className="text-gray-600">Find the perfect college for your field of study</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs opacity-90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationSection;
