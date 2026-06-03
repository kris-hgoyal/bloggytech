import {BrowserRouter , Routes , Route} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage"
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import UserProfile from "./components/Users/UserProfile";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import PublicPosts from "./components/Posts/PublicPosts";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostList from "./components/Posts/PostList";
import UpdatePost from "./components/Posts/UpdatePost";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import UpdateProfile from "./components/Users/UpdateProfile";
const App = () => {
  const {userAuth} = useSelector((state)=>state.users)
  const isLoggedIn = userAuth?.userInfo?.token
  return (
    <BrowserRouter>
    <ScrollToTop/>
    {isLoggedIn ? <PrivateNavbar/> : <PublicNavbar/>}
      <Routes>
          <Route path = "/" element = {<Homepage/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/user-profile" element = {<ProtectedRoute> <UserProfile/> </ProtectedRoute> }/>
          <Route path = "/user-public-profile/:userId" element = {<ProtectedRoute> <PublicUserProfile/> </ProtectedRoute> }/>
          <Route path = "/add-post" element = {<ProtectedRoute> <AddPost/> </ProtectedRoute> }/>
          <Route path = "/posts/:postId" element = { <PostDetails/>}/>
          <Route path = "/posts" element = {<ProtectedRoute> <PostList/> </ProtectedRoute> }/>
          <Route path="/posts/update/:postId" element={<ProtectedRoute><UpdatePost /></ProtectedRoute>}></Route>
          <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
