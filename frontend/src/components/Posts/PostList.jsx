import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostsAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();

  const { posts, error, loading } = useSelector(
    (state) => state?.posts
  );

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchPrivatePostsAction());
  }, [dispatch]);

  const allPosts = posts?.posts || [];

  const categories = useMemo(() => {
    const categoryNames = allPosts
      .map((post) => post?.category?.name)
      .filter(Boolean);

    return ["All", ...new Set(categoryNames)];
  }, [allPosts]);

  const filteredPosts =
    selectedCategory === "All"
      ? allPosts
      : allPosts.filter(
          (post) => post?.category?.name === selectedCategory
        );

  const featuredPost = filteredPosts?.[0];

  return (
    <section className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}

        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-widest uppercase">
            BloggyTech
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tight text-slate-900">
            Explore Articles
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-500">
            Discover insights, tutorials, opinions and stories from creators
            across the community.
          </p>
        </div>

        {/* Loading */}

        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <div className="text-center text-red-500 text-lg">
            {error?.message}
          </div>
        ) : allPosts.length === 0 ? (
          <div className="text-center text-slate-500 text-lg">
            No posts available
          </div>
        ) : (
          <>
            {/* Category Filters */}

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Featured Post */}

            {featuredPost && (
              <Link
                to={`/posts/${featuredPost._id}`}
                className="block mb-16"
              >
                <div className="grid lg:grid-cols-2 overflow-hidden bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-300">

                  <div className="overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full min-h-87.5 object-cover hover:scale-105 transition duration-700"
                    />
                  </div>

                  <div className="p-8 md:p-10 flex flex-col justify-center">

                    <span className="inline-block mb-4 text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                      Featured Article
                    </span>

                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-5">
                      {featuredPost.title}
                    </h2>

                    <p className="text-slate-500 leading-relaxed mb-6">
                      {featuredPost.content
                        ?.split(" ")
                        .slice(0, 40)
                        .join(" ")}
                      ...
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <span>
                        {featuredPost?.category?.name}
                      </span>

                      <span>•</span>

                      <span>
                        {new Date(
                          featuredPost.createdAt
                        ).toDateString()}
                      </span>
                    </div>

                    <span className="font-semibold text-slate-900">
                      Read Article →
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    border-slate-200
                    hover:-translate-y-1
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  <Link to={`/posts/${post._id}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-56 object-cover"
                    />
                  </Link>

                  <div className="p-6">

                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                        {post?.category?.name}
                      </span>

                      <span className="text-xs text-slate-400">
                        {new Date(
                          post.createdAt
                        ).toDateString()}
                      </span>
                    </div>

                    <Link to={`/posts/${post._id}`}>
                      <h3 className="text-xl font-bold text-slate-900 hover:text-emerald-600 transition mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-slate-500 mb-5 line-clamp-3">
                      {post.content
                        ?.split(" ")
                        .slice(0, 20)
                        .join(" ")}
                      ...
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-500">

                      <div className="flex gap-4">
                        <span>❤️ {post.likes?.length || 0}</span>
                        <span>👏 {post.claps || 0}</span>
                        <span>💬 {post.comments?.length || 0}</span>
                      </div>

                      <Link
                        to={`/posts/${post._id}`}
                        className="font-semibold text-slate-900 hover:text-emerald-600"
                      >
                        Read →
                      </Link>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PostList;