import React from "react";

const CommentsList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-slate-500">
          No comments yet. Start the discussion.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments?.map((comment) => (
        <article
          key={comment?._id}
          className="rounded-3xl border border-slate-200 bg-white p-6"
        >
          <div className="flex items-start gap-4">

            {/* Avatar */}
            <img
              src={
                comment?.author?.profilePicture ||
                "https://placehold.co/100x100"
              }
              alt={comment?.author?.username}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="flex-1">

              {/* Header */}
              <div className="flex flex-wrap items-center gap-3">

                <h4 className="font-semibold text-slate-900">
                  {comment?.author?.username}
                </h4>

                <span className="text-sm text-slate-400">
                  •
                </span>

                <span className="text-sm text-slate-500">
                  {new Date(comment?.createdAt).toDateString()}
                </span>

              </div>

              {/* Comment */}
              <p className="mt-3 leading-relaxed text-slate-700">
                {comment?.message}
              </p>

            </div>

          </div>
        </article>
      ))}
    </div>
  );
};

export default CommentsList;