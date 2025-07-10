import { useContext } from 'react';
import { PostList as PostListDate } from '../store/post-list-store';
import Post from "./Post";

const PostList = () => {

  const { postList } = useContext(PostListDate);

  return <>
    {postList.map(post => <Post key={post.id} post={post} />)}

  </>
}

export default PostList;