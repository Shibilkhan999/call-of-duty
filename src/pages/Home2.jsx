// import React from 'react';
// import { useContext, useState, useEffect } from 'react'; // Import React and hooks
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { getFirestore, collection, addDoc,query, getDocs, onSnapshot } from 'firebase/firestore';
// import { GlobalContext } from '../context/Context';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import CardOverflow from '@mui/joy/CardOverflow';
// import Avatar from '@mui/joy/Avatar';
// import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
// import SendOutlined from '@mui/icons-material/SendOutlined';
// import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
// import Input from '@mui/joy/Input';
// import Link from '@mui/joy/Link';
// import MoreHoriz from '@mui/icons-material/MoreHoriz';
// import Face from '@mui/icons-material/Face';

// const Home2 = () => {
//     const [posts, setPosts] = useState([]); // State for posts
//     const [postCaption, setPostCaption] = useState(""); // State for new post caption
//     const auth = getAuth(); // Firebase auth instance
//     const db = getFirestore(); // Firestore instance
//     const { state } = useContext(GlobalContext); // Access global context

    
//     const getPost = async () => {
//       const q = query(collection(db, "posts"));

//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//       });
//     }
//     useEffect(() => {
//       getPost();
//     },[])

//     // Add a new post
//     const addPost = async (e) => {
//         e.preventDefault();
//         try {
//             const docRef = await addDoc(collection(db, "posts"), {
//                 userName: state.user.displayName, // Use state.user for user details
//                 userEmail: state.user.email,
//                 userProfile: state.user.photoURL,
//                 userId: state.user.uid,
//                 postText: postCaption,
//                 postDate: new Date().getTime(),
//             });
//             setPostCaption("");
//             setPosts([]);
//             getPost()
//             console.log("Document written with ID: ", docRef.id); // Log added doc ID
//         } catch (e) {
//             console.error("Error adding document: ", e); // Log errors
//         }
//     };
    

//     // Logout function
//     const logoutUser = () => {
//         signOut(auth)
//             .then(() => console.log("Sign-out successful"))
//             .catch(error => console.log("An error happened", error));
//     };

//     return (

//       <div>
//                {/* <h1 style={{margin:'20px', fontSize:'40px'}}>{state?.user?.displayName}</h1>
//                  <h6 style={{margin:'20px', fontSize:'40px'}}>{state?.user?.email}</h6> */}
      
      
//                    {state?.isLogin === true ? (
//                       <button
//                           onClick={logoutUser}
//                           style={{
//                               backgroundColor: "#ff4500",
//                               color: "#fff",
//                               padding: "12px 25px",
//                               border: "none",
//                               borderRadius: "8px",
//                               cursor: "pointer",
//                               fontSize: "16px",
//                               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//                               transition: "all 0.3s ease",
//                               textTransform: "uppercase",
//                               letterSpacing: "1px",
//                               marginBottom: "20px",
//                               margin: "20px",
//                           }}
//                           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e04e00")}
//                           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff4500")}
//                       >
//                           Logout
//                       </button>
//                   ) : null}
      
//                   <form
//                       onSubmit={addPost}
//                       style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           gap: "10px",
//                           padding: "20px",
//                           background: "gray",
//                           borderRadius: "12px",
//                           maxWidth: "500px",
//                           margin: "auto"
//                       }}
//                   >
//                       <textarea
//                           placeholder="What's on your mind?"
//                           value={postCaption}
//                           onChange={(e) => setPostCaption(e.target.value)}
//                           style={{
//                               width: "100%",
//                               minHeight: "100px",
//                               padding: "10px",
//                               borderRadius: "8px"
//                           }}
//                       />
//                       <button
//                           type="submit"
//                           style={{
//                               width: "100%",
//                               padding: "12px",
//                               background: "#ff6b00",
//                               color: "white",
//                               borderRadius: "8px",
//                               fontSize: "16px"
//                           }}
//                       >
//                           Post
//                       </button>
//                   </form>
      
//                   <div>
//                       {posts.map((post) => (
//                           <Card
//                               key={post.id}
//                               variant="outlined"
//                               sx={{
//                                   minWidth: 350,
//                                   maxWidth: 500,
//                                   margin: "20px auto",
//                                   backgroundColor: "black",
//                                   color: "white",
//                                   borderRadius: "12px"
//                               }}
//                           >
//                               <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
//                                   <Avatar
//                                       size="sm"
//                                       src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwODw8KFSsdFRkrKy0rKysrKysrKys3LSsrKysrKysrLSsrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIABwAHAMBIgACEQEDEQH/xAAZAAEAAgMAAAAAAAAAAAAAAAAHAggDBAb/xAAsEAABAwMBBgUFAQAAAAAAAAABAgMEAAURIQYHEhMxQRUiUXGhUmGBkbMU/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ABSNGemSmY0ZsuPvOJbbQOqlE4A/Zplt25CEmG0bveXUy1AcaWEpCAr6QTqffSi7YzTbCxH0uMf+iadN5knkxrA+W1u8q+Rl8ttPEpWOLRI7k9qAp3kbvXdjv88uPKMu3vq5YWpIStteM8JHfIBII9D+eJA0pc3ubTeN7MRo/gt4gcM5C+ZOihpJ8ixgHJ116faiQUG/s9LagX+2THzhqPLadWQM4SlYJ+BVh77bk7Qs2l6JKbLMaezNS4nzpdSjOgIPfPWqzqGDWZidLjo4I8p9pHXhQ4Uj4oF/fjc4vg8K181JmGSHy0DkpQEKGT6ZKtPY0OCoqWpaytaipSjkknJJqSdRQf/Z"
//                                       sx={{ p: 0.5, border: '2px solid', borderColor: 'orange' }}
//                                   />
//                                   <Typography sx={{ fontSize: 'sm', color: 'white' }}>
//                                       <strong>Call of Duty®:</strong> {post.caption}
//                                   </Typography>
//                                   <Typography sx={{ fontSize: '10px', color: 'gray', my: 0.5 }}>Just now</Typography>
//                                   <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
//                                       <MoreHoriz />
//                                   </IconButton>
//                               </CardContent>
      
//                               <CardOverflow>
//                                   <img
//                                       src="https://gamingbolt.com/wp-content/uploads/2024/05/call-of-duty-black-ops-6-1.jpg"
//                                       alt="Post"
//                                       style={{ width: "100%", borderRadius: "8px" }}
//                                   />
//                               </CardOverflow>
      
//                               <CardContent orientation="horizontal" sx={{ alignItems: 'center' }}>
//                                   <IconButton variant="plain" color="neutral" size="sm">
//                                       <FavoriteBorder />
//                                   </IconButton>
//                                   <IconButton variant="plain" color="neutral" size="sm">
//                                       <ModeCommentOutlined />
//                                   </IconButton>
//                                   <IconButton variant="plain" color="neutral" size="sm">
//                                       <SendOutlined />
//                                   </IconButton>
//                                   <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
//                                       <BookmarkBorderRoundedIcon />
//                                   </IconButton>
//                               </CardContent>
      
//                               <CardContent>
//                                   <Link
//                                       component="button"
//                                       underline="none"
//                                       textColor="text.primary"
//                                       sx={{ fontSize: 'sm', fontWeight: 'lg', color: "white" }}
//                                   >
//                                       8.1M Likes
//                                   </Link>
//                                   <Typography sx={{ fontSize: 'sm', color: "white" }}>
//                                       <Link
//                                           component="button"
//                                           color="white"
//                                           sx={{ fontWeight: 'lg', color: "white" }}
//                                       >
//                                           MUI
//                                       </Link>{' '}
//                                       The React component library you always wanted
//                                   </Typography>
//                                   <Link
//                                       component="button"
//                                       underline="none"
//                                       startDecorator="…"
//                                       sx={{ fontSize: 'sm', color: 'white' }}
//                                   >
//                                       more
//                                   </Link>
//                                   <Link
//                                       component="button"
//                                       underline="none"
//                                       sx={{ fontSize: '10px', color: 'white', my: 0.5 }}
//                                   >
//                                       2 DAYS AGO
//                                   </Link>
//                               </CardContent>
      
//                               <CardContent orientation="horizontal" sx={{ gap: 1 }}>
//                                   <IconButton size="sm" variant="plain" color="neutral">
//                                       <Face />
//                                   </IconButton>
//                                   <Input
//                                       variant="plain"
//                                       size="sm"
//                                       placeholder="Add a comment…"
//                                       sx={{
//                                           flex: 1,
//                                           background: "#222",
//                                           borderRadius: "8px",
//                                           color: "white"
//                                       }}
//                                   />
//                                   <Link disabled underline="none" role="button" sx={{ color: "gray" }}>
//                                       Post
//                                   </Link>
//                               </CardContent>
//                           </Card>
//                       ))}
//                   </div>
//               </div>
      
//     );
// };

// export default Home2;




import React from 'react';
import { useContext, useState, useEffect } from 'react'; // Import React and hooks
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, getDocs, onSnapshot } from 'firebase/firestore';
import { GlobalContext } from '../context/Context';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Face from '@mui/icons-material/Face';

const Home2 = () => {
    const [posts, setPosts] = useState([]); // State for posts
    const [postCaption, setPostCaption] = useState(""); // State for new post caption
    const auth = getAuth(); // Firebase auth instance
    const db = getFirestore(); // Firestore instance
    const { state } = useContext(GlobalContext); // Access global context



    useEffect(() => {
      const q = query(collection(db, "posts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const postsArray = [];
          querySnapshot.forEach((doc) => {
              postsArray.push({ id: doc.id, ...doc.data() });
          });
          setPosts(postsArray.sort((a, b) => b.postDate - a.postDate)); // नए पोस्ट ऊपर दिखें
      });
      return () => unsubscribe(); // Cleanup
  }, []);

    const getPost = async () => {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    };

    useEffect(() => {
        getPost();
    }, []);

    // Add a new post
    const addPost = async (e) => {
        e.preventDefault();
        if (!postCaption.trim()) return;
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                userName: state.user.displayName, // Use state.user for user details
                userEmail: state.user.email,
                userProfile: state.user.photoURL,
                userId: state.user.uid,
                postText: postCaption,
                postDate: new Date().getTime(),
            });
            setPostCaption("");
            // setPosts([]);
            // getPost();
            // console.log("Document written with ID: ", docRef.id); // Log added doc ID
        } catch (e) {
            console.error("Error adding document: ", e); // Log errors
        }
    };

    // Logout function
    const logoutUser = () => {
        signOut(auth)
            .then(() => console.log("Sign-out successful"))
            .catch(error => console.log("An error happened", error));
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
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e04e00")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff4500")}
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
                    gap: "10px",
                    padding: "20px",
                    background: "gray",
                    borderRadius: "12px",
                    maxWidth: "500px",
                    margin: "auto"
                }}
            >
                <textarea
                    placeholder="What's on your mind?"
                    value={postCaption}
                    onChange={(e) => setPostCaption(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "100px",
                        padding: "10px",
                        borderRadius: "8px"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#ff6b00",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "16px"
                    }}
                >
                    Post
                </button>
            </form>

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
                            borderRadius: "12px"
                        }}
                    >
                        <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                            <Avatar
                                src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwODw8KFSsdFRkrKy0rKysrKysrKys3LSsrKysrKysrLSsrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIABwAHAMBIgACEQEDEQH/xAAZAAEAAgMAAAAAAAAAAAAAAAAHAggDBAb/xAAsEAABAwMBBgUFAQAAAAAAAAABAgMEAAURIQYHEhMxQRUiUXGhUmGBkbMU/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ABSNGemSmY0ZsuPvOJbbQOqlE4A/Zplt25CEmG0bveXUy1AcaWEpCAr6QTqffSi7YzTbCxH0uMf+iadN5knkxrA+W1u8q+Rl8ttPEpWOLRI7k9qAp3kbvXdjv88uPKMu3vq5YWpIStteM8JHfIBII9D+eJA0pc3ubTeN7MRo/gt4gcM5C+ZOihpJ8ixgHJ116faiQUG/s9LagX+2THzhqPLadWQM4SlYJ+BVh77bk7Qs2l6JKbLMaezNS4nzpdSjOgIPfPWqzqGDWZidLjo4I8p9pHXhQ4Uj4oF/fjc4vg8K181JmGSHy0DkpQEKGT6ZKtPY0OCoqWpaytaipSjkknJJqSdRQf/Z'
                                size="sm"
                                sx={{ p: 0.5, border: '2px solid', borderColor: 'orange' }}
                            />
                            <Typography sx={{ fontSize: 'sm', color: 'white' }}>
                                <strong>Call of Duty®:       </strong> {post.postText}
                            </Typography>
                            <Typography sx={{ fontSize: '10px', color: 'gray', my: 0.5 , }}>Just now</Typography>
                            {/* <Typography sx={{ fontSize: '10px', color: 'gray', my: 0.5 }}>
                {new Date(post.postDate).toLocaleString()} 
            </Typography> */}
                            <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                                <MoreHoriz />
                            </IconButton>
                            
                        </CardContent>

                        <CardOverflow>
                            <img
                                src="https://gamingbolt.com/wp-content/uploads/2024/05/call-of-duty-black-ops-6-1.jpg"
                                alt="Post"
                                style={{ width: "100%", borderRadius: "8px" }}
                            />
                        </CardOverflow>

                        <CardContent orientation="horizontal" sx={{ alignItems: 'center' }}>
                            <IconButton variant="plain" color="neutral" size="sm">
                                <FavoriteBorder />
                            </IconButton>
                            <IconButton variant="plain" color="neutral" size="sm">
                                <ModeCommentOutlined />
                            </IconButton>
                            <IconButton variant="plain" color="neutral" size="sm">
                                <SendOutlined />
                            </IconButton>
                            <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                                <BookmarkBorderRoundedIcon />
                            </IconButton>
                        </CardContent>

                        <CardContent>
                            <Link
                                component="button"
                                underline="none"
                                textColor="text.primary"
                                sx={{ fontSize: 'sm', fontWeight: 'lg', color: "white" }}
                            >
                                8.1M Likes
                            </Link>
                            <Typography sx={{ fontSize: 'sm', color: "white" }}>
                                <Link
                                    component="button"
                                    color="white"
                                    sx={{ fontWeight: 'lg', color: "white" }}
                                >
                                    MUI
                                </Link>{' '}
                                The React component library you always wanted
                            </Typography>
                            <Link
                                component="button"
                                underline="none"
                                startDecorator="…"
                                sx={{ fontSize: 'sm', color: 'white' }}
                            >
                                more
                            </Link>
                            <Link
                                component="button"
                                underline="none"
                                sx={{ fontSize: '10px', color: 'white', my: 0.5 }}
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
                                    color: "white"
                                }}
                            />
                            <Link disabled underline="none" role="button" sx={{ color: "gray" }}>
                                Post
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home2;