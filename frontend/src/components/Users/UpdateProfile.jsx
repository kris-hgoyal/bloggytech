import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../redux/slices/users/userSlices";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import profilePicture from "../../assets/profile-picture.png";
import coverImage from "../../assets/cover-image.png";

export default function UpdateProfile() {
  const dispatch = useDispatch();

  const { userAuth, loading, error, success } = useSelector(
    (state) => state.users
  );

  const user = userAuth?.userInfo;

  const [formData, setFormData] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    location: user?.location || "",
    gender: user?.gender || "",
    profilePicture: null,
    coverImage: null,
  });

  const [profilePreview, setProfilePreview] = useState(
    user?.profilePicture || profilePicture
  );

  const [coverPreview, setCoverPreview] = useState(
    user?.coverImage || coverImage
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...formData,
      profilePicture: file,
    });
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({
      ...formData,
      coverImage: file,
    });
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileAction(formData));
  };

  return (
    <section className="min-h-screen bg-[#fafafa] py-10">
      <div className="max-w-6xl mx-auto px-4">

        <form onSubmit={handleSubmit}>

          {/* Banner */}

          <div className="relative">

            <img
              src={coverPreview}
              alt=""
              className="w-full h-52 md:h-72 rounded-3xl object-cover"
            />

            <label
              htmlFor="coverImage"
              className="
                absolute
                bottom-4
                right-4
                cursor-pointer
                rounded-xl
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                shadow
              "
            >
              Change Cover
            </label>

            <input
              id="coverImage"
              type="file"
              hidden
              onChange={handleCoverImage}
            />

          </div>

          {/* Profile Section */}

          <div className="relative -mt-16 md:-mt-20">

            <div className="flex flex-col items-center">

              <div className="relative">

                <img
                  src={profilePreview}
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

                <label
                  htmlFor="profilePicture"
                  className="
                    absolute
                    bottom-2
                    right-2
                    cursor-pointer
                    rounded-full
                    bg-slate-900
                    px-3
                    py-2
                    text-xs
                    text-white
                  "
                >
                  Edit
                </label>

                <input
                  id="profilePicture"
                  type="file"
                  hidden
                  onChange={handleProfileImage}
                />

              </div>

              <div className="w-full mt-6 bg-white border border-slate-200 rounded-3xl p-6 md:p-8">

                <h1 className="text-3xl font-black text-slate-900 mb-8">
                  Edit Profile
                </h1>

                {error && (
                  <ErrorMsg message={error?.message} />
                )}

                {success && (
                  <SuccessMsg message="Profile Updated Successfully" />
                )}

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Username
                    </label>

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:border-slate-900
                      "
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:border-slate-900
                      "
                    />

                  </div>

                  <div className="md:col-span-2">

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bio
                    </label>

                    <textarea
                      rows="5"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:border-slate-900
                      "
                    />

                  </div>

                  <div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Gender
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        focus:border-slate-900
                      "
                    >
                      <option value="">
                        Select Gender
                      </option>

                      <option value="male">
                        Male
                      </option>

                      <option value="female">
                        Female
                      </option>

                      <option value="non-binary">
                        Non-Binary
                      </option>

                      <option value="prefer not to say">
                        Prefer Not To Say
                      </option>
                    </select>

                  </div>

                </div>

                <div className="mt-8">

                  {loading ? (
                    <LoadingComponent />
                  ) : (
                    <button
                      type="submit"
                      className="
                        px-8
                        py-3
                        rounded-xl
                        bg-slate-900
                        text-white
                        font-semibold
                        hover:bg-slate-800
                        transition
                      "
                    >
                      Save Changes
                    </button>
                  )}

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>
    </section>
  );
}