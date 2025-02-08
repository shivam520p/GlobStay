import React from 'react'
import SaleIco from '../assets/images/Icons/SaleIco'
import ProjectIco from '../assets/images/Icons/ProjectIco'
import LocationIco from '../assets/images/Icons/LocationIco'
import BookIco from '../assets/images/Icons/BookIco'

const TabsSection = () => {
  return (
    <>
      <div className="tabs flex justify-center items-center py-4 gap-8">
        <a className="inline-flex flex-col items-center text-center text-xs font-medium active">
          <BookIco width="30px" height="35px" />
          Book
        </a>
        <a className="inline-flex flex-col items-center text-center text-xs font-medium">
          <SaleIco width="30px" height="35px" />
          For Sale
        </a>
        <a className="inline-flex flex-col items-center text-center text-xs font-medium">
          <ProjectIco width="30px" height="35px" />
          Featured Project
        </a>
        <a className="inline-flex flex-col items-center text-center text-xs font-medium">
          <LocationIco width="30px" height="35px" />
          By locations
        </a>
      </div>
    </>
  )
}

export default TabsSection;   