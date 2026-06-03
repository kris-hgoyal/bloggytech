import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilePicture from "../../assets/profile-picture.png";
import coverImage from "../../assets/cover-image.png";
import {
  blockUserAction,
  followUserAction,
  unBlockUserAction,
  unFollowUserAction,
  userPrivateProfileAction,
  userPublicProfileAction,
} from "../../redux/slices/users/userSlices";

import { useParams } from "react-router-dom";
import UserPosts from "./UserPosts";

export default function PublicUserProfile() {
  // Get the id from params
  const { userId } = useParams(); //! Get data from store
  const { loading, error, user, profile } = useSelector(
    (state) => state?.users,
  );
  console.log(user)
  //! Get all the users the login user has blocked
  const blockedUsers = profile?.user?.blockedUsers; //! Check whether the current author is in blockedUsers
  const hasBlocked = blockedUsers?.some((user) => user?._id === userId);
  //! Get all the users the login user has followed
  const followedUsers = profile?.user?.following; //! Check whether the current user is following current author
  const hasfollowed = followedUsers?.some((user) => user?._id === userId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPublicProfileAction(userId));
  }, [userId, dispatch]);
  useEffect(() => {
    dispatch(userPrivateProfileAction());
  }, [dispatch]);

  
  //Block user handler
  const blockUserHandler = async () => {
    await dispatch(blockUserAction(userId));
    dispatch(userPrivateProfileAction());
  };
  //unBlock user handler
  const unblockUserHandler = async () => {
    await dispatch(unBlockUserAction(userId));
    dispatch(userPrivateProfileAction());
  };

  //follow user handler
  const followUserHandler = async () => {
    await dispatch(followUserAction(userId));
    dispatch(userPrivateProfileAction());
  };
  //unfollow user handler
  const unfollowUserHandler = async () => {
    await dispatch(unFollowUserAction(userId));
    dispatch(userPrivateProfileAction());
  };

  return (
  <>
    <section className="bg-[#fafafa] min-h-screen">

      {/* Cover */}
      <div className="relative h-72 overflow-hidden">

        <img
          src={
            user?.user?.coverImage ||
            coverImage
          }
          alt=""
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

      </div>

      {/* Profile */}
      <div className="max-w-6xl mx-auto px-6">

        <div className="-mt-24 relative z-10">

          <div className="flex flex-col items-center text-center">

            <img
              src={
                user?.user?.profilePicture ||
                profilePicture
              }
              alt={user?.user?.username}
              className="
                h-40
                w-40
                rounded-full
                border-8
                border-[#fafafa]
                object-cover
                shadow-lg
              "
            />

            <h1 className="mt-6 text-4xl md:text-5xl font-black text-slate-900">
              {user?.user?.username}
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600 leading-relaxed">
              {user?.user?.bio ||
                "Sharing thoughts, tutorials and insights on BloggyTech."}
            </p>

            {user?.user?.location && (
              <p className="mt-3 text-sm text-slate-500">
                📍 {user?.user?.location}
              </p>
            )}

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-10">

              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {user?.user?.posts?.length || 0}
                </p>

                <p className="text-sm text-slate-500">
                  Articles
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {user?.user?.followers?.length || 0}
                </p>

                <p className="text-sm text-slate-500">
                  Followers
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-slate-900">
                  {user?.user?.following?.length || 0}
                </p>

                <p className="text-sm text-slate-500">
                  Following
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">

              {!hasfollowed ? (
                <button
                  onClick={followUserHandler}
                  className="
                    rounded-full
                    bg-slate-900
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-slate-800
                  "
                >
                  Follow Author
                </button>
              ) : (
                <button
                  onClick={unfollowUserHandler}
                  className="
                    rounded-full
                    border
                    border-slate-300
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Following
                </button>
              )}

              {hasBlocked ? (
                <button
                  onClick={unblockUserHandler}
                  className="
                    rounded-full
                    border
                    border-red-200
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-red-500
                  "
                >
                  Unblock
                </button>
              ) : (
                <button
                  onClick={blockUserHandler}
                  className="
                    rounded-full
                    border
                    border-slate-300
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Block
                </button>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Author Articles */}
      <div className="mt-24">

        <div className="max-w-6xl mx-auto px-6 mb-12">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Articles
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900">
            Articles by {user?.user?.username}
          </h2>

          <p className="mt-3 text-slate-500">
            Explore stories, tutorials and insights from this author.
          </p>

        </div>

        <UserPosts posts={user?.user?.posts} />

      </div>

    </section>
  </>
);
}
