import * as mongoose from "mongoose";
 
const ItemSchema = new mongoose.Schema({
    description: String,
    price: Number,
    type: String
});
 
const ItemModel = mongoose.model('Item', ItemSchema);
 
export { ItemModel }