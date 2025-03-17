import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FillRecipes from "../../Shared/FillRecipes/FillRecipes";
import { useForm } from "react-hook-form";

import Form from "react-bootstrap/Form";

import {
  CATEGORIES_URLS,
  privateAxiosInstance,
  RECIPES_URLS,
  TAGS,
} from "../../../services/urls";
import { notify } from "../../../utils/notify";

export default function RecipesData() {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  let addNewRecipe = async (data) => {
    try {
      let response = await privateAxiosInstance.post(
        RECIPES_URLS.ADD_RECIPE,
        data
      );
      notify("Recipe was added successfully", "success");
      navigate("/dashboard/recipes-list");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
  };
  let editRecipe = async (data) => {
    try {
      let response = await privateAxiosInstance.put(
        RECIPES_URLS.RECIPE(id),
        data
      );
      notify("Recipe was edited successfully", "success");
      navigate("/dashboard/recipes-list");
    } catch (error) {
      console.log(error);
      notify(error.response?.data?.message, "error");
    }
  };
  let getCategories = async () => {
    try {
      let response = await privateAxiosInstance.get(
        CATEGORIES_URLS.CATEGORIES_LIST
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  let getTags = async () => {
    try {
      let response2 = await privateAxiosInstance.get(TAGS);
      setTags(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getRecipe = async (RecipeId) => {
    try {
      let response = await privateAxiosInstance.get(
        RECIPES_URLS.RECIPE(RecipeId)
      );
      const recipeData = response?.data;
      setValue("name", recipeData?.name);
      setValue("price", recipeData?.price);
      setValue("tagId", recipeData?.tag?.id);
      setValue("categoriesIds", String(recipeData?.category[0]?.id));
      setValue("description", recipeData?.description);
    } catch (error) {
      console.log(error);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    getCategories();
    getTags();
    if (id) {
      getRecipe(id);
    }
  }, [, id]);

  const onSubmit = (data) => {
    const formData = new FormData();

    for (let key in data) {
      formData.append(key, key === "recipeImage" ? data[key][0] : data[key]);
    }

    if (id) {
      editRecipe(formData);
    } else {
      addNewRecipe(formData);
    }
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  return (
    <>
      <FillRecipes />
      <div className="recipe-data">
        <form onSubmit={handleSubmit(onSubmit)} className="text-center" encType="multipart/form-data">
          <input
            type="text"
            className="d-block mx-auto w-75 "
            placeholder="Recipe Name"
            {...register("name", { required: "recipe name is required" })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}

          <input
            type="number"
            className="d-block mx-auto w-75 "
            placeholder="Price"
            {...register("price", { required: "price is required" })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}

          <Form.Select
            aria-label="Default select example"
            className="d-block mx-auto w-75 "
            placeholder="Tag"
            {...register("tagId", { required: "Tag is required" })}
          >
            <option value="">tag</option>
            {tags.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          {errors.tagId && (
            <span className="text-danger">{errors.tagId.message}</span>
          )}

          <Form.Select
            aria-label="Default select example"
            className="d-block mx-auto w-75 "
            {...register("categoriesIds")}
          >
            <option value="">category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>

          <textarea
            className="d-block mx-auto w-75 "
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}

          <input
            type="file"
            className="d-block mx-auto w-75 "
            placeholder="Recipe Image"
            {
              ...register("recipeImage") //
            }
          />

          <button className="btn" type="submit">
            {isSubmitting ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "save"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
