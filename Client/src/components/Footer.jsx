import React from 'react'
import { assets } from '../assets/asset'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <div className='flex flex-wrap justify-between gap-8 border-[#c4c7d2] '>
                <div>
                    {/* <img src={carlogonav} alt="logo" /> */}
                    <img src={assets.carlogonav} alt="logo" className='h-8 md:h-9' />
                    <p className='max-w-80 mt-3'>
                        Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                        <a href='#'><img src={assets.facebook_logo} alt='facebook_logo' className='w-5 h-5'/></a>  
                        <a href='#'><img src={assets.instagram_logo} alt='instagram_logo' className='w-5 h-5'/></a>  
                        <a href='#'><img src={assets.twitter_logo} alt='twitter_logo' className='w-5 h-5'/></a>  
                        <a href='#'><img src={assets.gmail_logo} alt='gmail_logo' className='w-5 h-5'/></a>  
                    </div>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800'>QUICK LINKS</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 '>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your Car</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800'>RESOURCES</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-base font-medium text-gray-800'>CONTACT</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">GO CAR Luxury Drive</a></li>
                        <li><a href="#">Ashok Nagar Prayagraj, Uttar Pradesh</a></li>
                        <li><a href="#">+91-9335890856</a></li>
                        <li><a href="#">akashpatel260603@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="#">Go Car</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a><span> |</span></li>
                    <li><a href="#">Terms</a><span> |</span></li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </div>

  ) 
}

export default Footer

// primary: #2563EB;
// primary-dull:#1F58D8;   
// light: #F1F5F9;
// borderColor: #c4c7d2;