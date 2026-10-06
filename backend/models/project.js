const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    title: {type: String,required: true },
    description: {type: String,required: true},
    image: {type: String,required: tru },
    link: { type: String,required: true}
});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;