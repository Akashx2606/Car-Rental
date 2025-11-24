import React from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/asset'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContex'
import toast from 'react-hot-toast'

const AddCar = () => {

     const {axios} = useAppContext();

  const [image , setImage] = useState(null)
  const [car ,setCar] = useState({
       brand:'',
       model:'',
       year:0,
       pricePerDay:0,
       category:'',
       transmission:'',
       fuel_type:'',
       seating_capacity:0,
       location:'',
       description:'',
  })

  const [isLoading, setIsLoading] = useState(false);

  const handlesubmit = async (e)=>{
    e.preventDefault()
    if(isLoading) return null
    setIsLoading(true)
    try{
      const formData = new FormData();
      formData.append('image',image);
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData);
      
      if(data.success){
        toast.success(data.message);
        setImage(null);
        setCar({
       brand:'',
       model:'',
       year:0,
       pricePerDay:0,
       category:'',
       transmission:'',
       fuel_type:'',
       seating_capacity:0,
       location:'',
       description:'',
        })
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  return (

    // upload image
    <div className='px-4 py-10 md:px-10 flex-1'>
        <Title title="Add New Car" subTitle='Fill in details to list a new car for booking, including pricing availability and car specifications.'/>
      <form onSubmit={handlesubmit} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='car-image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt='car' className='h-14 rounded cursor-pointer'/>
            <input type='file' id='car-image' accept='image/*' hidden onChange={e=>setImage(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>

      {/* car and brand */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex flex-col w-full'>
          <label>Brand</label>
          <input type='text' placeholder='e.g BMW, Mercedes, audi ...' required value={car.brand} onChange={e=>setCar({...car, brand: e.target.value})}
          className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'/>
        </div>
        <div className='flex flex-col w-full'>
          <label>Model</label>
          <input type='text' placeholder='e.g X5, E-Class, M4...' required value={car.model} onChange={e=>setCar({...car, model: e.target.value})}
          className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none'/>
        </div>
      </div>

      {/* year price and category */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <div className='flex flex-col w-full'>
        <label>Year</label>
        <input type='number' placeholder='2025'required value={car.year} onChange={e=>setCar({...car , year:e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '/>
        </div>
        <div className='flex flex-col w-full'>
        <label>Daily Price ($)</label>
        <input type='number' placeholder='0'required value={car.pricePerDay} onChange={e=>setCar({...car , pricePerDay:e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '/>
        </div>
        <div className='flex flex-col w-full'>
        <label>Category</label>
        <select value={car.category} onChange={e=>setCar({...car , category: e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '>
          <option>Select a Category</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Van</option>
        </select>
        </div>
      </div>

       {/* car Transmission fuel type seating capacity */}

       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <div className='flex flex-col w-full'>
        <label>Transmission</label>
        <select value={car.transmission} onChange={e=>setCar({...car ,transmission: e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '>
          <option>Select a transmission</option>
          <option>Automatic</option>
          <option>Manual</option>
          <option>Semi-Automatic</option>
        </select>
        </div>
        <div className='flex flex-col w-full'>
        <label>Fuel Type</label>
        <select value={car.fuel_type} onChange={e=>setCar({...car , fuel_type: e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '>
          <option>Select a fuel type</option>
          <option>Gas</option>
          <option>Diesel</option>
          <option>Petrol</option>
          <option>Electric</option>
          <option>Hybrid</option>
        </select>
        </div>

        <div className='flex flex-col w-full'>
        <label>Seating Capacity</label>
        <input type='number' placeholder='0'required value={car.seating_capacity} onChange={e=>setCar({...car , seating_capacity:e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '/>
        </div>
      </div>

      {/* location */}
      <div className='flex flex-col w-full'>
        <label>Location</label>
        <select value={car.location} onChange={e=>setCar({...car , location:e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '>
          <option>Select a location </option>
          <option>Delhi</option>
          <option>Noida</option>
          <option>Gurugram</option>
          <option>Lucknow</option>
        </select>
      </div>
      <div className='flex flex-col w-full'>
        <label>Description</label>
        <textarea rows={5} placeholder='e.g. A luxurious Suv with a spacious interior and a powerful engine.'required value={car.description} onChange={e=>setCar({...car , description:e.target.value})} className='px-3 py-2 mt-1 border border-[#c4c7d2] rounded-md outline-none '/>
        </div>
        <button className='bg-[#2563EB] flex item-center gap-2 px-4 py-2.5 mt-4 text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt=''/>
          {isLoading ? 'Listing...' : 'List Your Car'}</button>

      </form>
    </div>
  )
}

export default AddCar

// primary: #2563EB;
// primary-dull:#1F58D8;
// light: #F1F5F9;
// borderColor: #c4c7d2;



