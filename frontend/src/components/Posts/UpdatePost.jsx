import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

import {
  updatePostAction,
  getPostAction,
} from "../../redux/slices/posts/postSlices";

import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import { resetSuccessAction } from "../../redux/slices/globalSlice/globalSlices";

import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";

const UpdatePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const { post, error, success, loading } = useSelector(
    (state) => state?.posts
  );

  const { categories } = useSelector(
    (state) => state?.categories
  );

  const [formData, setFormData] = useState({
    title: "",
    category: null,
  });

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // Fetch current post
  useEffect(() => {
    dispatch(getPostAction(postId));
  }, [dispatch, postId]);

  // Populate form
  useEffect(() => {
    if (post?.post) {
      setFormData({
        title: post?.post?.title || "",
        category: post?.post?.category?._id || null,
      });
    }
  }, [post]);

  // Success Alert
  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Post Updated Successfully",
        confirmButtonColor: "#0f172a",
      });

      dispatch(resetSuccessAction());
    }
  }, [success, dispatch]);

  const options = categories?.categories?.map((category) => ({
    value: category?._id,
    label: category?.name,
  }));

  const selectedCategory = options?.find(
    (option) => option.value === formData.category
  );

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "58px",
      borderRadius: "16px",
      borderColor: "#e2e8f0",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#cbd5e1",
      },
    }),
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updatePostAction({
        ...formData,
        postId,
      })
    );
  };

  return (
    <section className="min-h-screen bg-[#fafafa] py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Manage Article
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Edit Article
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            Update your article title and category.
          </p>
        </div>

        {/* Card */}
        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            md:p-10
          "
        >
          {/* Error */}
          {error && (
            <div className="mb-6">
              <ErrorMsg message={error?.message} />
            </div>
          )}

          {/* Current Info */}
          <div
            className="
              mb-8
              rounded-2xl
              border
              border-amber-200
              bg-amber-50
              p-5
            "
          >
            <p className="text-sm text-amber-700">
              Published articles can only be updated for title and category.
            </p>

            {/* <div className="mt-4 border-t border-amber-200 pt-4">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Current Title:</span>{" "}
                {post?.post?.title}
              </p>

              <p className="mt-2 text-sm text-slate-700">
                <span className="font-semibold">Current Category:</span>{" "}
                {post?.post?.category?.name}
              </p>
            </div> */}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-8">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Article Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter updated title..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-200
                  px-5
                  py-4
                  text-lg
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-slate-400
                  focus:outline-none
                "
              />
            </div>

            {/* Category */}
            <div className="mb-10">
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Category
              </label>

              <Select
                options={options}
                value={selectedCategory}
                styles={customSelectStyles}
                onChange={handleSelectChange}
                placeholder="Select category"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              {loading ? (
                <LoadingComponent />
              ) : (
                <button
                  type="submit"
                  className="
                    rounded-full
                    bg-slate-900
                    px-8
                    py-4
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-slate-800
                  "
                >
                  Save Changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePost;