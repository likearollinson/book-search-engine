const { Profile } = require('../server/models');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find({});
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    me: async (parent, arge, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Please login!');
    }
  },

  Mutation: {
    createProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    saveBook: async (parent, { profileId, savedBook }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { savedBooks: savedBook },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('Please login!');
    },

    deleteBook: async (parent, { savedBook }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.profileId },
          { $pull: { savedBooks: savedBook } },
          { new: true }
        );
      }
    }
  },
};

module.exports = resolvers;
