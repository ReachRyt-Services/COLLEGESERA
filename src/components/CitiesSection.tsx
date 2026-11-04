
import { Card, CardContent } from "@/components/ui/card";

const CitiesSection = () => {
  const cities = [
    {
      name: "DELHI",
      colleges: "847+ colleges",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop"
    },
    {
      name: "BANGALORE",
      colleges: "1836+ colleges",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop"
    },
    {
      name: "MUMBAI",
      colleges: "924+ colleges",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=300&fit=crop"
    },
    {
      name: "PUNE",
      colleges: "734+ colleges",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=300&fit=crop"
    },
    {
      name: "KOLKATA",
      colleges: "715+ colleges",
      image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          Top <span className="text-orange-500">Cities</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cities.map((city) => (
            <Card key={city.name} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{city.name}</h3>
                  <p className="text-sm opacity-90">{city.colleges}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitiesSection;
