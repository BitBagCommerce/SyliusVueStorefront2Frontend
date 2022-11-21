export default async ({ app, $vsf, redirect }) => {
  try {
    $vsf.$sylius.api.getCategory().then(function() {
      if (app.context.route.path === '/connection-error') {
        redirect('/');
      }
    }, function() {
      redirect('/connection-error');
    });
  } catch (e) {

  }
};
