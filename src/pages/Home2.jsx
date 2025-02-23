import React from "react";
import { useContext, useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  updateDoc,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc, 
  serverTimestamp,
  orderBy,
  where,
  limit,
  // where,
  // getDoc,
} from "firebase/firestore";
import axios from 'axios';
import { GlobalContext } from "../context/Context";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Avatar from "@mui/joy/Avatar";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Face from "@mui/icons-material/Face";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import moment from 'moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import "./Home2.css";
import { EditIcon } from "lucide-react";


const Home2 = () => {
  const [posts, setPosts] = useState([]);
  const [postCaption, setPostCaption] = useState("");
  const auth = getAuth();
  const { state, dispatch } = useContext(GlobalContext);
  const [file, setFile] = useState(null);
  const db = getFirestore();

  const [show , setShow] = useState(false);

  const [currentCaption , setCurrentCaption] = useState("");
  const [currentPostId , setCurrentPostId] = useState("")


  // const getPost = async () => {
  //       const q = query(collection(db, "posts"));
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         // console.log(doc.id, " => ", doc.data());
  //         setPosts((prev) => [...prev, doc.data()]);
  //       });
  //     };

  useEffect(() => {
    let unsubscribe;

    const getRealTimeUpdates = () => {
      const q = query(collection(db, "posts"), orderBy("postDate","desc"));
      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          let realTimePost = [];
          querySnapshot.forEach((doc) => {
            realTimePost.push({ ...doc.data(), id: doc.id });
          });
          setPosts(realTimePost);
        },
        (error) => {
          console.error("Error fetching real-time updates: ", error);
        }
      );
    };

    getRealTimeUpdates();

    return () => {
      if (unsubscribe) {
        unsubscribe(); 
      }
    };
  }, [db]);

  const addPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "posts-image");

    try {
      let imageUrl = "";
      if (file) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dw2jrfzql/upload", formData);
        imageUrl = res.data.url;
      

      const docRef = await addDoc(collection(db, "posts"), {
        userName: state.user?.displayName,
        userEmail: state.user?.email,
        userProfile: state.user?.photoURL,
        userId: state.user?.uid,
        postText: postCaption,
        postDate: serverTimestamp(),
        postFile: imageUrl,
      });

      setPostCaption("");
      // setFile(null);
    } 
    else{
      const docRef = await addDoc(collection(db, "posts"), {
        userName: state.user?.displayName,
        userEmail: state.user?.email,
        userProfile: state.user?.photoURL,
        userId: state.user?.uid,
        postText: postCaption,
        postDate: serverTimestamp(),
        postFile: ""
      });
      setPostCaption("");
    }
    }
    catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => console.log("An error happened", error));
  };


  const handleClose = () => {
    setShow(false);
    setCurrentCaption("");
    setCurrentPostId("");
  };

  const updatePost = async () => {
    // if (!currentPostId) return;
    await updateDoc(doc(db, "posts", currentPostId), {
      postText: currentCaption
    });
    handleClose();
  };

  const editPost = (val, id) => {
    setShow(true);
    setCurrentCaption(val);
    setCurrentPostId(id);
  };


  return (
    <div>
      {state?.isLogin === true ? (
        <button
          onClick={logoutUser}
          style={{
            backgroundColor: "#ff4500",
            color: "#fff",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "20px",
            margin: "20px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#e04e00")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#ff4500")
          }
        >
          Logout
        </button>
      ) : null}



<form
  onSubmit={addPost}
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    // background: "linear-gradient(145deg, #1c1c1c, #333333)",
    background:"#111111",
    borderRadius: "12px",
    border: "2px solid #ff6b00",
    maxWidth: "500px",
    margin: "auto",
    // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)",
    color: "white",
    fontFamily: "'Arial', sans-serif",
  }}
>
  
  <div style={{ textAlign: "center", marginBottom: "10px" }}>
    <img
      src="https://4kwallpapers.com/images/wallpapers/call-of-duty-black-3840x2160-17015.jpg"
      alt="Call of Duty Logo"
      style={{ width: "100%", marginBottom: "10px" }}
    />
    <h2 style={{ margin: "0", fontSize: "24px", color: "#ff6b00" }}>
      Create a New Post
    </h2>
  </div>

  
  <textarea
    placeholder="What's on your mind, Soldier?"
    value={postCaption}
    onChange={(e) => setPostCaption(e.target.value)}
    style={{
      width: "100%",
      minHeight: "100px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #555",
      background: "#222",
      color: "white",
      fontSize: "14px",
      outline: "none",
    }}
  />

  <div
  style={{
    width: "100%",
    position: "relative",
    overflow: "hidden",
    borderRadius: "8px",
    border: "1px solid #555",
    background: "#222",
    cursor: "pointer",
    textAlign: "center",
    padding: "10px",
    color: "#ff6b00",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "background 0.3s ease",
  }}
  onMouseOver={(e) => (e.currentTarget.style.background = "#333")}
  onMouseOut={(e) => (e.currentTarget.style.background = "#222")}
>
  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0,
      cursor: "pointer",
    }}
  />
  <span>Upload Intel File</span>
</div>

  
  <button
    type="submit"
    style={{
      width: "100%",
      padding: "12px",
      background: "#ff6b00",
      color: "white",
      borderRadius: "8px",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      outline: "none",
      transition: "background 0.3s ease, transform 0.2s ease",
      fontWeight: "bold",
      textTransform: "uppercase",
    }}
    onMouseOver={(e) => (e.target.style.background = "#e65c00")}
    onMouseOut={(e) => (e.target.style.background = "#ff6b00")}
    onMouseDown={(e) => (e.target.style.background = "#cc5200")}
    onMouseUp={(e) => (e.target.style.background = "#ff6b00")}
  >
    Post Mission
  </button>
</form>                 

{/* <form
  onSubmit={addPost}
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    background: "#111111",
    border: "2px solid #ff6b00",
    borderRadius: "8px",
    maxWidth: "500px",
    margin: "auto",
    boxShadow: "0 0 20px rgba(255, 107, 0, 0.3)",
    color: "white",
    fontFamily: "'Industry', sans-serif",
  }}
>
  <div style={{ textAlign: "center", marginBottom: "5px" }}>
    <img
      src="https://4kwallpapers.com/images/wallpapers/call-of-duty-black-3840x2160-17015.jpg"
      alt="Call of Duty"
      style={{ 
        width: "100%", 
        height: "150%",
        objectFit: "cover",
        borderRadius: "4px"
      }}
    />
    <h2 style={{ 
      margin: "10px 0 0", 
      fontSize: "22px", 
      color: "#ff6b00",
      textTransform: "uppercase",
      letterSpacing: "1px"
    }}>
      Create a New Post
    </h2>
  </div>

  <textarea
    placeholder="Enter mission details..."
    value={postCaption}
    onChange={(e) => setPostCaption(e.target.value)}
    style={{
      width: "100%",
      minHeight: "100px",
      padding: "10px",
      background: "#1a1a1a",
      border: "1px solid #444",
      borderRadius: "4px",
      color: "white",
      fontSize: "14px",
      resize: "vertical"
    }}
  />

  <div
    style={{
      width: "100%",
      position: "relative",
      padding: "12px",
      background: "#222",
      border: "1px solid #444",
      borderRadius: "4px",
      color: "#ff6b00",
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: "14px",
      cursor: "pointer"
    }}
  >
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer",
      }}
    />
    UPLOAD INTEL
  </div>

  <button
    type="submit"
    style={{
      width: "100%",
      padding: "12px",
      background: "#ff6b00",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      transition: "background 0.3s"
    }}
  >
    Post Mission
  </button>
</form>  */}

{/* <form
  onSubmit={addPost}
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    background: "black",
    border: "1px solid #dbdbdb",
    borderRadius: "8px",
    maxWidth: "450px",
    margin: "auto",
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  }}
>
  <div style={{ 
    display: "flex", 
    alignItems: "center", 
    gap: "12px", 
    marginBottom: "5px" 
  }}>
    <div style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "2px solid white",
        backgroundImage: "url('https://i.pravatar.cc/150?img=3')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}></div>
    </div>
    <div>
      <div style={{ 
        fontWeight: "600", 
        fontSize: "14px", 
        color: "#262626" 
      }}>username</div>
      <div style={{ 
        fontSize: "12px", 
        color: "#8e8e8e" 
      }}>Create Post</div>
    </div>
  </div>

  <textarea
    placeholder="What's on your mind?"
    value={postCaption}
    onChange={(e) => setPostCaption(e.target.value)}
    style={{
      width: "100%",
      minHeight: "100px",
      padding: "12px",
      border: "1px solid #dbdbdb",
      borderRadius: "4px",
      fontSize: "14px",
      color: "#262626",
      resize: "none",
      outline: "none",
    }}
  />

  <div
    style={{
      width: "100%",
      position: "relative",
      padding: "10px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "8px",
      cursor: "pointer"
    }}
  >
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer",
      }}
    />
    <svg 
      aria-label="Add photo or video" 
      height="24" 
      role="img" 
      viewBox="0 0 24 24" 
      width="24"
      fill="#0095f6"
    >
      <path d="M6.549 5.013A1.557 1.557 0 108.106 6.57a1.557 1.557 0 00-1.557-1.557z" fillRule="evenodd"></path>
      <path d="M2 18.605l3.901-3.9a.908.908 0 011.284 0l2.807 2.806a.908.908 0 001.283 0l5.534-5.534a.908.908 0 011.283 0l3.905 3.905" fill="none" stroke="#0095f6" strokeLinejoin="round" strokeWidth="2"></path>
      <path d="M18.44 2.004A3.56 3.56 0 0122 5.564h0v12.873a3.56 3.56 0 01-3.56 3.56H5.568a3.56 3.56 0 01-3.56-3.56V5.563a3.56 3.56 0 013.56-3.56z" fill="none" stroke="#0095f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
    </svg>
    <span style={{ 
      fontSize: "14px", 
      color: "#0095f6", 
      fontWeight: "600" 
    }}>Add Photo</span>
  </div>

  <div style={{ 
    height: "1px", 
    background: "#dbdbdb", 
    margin: "5px 0" 
  }}></div>

  <button
    type="submit"
    style={{
      width: "100%",
      padding: "8px 0",
      background: "#0095f6",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s"
    }}
  >
    Share
  </button>

  <div style={{ 
    fontSize: "12px", 
    color: "#8e8e8e", 
    textAlign: "center",
    marginTop: "5px"
  }}>
    By posting, you agree to our Community Guidelines
  </div>
</form> */}


      <div>
        {posts.map((post) => (
          <Card
            key={post.id}
            variant="outlined"
            sx={{
              minWidth: 350,
              maxWidth: 500,
              margin: "20px auto",
              backgroundColor: "black",
              color: "white",
              borderRadius: "12px",
            }}
          >
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", gap: 1 }}
            >
              <Avatar
                src={post.userProfile}
                size="sm"
                sx={{ p: 0.5, border: "2px solid", borderColor: "orange"}}
                style={{backgroundSize:"cover",backgroundPosition: "center",width: 45,
                  height: 45,p: 0.5}}
              />
              <Typography sx={{ fontSize: "sm", color: "white" }}>
                <strong>{post.userName}</strong>
                <p>{post?.postDate?.seconds ? moment((post?.postDate?.seconds * 1000)).fromNow() : "Just Now"}</p>
              </Typography>



              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
                >
  
                <MoreHoriz />
              </IconButton>

              {/* editicon--- */}
              {(state.user?.uid == post.userId)?
              <>
              <IconButton
              onClick={() => editPost(post?.postText, post?.id)}
              sx={{
             color: "gray", 
            "&:hover": {
             color: "black", 
            },
          }}
         >
      <EditIcon fontSize="small" /> 
    </IconButton>
                
                {/* <button onClick={() => editPost(post?.postText,post?.id)}>Edit</button> */}


                {/* deleteicon----- */}
              <IconButton
                onClick={() => {
                  Swal.fire({
                    title: "DO YOU WANT DELETE THIS POST?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Delete",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deletePost(post.id);
                      Swal.fire({
                        title: "DELETED!",
                        text: "Your card has been deleted.",
                        icon: "success",
                      });
                    }
                    
                  });
                }}


                sx={{
                  color: "gray", 
                 "&:hover": {
                  color: "black", 
                 },
               }}

              >
                <DeleteIcon />
              </IconButton>
              </>
              :
              null
            }
            </CardContent>



            <Typography style={{display:"flex", justifyContent:"space-between", color:"lightgray"}}>
                <p>{post.postText}</p>
              </Typography>

            {post.postFile && (
              <CardOverflow>
                <img
                  src={post.postFile}
                  alt="Post"
                  style={{ width: "100%", borderRadius: "8px" }}
                  // 
                />
              </CardOverflow>
            )}

            <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <FavoriteBorder />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <ModeCommentOutlined />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <SendOutlined />
              </IconButton>
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ ml: "auto" }}
              >
                <BookmarkBorderRoundedIcon />
              </IconButton>
            </CardContent>

            <CardContent>
              <Link
                component="button"
                underline="none"
                textColor="text.primary"
                sx={{ fontSize: "sm", fontWeight: "lg", color: "white" }}
              >
                8.1M Likes
              </Link>
              <Typography sx={{ fontSize: "sm", color: "white" }}>
                <Link
                  component="button"
                  color="white"
                  sx={{ fontWeight: "lg", color: "white" }}
                >
                  Callofduty
                </Link>{" "}
                The React component library you always wanted
              </Typography>
              <Link
                component="button"
                underline="none"
                startDecorator="…"
                sx={{ fontSize: "sm", color: "white" }}
              >
                more
              </Link>
              <Link
                component="button"
                underline="none"
                sx={{ fontSize: "10px", color: "white", my: 0.5 }}
              >
                2 DAYS AGO
              </Link>
            </CardContent>

            <CardContent orientation="horizontal" sx={{ gap: 1 }}>
              <IconButton size="sm" variant="plain" color="neutral">
                <Face />
              </IconButton>
              <Input
                variant="plain"
                size="sm"
                placeholder="Add a comment…"
                sx={{
                  flex: 1,
                  background: "#222",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Link
                disabled
                underline="none"
                role="button"
                sx={{ fontSize: "sm", color: "white" }}
              >
                Post
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>



    
{/* update post------------------------- */}
<div className="text-center mt-5">
  <Dialog 
    open={show} 
    onClose={handleClose} 
    maxWidth="sm" 
    fullWidth
    PaperProps={{
      style: {
        backgroundColor: '#0d0c0a',
        border: '2px solid #553a20',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(255, 140, 0, 0.3)',
        color: '#ffe6cc',
        overflow: 'hidden',
        width: '95%',
        margin: '0 auto',
        maxWidth: '500px'
      }
    }}
  >
    <DialogTitle 
      className="modal-title"
      style={{
        backgroundColor: '#1e1a14',
        color: '#ff8c00',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontWeight: '700',
        fontFamily: '"Industry", sans-serif',
        borderBottom: '1px solid #553a20',
        padding: 'clamp(12px, 3vw, 24px)',
        fontSize: 'clamp(16px, 4vw, 20px)',
        textAlign: 'center'
      }}
    >
      UPDATE POST
    </DialogTitle>
    <DialogContent
      style={{
        backgroundColor: '#0d0c0a',
        padding: 'clamp(16px, 5vw, 24px)',
      }}
    >
      <TextField
        fullWidth
        value={currentCaption}
        onChange={(e) => setCurrentCaption(e.target.value)}
        placeholder="Enter new caption..."
        variant="outlined"
        margin="normal"
        InputProps={{
          style: {
            backgroundColor: '#1e1a14',
            color: '#fff',
            borderColor: '#553a20',
            fontFamily: '"Industry", sans-serif',
            fontSize: 'clamp(14px, 3vw, 16px)',
          }
        }}
        InputLabelProps={{
          style: {
            color: '#ff8c00'
          }
        }}
      />
    </DialogContent>
    <DialogActions
      style={{
        backgroundColor: '#0d0c0a',
        borderTop: '1px solid #553a20',
        padding: 'clamp(12px, 3vw, 20px)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}
    >
      <Button 
        onClick={handleClose} 
        style={{
          backgroundColor: '#2a2318',
          color: '#ccc',
          border: '1px solid #553a20',
          padding: 'clamp(6px, 2vw, 10px) clamp(12px, 3vw, 20px)',
          borderRadius: '4px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.2s',
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          flex: '1 1 auto',
          maxWidth: '45%',
          minWidth: '120px'
        }}
      >
        CANCEL
      </Button>
      <Button 
        onClick={updatePost} 
        style={{
          backgroundColor: '#6b3c00',
          color: '#ffbd59',
          border: 'none',
          padding: 'clamp(6px, 2vw, 10px) clamp(12px, 3vw, 20px)',
          borderRadius: '4px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 0 10px rgba(255, 140, 0, 0.5)',
          transition: 'all 0.2s',
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          flex: '1 1 auto',
          maxWidth: '45%',
          minWidth: '140px'
        }}
      >
        SAVE CHANGES
      </Button>
    </DialogActions>
  </Dialog>
</div>

      

    

    </div>
  );
};

export default Home2;