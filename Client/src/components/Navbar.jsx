import React, { useState } from "react";
import carlogonav from "../assets/carlogonav.png";
import carlogonav1 from "../assets/carlogonav1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuLinks } from "../assets/asset";
import { assets } from "../assets/asset";
import { useAppContext } from "../context/AppContex";
import toast from "react-hot-toast";

// primary: #2563EB;
// primary-dull:#1F58D8;
// light: #F1F5F9;
// borderColor: #c4c7d2;

const Navbar = () => {
  const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

  const location = useLocation();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const changeRole = async ()=>{
    try { 
        if (!user) return toast.error("Please log in first");
         const {data} = await axios.post('/api/owner/change-role')
         if(data.success){
          setIsOwner(true)
          toast.success(data.message)
         }
         else{
          toast.error(data.message)
         }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24
    xl:px-32 py-4 text-gray-600 border-b border-[#c4c7d2] relative transition-all
      ${location.pathname === "/" && "bg-[#F1F5F9]"}`}
    >
      <Link to="/">
        <img src={carlogonav} alt="logo"/>
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full 
        max-sm:top-16 max-sm:border-t border-[#c4c7d2] right-0 flex 
        flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 
        max-sm:p-4 transition-all duration-300 z-50
         ${location.pathname === "/" ? "bg-light" : "bg-white"}
         ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

        <div
          className="hidden lg:flex items-center text-sm gap-2 border border-[#c4c7d2]
            px-3 rounded-full max-w-56"
        >
          <input
            type="text"
            placeholder="Search Products"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          />
          <img src={assets.search_icon} alt="search" />
        </div>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button onClick={() => isOwner ? navigate("/owner") : changeRole()} className="cursor-pointer">
            {isOwner ? 'Dashboard' : 'List Cars'}
          </button>
           {/* <button
               onClick={() => {
                  if (!user) return toast.error("Please log in first");
                  isOwner ? navigate("/owner") : changeRole();
                }}
                className="cursor-pointer"
              >
                {isOwner ? "Dashboard" : "List Cars"}
              </button> */}



          <button
            onClick={() => {user ? logout(): setShowLogin(true)}}
            className="cursor-pointer px-8 py-2 bg-[#2563EB] hover:bg-[#1F58D8] transition-all text-white rounded-lg"
          >
            {user ? 'Logout':'LogIn'}
          </button>
        </div>
      </div>
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </div>
  );
};

export default Navbar;

// primary: #2563EB;
// primary-dull:#1F58D8;
// light: #F1F5F9;
// borderColor: #c4c7d2;






// import React, { useState } from "react";
// import carlogonav from "../assets/carlogonav.png";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { menuLinks, assets } from "../assets/asset";
// import { useAppContext } from "../context/AppContex";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
//   const location = useLocation();
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const changeRole = async () => {
//     try {
//       const { data } = await axios.post("/api/owner/change-role");
//       if (data.success) {
//         setIsOwner(true);
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div
//       className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-[#c4c7d2] relative transition-all
//       ${location.pathname === "/" ? "bg-[#F1F5F9] text-gray-700" : "bg-white text-gray-800"}`}
//     >
//       {/* Logo */}
//       <Link to="/">
//         <img src={carlogonav} alt="logo" />
//       </Link>

//       {/* Menu Links */}
//       <div
//         className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-[#c4c7d2] right-0 flex 
//         flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50
//         ${location.pathname === "/" ? "bg-[#F1F5F9]" : "bg-white"}
//         ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
//       >
//         {menuLinks.map((link, index) => (
//           <Link key={index} to={link.path} onClick={() => setOpen(false)}>
//             {link.name}
//           </Link>
//         ))}

//         {/* Search Bar */}
//         <div
//           className="hidden lg:flex items-center text-sm gap-2 border border-[#c4c7d2]
//           px-3 rounded-full max-w-56"
//         >
//           <input
//             type="text"
//             placeholder="Search Cars"
//             className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
//           />
//           <img src={assets.search_icon} alt="search" />
//         </div>

//         {/* Buttons */}
//         <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
//           <button
//             onClick={() => {
//               if (!user) return toast.error("Please log in first");
//               isOwner ? navigate("/owner") : changeRole();
//             }}
//             className={`cursor-pointer ${isOwner ? "text-[#2563EB] font-medium" : ""}`}
//           >
//             {isOwner ? "Dashboard" : "List Cars"}
//           </button>

//           <button
//             onClick={() => (user ? logout() : setShowLogin(true))}
//             className="cursor-pointer px-8 py-2 bg-[#2563EB] hover:bg-[#1F58D8] transition-all text-white rounded-lg"
//           >
//             {user ? "Logout" : "LogIn"}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Toggle */}
//       <button
//         className="sm:hidden cursor-pointer"
//         aria-label="Menu"
//         onClick={() => setOpen(!open)}
//       >
//         <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
//       </button>
//     </div>
//   );
// };

// export default Navbar;

