import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
    // Ajouter des règles personnalisées ici
    {
      "rules": {
        // Désactiver l'avertissement de variables inutilisées dans catch
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "argsIgnorePattern": "^_" // Ignore les variables avec des noms commençant par "_"
          }
        ],
      }
    }
];

export default eslintConfig;
