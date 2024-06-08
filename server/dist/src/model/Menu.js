import mongoose from 'mongoose';
const menuSchema = new mongoose.Schema({
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
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    modified_at: {
        type: Date,
    },
});
menuSchema.pre(['find', 'findOne'], function (next) {
    this.select('-__v');
    next();
});
export const MenuModel = mongoose.model('menu', menuSchema);
//# sourceMappingURL=Menu.js.map