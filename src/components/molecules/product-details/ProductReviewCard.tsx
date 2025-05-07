import React from "react";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Paragraph from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

type ReviewProps = {
  name: string;
  date: string;
  rating: number;
  comment: string;
  images?: string[];
  likes?: number;
};

const ReviewCard: React.FC<ReviewProps> = ({
  name,
  date,
  rating,
  comment,
  images,
  likes,
}) => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  const handleLike = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className="font-semibold text-gray-800 flex gap-x-2 items-center
          "
          >
            {name}
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>

        {(images ?? []).length > 0 && (
          <div className="flex gap-2 mb-2">
            {(images ?? []).map((img, idx) => (
              <Image
                key={idx}
                src={img}
                width={70}
                height={70}
                alt={`Review photo ${idx + 1}`}
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          {/* Comment */}
          <Paragraph className="text-gray-700 text-sm">{comment}</Paragraph>

          {/* Like/Dislike */}
          <div className="pt-2 text-sm text-gray-500">
            <Button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-scarlet-red"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>({likes})</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
