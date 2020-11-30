# Boilerplate El Tigre

Le boilerplate utilisé pour démarrer un projet WP El Tigre.

## Installation

Cloner le repository

```
git clone git@bitbucket.org:el-tigre-dev/boilerplate-wp-eltigre.git
```

Renommer le dossier nouvellement créé "boilerplate-wp-eltigre" par le nom du projet

```
mv boilerplate-wp-eltigre NOM_PROJET
```

Entrer dans ce nouveau dossier

```
cd NOM_PROJET
```

Installer les éléments

```
composer install
```

Créer une base de données pour le projet

```
mysql -uroot -p -e "create database NOM_PROJET"
```

Créer un fichier .env à la racine, en utilisant le .env.example comme modèle, et le remplir avec les informations du site. Le paramètre WP_HOME doit être l'url du site, et doit donc commencer par "http://..."

```
cp .env.example .env

nano .env
```

Se rendre dans le dossier du starter theme El Tigre

```
cd content/themes/eltigre
```

Installer les packages NPM

```
npm install
```

## Usage

Pour lancer webpack en mode dev : 

```
npm run dev
```

Pour build le site en version prod : 

```
npm run build
```