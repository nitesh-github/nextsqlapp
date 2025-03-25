import Link from "next/link";

const Navbar = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Link className="hover:underline" href={"/"}>Home</Link>
          <Link className="hover:underline" href={"/"}>Profile</Link>
          <Link className="hover:underline" href={"#"}>Logout</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
