import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      // --- UPDATE POST LOGIC ---
      if (post) {
        let imageId = post.featuredImage;
        if (data.image && data.image[0]) {
          const newFile = await appwriteService.uploadFile(data.image[0]);
          if (newFile) {
            await appwriteService.deleteFile(post.featuredImage);
            imageId = newFile.$id;
          }
        }
        const postData = { ...data, featuredImage: imageId };
        const dbPost = await appwriteService.updatePost(post.$id, postData);
        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
      // --- CREATE NEW POST LOGIC ---
      else {
        if (!data.image || !data.image[0]) {
          throw new Error("Featured Image is required for a new post.");
        }
        const file = await appwriteService.uploadFile(data.image[0]);
        const user = await authService.getCurrentUser();
        console.log("Current user:", user);
        if (!user || !user.$id) {
          throw new Error("User not authenticated. Please log in.");
        }
        if (file) {
          const fileId = file.$id;
          const postData = {
            ...data,
            featuredImage: fileId,
            user: user.$id, // Pass only user ID as string
          };
          const dbPost = await appwriteService.createPost(postData);
          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (err) {
      console.error("Error in submit:", err.message || err);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
