# Map Diary API (Backend)

## Tables in MongoDB

- Marker

|Item | Descr |
| id | |
|user_id | the owner of this marker|
|created_time||
|title||
|content| suppose it is one single object |
|position| \[x,y\], position on the world map|
|is_public| whether or not other users can access this marker|

- New Marker

It is a temporary marker, i.e., a user clicks on the map, created a marker with positions, but the content hasn't been saved.

- User

|user_id||
|user_name||
|description||
|other|I don't know|