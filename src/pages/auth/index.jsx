import {auth, provider} from "../../config/firebase-config"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Auth =() => {
    const navigat= useNavigate()
    const signInWithGoogle = async ()=>{
        const results = await signInWithPopup(auth,provider)
        const authInfo ={
            userId:results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true
        }
        localStorage.setItem("auth", JSON.stringify(authInfo))
        navigat("./expense-tracker")
        console.log(results)
    }

    return (
        <div className="login-page">
            <p>Sign in with google</p>
            <button className="login-with-google-btn"  onClick={signInWithGoogle}>
                {""}
                Sign In With Google
            </button>
        </div>
    )
}