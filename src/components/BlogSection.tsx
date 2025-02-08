import { useAppDispatch, useAppSelector } from "@/store/store";
import BlogCard from "./BlogCard";
import { fetchBlogInfo } from "@/store/blogSlice";
import { useEffect } from "react";

interface Blog {
  id: number;
  title: string;
  image: string;
  short_content: string;
  long_content: string;
}

const SkeletonLoader = () => {
  return (
    <div className="rounded-xl p-4 bg-gray-200 animate-pulse">
      <div className="w-full h-[259px] bg-gray-300 rounded-xl"></div>
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 rounded w-2/4"></div>
      </div>
    </div>
  );
};

const BlogSection = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchBlogInfo());
  }, [dispatch]);
  if (error) {
    console.log(error);
  }
  const blogs: Blog[] = Array.isArray(data) ? data : [];

  return (
    <div className="px-4 py-11">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid lg:grid-cols-3 lg:gap-4 md:grid-cols-2 grid-cols-1 max-sm:gap-4 gap-3">
        {loading ? (
          Array(3)
            .fill(null)
            .map((_, index) => <SkeletonLoader key={index} />)
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.short_content}
              img={`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`}
              id={blog.id}
            />
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
