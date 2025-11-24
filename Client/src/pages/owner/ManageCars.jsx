import React, { useEffect , useState } from 'react'
import {assets, dummyCarData} from '../../assets/asset'
import Title from "../../components/owner/Title"
import {useAppContext} from '../../context/AppContex'
import toast from 'react-hot-toast'

const ManageCars = () => {

   const {isOwner ,axios} = useAppContext()

  const [cars , setCars] = useState([])
  const fetchOwnerCars = async ()=>{
    try {
       const {data} = await axios.get('/api/owner/cars')
        if(data.success){
          setCars(data.cars)
        }
        else{
          toast.error(data.message)
        }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId)=>{
    try {
       const {data} = await axios.post('/api/owner/toggle-car', {carId})
        if(data.success){
          toast.success(data.message)
          fetchOwnerCars()
        }
        else{
          toast.error(data.message)
        }

    } catch (error) {
      toast.error(error.message)
    }
  }

   const deleteCar = async (carId)=>{
    try {
        const confirm = window.confirm("are you sure you want to delete this car?")
        if(!confirm) return null

        const {data} = await axios.post('/api/owner/delete-car',{carId})
        if(data.success){
          toast.success(data.message)
          fetchOwnerCars()
        }
        else{
          toast.error(data.message)
        }
    } 
    catch (error) {
          toast.error(error.message)
    }
   }

  


  useEffect(()=>{
    isOwner && fetchOwnerCars()
  },[isOwner])

  return (
    <div className='ps-4 pt-10 md:px-10 w-full'>
    <Title title="Manage Cars" subTitle="View all listed cars, update their details, or removes them from the booking platform."/>
    <div className='max-w-3xl w-full rounded-md overflow-hidden border border-[#c4c7d2] mt-6'>
      <table className='w-full border-collapse text-left text-sm text-gray-600'>
        <thead>
          <tr>
            <th className='p-3 font-medium'>Car</th>
            <th className='p-3 font-medium'>Category</th>
            <th className='p-3 font-medium'>Price</th>
            <th className='p-3 font-medium'>Status</th>
            <th className='p-3 font-medium'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car,index)=>(
            <tr key={index} className='border-t border-[#c4c7d2]'>

              <td className='p-3 flex items-center gap-3'>
                <img src={car.image} alt='' className='h-12 w-12 aspect-square rounded-md object-cover'/>
                <div className='max-md:hidden'>
                  <p className='font'>{car.brand} {car.model}</p>
                  <p className='text-xs text-gray-500'>{car.seating_capacity}{car.transmission}</p>
                </div>
              </td>
              <td className='p-3 max-md:hidden'>{car.category}</td>
              <td className='p-3'>${car.pricePerDay}/day</td>
              <td className='p-3 max-md:hidden'>
                <span className={`px-3 py-1 rounded-full text-xs ${car.isAvaliable ? 'bg-green-100 text-green-500': 'bg-red-100 text-red-500'}`}>
                  {car.isAvaliable ? "Available": "Unavailable"}
                </span>
              </td>
              <td className='flex item-center p-3'>
                <img onClick={()=> toggleAvailability(car._id)} src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt='' className='cursor-pointer'/>
                <img onClick={()=> deleteCar(car._id)} src={assets.delete_icon} alt='' className='cursor-pointer'/>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ManageCars


// primary: #2563EB;
// primary-dull:#1F58D8;
// light: #F1F5F9;
// borderColor: #c4c7d2;