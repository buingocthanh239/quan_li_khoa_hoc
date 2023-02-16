const { mongoose } = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Lesson = new Schema(
    {
        name: { type: String },
        description: { type: String },
        videoId: { type: String },
        course: { type: String },
        author: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

//add plugin
mongoose.plugin(slug);
Lesson.plugin(mongooseDelete, { deletedAt: true });

module.exports = mongoose.model('Lesson', Lesson);
