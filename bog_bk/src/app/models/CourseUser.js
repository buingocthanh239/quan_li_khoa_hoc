const { mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const CourseUser = new Schema(
    {
        userId: { type: String },
        courseId: { type: String },
    },
    {
        timestamps: true,
    },
);



module.exports = mongoose.model('CourseUser', CourseUser);
