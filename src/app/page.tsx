import AddPost from "@/components/AddPost";
import Feed from "@/components/feed/Feed";
import MenuLeft from "@/components/menuLeft/MenuLeft";
import MenuRight from "@/components/menuRight/MenuRight";
import Stories from "@/components/Stories";

const Homepage = () => {
  return (
    <div className="flex gap-6 md:pt-6">
      <div className="hidden xl:block w-[20%]">
        <MenuLeft type="home" />
      </div>
      <div className="w-full md:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden md:block w-[30%]">
        <MenuRight />
      </div>
    </div>
  );
};

export default Homepage;
