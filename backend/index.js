const express = require("express")
const connectDB = require("./db/connect")
const subjectModel = require("./db/schema/subject")
const topicsModel = require("./db/schema/topics");
const taskModel = require("./db/schema/task");
const userModel = require("./db/schema/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const cors = require("cors")
const auth = require("./middleware/auth")
const topics = require("./db/schema/topics");

const app = express();
app.use(cors())
app.use(express.json());
dotenv.config()
connectDB()

app.get("/", (req, res) => {
    res.send("hello");
})

app.post("/api/v1/signup", async (req, res) => {
    const { username, email, password } = req.body;
    //check the user is exist or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        res.json({
            message: "email already exist"
        })
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username: username,
        email: email,
        password: hashed
    })
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({
        token,
        message: user
    })
})

app.post("/api/v1/login", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
        return res.json({
            message: "invalid credentials"
        })
    }
    const isMatch = bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        return res.json({
            message: "invalid credentials"
        })
    }
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET)
    res.json({
        token,
        message: "login succesfull"
    })
})

//subjects

app.get("/api/v1/subject", auth, async (req, res) => {
    try {
        const id = req.user.userId;
        console.log(id);
        const subjects = await subjectModel.find({ userId: id });
        res.json({
            subjects
        })
    } catch (error) {
        res.json({
            error
        })
    }

})

app.post("/api/v1/create/subjects", auth, async (req, res) => {
    const { name, code } = req.body;
    const id = req.user.userId
    const subject = await subjectModel.create({
        userId: id,
        name: name,
        code: code
    })
    res.json({
        message: subject
    })
})

app.put("/api/v1/edit/subject/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { name, code } = req.body;
    const subject = await subjectModel.findByIdAndUpdate(id, {
        $set: { name, code }
    },
        { new: true }
    );
    res.json({
        message: subject
    })

})

app.post("/api/v1/delete/subject/:id", auth, async (req, res) => {
    const id = req.params.id;
    const deleteSub = await subjectModel.findByIdAndDelete(id);
    res.json({
        message: "deleted successfully"
    })
})

//topics

app.get("/api/v1/:subjectId/topic", async (req, res) => {
    try {
        const { subjectId } = req.params;
        const topics = await topicsModel.find({ subjectId: subjectId });
        res.json({
            topics
        })
    } catch (error) {
        res.json({
            error
        })
    }

})

app.post("/api/v1/create/topics/:subjectId", auth, async (req, res) => {
    const { subjectId } = req.params
    const { title, description } = req.body
    const topics = await topicsModel.create({
        title: title,
        description: description,
        subjectId: subjectId
    })
    res.json({
        message: topics
    })
})

app.post("/api/v1/update/topic/:id", auth, async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const topics = await topicsModel.findByIdAndUpdate(id, {
        $set: {
            title: title,
            description: description
        }
    },
        { new: true }
    )
    res.json({
        message: topics
    })
})

app.post("/api/v1/delete/topic/:id", auth, async (req, res) => {
    const { id } = req.params;
    const deleteTop = await topicsModel.findByIdAndDelete(id);
    res.json({
        message: "delete succesfully"
    })
})

//task

app.get("/api/v1/tasks", (req, res) => {

})

app.post("/api/v1/create/tasks/:topicId", auth, async (req, res) => {
    const { topicId } = req.params;
    const { plannedDate, status, notes } = req.body;
    const topic = await taskModel.create({
        topicId: topicId,
        plannedDate: plannedDate,
        status: status,
        notes: notes
    })
    res.json({
        message: topic
    })
})

app.put("/api/v1/edit/tasks/:taskId", auth, async (req, res) => {
    const { id } = req.params;
    const { plannedDate, status, notes } = req.body;
    const topic = await taskModel.findByIdAndUpdate(id,
        {
            $set: {
                topicId: id,
                plannedDate: plannedDate,
                status: status,
                notes: notes
            }
        },
        { new: true }
    )
    res.json({
        message: topic
    })
})

app.delete("/api/v1/delete/tasks/:taskId", auth, async (req, res) => {
    const { id } = req.body;
    const deleteTask = await taskModel.findByIdAndDelete(id);
    res.json({
        message: "deleted succesfully"
    })
})

app.listen(3000, () => {
    console.log("app is listening to the port 3000")
})