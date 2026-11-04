
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface UserAuthenticationProps {
  onBookingClick: () => void;
}

const UserAuthentication = ({ onBookingClick }: UserAuthenticationProps) => {
  return (
    <Link to="/auth">
      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm">
        Sign In
      </Button>
    </Link>
  );
};

export default UserAuthentication;
