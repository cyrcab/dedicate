## Installation des dépendances
```
  npm run install:all
```

## Lancement des tests globaux
```
  npm run test
```

## Lancement des tests pour un scope en particulier
```
  npm run test:{nom du package}
```

## Lancement du linter sur tous les packages
```
  npm run lint
```

## Lancement du linter sur un package en particulier
```
  npm run lint:{nom du package}
```

## Installation d'un module dans un package (lerna)
```
  npx lerna add {module js à installer} --scope={nom du package}
```
