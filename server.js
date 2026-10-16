import express from 'express';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

try {
  const conn = await mongoose.connect(MONGODB_URI);
  console.log('conn', conn);

  mongoose.connection.on('error', (err) => {
    console.log('error', err);
  });
} catch (error) {
  console.log('error', error);
}

const nandosUserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
      required: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    postcode: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const NandosUser = mongoose.model('NandosUser', nandosUserSchema, 'users');

// const newUser = {
//   firstName: 'Afsar',
//   lastName: 'Miah',
//   email: 'afsar.miah@nandos.co.uk',
//   phoneNumber: '07376089855',
//   country: 'England',
//   postcode: 'E1 4QL',
//   dateOfBirth: '2000-11-12',
// };

// const newUsersToAdd = [
//   {
//     firstName: 'James',
//     lastName: 'Sherry',
//     email: 'james.sherry@thejump.tech',
//     phoneNumber: '07336483742',
//     country: 'England',
//     postcode: 'H1 H43',
//     dateOfBirth: '1976-11-12',
//   },
//   {
//     firstName: 'Katie',
//     lastName: 'Saunders',
//     email: 'katies.saunders@thejump.tech',
//     phoneNumber: '07336521742',
//     country: 'Scotland',
//     postcode: 'S1 W3E',
//     dateOfBirth: '1981-11-12',
//   },
// ];

// try {
//   const user = new NandosUser(newUser);
//   console.log('usersToAdd', newUser);

//   const newUsers = await user.save();
// } catch (err) {
//   console.log('error', err);
// }

// try {
//   const newUsers = await NandosUser.insertMany(newUsersToAdd);
//   console.log('usersToAdd', newUsers);
// } catch (err) {
//   console.log('error', err);
// }

// try {
//   const userToFind = await User.find({ name: 'Lucy' });
//   console.log('foundUser', userToFind);
// } catch (err) {
//   console.log(err);
// }

// try {
//   const result = await User.updateOne({ name: 'Juicy' }, { name: 'Zara' });

//   console.log('result', result);
// } catch (err) {
//   console.log(err);
// }

// try {
//   const userToDelete = await User.deleteOne({ _id: idToDelete });
//   console.log(userToDelete);
// } catch (err) {
//   console.log(err);
// }

// app.get('/users', (req, res) => {
//   return res.json(users);
// });

// app.post('/users', (req, res) => {
//   console.log(req.body);
//   users.push(req.body);
//   return res.status(201).json(req.body);
// });

app.get('/api/nandos/users{/:id}', async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  try {
    const users = await NandosUser.find(query);
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post('/api/nandos/users', async (req, res) => {
  const userData = req.body;
  console.info(userData);

  try {
    const newUser = new NandosUser(userData);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.put('/api/nandos/users/:id', async (req, res) => {
  try {
    const result = await NandosUser.updateOne({ _id: req.params.id }, req.body);

    if (result.matchedCount === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.delete('/api/nandos/users/:id', async (req, res) => {
  try {
    const result = await NandosUser.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server currently listening on http://localhost:${PORT}`);
});
