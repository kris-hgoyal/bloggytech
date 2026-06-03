import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  clapPostAction,
  dislikePostAction,
  likePostAction,
} from "../../redux/slices/posts/postSlices";

const PostStats = ({
  views,
  likes,
  dislikes,
  totalComments,
  readingTime,
  createdAt,
  postId,
  claps,
}) => {
  const dispatch = useDispatch();

  const timeSinceCreated = moment(createdAt).fromNow();

  const likePostHandler = () => {
    dispatch(likePostAction(postId));
  };

  const dislikePostHandler = () => {
    dispatch(dislikePostAction(postId));
  };

  const clapPostHandler = () => {
    dispatch(clapPostAction(postId));
  };

  return (
  <div className="my-10 border-y border-slate-200 py-6">

    {/* Meta Info */}
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">

      <span>👁 {views} views</span>

      <span>•</span>

      <span>💬 {totalComments} comments</span>

      <span>•</span>

      <span>{readingTime} min read</span>

      <span>•</span>

      <span>{timeSinceCreated}</span>

    </div>

    {/* Reactions */}
    <div className="mt-5 flex flex-wrap justify-center gap-3">

      <button
        onClick={clapPostHandler}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        👏 {claps}
      </button>

      <button
        onClick={likePostHandler}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        👍 {likes}
      </button>

      <button
        onClick={dislikePostHandler}
        className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        👎 {dislikes}
      </button>

    </div>

  </div>
);
};

export default PostStats;