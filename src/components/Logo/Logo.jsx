import { BsBusFront } from "react-icons/bs";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="text-2xl font-bold flex items-center gap-2">
        <BsBusFront />
        {/* <TbTrain className=" -scale-x-100 " /> */}
        Seat<span className="text-primary">Pao</span>
      </Link>
    </div>
  );
};

export default Logo;
