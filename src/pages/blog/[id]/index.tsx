import "swiper/css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogDetails } from "@/utils/api";
import Image from "next/image";
import LatestBlogCard from "@/components/LatestBlogcard";
import Link from "next/link";
import LinkedinIco from "@/assets/images/Icons/LinkedinIco";
import FacebookIco from "@/assets/images/Icons/FacebookIco";
import InstagramIco from "@/assets/images/Icons/InstagramIco";
import TwitterIco from "@/assets/images/Icons/TwitterIco";
import BlogSection from "@/components/BlogSection";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchBannerInfo } from "@/store/bannerSlice";
import YouTubeIco from "@/assets/images/Icons/YouTubeIco";

interface Blog {
  id: number;
  title: string;
  image: string;
  short_content: string;
  long_content: string;
  posted_at: string;
}

const BlogPage = () => {
  const param = useParams();
  const { id } = param ? param : { id: null };
  const { data } = useAppSelector((state) => state.company);
  const { data: blogData } = useAppSelector((state) => state.blog);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBannerInfo({ type: "blog" }));
  }, [dispatch]);
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const fetchBlogs = async () => {
        try {
          const response = await getBlogDetails({ id: Number(id) });
          if (Array.isArray(response)) {
            setBlogs(response);
          } else {
            console.error("Error: Response is not an array");
          }
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlogs();
    }
  }, [id]);

  if (!id || isLoading) {
    return <div>Loading...</div>;
  }
  const socialLinks = [
    {
      id: 1,
      icon: <LinkedinIco width="50px" height="50px" />,
      href: data?.linkedin ?? "#",
    },
    {
      id: 2,
      icon: <FacebookIco width="50px" height="50px" />,
      href: data?.facebook ?? "#",
    },
    {
      id: 3,
      icon: <TwitterIco width="50px" height="50px" />,
      href: data?.twitter ?? "#",
    },
    {
      id: 4,
      icon: <InstagramIco width="50px" height="50px" />,
      href: data?.instagram ?? "#",
    },
    {
      id: 5,
      icon: <YouTubeIco width="50px" height="50px" />,
      href: data?.youtube_link ?? "#",
    },
  ];

  const calculateWordCount = (text: string): number => {
    return text?.split(/\s+/).filter((word) => word !== "").length;
  };

  const AVERAGE_READING_SPEED = 200;
  const calculateReadTime = (wordCount: number): string => {
    const minutes = Math.ceil(wordCount / AVERAGE_READING_SPEED);
    return `${minutes}`;
  };

  const wordCount = calculateWordCount(blogs[0]?.long_content);
  const readTime = calculateReadTime(wordCount);

  return (
    <>
      <div className="px-4 pt-11" key={blogs[0]?.id}>
        <h3 className="text-4xl font-bold mb-2">{blogs[0]?.title}</h3>
        <div className="flex items-center gap-6 mb-4">
          <span className="text-lg text-primaryLightText2">7 may</span>
          <span className="text-lg text-primaryLightText2">
            {readTime} Minute Read
          </span>
        </div>
        <div className="w-full h-[600px] rounded-xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${blogs[0]?.image}`}
            alt="blog"
            width={1000}
            height={100}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="grid lg:grid-cols-3 lg:gap-9 md:grid-cols-2 md:gap-6 grid-cols-1 my-12 max-md:space-y-6">
          <div className="col-span-2 px-8 max-md:p-0 py-6 max-md: space-y-6">
            <p dangerouslySetInnerHTML={{ __html: blogs[0]?.short_content }} />
            <h3 className="text-4xl font-bold">{blogs[0]?.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: blogs[0]?.long_content }} />
            <div className="socialLinks flex text-white mb-6 gap-2">
              {socialLinks.map((social) => (
                <div
                  className="bg-primary rounded-full hover:bg-primary/90 transition-all duration-300"
                  key={social.id}
                >
                  <Link href={social.href}>{social.icon}</Link>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 md:col-span-2 col-span-1 max-md:p-0 px-8 py-6">
            <div className="latestPosts">
              <div className="border-x border-t border-black/20 rounded-t-xl p-5">
                <h3 className="text-2xl font-bold">latest Posts</h3>
              </div>
              <div className="border border-black/20 rounded-b-xl p-5 max-h-[466px] overflow-y-auto customScroll">
                {Array.isArray(blogData) &&
                  blogData
                    .slice()
                    .reverse()
                    .map((blog) => (
                      <LatestBlogCard
                        key={blog.id}
                        imageSrc={`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`}
                        title={blog.title}
                        date={blog.posted_at}
                        readTime={"5 Minute Read"}
                        id={blog.id}
                        height={80}
                        width={80}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogSection title="Here are some related articles you may find interesting:" />
    </>
  );
};
export default BlogPage;
