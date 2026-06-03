import React from "react";
import { Link } from "react-router-dom";

const UserPosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <section className="bg-[#fafafa] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            No Articles Yet
          </h2>
          <p className="mt-4 text-slate-500">
            This author hasn't published any articles yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fafafa] py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Articles
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Published Stories
          </h2>

          <p className="mt-3 text-slate-500">
            Explore all articles written by this author.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {posts?.map((post) => (
            <article
              key={post?._id}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <Link to={`/posts/${post?._id}`}>
                <div className="overflow-hidden">
                  <img
                    src={post?.image}
                    alt={post?.title}
                    className="
                      h-64
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>
              </Link>

              <div className="p-6">

                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  {post?.category?.name}
                </span>

                <Link to={`/posts/${post?._id}`}>
                  <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 group-hover:text-emerald-600 transition">
                    {post?.title}
                  </h3>
                </Link>

                <p className="mt-4 text-slate-600 leading-relaxed">
                  {post?.content?.split(" ").slice(0, 18).join(" ")}...
                </p>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">

                  <span className="text-sm text-slate-500">
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </span>

                  <Link
                    to={`/posts/${post?._id}`}
                    className="text-sm font-medium text-slate-900 hover:text-emerald-600"
                  >
                    Read Article →
                  </Link>

                </div>

              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
};

export default UserPosts;