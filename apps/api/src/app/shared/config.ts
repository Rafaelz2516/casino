export default () => ({
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secretOrKey: 'secret',
  },
});
