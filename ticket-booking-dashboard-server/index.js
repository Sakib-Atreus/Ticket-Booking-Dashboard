require('dotenv').config()
const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const createToken = (user) => {
    const token = jwt.sign(
      {
        email: user.email,
      },
      "secret",
      { expiresIn: "7d" }
    );
    return token;
  }

  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const verify = jwt.verify(token, "secret");
    if (!verify?.email) {
      return res.send("You are not authorized");
    }
    req.user = verify.email;
    next();
  }

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.sktmpwb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbConnect = async () => {
  try {
    client.connect();
    console.log(" Database Connected Successfully✅ ");

  } catch (error) {
    console.log(error.name, error.message);
  }
}
dbConnect()

app.get('/', (req, res) => {
  res.send('Ticket Booking Dashboard!')
})


    const eventCollection = client.db("ticketBooking").collection("event");
    const userCollection = client.db("ticketBooking").collection("user");
    const bookEventCollection = client.db("ticketBooking").collection("eventBooked");


    // JWT: Json Web Token
    app.post("/jwt", (req, res) => {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.send({ token });
      });

    //post data to database
    app.post('/addEvent', async (req, res) => {
        const body = req.body;
        console.log(body);
        const result = await eventCollection.insertOne(body);
        // res.send(result);
        if (result?.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(404).send({
            message: "can not insert try again later",
            status: false,
          });
        }
      })
      
    //get all data from database
    app.get('/allEvents', async (req, res) => {
      const cursor = eventCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    //get single details data from all data
    app.get('/allEvents/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await eventCollection.findOne(query);
      res.send(result);
    })
  
    //update  single event
    app.get("/editEvent/:id", async (req, res) => {
      const id = (req.params.id);
      const query = { _id: new ObjectId(id) }
      const result = await eventCollection.findOne(query);
      res.send(result);
    })
 

    //delete the event by selecting id
    app.delete("/myEvents/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await eventCollection.deleteOne(query);
      res.send(result);
    })

    //my events added
    app.get("/myEvents/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await eventCollection.find({ email: req.params.email }).toArray();
      res.send(result);
    })

    //put data in server
    app.put("/allEvents/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      console.log(body);
      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true }
      const updateDoc = {
        $set: {
          name: body.name,
          quantity: body.quantity,
          productDetails: body.productDetails,
          price: body.price,
        }
      };
      const result = await eventCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    });

    // Post event for booking
    app.post('/bookEvent', async (req, res) => {
        const body = req.body;
        console.log(body);
        const result = await bookEventCollection.insertOne(body);
        // res.send(result);
        if (result?.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(404).send({
            message: "can not insert try again later",
            status: false,
          });
        }
      })

      //get all data from database
    app.get('/allBookedEvents', async (req, res) => {
        const cursor = bookEventCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })

      app.get("/allBookedEvents/:email", async (req, res) => {
        console.log(req.params.email);
        const result = await bookEventCollection.find({ email: req.params.email }).toArray();
        res.send(result);
      })

      app.delete("/allBookedEvents/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await bookEventCollection.deleteOne(query);
        res.send(result);
      })

    
    app.get('/searchText/:text', async (req, res) => {
        const text = req.params.text;
        const result = await eventCollection
          .find({
            $or: [
              { name: { $regex: text, $options: "i" } },
              { category: { $regex: text, $options: "i" } },
            ],
          })
          .toArray();
        res.send(result);
      });



    // user
    app.post("/user", async (req, res) => {
        const user = req.body;
  
        const token = createToken(user);
        const isUserExist = await userCollection.findOne({ email: user?.email });
        if (isUserExist?._id) {
          return res.send({
            status: "success",
            message: "Login success",
            token,
          });
        }
        await userCollection.insertOne(user);
        return res.send({ token });
      });

      // get all users
      app.get('/users', async (req, res) => {
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })
  
      // user/test@gmail
  
      app.get("/user/get/:id", async (req, res) => {
        const id = req.params.id;
        // console.log(id);
        const result = await userCollection.findOne({ _id: new ObjectId(id) });
        res.send(result);
      });
  
      app.get("/user/:email", async (req, res) => {
        const email = req.params.email;
        const result = await userCollection.findOne({ email });
        res.send(result);
      });
  
      app.patch("/user/:email", async (req, res) => {
        const email = req.params.email;
        const userData = req.body;
        const result = await userCollection.updateOne(
          { email },
          { $set: userData },
          { upsert: true }
        );
        res.send(result);
      });

    
    app.post('/buyNow', async (req, res) => {
      const body = req.body;
      console.log(body);
      const result = await buyCollection.insertOne(body);
      // res.send(result);
      if (result?.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert try again later",
          status: false,
        });
      }
  });



app.listen(port, () => {
  console.log(`The Ticket Booking Server Site Run on Port : ${port}`)
})