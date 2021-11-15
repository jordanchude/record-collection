# Project Overview

## Project Description

This project is a full CRUD record collection created with Javascript (Node.js) and a MongoDB database. Using postman, users can manage a collection of artists (i.e. their name, birthday, and photo, and records) and their corresponding records (each records' artists, name, release date, and link). This project was made entirely with an audience on my Twitch channel. At every point, I was either teaching someone in the community what I was doing or collaborating with the community to finish it.

### MVP/PostMVP
#### MVP

- Create, Read, Update, and Delete Artists
- Create, Read, Update, and Delete Records
- Many-to-many relationship between artists and records

#### PostMVP 

- Mock up UI for database
- Create extra security features

## Functional Components
#### MVP
| Component |
| --- |
| User Login Authentication |
| Test Authentication in Postman with Authorization |
| User Models/Migration |
| Board Models/Migration |
| List Models/Migration | H | 1hr | .5hr |
| Item Models/Migration | H | 1hr | .5hr |
| Board Controllers | H | 2hr| 1hr |
| List Controllers | H | 3hr | 2hr |
| Item Controllers | H | 5hr | 4hr |
| Locally Test and Debug Board Controllers | H | .5hr | .5hr |
| Locally Test and Debug List Controllers | H | 1hrs| .5hr |
| Locally Test and Debug Item Controllers | H | 2hrs| 3hr |
| Deployment | H | .5hr | 2hr |
| Remotely Test and Debug Board Controllers | H | .5hrs| .5hr |
| Remotely Test and Debug List Controllers | H | 4hrs| 2hr |
| Remotely Test and Debug Item Controllers | H | 2hrs| 3hr |

#### PostMVP
| Letter | Component | Priority | Estimated Time | Time Invested |
| --- | --- | :---: |  :---: | :---: |
| A | Create Seed Data for Initial Users, Boards, and Items | M | 1hr | 1hr |
| B | Activity Log Models/Migration | L | 1hr | -hr |
| C | Activity Log Controllers | L | 3hr | -hr |
| D | Team Models/Migration | L | 1hr | -hr |
| E | Team Controllers | M | 3hr | -hr |
| F | Locally Test Activity Log Controller | M | 2hr | -hr |
| G | Remotely Test Activity Log Controller | M | 2hr | -hr |
| H | Locally Test Activity Log Controller | M | 2hr | -hr |
| I | Remotely Test Activity Log Controller | M | 2hr | -hr |
| - | Total | - | 16hrs| 1hrs |

## Additional Libraries
- [asgiref (3.2.10)](https://github.com/django/asgiref)
- [dj-database-url (0.5.0)](https://pypi.org/project/dj-database-url/)
- [Django (3.1.1)](https://www.djangoproject.com/)
- [django-heroku (0.3.1)](https://devcenter.heroku.com/articles/getting-started-with-python)
- [gunicorn (20.0.4)](https://docs.gunicorn.org/en/stable/)
- [psycopg2 (2.8.6)](https://www.psycopg.org/docs/install.html)
- [pytz (2020.1)](https://pypi.org/project/pytz/)
- [sqlparse (0.3.1)](https://pypi.org/project/sqlparse/)
- [whitenoise (5.2.0)](http://whitenoise.evans.io/en/stable/)

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
