/*
 * This script is borrowed from pro-mern-stack-2
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo mapdiary scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/mapdiary scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/mapdiary scripts/init.mongo.js
 */

/* global db print */
/* eslint no-restricted-globals: "off" */

db.markers.remove({});
db.users.remove({});

const markersDB = [
  {
    id: 0,
    user_id: 123456,
    created_time: new Date('2019-01-15'),
    title: 'My Trip In Singapore',
    content: 'Run using the mongo shell. For remote databases, ensure that the connection string is supplied in the command line.',
    position: [1.353, 103.81],
    is_public: true
  },
  {
    id: 1,
    user_id: 123456,
    created_time: new Date('2019-01-15'),
    title: 'The Great Wall in Winter Is Wonderful',
    content: 'Wubalabadabdab Run using the mongo shell. For remote databases, ensure that the connection string is supplied in the command line.',
    position: [1.362, 103.83],
    is_public: true
  },
];

db.markers.insertMany(markersDB);
const count = db.markers.count();
print('Inserted', count, 'markers');

db.counters.remove({ _id: 'markers' });
db.counters.insert({ _id: 'markers', current: count });

db.markers.createIndex({ id: 1 }, { unique: true });
db.markers.createIndex({ user_id: 1 });
db.markers.createIndex({ created_time: 1 });
db.markers.createIndex({ position: 1 });
db.markers.createIndex({ is_public: 1 });
db.markers.createIndex({ title: 'text', content: 'text' });

