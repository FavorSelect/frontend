import { getLocation } from "@/actions/getLocation";
import SignupWrapper from "@/components/organisms/auth/SignupWrapper";

export default async function Signup() {
  const location = await getLocation();

  return <SignupWrapper location={location} />;
}
