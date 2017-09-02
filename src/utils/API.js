export let getHotPosts = () => {
  return fetch(`https://www.reddit.com/hot.json?pjson=?`).then(posts => {
    return posts.json();
  });
};
