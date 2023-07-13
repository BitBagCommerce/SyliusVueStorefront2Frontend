export default ({ route, redirect, i18n }) => {
  const { fullPath } = route;
  const { defaultLocale } = i18n;
  // Finds locale string in URL e.g. /en
  const localeRegex = new RegExp(
    `(^\\/${defaultLocale}(\\/|$)|^\\/${defaultLocale}(?=\\?))`
  );
  const redirectPath = fullPath.replace(localeRegex, '/');

  if (redirectPath !== fullPath) return redirect(redirectPath);
};
