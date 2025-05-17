import Image from "next/image";

interface UserProfileProps {
  name: string;
  membership: string;
  profileImage: string;
  verified?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  membership,
  profileImage,
  verified = true,
}) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Profile Image */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
        <Image
          src={profileImage || "/profile-placeholder.png"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        {/* User Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{membership}</p>
        </div>

        {/* Verified Badge */}
        {verified && (
          <div className="transform translate-y-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5 text-blue-500"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 0a8 8 0 108 8A8 8 0 008 0zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L7 8.586l3.293-3.293a1 1 0 011.414 0z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
