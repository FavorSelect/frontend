import { getLocation } from "@/actions/getLocation";
import LoginWrapper from "@/components/organisms/auth/LoginWrapper";

export default async function Login() {
  const location = await getLocation();
  return <LoginWrapper location={location} />;
}
