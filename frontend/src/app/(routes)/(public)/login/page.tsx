import LoginPage from "@/views/login/LoginPage";
import githubLogin from "@/actions/github/login-action";

export default function Login() {
  return <LoginPage githubLogin={githubLogin} />;
}
