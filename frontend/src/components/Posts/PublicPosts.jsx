import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPostsAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";

const PublicPosts = () => {
  const dispatch = useDispatch();

  const { posts, error, loading } = useSelector(
    (state) => state?.posts
  );

  useEffect(() => {
    dispatch(fetchPublicPostsAction());
  }, [dispatch]);

  return (
    <section className="bg-[#fafafa] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Featured Stories
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            What the community is reading.
          </h2>

          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover articles, tutorials and insights from creators on
            BloggyTech.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <div className="text-center text-red-500">
            {error?.message}
          </div>
        ) : posts?.post?.length <= 0 ? (
          <div className="text-center text-slate-500">
            No posts available.
          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {posts?.post?.map((post) => {
                const readingTime = Math.max(
                  1,
                  Math.ceil(
                    (post?.content?.split(" ").length || 0) / 200
                  )
                );

                return (
                  <article
                    key={post?._id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image */}
                    <Link to={`/posts/${post?._id}`}>
                      <div className="overflow-hidden">
                        <img
                          src={post?.image}
                          alt={post?.title}
                          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-7">

                      {/* Category */}
                      <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                        {post?.category?.name}
                      </span>

                      {/* Title */}
                      <Link to={`/posts/${post?._id}`}>
                        <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-emerald-600">
                          {post?.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      <p className="mt-4 text-slate-600 leading-relaxed">
                        {post?.content
                          ?.split(" ")
                          .slice(0, 20)
                          .join(" ")}
                        ...
                      </p>

                      {/* Footer */}
                      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-sm text-slate-500">
                          {readingTime} min read
                        </span>

                        <span className="text-sm text-slate-500">
                          {new Date(
                            post?.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* View All Articles */}
            <div className="mt-16 text-center">
              <Link
                to="/posts"
                className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-white hover:border-slate-400"
              >
                View All Articles
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PublicPosts;