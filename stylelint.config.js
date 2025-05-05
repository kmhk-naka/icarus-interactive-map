/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-html/svelte'],
  rules: {
    'alpha-value-notation': 'number',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
};
