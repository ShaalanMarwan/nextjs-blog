import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Post } from "../models/post";

export default function Markdown({ post }: { post: any }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt).toLocaleString()
      : post.createdAt.toDate();
  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by {}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post?.username}</a>
        </Link>
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
