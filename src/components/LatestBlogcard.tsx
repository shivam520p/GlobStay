import Image from 'next/image';

interface LatestBlogCardProps {
  imageSrc: string;
  title: string;
  date: string;
  readTime: string;
  id: number;
  height: number;
  width: number;
  key: number;
}

const LatestBlogCard: React.FC<LatestBlogCardProps> = ({ imageSrc, title, date, readTime, id, key, height, width }) => {
  return (
    <a href={`/blog/${id}`} className="flex max-sm:flex-col gap-5 mb-12 last:mb-0 md:w-full" key={key}>
      <Image
        src={imageSrc}
        alt="blog"
        className="object-cover rounded-xl max-sm:w-full max-sm:h-48"
        width={width}
        height={height}
      />
      <div className="pr-4 block md:w-full">
        <h3 className="text-lg lg:text-lg md:text-2xl leading-6">{title}</h3>
        <div className="flex items-center gap-6  md:gap-0 md:justify-between md:w-full">
          <span className="text-sm md:text-base text-primaryLightText2">{date}</span>
          <span className="text-sm md:text-base text-primaryLightText2">{readTime}</span>
        </div>
      </div>
    </a>
  );
};

export default LatestBlogCard;
