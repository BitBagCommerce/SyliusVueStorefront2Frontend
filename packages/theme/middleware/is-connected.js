export default async ({ app, $vsf, redirect }) => {
  $vsf.$sylius.api.getFirstProductId().then(
    () => {
      if (app.context.route.path === '/connection-error') {
        redirect('/');
      }
    },
    () => {
      redirect('/connection-error');
    }
  );
};
