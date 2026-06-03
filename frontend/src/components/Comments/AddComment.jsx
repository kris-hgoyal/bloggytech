import React, { useEffect, useState } from "react";
import CommentsList from "./CommentLists";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../redux/slices/comments/commentSlices";

const AddComment = ({ postId, comments }) => {
  const [formData, setFormData] = useState({
    message: "",
  });

  const dispatch = useDispatch();

  const { success } = useSelector(
    (state) => state?.comments
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (success) {
      setFormData({
        message: "",
      });
    }
  }, [success]);
  
   useEffect(() => {
      if (success) {
        window.location.reload();
      }
    }, [dispatch, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.message.trim()) return;

    dispatch(
      createCommentAction({
        ...formData,
        postId,
      })
    );
  };

  return (
    <section className="mt-16">

      {/* Heading */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-slate-900">
          Discussion
        </h3>

        <p className="mt-2 text-slate-500">
          Share your thoughts about this article.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 rounded-3xl border border-slate-200 bg-white p-6"
      >
        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="What are your thoughts?"
          className="w-full resize-none border-none bg-transparent text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Publish Comment
          </button>
        </div>
      </form>

      {/* Comments */}
      <CommentsList comments={comments} />

    </section>
  );
};

export default AddComment;