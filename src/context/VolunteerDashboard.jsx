// import { useEffect, useState } from "react";

// import VolunteerSideBar from "../components/VolunteerSideBar";

// import ProfileStrip from "../components/ProfileStrip";
// import DashboardCards from "../components/DashboardCards";
// import TasksSection from "../components/TasksSection";
// import TeamDetails from "../components/TeamDetails";
// import ActivityHistory from "../components/ActivityHistory";
// import { useAuth } from "./AuthContext";

// export default function VolunteerDashboard() {

//     const { user} = useAuth()
//     const [volunteer, setVolunteer] = useState(null)
//     const [isVerified] = useState(true);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//     };

//     // if (!isVerified) {
//     //     return <VerificationPending />;
//     // }

//     useEffect(() => {
//         if (user) {
//             setVolunteer({
//                 role: user.role ?? "Volunteer",
//                 name: user.fullName,
//                 verified: user.verification,
//                 tier: user.tier ?? "tier-2",
//                 status: user.status ?? "Inactive",
//             })
//         }
//     }, [user])

//     const [dashboardStats, setDashboardStats] = useState({
//         verified: true,
//         activeTasks: 0,
//         tier: "Tier-2",
//         status: "Available",
//     });

//     const [teamDetails, setTeamDetails] = useState({
//         teamName: "Relief Operations Unit - Alpha",
//         category: "Medical & Logistics Support",
//         role: "Field Coordinator",
//         leaderName: "Captain Anil Verma",
//         leaderContact: "+91-98765-43210"
//     });

//     const [activityHistory, setActivityHistory] = useState([
//         {
//             date: "2025-12-20",
//             incident: "Flood Relief - Kerala",
//             task: "Medical Aid Distribution",
//             status: "Completed",
//             feedback: "Submitted",
//         },
//         {
//             date: "2025-12-15",
//             incident: "Fire Response - Mumbai",
//             task: "Evacuation Support",
//             status: "Completed",
//             feedback: "Pending",
//         },
//     ]);

//     const images = [
//         "/d3.jpg",
//         "/d4.jpg",
//         "/d5.jpg",
//         "/d6.jpg",

//     ];
//     const [index, setIndex] = useState(0);
//     const [activeBg, setActiveBg] = useState(images[0]);
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     const next = () => {
//         setIndex(prev => {
//             const newIndex = (prev + 1) % images.length;
//             setActiveBg(images[newIndex]);
//             return newIndex;
//         });
//     };
//     const prev = () => {
//         setIndex((index) => {
//             const newIndex = index === 0 ? images.length - 1 : index - 1;
//             setIndex(newIndex);
//             setActiveBg(images[newIndex]);
//             return newIndex;
//         });
//     };
//     return (
//         <>
//             <div
//                 className="relative h-screen bg-cover bg-center transition-all duration-700"
//                 style={{ backgroundImage: `url(${activeBg})` }}
//             >
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>

//                 <button
//                     className="fixed top-2 left-2 z-[60] w-[50px] h-[44px] flex items-center justify-center bg-[#1F3347] rounded-xl backdrop-blur-md"
//                     onClick={() => setSidebarOpen(true)}
//                 >
//                     <i className="bi bi-list fs-1 text-white"></i>
//                 </button>

//                 <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
//                     <div className="bg-[#1F3347]/90 backdrop-blur-md px-12 py-6 rounded-2xl">
//                         <h1 className="text-4xl font-bold text-white">
//                             Yuvalink
//                         </h1>
//                     </div>
//                 </div>
//             </div>


//             <div className="realtive bg-[#1F3347] pt-35 pb-32">
//                 <div className="relative mx-auto -mt-[85vh] w-[72%] bg-white rounded-2xl shadow-2xl p-6 ">
//                     <div className="relative max-w-[1100px] mx-auto h-[300px] p-8">
//                         <button onClick={prev}
//                             className="absolute left-4 top-1/2 -translate-y-1/2
//                     w-12 h-12 rounded-full
//                     bg-black/40 backdrop-blur-md
//                     flex items-center justify-center
//                     text-white text-2xl hover:scale-110 transition">
//                             <i className="bi bi-arrow-left"></i>
//                         </button>
//                         <img src={images[index]}
//                             className="w-full h-full object-contain rounded-[20%]"
//                             alt="carousel"
//                         />
//                         <button onClick={next}
//                             className="absolute right-4 top-1/2 -translate-y-1/2
//                     w-12 h-12 rounded-full
//                     bg-black/40 backdrop-blur-md
//                     flex items-center justify-center
//                     text-white text-2xl hover:scale-110 transition" >
//                             <i className="bi bi-arrow-right"></i>
//                         </button>
//                     </div>

//                     <div className="space-y-8 mt-6">
//                         <ProfileStrip {...volunteer} />
//                         <DashboardCards
//                             verified={dashboardStats.verified}
//                             activeTasks={dashboardStats.activeTasks}
//                             tier={dashboardStats.tier}
//                             status={dashboardStats.status} />
//                         <div id="tasks"><TasksSection /></div>
//                         <div id="team"><TeamDetails {...teamDetails} /></div>
//                         <div id="history"><ActivityHistory activities={activityHistory} /></div>
//                     </div>
//                 </div>
//             </div>

//             {/* <Sidebar 
//             isOpen={sidebarOpen}
//             onClose={ () => setSidebarOpen(false)}
//         /> */}

//             <VolunteerSideBar
//                 isOpen={sidebarOpen}
//                 onClose={() => setSidebarOpen(false)} onNavigate={(section) => {
//                     setSidebarOpen(false);
//                     if (section === "top") {
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                     } else {
//                         document.getElementById(section)?.scrollIntoView({
//                             behavior: "smooth",
//                         });
//                     }
//                 }}
//                 onLogout={handleLogout}

//             />

//             <section className="bg-[#1F3347] py-20 px-[12%] text-center">
//                 <h2 className="text-white font-bold mb-4 text-[#2b5c8a]">About YuvaLink</h2>
//                 <p className="text-lg leading-relaxed text-white max-w-5xl mx-auto"> Yuvalink is a comprehensive volunteer mangement platform dedicated to connecting passionate individuals with meaningful disaster relief and community service opportunites across India.We believe in the power of collective action and coordinate volunteers with the skills needed to make real impact during critical times.</p>
//             </section>

//             <footer className="bg-[#183a55] py-10 text-center">
//                 <div className="flex justify-center gap-10 text-white text-base mb-5">
//                     <span className="cursor-pointer hover:underline">Privacy Policy</span>
//                     <span className="cursor-pointer hover:underline">Terms of Service</span>
//                     <span className="cursor-pointer hover:underline">Contact Us</span>
//                     <span className="cursor-pointer hover:underline">Partner Sites</span>
//                 </div>
//                 <p className="text-white/70 text-sm">
//                     2025 YuvaLink.ALL rights reserved.
//                 </p>
//             </footer>

//         </>
//     );
// }
import { useEffect, useState } from "react";
import DetailsModal from "../components/DetailsModal";
import VolunteerSideBar from "../components/VolunteerSideBar";
// import { useAuth } from "./AuthContext";
import ProfileStrip from "../components/ProfileStrip";
import DashboardCards from "../components/DashboardCards";
import TasksSection from "../components/TasksSection";
import TeamDetails from "../components/TeamDetails";
import ActivityHistory from "../components/ActivityHistory";
import { useAuth } from "./AuthContext";

export default function VolunteerDashboard() {

    const { user} = useAuth()
    const [volunteer, setVolunteer] = useState(null)
    const [isVerified] = useState(true);

    const [activeModal, setActiveModal] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    // if (!isVerified) {
    //     return <VerificationPending />;
    // }

    useEffect(() => {
        if (user) {
            setVolunteer({
                role: user.role ?? "Volunteer",
                name: user.fullName,
                verified: user.verification,
                tier: user.tier ?? "tier-2",
                status: user.status ?? "Inactive",
            })
        }
    }, [user])

    const [dashboardStats, setDashboardStats] = useState({
        verified: true,
        activeTasks: 0,
        tier: "Tier-2",
        status: "Available",
    });

    const [teamDetails, setTeamDetails] = useState({
        teamName: "Relief Operations Unit - Alpha",
        category: "Medical & Logistics Support",
        role: "Field Coordinator",
        leaderName: "Captain Anil Verma",
        leaderContact: "+91-98765-43210"
    });

    const [activityHistory, setActivityHistory] = useState([
        {
            date: "2025-12-20",
            incident: "Flood Relief - Kerala",
            task: "Medical Aid Distribution",
            status: "Completed",
            feedback: "Submitted",
        },
        {
            date: "2025-12-15",
            incident: "Fire Response - Mumbai",
            task: "Evacuation Support",
            status: "Completed",
            feedback: "Pending",
        },
        {
            date: "2025-12-12",
            incident: "Cyclone Relief - Odisha",
            task: "Food Packet Distribution",
            status: "Completed",
            feedback: "Submitted",
        },
        {
            date: "2025-12-09",
            incident: "Landslide Response - Himachal",
            task: "Rescue & First Aid",
            status: "Completed",
            feedback: "Reviewed",
        },
        {
            date: "2025-12-05",
            incident: "Heatwave Assistance - Rajasthan",
            task: "Water Supply Management",
            status: "Completed",
            feedback: "Submitted",
        },
        {
            date: "2025-11-30",
            incident: "Earthquake Response - Nepal Border",
            task: "Temporary Shelter Setup",
            status: "Completed",
            feedback: "Approved",
        },
  ]);

    const images = [
        "/d3.jpg",
        "/d4.jpg",
        "/d5.jpg",
        "/d6.jpg",

    ];
    const [index, setIndex] = useState(0);
    const [activeBg, setActiveBg] = useState(images[0]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const next = () => {
        setIndex(prev => {
            const newIndex = (prev + 1) % images.length;
            setActiveBg(images[newIndex]);
            return newIndex;
        });
    };
    const prev = () => {
        setIndex((index) => {
            const newIndex = index === 0 ? images.length - 1 : index - 1;
            setIndex(newIndex);
            setActiveBg(images[newIndex]);
            return newIndex;
        });
    };
    return (
        <>
            <div
                className="relative h-screen bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${activeBg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>

                <button
                    className="fixed top-2 left-2 z-[60] w-[50px] h-[44px] flex items-center justify-center bg-[#1F3347] rounded-xl backdrop-blur-md"
                    onClick={() => setSidebarOpen(true)}
                >
                    <i className="bi bi-list fs-1 text-white"></i>
                </button>

                <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-[#1F3347]/90 backdrop-blur-md px-12 py-6 rounded-2xl">
                        <h1 className="text-4xl font-bold text-white">
                            Yuvalink
                        </h1>
                    </div>
                </div>
            </div>


            <div className="realtive bg-[#1F3347] pt-35 pb-32">
                <div className="relative mx-auto -mt-[85vh] w-[72%] bg-white rounded-2xl shadow-2xl p-6 ">
                    <div className="relative max-w-[1100px] mx-auto h-[300px] p-8">
                        <button onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2
                    w-12 h-12 rounded-full
                    bg-black/40 backdrop-blur-md
                    flex items-center justify-center
                    text-white text-2xl hover:scale-110 transition">
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <img src={images[index]}
                            className="w-full h-full object-contain rounded-[20%]"
                            alt="carousel"
                        />
                        <button onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2
                    w-12 h-12 rounded-full
                    bg-black/40 backdrop-blur-md
                    flex items-center justify-center
                    text-white text-2xl hover:scale-110 transition" >
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>

                    <div className="space-y-8 mt-6">
                        <ProfileStrip {...volunteer} />
                        <DashboardCards
                            verified={dashboardStats.verified}
                            activeTasks={dashboardStats.activeTasks}
                            tier={dashboardStats.tier}
                            status={dashboardStats.status} />
                        <div id="tasks"><TasksSection /></div>
                        <div id="team"><TeamDetails {...teamDetails} /></div>
                        <div id="history"><ActivityHistory activities={activityHistory} /></div>
                    </div>
                </div>
            </div>

            {/* <Sidebar 
            isOpen={sidebarOpen}
            onClose={ () => setSidebarOpen(false)}
        /> */}
            {/* POPUP (SIDEBAR CLICK) */}
            {["tasks","team","history"].includes(activeModal) && (
              <DetailsModal
                title=""
                onClose={() => setActiveModal(null)}
              >
                {activeModal === "tasks" && (
                  <div className="px-6 [&_*]:text-base md:[&_*]:text-lg">
                    <TasksSection />
                  </div>
                )}
                {activeModal === "team" && (
                  <div className="px-6 [&_*]:text-base md:[&_*]:text-lg">
                    <TeamDetails {...teamDetails} />
                  </div>
                )}
                {activeModal === "history" && (
                  <div className="px-6 [&_*]:text-base md:[&_*]:text-lg">
                    <ActivityHistory activities={activityHistory} />
                  </div>
                )}
              </DetailsModal>
            )}

            <VolunteerSideBar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)} onNavigate={(section) => {
                    setSidebarOpen(false);
                    
                    if (section === "logout") {
                      handleLogout();
                      return;
                    }

                    if (section === "top") {
                      setActiveModal(null);   // home = no popup
                      return;
                    }

                    setActiveModal(section);
                }}

               

            />

            <section className="bg-[#1F3347] py-20 px-[12%] text-center">
                <h2 className="text-white font-bold mb-4 text-[#2b5c8a]">About YuvaLink</h2>
                <p className="text-lg leading-relaxed text-white max-w-5xl mx-auto"> Yuvalink is a comprehensive volunteer mangement platform dedicated to connecting passionate individuals with meaningful disaster relief and community service opportunites across India.We believe in the power of collective action and coordinate volunteers with the skills needed to make real impact during critical times.</p>
            </section>

            <footer className="bg-[#183a55] py-10 text-center">
                <div className="flex justify-center gap-10 text-white text-base mb-5">
                    <span className="cursor-pointer hover:underline">Privacy Policy</span>
                    <span className="cursor-pointer hover:underline">Terms of Service</span>
                    <span className="cursor-pointer hover:underline">Contact Us</span>
                    <span className="cursor-pointer hover:underline">Partner Sites</span>
                </div>
                <p className="text-white/70 text-sm">
                    2025 YuvaLink.ALL rights reserved.
                </p>
            </footer>

        </>
    );
}