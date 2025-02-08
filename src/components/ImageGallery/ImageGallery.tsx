import Image from "next/image";
import { useState } from "react";
import dummyImage from "@/assets/images/roomImage1.jpg";

interface SubImage {
  id: number;
  src?: string;
  alt?: string;
  image?: string;
}

interface ImageGalleryProps {
  images: SubImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const subImages: SubImage[] = images.map(image => ({
    id: image.id,
    src: `${process.env.NEXT_PUBLIC_API_URL}${image.image}`,
    alt: `image${image.image}`
  }));
  const totalImages = 5;
  const galleryImages = [
    ...subImages.slice(0, totalImages),
    ...Array(totalImages - images.length).fill(0).map((_, index) => ({
      id: index,
      src: dummyImage.src,
      alt: `Image ${index}`,
    })),
  ];
  const [selectedImage, setSelectedImage] = useState<SubImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleViewAll = () => {
    setSelectedImage(images[0]);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (currentIndex !== null) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentIndex(prevIndex);
      setSelectedImage(images[prevIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      setSelectedImage(images[nextIndex]);
    }
  };

  return (
    <div className="gallery-container">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          {galleryImages.slice(0, 1).map((image, index) => (
            <div
              key={index}
              className="gallery-item cursor-pointer overflow-hidden rounded-md border hover:shadow-md transition-all"
              onClick={() => {
                setSelectedImage(image);
                setCurrentIndex(images.indexOf(image));
              }}
            >
              <Image
                src={image.src || dummyImage.src}
                alt={image.alt || 'default alt text'}
                width={100}
                height={100}
                layout="responsive"
                loading="lazy"
                className="w-full h-full object-cover rounded-md transition-transform transform hover:scale-105"
              />
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2 gap-2">
            {galleryImages.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative gallery-item cursor-pointer overflow-hidden rounded-md border hover:shadow-md transition-all h-[263px]"
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentIndex(images.indexOf(image));
                }}
              >
                <Image
                  src={image.src || dummyImage.src}
                  alt={image.alt || 'default alt text'}
                  width={100}
                  height={100}
                  layout="responsive"
                   objectPosition="center"
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform transform rounded-md hover:scale-105"
                />
                {index === galleryImages.slice(1, 5).length - 1 && (
                  <button
                    onClick={handleViewAll}
                    className="absolute bottom-[10px] right-[10px] bg-white/20 rounded-lg py-2 px-4 text-white text-lg font-semibold"
                  >
                    View All
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <button
            onClick={handlePrev}
            className="absolute left-6 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 cursor-pointer hover:bg-opacity-75"
          >
            &#8249;
          </button>
          <div className="relative flex flex-col items-center">
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={() => {
                setSelectedImage(null);
                setCurrentIndex(null);
              }}
            >
              &times;
            </button>
            <Image
              src={selectedImage.src || dummyImage.src}
              alt={selectedImage.alt || 'default alt text'}
              width={1000}
              height={1000}
            />
          </div>
          <button
            onClick={handleNext}
            className="absolute right-6 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full px-3 py-1 cursor-pointer hover:bg-opacity-75"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
