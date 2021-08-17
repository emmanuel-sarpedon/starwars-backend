# StarWars API

> URL : `https://starwars-app-manu.herokuapp.com/`

---

## Créer un personnage

> Méthode HTTP `POST` - `/character/create`

### Paramètres attendus :

```javascript
{
  name: { type: String, required: true },
  height: { type: Number, required: true },
  mass: { type: Number, required: true },
  hair_color: { type: String, required: true },
  skin_color: { type: String, required: true },
  eye_color: { type: String, required: true },
  birth_year: String,
  gender: { type: String, required: true },
  homeworld: String,
  films: String,
  species: String,
  vehicles: String,
  starships: String,
  picture_url: String,
}
```

- Exemple de requête :

```json
{
  "name": "Leia Organa",
  "height": 150,
  "mass": 56,
  "hair_color": "Noir",
  "skin_color": "Blanc",
  "eye_color": "Marron",
  "gender": "Féminin",
  "birth_year": "19AVBY",
  "species": "Humain",
  "picture_url": "https://cache.marieclaire.fr/data/photo/w2000_c17/18s/tutos-coiffures-princesse-leia-star-wars.webp"
}
```

- Réponse serveur :

#### Status 201 - CREATED

```json
{
  "species": "Humain",
  "created": "2021-08-17T06:38:22.673Z",
  "edited": "2021-08-17T06:38:22.673Z",
  "_id": "611b59663150f379a67df6c8",
  "name": "Leia Organa",
  "height": 150,
  "mass": 56,
  "hair_color": "Noir",
  "skin_color": "Blanc",
  "eye_color": "Marron",
  "birth_year": "19AVBY",
  "gender": "Féminin",
  "picture_url": "https://cache.marieclaire.fr/data/photo/w2000_c17/18s/tutos-coiffures-princesse-leia-star-wars.webp",
  "__v": 0
}
```

#### Status 400 - BAD REQUEST

S'il manque des paramètres obligatoires

```json
{
  "error": "Missing parameters"
}
```

## Récupérer tous les personnages

> Méthode HTTP `GET` - `/characters`

### Paramètres facultatifs :

**_name_** - filtre le nom du personnage (insensible à la casse)

**_limit_** - limite le nombre de résultats transmis par le serveur (5 par défaut)

**_page_** - gère la pagination (page 1 par défaut)

- Exemple de requête :

```http
[...]/characters?name=dark
```

- Réponse serveur :

#### Status 200 - OK

```json
{
  "count": 1,
  "data": [
    {
      "films": ["Star Wars", "Star Wars II"],
      "created": "2021-08-13T08:06:57.772Z",
      "edited": "2021-08-13T08:06:57.772Z",
      "_id": "6116295952beb8184a51ceb0",
      "name": "Dark Vador",
      "height": 185,
      "mass": 70,
      "hair_color": "NC",
      "skin_color": "NC",
      "eye_color": "NC",
      "gender": "Masculin",
      "__v": 0
    }
  ]
}
```

## Récupérer les détails d'un personnage

> Méthode HTTP `GET` - `/character/:id`

### Paramètres attendus :

**_:id_** - ID MongoDB du personnage

- Exemple de requête :

```http
[...]/character/611a6ccf32457e0016107dce
```

- Réponse serveur :

#### Status 200 - OK

```json
{
  "created": "2021-08-16T12:59:06.449Z",
  "edited": "2021-08-16T12:59:06.449Z",
  "_id": "611a6ccf32457e0016107dce",
  "name": "Qui-Gon Jinn",
  "height": 193,
  "mass": 75,
  "hair_color": "Noir",
  "skin_color": "Blanc",
  "eye_color": "Bleu",
  "birth_year": "32AVBY",
  "gender": "Masculin",
  "__v": 0
}
```

#### Status 400 - BAD REQUEST

Si l'id du personnage n'existe pas

```json
{
  "message": "Character Not found"
}
```

## Mettre à jour un personnage

> Méthode HTTP `PUT` - `/character/update/:id`

**_:id_** - ID MongoDB du personnage

- Exemple de requête :

```http
[...]/character/update/611a6ccf32457e0016107dce
```

```json
{
  "picture_url": "https://static.cnews.fr/sites/default/files/styles/image_960_540/public/Diaporama/qui_gon_jinn.jpg",
  "birth_year": "35AVBY"
}
```

#### Status 200 - OK

```json
{
  "created": "2021-08-16T12:59:06.449Z",
  "edited": "2021-08-17T10:09:24.449Z",
  "_id": "611a6ccf32457e0016107dce",
  "name": "Qui-Gon Jinn",
  "height": 193,
  "mass": 75,
  "hair_color": "Noir",
  "skin_color": "Blanc",
  "eye_color": "Bleu",
  "birth_year": "32AVBY",
  "gender": "Masculin",
  "picture_url": "https://static.cnews.fr/sites/default/files/styles/image_960_540/public/Diaporama/qui_gon_jinn.jpg",
  "birth_year": "35AVBY",
  "__v": 0
}
```

## Supprimer un personnage

> Méthode HTTP `DELETE` - `/character/delete/:id`

### Paramètres attendus :

**_:id_** - ID MongoDB du personnage

- Exemple de requête :

```http
[...]/character/delete/611a6ccf32457e0016107dce
```

- Réponse serveur :

#### Status 200 - OK

```json
{
  "message": "Character deleted"
}
```
