﻿# Application de Gestion de Cinéma

![image](https://github.com/user-attachments/assets/108b539d-53af-4b46-9c56-7efd80222f0c)


## Contexte du Projet
Votre mission est de développer une application de gestion pour un cinéma. Cette application permettra de gérer les films, les réservations, les salles, les séances et les places disponibles. De plus, l'application doit permettre à un administrateur de créer d'autres administrateurs, et aux clients de créer eux-mêmes leur compte. Les réservations ne pourront être effectuées que si le client est authentifié.

## Objectifs du Projet
- Gérer les films, les séances, les salles et les réservations.
- Authentifier les utilisateurs (clients et administrateurs) pour sécuriser l'accès à certaines fonctionnalités.
- Les administrateurs peuvent gérer tout le système, y compris la création de nouveaux administrateurs.
- Les clients doivent s'inscrire et se connecter pour accéder aux fonctionnalités de réservation.

## Fonctionnalités Principales

### Gestion des Utilisateurs
- **Inscription des Clients :**
  - Les clients peuvent créer un compte via l'application (nom, email, mot de passe, etc.).
  - Validation des données lors de l'inscription.

- **Connexion et Authentification :**
  - Les clients et les administrateurs doivent se connecter pour accéder à certaines fonctionnalités (comme réserver une place pour un film).
  - Utilisation de JWT pour la gestion des sessions sécurisées.

- **Gestion des Administrateurs :**
  - Un administrateur peut créer d'autres administrateurs.
  - Possibilité de modifier ou supprimer des comptes administrateurs.

### Gestion des Films
- **Ajouter un Film :**
  - Les administrateurs peuvent ajouter, modifier ou supprimer un film.

- **Lister les Films Disponibles :**
  - Les clients et les administrateurs peuvent voir la liste des films actuellement à l'affiche.

### Gestion des Salles et des Séances
- **Créer une Salle :**
  - Les administrateurs peuvent définir les caractéristiques des salles de cinéma (nom, capacité, type de salle).

- **Planifier une Séance :**
  - Planification des séances avec l'horaire, le film associé, la salle et les tarifs.

- **Modifier ou Annuler une Séance :**
  - Mettre à jour les horaires ou annuler une séance.

- **Voir les Séances Disponibles :**
  - Les clients peuvent voir les séances pour un film et vérifier les disponibilités.

### Gestion des Réservations
- **Réserver des Places :**
  - Les clients doivent être authentifiés pour pouvoir réserver des places pour une séance donnée.

- **Confirmation :**
  - Le client reçoit une confirmation par email et les détails de la séance.

- **Annuler ou Modifier une Réservation :**
  - Les clients peuvent annuler ou modifier leurs réservations.

### Gestion des Places Disponibles
- **Affichage des Places Disponibles :**
  - Les clients peuvent voir le nombre de places disponibles pour une séance donnée.

- **Sélection d'une Place Spécifique :**
  - Les clients peuvent choisir leur place.

- **Mise à Jour en Temps Réel des Places :**
  - Le système met à jour automatiquement la disponibilité des places après chaque réservation.

### Gestion des Rôles et Autorisations
- **Administrateurs :**
  - Créer d'autres Administrateurs : Un administrateur peut ajouter, modifier ou supprimer des administrateurs.
  - Gestion des Films, Séances, Salles et Réservations : Les administrateurs ont accès à toutes les fonctionnalités de gestion.

- **Clients :**
  - Inscription et Connexion : Un client peut créer un compte et se connecter pour accéder aux fonctionnalités.
  - Réservation uniquement après Authentification : Un client doit être authentifié pour réserver des places.
  - Historique des Réservations : Les clients peuvent consulter l'historique de leurs réservations via leur compte.

## Technologies Utilisées
- **Backend :**
  - Node.js avec Express.js pour créer une API RESTful.
  - JWT (JSON Web Token) pour l'authentification sécurisée des utilisateurs (administrateurs et clients).
  - Gestion des erreurs pour des réponses claires et détaillées lors des opérations CRUD.

- **Base de Données :**
  - MongoDB pour stocker les données des utilisateurs, films, séances, réservations et salles.
  - Mongoose pour modéliser les données et gérer les relations entre films, séances et salles.

## Endpoints API REST
### Utilisateur
- `POST /api/auth/register` : Inscription d'un nouveau client.
- `POST /api/auth/login` : Connexion d'un utilisateur (client ou administrateur).
- `POST /api/auth/logout` : Déconnexion d'un utilisateur.
- `POST /api/admin/create` : Création d'un nouvel administrateur (réservé aux administrateurs).
- `POST /api/auth/forget` : Envoyer un email pour réinitialiser le mot de passe.
- `POST /api/auth/reset` : Modifier le mot de passe à travers un token.
- `GET /api/users/me` : Renvoie les informations de l'utilisateur (nom, email, mot de passe, image, numéro de téléphone, adresse, rôle).

### Entités
- `GET /api/entities` : Récupérer la liste des entités.
- `POST /api/entities` : Ajouter une nouvelle entité.
- `PUT /api/entities/:id` : Modifier une entité.
- `DELETE /api/entities/:id` : Supprimer une entité.

## Sécurité et Gestion des Accès
- Authentification via JWT.
- Protection des Routes Sensibles.

## Tests Unitaires
Minimum de 5 tests pour chaque service :
- Authentification.
- Gestion des Films.
- Gestion des Séances.
- Réservation.
- etc.

## Bibliothèques
- Bcryptjs
- Dotenv
- Express
- Jsonwebtoken
- Mongoose
- Nodemailer
- Nodemon
- Jest ou Mocha

## Objectifs de Familiarisation
- MongoDB
- RESTful API
- JWT (JSON Web Token)
- Récupérer et envoyer des données JSON
- Tests unitaires

## Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/yassineelmiri/cinima.git
