import User from '../schema/user.js'
import credRepository from './crudRepository.js';

 const userRepository = {
    ...credRepository(User),
    
    getByEmail:  async function (email) {
        const user = await User.findOne({ email });
        return user;
    },

    getByUsername: async function (username) {
        const user = await User.findOne({username}).select('-password');//exclude password
        return user;
    }
};

export default userRepository;