import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FaSearch, FaChartLine, FaBox, FaList } from 'react-icons/fa'; // Import additional icons

function Dashboard() {
    return (
        <div className="dashboard-container">
            <div className="header">
                <h1>Welcome to Your Dashboard</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button>
                        <FaSearch />
                    </button>
                </div>
            </div>

            <div className="sidebar">
                <ul>
                    <li><Link to="/sales"><FaChartLine /> Sales</Link></li>
                    <li><Link to="/products"><FaBox /> Products</Link></li>
                    <li><Link to="/reports"><FaList /> Reports</Link></li> {/* Example additional link */}
                </ul>
            </div>

            <div className="main-content">
                <div className="stats-overview">
                    <div className="stat-card">
                        <h3>Total Sales</h3>
                        <p>$12,345</p>
                    </div>
                    <div className="stat-card">
                        <h3>Products Sold</h3>
                        <p>678</p>
                    </div>
                    <div className="stat-card">
                        <h3>New Orders</h3>
                        <p>45</p>
                    </div>
                </div>

                <div className="recent-activity">
                    <h2>Recent Activity</h2>
                    <ul>
                        <li>Order #1234 completed</li>
                        <li>New product added: "Product A"</li>
                        <li>Sales report generated for August</li>
                    </ul>
                </div>

                <div className="quick-actions">
                    <button>Add New Product</button>
                    <button>Generate Report</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
