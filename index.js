const express = require('express')
const app = express();
const PORT = 5000;
const morgan = require('morgan');
const productRouter = require('./router/products');
const userRouter = require('./router/user');


app.use(express.json())
app.use(morgan('default'));
app.use('/products', productRouter.router);
app.use('/users', userRouter.router)



app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})

