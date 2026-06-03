import { FiUpload } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profilePicture from "../../assets/profile-picture.png";
import coverImage from "../../assets/cover-image.png";

export default function UserProfile() {
  const { userAuth } = useSelector((state) => state?.users);
  const user = userAuth?.userInfo;
  return (
  <section className="min-h-screen bg-[#fafafa] py-8 md:py-10">
    <div className="max-w-6xl mx-auto px-4">

      {/* Banner */}
      <div className="relative">
        <img
          src={user?.coverImage || coverImage}
          alt=""
          className="w-full h-52 md:h-72 rounded-3xl object-cover"
        />
      </div>

      {/* Profile Header */}
      <div className="relative -mt-16 md:-mt-20">

        <div className="flex flex-col items-center">

          <img
            src={user?.profilePicture || profilePicture}
            alt=""
            className="
              h-32
              w-32
              md:h-40
              md:w-40
              rounded-full
              object-cover
              border-4
              border-white
              shadow-xl
              bg-white
            "
          />

          <div className="w-full mt-6 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div className="text-center lg:text-left">

                <h1 className="text-3xl md:text-4xl font-black text-slate-900">
                  {user?.username || "User"}
                </h1>

                <p className="mt-2 text-slate-500">
                  {user?.email}
                </p>

                <div className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  {(user?.accountLevel || "bronze").toUpperCase()} MEMBER
                </div>

              </div>

              <Link
                to="/update-profile"
                className="
                  self-center
                  lg:self-auto
                  px-6
                  py-3
                  bg-slate-900
                  text-white
                  rounded-xl
                  font-semibold
                  hover:bg-slate-800
                  transition
                "
              >
                Edit Profile
              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

              <div className="rounded-2xl border border-slate-200 p-4 text-center">
                <p className="text-2xl font-black text-slate-900">
                  {user?.followers?.length || 0}
                </p>
                <p className="text-sm text-slate-500">
                  Followers
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 text-center">
                <p className="text-2xl font-black text-slate-900">
                  {user?.following?.length || 0}
                </p>
                <p className="text-sm text-slate-500">
                  Following
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 text-center">
                <p className="text-2xl font-black text-slate-900">
                  {user?.posts?.length || 0}
                </p>
                <p className="text-sm text-slate-500">
                  Posts
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 text-center">
                <p className="text-2xl font-black text-slate-900">
                  {user?.profileViewers?.length || 0}
                </p>
                <p className="text-sm text-slate-500">
                  Views
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="mt-10 grid lg:grid-cols-3 gap-6">

        {/* Left Side */}

        <div className="lg:col-span-2 space-y-6">

          {/* About */}

          <div className="bg-white border border-slate-200 rounded-3xl p-6">

            <h2 className="text-xl font-bold text-slate-900 mb-4">
              About Me
            </h2>

            <p className="text-slate-600 leading-relaxed">
              {user?.bio ||
                "No bio added yet. Update your profile and tell the community about yourself."}
            </p>

          </div>

          {/* Personal Information */}

          <div className="bg-white border border-slate-200 rounded-3xl p-6">

            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <p className="text-sm text-slate-500">Username</p>
                <p className="font-semibold text-slate-900 mt-1">
                  {user?.username || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold text-slate-900 mt-1">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-semibold text-slate-900 mt-1">
                  {user?.location || "Not Provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Gender</p>
                <p className="font-semibold text-slate-900 mt-1">
                  {user?.gender || "Not Provided"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="space-y-6">

          <div className="bg-white border border-slate-200 rounded-3xl p-6">

            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Account Status
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Level
                </span>

                <span className="font-semibold text-slate-900 capitalize">
                  {user?.accountLevel || "bronze"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Verified
                </span>

                <span
                  className={
                    user?.isVerified
                      ? "text-emerald-600 font-semibold"
                      : "text-red-500 font-semibold"
                  }
                >
                  {user?.isVerified
                    ? "Verified"
                    : "Not Verified"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Joined
                </span>

                <span className="font-semibold text-slate-900">
                  {user?.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-slate-900 p-6 text-white">

            <h3 className="font-bold text-xl">
              Grow Your Profile
            </h3>

            <p className="mt-3 text-slate-300">
              Publish quality posts consistently to attract followers and
              increase engagement.
            </p>

          </div>

        </div>

      </div>

    </div>
  </section>
);
}
