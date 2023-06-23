# Non-blocking UI

### What is non-blocking UI?

Non-blocking UI is a way of building UI that **does not block the user from interacting** with the application. It is achieved by using asynchronous loading of resources, and prioritizing the loading of critical resources.

### Why is it important?

By prioritizing non-blocking methodologies, we emphasize **responsiveness, scalability, and efficient resource utilization**. That is why we **use `onSSR()` function to load only information that is needed** for the page to be rendered. This way we can **load the page faster** and then load the rest of the data on client side.

User will spend **less time waiting for initial page render**, and will be able to **interact with the page instantly**. Content that is not loaded yet is replaced with **loading animations**, so user knows that it is loading. During this time user can interact with the page, and **when the content is loaded it will be displayed**.


## Server Side Rendering

### What is Server Side Rendering?

Server Side Rendering (SSR) is a way of rendering a page on the server, and then sending it to the client. This way page has **full functionality when it is loaded**, but it **makes the initial load slower**.

### What is Nuxt.js onSSR() function?

Nuxt.js allows us to use SSR. It has a function called `onSSR()` that is called on server side before rendering the page. It allows us to **load data before rendering the page**. This way we can **load data that is needed for the page to be rendered**.

### Why we want to avoid it?

Loading to much data on server side can **slow down the initial page load significantly**. That is why we use onSSR() only when we really need to.

### Usage example:

Sometimes `onSSR()` function has to be used to get better overall performence. In example below function `load()` from `useUser()` is used inside `onSSR()`, it loads user data before loading a page. Every other function is called on client side, but some rely on data from loaded user. That makes it possible to optimize the page load, and load only data that is needed for the page to be rendered.

```js
...
const { load: loadUser, isAuthenticated } = useUser();

onSSR(async () => {
  await loadUser();
});

onMounted(async () => {
  await loadStores();
  if (isAuthenticated.value) await loadWishlists();
  if (!cart.value) {
    await loadCart();
  }
});
...
```
As you can see in the code above, `loadUser()` is called on server side, and `loadWishlists()` is only called if user is authenticated. This way we can save some resources, and load only data that is needed.
