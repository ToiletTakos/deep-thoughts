const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // parent as a placeholder parameter, just need something for the first parameters spot
        // so that we can access the second argument(username) 
        thoughts: async (parent, { username }) => {
            // use a ternary operator (?) to check if username exists
            // if it does we set params to an object with a username key set to that value
            // (: (as or))if it doesnt exist we return an empty object
            const params = username ? { username } : {};
            //finds all data through the Thought model and then sorts them in descending order 
            return Thought.find(params).sort({ createdAt: -1 });
        },

        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        //get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },

        //get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
    }
};

module.exports = resolvers;