/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { auth, firestore, serverTimestamp } from "../../lib/firebase";
import styles from "../../styles/Admin.module.css";
export default function AdminPostEdit() {
  return <main>Edit posts</main>;
}

function PostManager({}) {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  let post: any;
  let postRef: any;
  if (typeof slug === "string") {
    postRef = firestore
      .collection("users")
      .doc(auth?.currentUser?.uid)
      .collection("posts")
      .doc(slug);
    post = useDocumentData(postRef);
  }
  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID:{post.slug}</p>
            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
              setPreview={setPreview}
            />
          </section>
        </>
      )}
    </main>
  );
}
function PostForm({ postRef, preview, defaultValues }: any) {
  const { register, handleSubmit, reset, watch }: any = useForm({
    defaultValues,
    mode: "onChange",
  });

  const updatedPost = async ({ content, published }: any) => {
    await postRef.update({ content, published, updatedAt: serverTimestamp() });

    reset({ content, published });
    toast.success("Post updated successfully");
  };

  return (
    <form onSubmit={handleSubmit(updatedPost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}
      <div className={preview ? styles.hidden : styles.controls}>
        <textarea name="content" ref={register}></textarea>
        <fieldset>
          <input
            ref={register}
            type="checkbox"
            name="published"
            className={styles.checkbox}
          />
          <label>Published</label>
        </fieldset>
        <button type="submit" className="btn-green">
          Save Changes
        </button>
      </div>
    </form>
  );
}
