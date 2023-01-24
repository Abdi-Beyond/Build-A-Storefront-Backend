# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index - 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

All APi routes
- app.get('/products', index),
- app.get('/products/:id', show),
- app.post('/products/', authorizeChecker, create),
- app.delete('/products/:id', authorizeChecker, delete_product),
- app.patch('/products/:id', authorizeChecker, update_product),
- app.get('/products/category/:category', category_products),
- app.get('/products/popular/', popular_products);


#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### All api routes
- app.get('/users', authorizeChecker, index),
- app.get('/users/:id', authorizeChecker, show),
- app.post('/users/', create),
- app.delete('/users/:id', authorizeChecker, delete_user),
- app.patch('/users/:id', authorizeChecker, patch_user);

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

#### All api routes

app.get('/orders', authorizeChecker, current_orders),
app.get('/orders/completed', authorizeChecker, completed_orders),
app.post('/orders/', authorizeChecker, create),
app.patch('/orders/:id',authorizeChecker, update_order);

#### All api rotes for products in orders
app.get('/productinorder', authorizeChecker, productinorder),
app.patch('/updateproductquantity', authorizeChecker, updateproductquantity),
app.delete('/deleteproductfromorder', authorizeChecker, deleteproductfromorder),
app.post('/addproducttoorder', authorizeChecker, addproducttoorder)


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
