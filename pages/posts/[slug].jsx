import React from 'react';
import PostContent from '../../components/posts/post-detail/post-content';

import { getPostData, getPostsFiles } from '../../lib/posts.util';

const PostDetailPage = ({ post }) => {
  return <PostContent post={post}/>;
};

export default PostDetailPage;

export function getStaticProps({ params: { slug } }) {
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600, // ! not slow down
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: 'blocking', // ? dont understand -> maximilian-e16
  };
}
