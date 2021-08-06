import Head from "next/head";
import React from "react";
import MetaTags from "../../components/Metatags";
export default function AdminPostsPage({}) {
  return (
    <main>
      <MetaTags title="admin page" />
      <h1>Edit post</h1>
    </main>
  );
}
