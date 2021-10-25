const { Matchup, Tech } = require('../models');

const resolvers = {
  Query: {
    matchups: async () => {
      return Matchup.find().sort({ createdAt: -1 });
    },

    matchup: async (parent, { matchupId }) => {
      return Matchup.findOne({ _id: matchupId });
    },
    techs: async () => {
      return Tech.find().sort({ createdAt: -1 });
    },

    tech: async (parent, { techId }) => {
      return Tech.findOne({ _id: techId });
    },
  },

  Mutation: {
    addMatchup: async (parent, { tech1, tech2 }) => {
      return Matchup.create({ tech1, tech2 });
    },
    addVote: async (parent, { matchupId, tech1_votes, tech2_votes }) => {
      return Matchup.findOneAndUpdate(
        { _id: matchupId },
        {
          $addToSet: { tech1_votes: {} },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;
