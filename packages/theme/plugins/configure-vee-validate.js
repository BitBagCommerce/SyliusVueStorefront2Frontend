import { required, min, oneOf, email, digits, confirmed } from 'vee-validate/dist/rules';
import { extend, configure } from 'vee-validate';

export default function ({ app }) {
  extend('required', required);

  extend('min', min);

  extend('oneOf', oneOf);

  extend('email', email);

  extend('digits', digits);

  extend('passwordMatch', {
    ...confirmed,
    message: app.i18n.t('Passwords don\'t match')
  });

  extend('password', {
    validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
    message: app.i18n.t('Password must have at least 8 characters including one letter and a number')
  });

  configure({
    defaultMessage: (field, values) => {
      values._field_ = app.i18n.t(`${field}`);
      return app.i18n.t(`validations.${values._rule_}`, values);
    }
  });
}
