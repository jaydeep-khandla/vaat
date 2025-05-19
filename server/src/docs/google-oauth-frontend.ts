/**
 * Google OAuth Integration Guide for Frontend
 * ==========================================
 * 
 * 1. Initiating Google Login
 * --------------------------
 * 
 * To start the Google OAuth flow, make a GET request to fetch the Google auth URL:
 * 
 * ```javascript
 * const response = await api.get('/auth/google/url');
 * const { authUrl } = response.data.data;
 * 
 * // Redirect user to authUrl
 * window.location.href = authUrl;
 * ```
 * 
 * 2. Handling the OAuth Callback
 * ----------------------------
 * 
 * After Google authentication, the user will be redirected back to your app with a URL like:
 * http://localhost:5173/login?code=4/0AUJR-x6g7sYZnt989BMMfj-ETgRaKIY...
 * 
 * Extract the code parameter and send it to your backend:
 * 
 * ```javascript
 * // In your callback component (e.g., pages/GoogleCallback.tsx or part of Login page)
 * import { useEffect } from 'react';
 * import { useNavigate, useLocation } from 'react-router-dom';
 * import api from '../api/axios';
 * 
 * const GoogleCallback = () => {
 *   const location = useLocation();
 *   const navigate = useNavigate();
 * 
 *   useEffect(() => {
 *     const handleGoogleCallback = async () => {
 *       try {
 *         // Parse the URL search params to get the authorization code
 *         const searchParams = new URLSearchParams(location.search);
 *         const code = searchParams.get('code');
 *         
 *         if (!code) {
 *           throw new Error('No authorization code found');
 *         }
 *         
 *         // Send the code to your backend
 *         const response = await api.post('/auth/google/callback', { code });
 *         
 *         // Handle successful login
 *         const { user, tokens } = response.data.data;
 *         
 *         // Save tokens to localStorage or other state management
 *         localStorage.setItem('accessToken', tokens.accessToken);
 *         localStorage.setItem('refreshToken', tokens.refreshToken);
 *         
 *         // Redirect to dashboard or other protected route
 *         navigate('/dashboard');
 *       } catch (error) {
 *         console.error('Google authentication failed:', error);
 *         // Redirect to login page with error
 *         navigate('/login?error=google_auth_failed');
 *       }
 *     };
 *     
 *     handleGoogleCallback();
 *   }, [location, navigate]);
 *   
 *   return (
 *     <div>
 *       <p>Authenticating with Google...</p>
 *       {/* Add a loading spinner here */}
 *     </div>
 *   );
 * };
 * 
 * export default GoogleCallback;
 * ```
 * 
 * 3. Integration in Login Page
 * ---------------------------
 * 
 * Add a "Sign in with Google" button to your login page:
 * 
 * ```jsx
 * const Login = () => {
 *   const [loginData, setLoginData] = useState({ email: '', password: '' });
 *   
 *   // ... other login code
 *   
 *   const handleGoogleLogin = async () => {
 *     try {
 *       const response = await api.get('/auth/google/url');
 *       const { authUrl } = response.data.data;
 *       window.location.href = authUrl;
 *     } catch (error) {
 *       console.error('Failed to get Google auth URL:', error);
 *     }
 *   };
 *   
 *   return (
 *     <div className="login-container">
 *       <h1>Login</h1>
 *       
 *       <form onSubmit={handleSubmit}>
 *         {/* Regular login form fields */}
 *       </form>
 *       
 *       <div className="social-login">
 *         <button 
 *           type="button" 
 *           className="google-button"
 *           onClick={handleGoogleLogin}
 *         >
 *           Sign in with Google
 *         </button>
 *       </div>
 *     </div>
 *   );
 * };
 * ```
 * 
 * 4. Alternative Approach (No Redirect)
 * -----------------------------------
 * 
 * If you're using the Google Identity Service, you can use their client-side library:
 * 
 * ```html
 * <script src="https://accounts.google.com/gsi/client" async defer></script>
 * ```
 * 
 * And then implement a Google Sign-In button:
 * 
 * ```jsx
 * useEffect(() => {
 *   // Initialize Google Sign-In
 *   if (window.google) {
 *     window.google.accounts.id.initialize({
 *       client_id: "YOUR_GOOGLE_CLIENT_ID",
 *       callback: handleCredentialResponse
 *     });
 *     
 *     window.google.accounts.id.renderButton(
 *       document.getElementById("googleSignInButton"),
 *       { theme: "outline", size: "large" }
 *     );
 *   }
 * }, []);
 * 
 * const handleCredentialResponse = async (response) => {
 *   // Send the ID token to your backend
 *   try {
 *     const res = await api.post('/auth/google/login', { token: response.credential });
 *     // Handle the response similarly to the previous example
 *   } catch (error) {
 *     console.error('Google authentication failed:', error);
 *   }
 * };
 * ```
 * 
 * 5. Testing
 * --------
 * 
 * To test the implementation:
 * 
 * 1. Make sure your Google OAuth credentials are correctly set up in the Google Cloud Console
 * 2. Set the correct redirect URI in both Google Cloud Console and your backend config
 * 3. Test the complete flow from login to callback handling
 * 
 */
