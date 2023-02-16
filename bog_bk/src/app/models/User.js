const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        hash_Password: { type: String },
        role: { type: String },
    },
    {
        timestamps: true,
    },
);

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.hash_Password);
};

module.exports = mongoose.model('Users', UserSchema);
