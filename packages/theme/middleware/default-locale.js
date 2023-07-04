export default ({ route, redirect, i18n }) => {
  const { fullPath } = route;
  const { defaultLocale } = i18n;
  const regex = new RegExp(
    `(^\\/${defaultLocale}(\\/|$)|^\\/${defaultLocale}(?=\\?))`
  );
  const redirectPath = fullPath.replace(regex, '/');

  if (redirectPath !== fullPath) return redirect(redirectPath);
};
