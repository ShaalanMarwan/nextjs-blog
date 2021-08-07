/* eslint-disable @next/next/link-passhref */
import { Post } from "../models/post";
import Link from "next/link";
export default function PostFeed({
  posts,
  admin,
}: {
  posts: Post[] | any[]|undefined;
  admin?: any;
}): JSX.Element {
  return (
    <>
      {posts ? (
        posts?.map((post) => (
          <PostItem key={post.slug} post={post} admin={admin} />
        ))
      ) : (
        <>No posts</>
      )}
    </>
  );
}

function PostItem({ post, admin = false }: { post: Post; admin: any }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min to read.
        </span>
        <span>{post.heartCount} Hearts</span>
      </footer>
    </div>
  );
}
