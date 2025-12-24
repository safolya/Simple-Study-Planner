
import './App.css'
import Signup from './pages/Signup'
import Login from './Login'
import { Routes, Route } from "react-router-dom";
import CreateSub from './CreateSub';
import Subjects from './Subjects';
import CreateTopic from './CreateTopic';
import Topics from './Topics';
import EditSub from './EditSub';
import DeleteSub from './DeleteSub';
import CreateTask from './CreateTask';

function App() {
  

  return (
    <>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/:subjectId/topics" element={<Topics/>} />
      <Route path="/create/subjects" element={<CreateSub />} />
      <Route path="/edit/:id/subject" element={<EditSub />} />
      <Route path="/create/:topicId/task" element={<CreateTask />} />
      <Route path="/create/:subjectId/topic" element={<CreateTopic />} />
    </Routes>
    </>
  )
}

export default App
