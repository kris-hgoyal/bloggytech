import { Link } from "react-router-dom";
import PublicPosts from "../Posts/PublicPosts";
import addPost from "../Posts/AddPost";
import { useSelector } from "react-redux";

const Homepage = () => {
  const { posts } = useSelector((state) => state?.posts);
  const { userAuth } = useSelector((state) => state?.users);
  const user = userAuth?.userInfo;
  const featuredPost = posts?.post?.[0];
  return (
    <div className="bg-[#fafafa]">
      {/* HERO */}
      {/* HERO */}
      <section className="border-b border-slate-200 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                Modern Publishing Platform
              </p>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-slate-900">
                Ideas
                <br />
                Worth
                <br />
                Sharing.
              </h1>

              <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-slate-600">
                Discover stories, tutorials and insights from developers,
                creators and builders across the world.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to={user ? "/add-post" : "/register"}
                  className="rounded-full bg-slate-900 px-7 py-3 text-white font-medium transition hover:bg-slate-800"
                >
                  Start Writing
                </Link>

                <a
                  href="#featured-posts"
                  className="rounded-full border border-slate-300 px-7 py-3 font-medium text-slate-700 transition hover:bg-white"
                >
                  Explore Stories
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <Link to={`/posts/${featuredPost?._id}`}>
                  <img
                    src={featuredPost?.image}
                    alt={featuredPost?.title}
                    className="h-72 w-full object-cover transition duration-500 hover:scale-105"
                  />
                </Link>

                <div className="p-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    Latest Story
                  </span>

                  <h3 className="mt-4 text-3xl font-bold leading-tight text-slate-900">
                    {featuredPost?.title}
                  </h3>

                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {featuredPost?.content?.split(" ").slice(0, 25).join(" ")}
                    ...
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      {new Date(featuredPost?.createdAt).toLocaleDateString()}
                    </span>

                    <Link
                      to={`/posts/${featuredPost?._id}`}
                      className="font-medium text-slate-900 hover:text-emerald-600 transition"
                    >
                      Read Story →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOPICS */}
      <section className="py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm uppercase tracking-[0.25em] text-slate-500 mb-8">
            Popular Topics
          </h2>

          <div className="flex flex-wrap gap-3">
            {[
              "Web Development",
              "React",
              "JavaScript",
              "Career",
              "Programming",
              "AI",
              "Startups",
              "Productivity",
            ].map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED STORIES HEADER */}
      <section id="featured-posts" className="max-w-7xl mx-auto px-6 pt-20">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-600 font-semibold mb-3">
            Featured Stories
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            What the community is reading.
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Discover the latest articles, tutorials and insights from creators
            on BloggyTech.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <PublicPosts />

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Ready to share your ideas?
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Join BloggyTech and start publishing articles that inspire, educate
            and connect people.
          </p>

          <Link
            to="/register"
            className="inline-flex mt-10 rounded-full bg-slate-900 px-8 py-4 text-white font-medium hover:bg-slate-800 transition"
          >
            Start Writing Today
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-8">
        <div className="text-center text-slate-500 text-sm">
          © 2026 BloggyTech. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
