import Image from 'next/image';

interface RelBlogCardProps {
  imageSrc: string;
  title: string;
  description: string;
  readTime: string;
  id: number;
  height: number;
  width: number;
  key: number;
}

const RelBlogcard: React.FC<RelBlogCardProps> = ({ imageSrc, title, description, readTime, key, id, height, width }) => {
  return (
    <a href={`/blog/${id}`} className="flex gap-5 mb-12 last:mb-0" key={key}>
      <Image
        src={imageSrc}
        alt="blog"
        className="object-cover rounded-xl"
        height={height}
        width={width}
      />
      <div className="px-2 space-y-2">
        <span className="text-sm text-primaryLightText2">{readTime}</span>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-sm text-primaryLightText2 truncate-description">{description}</p>
      </div>
    </a>
  );
};

export default RelBlogcard;
