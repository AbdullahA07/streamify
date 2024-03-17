import { getRecommended } from "@/lib/recommended-service"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle, ToggleSkeleton } from "./toggle"
import { Wrapper } from "./wrapper"
import { getFollowedUsers } from "@/lib/follow-service"
import { Following, FollowingSkeleton } from "./following"

export const SidebarSkeleton = () => {
    return (
     <aside className="fixed left-0 flex flex-col w-[80px] lg:w-60 h-full bg-background border-r border-[#2D2DE35] z-50">
        <ToggleSkeleton/>
        <FollowingSkeleton/>
        <RecommendedSkeleton/>
     </aside>   
    )
}

export const Sidebar = async () => {
    const recommended = await getRecommended();
    const following = await getFollowedUsers();

    return (
        <Wrapper>
            <Toggle/>
            <div className="space-y-4 pt-4 lg:pt-0">
                <Following data={following} />
                <Recommended data = {recommended}/>    

            </div>
        </Wrapper>
    )
}