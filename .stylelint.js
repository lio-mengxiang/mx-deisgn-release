module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  customSyntax: 'postcss-less',
  rules: {
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'font-family-no-missing-generic-family-keyword': null,
    'block-opening-brace-space-before': 'always',
    'declaration-block-trailing-semicolon': null,
    'declaration-colon-newline-after': null,
    indentation: null,
    'selector-descendant-combinator-no-non-space': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'no-invalid-position-at-import-rule': null,
    'number-max-precision': 6,
    'color-function-notation': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
