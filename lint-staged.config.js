module.exports = {
  '*.{js,css,md,ts,tsx,json}': 'prettier --config .prettierrc --write',
  '*.{ts,tsx}': 'tslint',
  '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
};
