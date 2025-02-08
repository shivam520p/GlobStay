import React from 'react';

interface BreadCrumbsProps {
  title: string;
  description: string;
  imageSrc: string;
  key: number;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ title, description, imageSrc, key }) => {
  return (
    <div className='max-sm:p-4'>
      <div
        className={`relative brdCrmb rounded-xl customOverlay h-[500px] bg-cover bg-center bg-no-repeat ${imageSrc ? 'bg-gray-300' : ''}`}
        style={{ backgroundImage: imageSrc ? `url(${imageSrc})` : '' }}
        key={key}
      >
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white z-10">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-4 text-sm max-w-md">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
