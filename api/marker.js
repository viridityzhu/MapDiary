const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');
const { mustBeSignedIn } = require('./auth.js');

async function getByUser(_, { username }) {
  const db = getDb();
  const markers = await db.collection('markers').find({ username:username }).toArray();
  console.log(markers);
  return markers;
}

const PAGE_SIZE = 10;

async function list(_, {
  status, effortMin, effortMax, search, page,
}) {
  const db = getDb();
  const filter = {};

  if (status) filter.status = status;

  if (effortMin !== undefined || effortMax !== undefined) {
    filter.effort = {};
    if (effortMin !== undefined) filter.effort.$gte = effortMin;
    if (effortMax !== undefined) filter.effort.$lte = effortMax;
  }

  if (search) filter.$text = { $search: search };

  const cursor = db.collection('markers').find(filter)
    .sort({ id: 1 })
    .skip(PAGE_SIZE * (page - 1))
    .limit(PAGE_SIZE);

  const totalCount = await cursor.count(false);
  const markers = cursor.toArray();
  const pages = Math.ceil(totalCount / PAGE_SIZE);
  return { markers, pages };
}

function validate(marker) {
  const errors = [];
  if (marker.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (marker.status === 'Assigned' && !marker.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function add(_, { marker }) {
  const db = getDb();


  const newmarker = Object.assign({}, marker);
  newmarker.created_time = new Date();
  newmarker.id = await getNextSequence('markers');

  const result = await db.collection('markers').insertOne(newmarker);
  const savedmarker = await db.collection('markers')
    .findOne({ _id: result.insertedId });
  return savedmarker;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.title || changes.status || changes.owner) {
    const marker = await db.collection('markers').findOne({ id });
    Object.assign(marker, changes);
    validate(marker);
  }
  await db.collection('markers').updateOne({ id }, { $set: changes });
  const savedmarker = await db.collection('markers').findOne({ id });
  return savedmarker;
}

async function remove(_, { id }) {
  const db = getDb();
  const marker = await db.collection('markers').findOne({ id });
  if (!marker) return false;
  marker.deleted = new Date();

  let result = await db.collection('deleted_markers').insertOne(marker);
  if (result.insertedId) {
    result = await db.collection('markers').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function restore(_, { id }) {
  const db = getDb();
  const marker = await db.collection('deleted_markers').findOne({ id });
  if (!marker) return false;
  marker.deleted = new Date();

  let result = await db.collection('markers').insertOne(marker);
  if (result.insertedId) {
    result = await db.collection('deleted_markers').removeOne({ id });
    return result.deletedCount === 1;
  }
  return false;
}

async function counts(_, { status, effortMin, effortMax }) {
  const db = getDb();
  const filter = {};

  if (status) filter.status = status;

  if (effortMin !== undefined || effortMax !== undefined) {
    filter.effort = {};
    if (effortMin !== undefined) filter.effort.$gte = effortMin;
    if (effortMax !== undefined) filter.effort.$lte = effortMax;
  }

  const results = await db.collection('markers').aggregate([
    { $match: filter },
    {
      $group: {
        _id: { owner: '$owner', status: '$status' },
        count: { $sum: 1 },
      },
    },
  ]).toArray();

  const stats = {};
  results.forEach((result) => {
    // eslint-disable-next-line no-underscore-dangle
    const { owner, status: statusKey } = result._id;
    if (!stats[owner]) stats[owner] = { owner };
    stats[owner][statusKey] = result.count;
  });
  return Object.values(stats);
}

module.exports = {
  list,
  add,//: mustBeSignedIn(add),
  update,//: mustBeSignedIn(update),
  delete:remove, //: mustBeSignedIn(remove),
  restore,//: mustBeSignedIn(restore),
  counts,
  getByUser,
};
