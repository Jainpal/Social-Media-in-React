import { createContext, useReducer } from 'react';

export const PostList = createContext({
  postList: [],
  addPost: () => { },
  deletePost: () => { },
});

const postListReducer = (curPostList, action) => {
  let newPostList;

  if (action.type === 'DELETE_POST') {
    newPostList = curPostList.filter(post => post.id != action.payload.id);
  } else if (action.type === 'ADD_POST') {
    newPostList = [action.payload, ...curPostList];
  }

  return newPostList;
}

const PostListProvider = ({ children }) => {

  const [postList, dispatchPostList] = useReducer(postListReducer,
    DEFAULT_POST_LIST);

  const addPost = (newPost) => {
    console.log(newPost);
    const toAddPost = {
      type: 'ADD_POST',
      payload: {
        id: Date.now(),
        title: newPost.title,
        body: newPost.body,
        reaction: newPost.reaction,
        userId: newPost.userId,
        tags: newPost.tags,
      }
    };
    dispatchPostList(toAddPost);
  }

  const deletePost = (id) => {
    const toDeletePost = {
      type: 'DELETE_POST',
      payload: {
        id,
      },
    };
    dispatchPostList(toDeletePost);
    console.log(id);
  }

  return <PostList.Provider value={{
    postList,
    addPost,
    deletePost,
  }}>
    {children}
  </PostList.Provider>
}

const DEFAULT_POST_LIST = [{
  id: '1',
  title: 'Going to Mumbai',
  body: 'Hi, Friends, I am going to mumbai for my vacations. Hope to enjoy a lot. Peace out',
  reaction: 2,
  userId: 'user-9',
  tags: ["vacation", "mumbai", "enjoying"],
},
{
  id: '2',
  title: 'Pass hu bhai',
  body: '4 saal ke masti ke baad bhi pass ho gaye Hard to believe',
  reaction: 15,
  userId: 'user-12',
  tags: ["graduation", "unbelievable"],
},]

export default PostListProvider;