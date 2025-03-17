import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FillRecipes from "../../Shared/FillRecipes/FillRecipes";
import { useForm } from "react-hook-form";

import Form from "react-bootstrap/Form";
import {
  CATEGORIES_URLS,
  privateAxiosInstance,
  TAGS,
} from "../../../services/urls";

export default function RecipesData() {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

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

  // let processRecipe = async (RecipeId, operation) => {
  // response = await privateAxiosInstance.get(
    //           RECIPES_URLS.RECIPE(RecipeId)
    //         );
    //         console.log(response.data);

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    // defaultValues: { name: "" },
    mode: "onChange",
  });

  const currentPath = window.location.pathname;
  if (!currentPath.endsWith("recipe-data")) {
    const { id } = useParams();
    console.log(id);
  }

  return (
    <>
      <FillRecipes />
      <div className="recipe-data">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-center"
        >
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
          {errors.name && (
            <span className="text-danger">{errors.price.message}</span>
          )}

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setTagFilter(e.target.value)}
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
          {errors.name && (
            <span className="text-danger">{errors.tagId.message}</span>
          )}

          <Form.Select
            aria-label="Default select example"
            className="d-block mx-auto w-75 "
            onChange={(e) => setCategoryFilter(e.target.value)}
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
          {errors.name && (
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
