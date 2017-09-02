export let getHotPosts = () => {
  return fetch(`https://www.reddit.com/hot.json`).then(posts => {
    return posts.json();
  });
};
