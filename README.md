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

- [express (4.17.1)](https://expressjs.com/)

- [mongoose (5.12.3)](https://mongoosejs.com/)

- [nodemon (2.0.7)](https://www.npmjs.com/package/nodemon)

## Code Snippet
- This snippet is for updating an artist and the edge cases that may come with it. It was the most challenging of my routes because of added functonality for edge cases (e.g. if you update an artist, updating the corresponding records).

```
// UPDATE ARTIST
router.put('/:artistId', async (req, res) => {
    try {
        // UPDATE ARTIST
        const replacedArtist = await Artist.findByIdAndUpdate(req.params.artistId, req.body, {new: true});

        const recordIDs = replacedArtist.records;

        // UPDATE RECORDS WITH ARTIST
        for (element of recordIDs) {
            const record = await Record.findById(element);

            if (!record.artists.includes(req.params.recordId)) {
                await Record.updateOne({_id: element}, {$push: {artists: req.params.artistId}})
            }
        }

        // REMOVE ARTIST FROM RECORD NOT IN ARTISTS ARRAY
        await Record.updateMany(
            {_id: {$nin: recordIDs}}, 
            {$pull: {artists: {$in: [req.params.artistId]}}},
            {multi: true}
        );
        
        res.status(200).json(replacedArtist);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
```

## Issues and Resolutions
**ERROR**: ```Artists.find() buffering timed out after 10000ms.``` in Postman.

**RESOLUTION**: My IP address wasn't authorized to run requests in my MongoDB database. I was so busy looking in the code, I didn't think about an issue with my MongoDB settings. Definitelly learned my lesson.

## Notes/Final Thoughts
If you want to fork this code, you'll have to connect to your own MongoDB database. Only my IP address and only my username and password can access my specific data.

When I continue this project, I want to create a UI and add authentication to my database. I also want to add security features, including adding an ID validator for my Artist and Record database IDs.