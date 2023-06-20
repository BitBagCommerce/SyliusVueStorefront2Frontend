export default async ({ app, $vsf, redirect }) => {
  try {
    const token = app.context.route.query.token;

    if (!token) redirect('/');

    const response = await $vsf.$sylius.api.validateResetUserPassword({
      token: token,
    });

    if (!response.username) redirect('/');
  } catch (e) {
    redirect('/');
  }
};
