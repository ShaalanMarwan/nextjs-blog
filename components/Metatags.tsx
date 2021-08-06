import Head from "next/head";
export default function MetaTags({ title, description, image }: any) {
  return (
    <Head>
      <title>My Page</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@shaalan.dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="og:description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:image" content={image} />
    </Head>
  );
}
