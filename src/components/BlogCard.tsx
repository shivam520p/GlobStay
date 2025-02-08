import React from 'react';
import WatchIco from '../assets/images/Icons/WatchIco';
import UserIco from '../assets/images/Icons/UserIco';
import ArrowRight from '../assets/images/Icons/ArrowRight';
import Link from 'next/link';

const BlogCard: React.FC<{
    title?: string;
    description?: string;
    img?: string;
    id?: number;
}> = ({ title, description, img, id}) => {

    return (
        <div className="rounded-xl">
            <div className="rounded-xl customOverlay relative">
                <img src={img} alt={title} className={`w-full rounded-xl h-[259px] object-cover`} />
            </div>
            <div className="bogCnt px-[18px]">
                <div className="flex justify-between items-center mt-3">
                    <div className="flex justify-between items-center gap-2">
                        <WatchIco width='18px' height='18px' />
                        <span className='text-sm'>8 Nov, 2024</span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <UserIco width='18px' height='18px' />
                        <span className='text-sm'>By, Admin</span>
                    </div>
                </div>
                <h5 className='mt-4 font-semibold text-lg'>{title}</h5>
                <p className='mt-4 font-medium text-sm' dangerouslySetInnerHTML={{ __html:description ?? 'no description' }} />
                <Link href={`/blog/${id}`} className='mt-3 text-base font-semibold flex items-center'>Read More
                    <i className="ml-2">
                            <ArrowRight width="16px" height="13px"/>  
                    </i>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard