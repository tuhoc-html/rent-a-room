import { useParams } from "react-router-dom";

export const RoomDetailPage = () => {
    const { idRoom } = useParams();
    return (
        <>
            <h1>RoomDetail {idRoom}</h1>
        
        </>
    )
}