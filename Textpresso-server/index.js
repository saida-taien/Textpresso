const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1rchpnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


client
    .connect()
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

// Middleware Connections
const corsConfig = {
    origin: ["http://localhost:5173" , "https://textpresso-a4dc6.web.app" , "https://textpresso-a4dc6.firebaseapp.com"],
    credentials: true,
};
app.use(cors(corsConfig));


//middlewares
const logger = (req, res, next) => {
    console.log("log: info", req.method, req.url);
    next();
}

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    console.log("Token in the middleware ", token);

    //if no token available
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized Access' });
        }
        req.user = decode;
        next();
    })
}
const cookieOption = {
    httpOnly : true,
    sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
    secure : process.env.NODE_ENV === "production" ? true : false,
}

async function run() {
    try {

        // await client.connect();

        const blogCollection = client.db('textpressoDB').collection('blog');
        const commentCollection = client.db('textpressoDB').collection('comment');
        const wishlistCollection = client.db('textpressoDB').collection('wishlist');
        const subscriptionCollection = client.db('textpressoDB').collection('subscription');
        //get blog from database
        app.get('/addBlog', async (req, res) => {
            const cursor = blogCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        //add blog in database
        app.post('/addBlog',  async (req, res) => {
            const { title, category, photo, shortDescription, longDescription, userName, email, userPhoto } = req.body;
            const newData = {
                title, category, photo, shortDescription, longDescription, userName, email, userPhoto,
                createdAt: new Date()
            }
            console.log(req.body)
            const result = await blogCollection.insertOne(newData);
            res.send(result);
        })


        //for view details
        app.get("/detailsBlog/:_id", async (req, res) => {
            const result = await blogCollection.findOne({ _id: new ObjectId(req.params._id) });
            res.send(result);
        })

        //add comment in database
        app.post('/addComment', async (req, res) => {
            // console.log(req.body)
            const newComment = req.body;
            const result = await commentCollection.insertOne(newComment);
            res.send(result);
        })

        //read all comments from database
        app.get("/comments/:blogId", async (req, res) => {
            console.log(req.params.blogId);
            const result = await commentCollection.find({ blogId: req.params.blogId }).toArray();
            res.send(result);
        })

        //for update
        app.get("/update/:id", async (req, res) => {
            const result = await blogCollection.findOne({ _id: new ObjectId(req.params.id) });
            res.send(result);
        })

        app.put("/updateBlog/:id", async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) };
            const data = {
                $set: {
                    title: req.body.title,
                    category: req.body.category,
                    photo: req.body.photo,
                    shortDescription: req.body.shortDescription,
                    longDescription: req.body.longDescription,

                }
            }
            const result = await blogCollection.updateOne(query, data);
            res.send(result);
        })

        // Find blog for wishlist from blogCollection
        app.get("/wishlist/:_id", async (req, res) => {
            try {
                const result = await blogCollection.findOne({ _id: new ObjectId(req.params._id) });
                res.json(result);
            } catch (error) {
                console.error('Error fetching blog details:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // Add wishlist blogs to the database
        app.post('/addWishlist', async (req, res) => {
            try {
                const newWishlist = req.body;
                newWishlist._id = new ObjectId(); // Generate a unique ObjectId
                const result = await wishlistCollection.insertOne(newWishlist);
                res.json(result);
            } catch (error) {
                console.error('Error adding item to wishlist:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        //read all wishlist from database
        app.get("/allWishlist/:email", logger, verifyToken, async (req, res) => {
            const result = await wishlistCollection.find({ email: req.params.email }).toArray();
            res.send(result);
        })

        //for delete
        app.delete("/delete/:id", async (req, res) => {
            const result = await wishlistCollection.deleteOne({ _id: new ObjectId(req.params.id) })
            res.send(result);
        })

        //add subscription in database
        app.post('/subscription', async (req, res) => {
            const newEmail = req.body;
            const result = await subscriptionCollection.insertOne(newEmail);
            res.send(result);
        })

        //get blog from database for featured blog
        app.get('/featured-blogs', async (req, res) => {
            const cursor = blogCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        //Auth related API
        app.post('/jwt', logger, async (req, res) => {
            const user = req.body;
            console.log("User for token", user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            res.cookie('token', token, cookieOption )
                .send({ success: true });
        })

        app.post('/logout', async (req, res) => {
            const user = req.body;
            console.log("Logging out ", user);
            res.clearCookie('token', { ...cookieOption ,maxAge: 0 }).send({ success: true })
        })


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Textpresso is Running");
})

app.listen(port, () => {
    console.log(`Textpresso server is running on ${port}`);
})