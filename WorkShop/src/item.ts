import * as mongoose from "mongoose";
 
const ItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    type: String,
    imageUrl: String,
    status: {
        type: String,
        enum : ['Avaliable', 'Sold'],
        default: 'Avaliable'
    },
});
 
const ItemModel = mongoose.model('Item', ItemSchema);
 
export { ItemModel }