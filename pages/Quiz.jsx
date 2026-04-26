// Redirects to DecadeTrivia
import { useEffect } from "react";
export default function Quiz() {
  useEffect(() => { window.location.href = "/DecadeTrivia"; }, []);
  return <div style={{background:"#111827",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#eab308",fontFamily:"Georgia,serif",fontSize:20}}>Redirecting to Trivia...</div>;
}
