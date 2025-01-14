import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { BASE_URL } from "@/api";
import { HiPencilAlt } from "react-icons/hi";

const Hero = ({ userInfo, authUsername, toggleModal }) => {
  const socialLinks = [
    { icon: <FaInstagram />, href: userInfo?.instagram },
    { icon: <FaFacebookF />, href: userInfo?.facebook },
    { icon: <BsTwitterX />, href: userInfo?.twitter },
    { icon: <FaYoutube />, href: userInfo?.youtube },
  ];

  return (
    <div className="padding-x py-12 max-container flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-[#F6F6F7] to-[#E8E8EA] dark:from-[#242535] dark:to-[#1a1b27] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-6">
        <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-4 border-white dark:border-[#343650] shadow-md transform hover:scale-105 transition-transform duration-300">
          <img
            src={`${BASE_URL}${userInfo?.profile_picture}`}
            alt={`${userInfo?.first_name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#181A2A] dark:text-white">
            {userInfo?.first_name} {userInfo?.last_name}
          </h2>
          <p className="text-[16px] text-[#696A75] dark:text-[#BABABF] font-medium">
            {userInfo?.job_title || "Collaborator & Editor"}
          </p>
        </div>
        {userInfo?.username === authUsername && (
          <span>
            <HiPencilAlt className="dark:text-white text-2xl cursor-pointer" onClick={toggleModal}/>
          </span>
        )}
      </div>

      <p className="text-[#3B3C4A] dark:text-[#BABABF] text-[17px] max-w-2xl text-center leading-relaxed font-light">
        {userInfo?.bio}
      </p>

      <div className="flex gap-5 justify-center items-center">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[45px] h-[45px] rounded-lg bg-[#696A75] hover:bg-[#181A2A] dark:hover:bg-[#343650] flex justify-center items-center text-white text-xl transform hover:scale-110 transition-all duration-300 cursor-pointer shadow-md"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Hero;
