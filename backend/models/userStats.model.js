const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userStatsSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    levels: [{
      level: {
        type: Number,
        required: true,
      },
      time: {
        type: Number,
        required: true,
      },
    }],
    topWPM: {
      type: Number,
      required: true,
      default: 0
    }
  }, {
    timestamps: true,
  });
//user times schema w dynamic levels

const UserStats = mongoose.model('UserStats', userStatsSchema);

module.exports = UserStats;