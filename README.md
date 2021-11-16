# Project Overview

## Project Description

This project is a full CRUD record collection created with Javascript (Node.js) and a MongoDB database. Using postman, users can manage a collection of artists (i.e. their name, birthday, and photo, and records) and their corresponding records (each records' artists, name, release date, and link). This project was made entirely with an audience on my Twitch channel. At every point, I was either teaching someone in the community what I was doing or collaborating with the community to finish it.

## MVP

- Create, Read, Update, and Delete Artists
- Create, Read, Update, and Delete Records
- Many-to-many relationship between artists and records

## PostMVP 

- Mock up UI for database
- Create extra security features

## MVP Components
| Component |
| --- |
| Configure Server |
| Artist Employee Schema and Model |
| Record Employee Schema and Model |
| Artist Route Handlers |
| Record Route Handlers |
| Test Artist Endpoints |
| Test Record Endpoints |
| Create (POST): Grab Artist Data & Submit Request |
| Read (GET): Populate Artists |
| Update (PUT): Take Artist Data and Replace |
| Delete (DELETE): Send Request to Delete Artist |
| Create (POST): Grab Record Data & Submit Request |
| Read (GET): Populate Records |
| Update (PUT): Take Record Data and Replace |
| Delete (DELETE): Send Request to Delete Record |
| Debugging |
| Documentation |


## PostMVP Components
|Component|
| --- |
| Wireframing |
| HTML Skeleton |
| CSS Styling (Mobile, Tablet, and Desktop) |
| Populate + Connect Backend Data to UI |
| Testing |
| Documentation |
| Deployment |

## Additional Libraries
- [dotenv (8.2.0)](https://www.npmjs.com/package/dotenv)

## Code Snippet
- The simple but necessary code to activate the core of my app: creating movies for my database.

```
def create(self, request, *args, **kwargs):
        movie = Movie.objects.filter(
            title=request.data.get('title'),
            user=request.user
        )

        if movie:
            msg = 'Movie with that title already exists'
            raise ValidationError(msg)
        return super().create(request)
```

## Issues and Resolutions
**ERROR**: ```<title>ProgrammingError at /auth/users/register/</title>``` in Postman

**RESOLUTION**: The deployed database needed to be reset and migrations needed to be re-run.
