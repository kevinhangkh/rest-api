const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Types.ObjectId,
    // },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);