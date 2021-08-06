import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { Post } from "../../models/post";
import { User } from "../../models/user";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";
export default function UserProfilePage({
  user,
  posts,
}: {
  user: User;
  posts: Array<Post>;
}) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed admin={true} posts={posts} />
    </main>
  );
}
export async function getServerSideProps({ query }: { query: any }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);
  let user = null;
  let posts = null;
  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5)
      posts = (await postsQuery.get()).docs.map(postToJSON);

  }
  return {
    props: { user, posts },
  };
}
