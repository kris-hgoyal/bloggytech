import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import { addPostAction } from "../../redux/slices/posts/postSlices";

import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";

const AddPost = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const { error, success, loading } = useSelector(
    (state) => state?.posts
  );

  const { categories } = useSelector(
    (state) => state?.categories
  );

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const options = categories?.categories?.map((category) => ({
    value: category?._id,
    label: category?.name,
  }));

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  const validateForm = (data) => {
    let errors = {};

    if (!data.title) errors.title = "Title is Required";
    if (!data.image) errors.image = "Cover image is Required";
    if (!data.category) errors.category = "Category is Required";
    if (!data.content) errors.content = "Content is Required";

    return errors;
  };

  const handleBlur = (e) => {
    const formErrors = validateForm(formData);
    const { name } = e.target;

    setErrors({
      ...errors,
      [name]: formErrors[name],
    });
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      dispatch(addPostAction(formData));

      setFormData({
        title: "",
        image: null,
        category: null,
        content: "",
      });

      setPreview(null);
    }
  };

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

  return (
    <section className="min-h-screen bg-[#fafafa] py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Publish
          </p>

          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Write a Story
          </h1>

          <p className="mt-4 text-lg text-slate-500">
            Share tutorials, experiences and insights with the BloggyTech
            community.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            md:p-10
          "
        >

          {/* Alerts */}
          {error && (
            <div className="mb-6">
              <ErrorMsg message={error?.message} />
            </div>
          )}

          {success && (
            <div className="mb-6">
              <SuccessMsg message="Article published successfully" />
            </div>
          )}

          {/* Title */}
          <div className="mb-8">
            <input
              type="text"
              name="title"
              placeholder="Enter your article title..."
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className="
                w-full
                border-none
                text-4xl
                md:text-5xl
                font-black
                text-slate-900
                placeholder:text-slate-300
                focus:outline-none
                focus:ring-0
              "
            />

            {errors?.title && (
              <p className="mt-2 text-sm text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          {/* Cover Image */}
          <div className="mb-8">
            <label className="block mb-3 text-sm font-semibold text-slate-700">
              Cover Image
            </label>

            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
              className="
                block
                w-full
                rounded-xl
                border
                border-slate-200
                p-4
              "
            />

            {errors?.image && (
              <p className="mt-2 text-sm text-red-500">
                {errors.image}
              </p>
            )}

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="
                  mt-6
                  h-80
                  w-full
                  rounded-2xl
                  object-cover
                "
              />
            )}
          </div>

          {/* Category */}
          <div className="mb-8">
            <label className="block mb-3 text-sm font-semibold text-slate-700">
              Category
            </label>

            <Select
              options={options}
              styles={customSelectStyles}
              onChange={handleSelectChange}
              onBlur={handleBlur}
            />

            {errors?.category && (
              <p className="mt-2 text-sm text-red-500">
                {errors.category}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="mb-8">
            <label className="block mb-3 text-sm font-semibold text-slate-700">
              Story
            </label>

            <textarea
              rows={8}
              name="content"
              value={formData.content}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell your story..."
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                p-6
                text-lg
                leading-8
                text-slate-700
                placeholder:text-slate-400
                focus:border-slate-400
                focus:outline-none
              "
            />

            {errors?.content && (
              <p className="mt-2 text-sm text-red-500">
                {errors.content}
              </p>
            )}
          </div>

          {/* Button */}
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
                Publish Article
              </button>
            )}
          </div>

        </form>
      </div>
    </section>
  );
};

export default AddPost;