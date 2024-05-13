import { Link } from 'react-router-dom';



export const DashboardNav = () => {
    return(
        <div className="content">
            <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
                <Link to="" className="navbar-brand flex items-center lg:hidden me-4">
                    <img className="object-cover mb-0" width="50%" alt="logo" src="" />
                </Link>
                <Link to="#" className="sidebar-toggler flex-shrink-0">
                    <i className="fa fa-bars text-ggreen"></i>
                </Link>
                <form method="post" action="" className="hidden md:flex ms-4">
                    <input className="form-control border-0" name="text" type="search" placeholder="Search through tasks" id="livebox" />
                    <p id="task" className="my-3 text-black search"></p>
                </form>
                <div className="navbar-nav items-center ms-auto">
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="fa fa-bell me-lg-2"></i>
                            <span className="hidden lg:inline-flex">Notifications</span>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-b m-0">
                            <Link to="#" className="dropdown-item">
                                <h6 className="font-normal mb-0">Profile updated</h6>
                                <small>15 minutes ago</small>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="#" className="dropdown-item">
                                <h6 className="font-normal mb-0">New item added to should do list</h6>
                                <small>15 minutes ago</small>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="#" className="dropdown-item">
                                <h6 className="font-normal mb-0">Phone number changed</h6>
                                <small>15 minutes ago</small>
                            </Link>
                            <hr className="dropdown-divider" />
                            <Link to="#" className="dropdown-item text-center">See all notifications</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
