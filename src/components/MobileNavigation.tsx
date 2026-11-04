
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavigationProps {
  navItems: Array<{
    name: string;
    path: string;
    hasDropdown: boolean;
    isHighlighted?: boolean;
    dropdownItems?: Array<{ name: string; path: string }>;
  }>;
  onBookingClick: () => void;
}

const MobileNavigation = ({ navItems, onBookingClick }: MobileNavigationProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  const closeNavigation = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-white">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              College<span className="text-orange-500">Sera</span>
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-left transition-colors rounded-md ${
                      item.isHighlighted
                        ? "text-orange-500 hover:bg-orange-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        openSubmenu === item.name ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {openSubmenu === item.name && item.dropdownItems && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          onClick={closeNavigation}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={closeNavigation}
                  className={`block px-4 py-3 font-medium transition-colors rounded-md ${
                    item.isHighlighted
                      ? "text-orange-500 hover:bg-orange-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link to="/auth" onClick={closeNavigation}>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
