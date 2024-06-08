import mongoose from 'mongoose';
export const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    desc: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 1,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    modified_at: {
        type: Date,
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1515442261605-65987783cb6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
});
menuSchema.pre(['find', 'findOne'], function (next) {
    this.select('-__v');
    next();
});
export const MenuModel = mongoose.model('menu', menuSchema);
//# sourceMappingURL=Menu.js.map