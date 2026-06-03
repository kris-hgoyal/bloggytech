import React, { useEffect } from "react";
import profilePicture from "../../assets/profile-picture.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  getPostAction,
  postViewCountAction,
} from "../../redux/slices/posts/postSlices";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import PostStats from "./PostStats";
import calculateReadingTime from "../../utils/calculateReadingTime";
import AddComment from "../Comments/AddComment";

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, error, success, loading } = useSelector(
    (state) => state?.posts,
  );
  const { userAuth } = useSelector((state) => state?.users);
  const { postId } = useParams();

  useEffect(() => {
    dispatch(getPostAction(postId));
  }, [dispatch, postId,]);
  
  //! Post view count
  useEffect(() => {
  if (userAuth?.userInfo?.token) {
    dispatch(postViewCountAction(postId));
  }
}, [dispatch, postId, userAuth]);
  //get creater id
  const creator = post?.post?.author?._id?.toString();
  //login id
  const loggedInUser = userAuth?.userInfo?._id?.toString();
  //check wheather both are same
  const isCreator = creator === loggedInUser;

  const deletePostHandler = async () => {
    try {
      await dispatch(deletePostAction(postId));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (success) {
      navigate("/posts");
    }
  }, [success, navigate]);
  return (
    <>
      {error ? (
        <ErrorMsg message={error?.message} />
      ) : loading ? (
        <LoadingComponent />
      ) : (
        <section className="bg-[#fafafa] py-16">
          <div className="max-w-5xl mx-auto px-6">
            {/* Category */}
            <div className="text-center">
              <span className="inline-block rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
                {post?.post?.category?.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-8 text-center text-4xl md:text-6xl font-black tracking-tight text-slate-900">
              {post?.post?.title}
            </h1>

            {/* Author */}
            <Link
              to={`/user-public-profile/${post?.post?.author?._id}`}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <img
                src={post?.post?.author?.profilePicture || profilePicture}
                alt={post?.post?.author?.username}
                className="h-14 w-14 rounded-full object-cover border border-slate-200"
              />

              <div className="text-left">
                <h4 className="font-semibold text-slate-900">
                  {post?.post?.author?.username}
                </h4>

                <p className="text-sm text-slate-500">
                  {new Date(post?.post?.createdAt).toDateString()}
                </p>
              </div>
            </Link>

            {/* Hero Image */}
            <div className="mt-12">
              <img
                src={post?.post?.image}
                alt={post?.post?.title}
                className="w-full rounded-3xl object-cover max-h-137.5"
              />
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto mt-12">
              <div
                className="
                whitespace-pre-line
                text-lg
                leading-9
                text-slate-700
              "
              >
                {post?.post?.content}
              </div>

              {/* Post Stats */}
              <PostStats
                views={post?.post?.postViews?.length}
                likes={post?.post?.likes?.length}
                dislikes={post?.post?.dislikes?.length}
                totalComments={post?.post?.comments?.length}
                createdAt={post?.post?.createdAt}
                readingTime={calculateReadingTime(post?.post?.content)}
                postId={post?.post?._id}
                claps={post?.post?.claps}
              />

              {/* Creator Actions */}
              {isCreator && (
                <div className="flex justify-center gap-4 my-8">
                  <Link
                    to={`/posts/update/${post?.post?._id}`}
                    className="
                    rounded-full
                    border
                    border-slate-300
                    px-5
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition
                    hover:bg-slate-50
                  "
                  >
                    Edit Article
                  </Link>

                  <button
                    onClick={deletePostHandler}
                    className="
                    rounded-full
                    border
                    border-red-200
                    px-5
                    py-2
                    text-sm
                    font-medium
                    text-red-500
                    transition
                    hover:bg-red-50
                  "
                  >
                    Delete Article
                  </button>
                </div>
              )}

              {/* Comments */}
              <AddComment postId={postId} comments={post?.post?.comments} />
            </article>
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
