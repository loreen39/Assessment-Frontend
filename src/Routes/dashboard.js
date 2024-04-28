import Dashboard from "../components/adminDashboard/dashboard";
import Navbar from "../components/Navbar/navbar";

const adminDashboard = () => {
    return (
        <div>
            <Navbar />
            <Dashboard/>
        </div>
    );
};

export default adminDashboard;