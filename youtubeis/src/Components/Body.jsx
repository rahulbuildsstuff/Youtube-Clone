import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Overlay from "./Overlay";
import { closeMenu } from "../utils/AppSlice";
import { useLocation } from "react-router-dom";

const Body = () => {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    const location = useLocation();

    const isWatchPage = location.pathname === "/watch";

    return (
        <div className="bg-white dark:bg-[#0f0f0f]">
            {/* HOME PAGE SIDEBAR */}
            {isMenuOpen && !isWatchPage && (
                <div className="w-60 shrink-0">
                    <Sidebar />
                </div>
            )}

            {/* WATCH PAGE OVERLAY SIDEBAR */}
            {isMenuOpen && isWatchPage && (
                <>
                    <Overlay onClick={() => dispatch(closeMenu())} />
                    <div className="fixed top-0 left-0 w-60 h-screen bg-white dark:bg-[#212121] z-50 shadow-lg">
                        <Sidebar />
                    </div>
                </>
            )}
        </div>
    );
};

export default Body;
