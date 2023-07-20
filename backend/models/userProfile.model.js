const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coins: {
        type: Number,
        default: 0
    },
    skins: [{
        name: {
            type: String,
            required: true,
        },
        owned: {
            type: Boolean,
            default: false
        },        
    }],
    equiptSkin: {
      type: String,
      default: "Default"
    }
  }, {
    timestamps: true,
  });

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;