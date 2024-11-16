import Image from "next/image";
import Comments from "./Comments";
import PostInteraction from "./PostInteraction";
import { Post as PostType, User } from "../../../prisma/generated/client";
import PostActions from "./PostActions";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & { _count: { comments: number } };

const Post = ({
  post,
  userId,
}: {
  post: FeedPostType;
  userId: string | null;
}) => {
  const isAuthenticated = userId !== null;

  return (
    <div className="min-h-44 bg-foreground shadow-lg rounded-xl p-3 gap-4 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between text-primary">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 md:w-7 md:h-7 relative">
            <Image
              src={post.user.avatar || "./noavatar.png"}
              alt=""
              className="object-cover rounded-md"
              fill
            />
          </div>
          <p className="text13 text-extra py-1 px-2 bg-user rounded-md font-semibold cursor-pointer">
            <span className="text-lg leading-3">@</span>
            {post.user.username}
          </p>
          <span className="font-medium text13 md:text-base">
            {post.user.firstname || ""}
          </span>
        </div>
        <PostActions
          postId={post.id}
          userId={userId || ""}
          postUserId={post.user.id}
        />
      </div>
      {/* Content */}
      <div className="flex flex-col justify-center gap-4">
        {post.img && (
          <div className="w-full h-52 md:min-h-96 relative">
            <Image
              src={post.img || ""}
              alt=""
              className="object-cover rounded-lg "
              fill
            />
          </div>
        )}
        <p className="text12 text-text min-h-6">{post.desc}</p>
      </div>
      {/* Interaction */}
      <PostInteraction
        postId={post.id}
        likes={post.likes ? post.likes.map((like) => like.userId) : []}
        commentNumber={post._count.comments}
        isAuthenticated={isAuthenticated} // Passing isAuthenticated to handle the visibility of actions
      />
      {isAuthenticated ? (
        <Comments postId={post.id} />
      ) : (
        <p className="text-text text-sm">Log in to comment.</p>
      )}
    </div>
  );
};

export default Post;
