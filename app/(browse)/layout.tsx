import { Container } from "./_components/container"
import { Navabar } from "./_components/navbar"
import { Sidebar } from "./_components/sidebar"
const BrowseLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Navabar/>
            <div className="flex h-full pt-20">
                <Sidebar/>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )


}

export default BrowseLayout